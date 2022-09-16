import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss']
})
export class CreateCompanyDialogComponent implements OnInit {
  selectedFile: File;
  imageUpload: FormGroup
  commandInterface: any;
  filestring: string;
  valuers: any;
  public distributionStatuses;
  //public selectedFile;
  // public image: any;
  public file;
  arrayImage = [];
  base64ImageArray = [];
  @ViewChild('fileInput') fileInput: ElementRef;
  citizenshipDetails: any;
  add_image: any[];
  base64image: any;
  listed_image: number;
  base64imageFormat: any;
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  model: any;
  image: any;

  imageSrc: string =
      'https://media.geeksforgeeks.org/wp-content/uploads/20190506125816/avt.png';

  // image: string | ArrayBuffer;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    console.log(this.formData);

    this.form = this.fb.group({
      name : [this.formData ? this.formData.name : '', [Validators.required]],
      regNo : [this.formData ? this.formData.regNo : '', [Validators.required]],
      phone : [this.formData ? this.formData.phone : '', [Validators.required]],
      email : [this.formData ? this.formData.email : '', [Validators.required]],
      accountNo : [this.formData ? this.formData.accountNo : '', [Validators.required]],
      kraPin : [this.formData ? this.formData.kraPin : '', [Validators.required]],
      branch : [this.formData ? this.formData.branch : '', [Validators.required]],
      physicalAddress : [this.formData ? this.formData.physicalAddress : '', [Validators.required]],
      postalAddress : [this.formData ? this.formData.postalAddress : '', [Validators.required]],
      openingDate : [this.formData ? this.formData.openingDate : '', [Validators.required]],
      closingDate : [this.formData ? this.formData.closingDate : '', [Validators.required]],
      processingFee : [this.formData ? this.formData.processingFee : '', [Validators.required]],
      loanPercentage : [this.formData ? this.formData.loanPercentage : '', [Validators.required]],

      // Extra Parameters
      file: [''],

      bankWithUs : [''],
      meansOfUploadingEmployeeData : [''],
      sector : [this.formData ? this.formData.sector : '', [Validators.required]],
      currency : [this.formData ? this.formData.currency : '', [Validators.required]],

    });
    if (this.formData) {
    }
  }

  public submitData(): void {
    if (this.formData) {
      this.saveChanges();
    } else {
      this.createRecord();
    }
    this.loading = true;
  }
  private createRecord(): any {
    // return this to send image to server
    // this.base64image = this.image.split(',')[1];
    // return this to send image to server

    // username = localStorage.getItem('username');
    // this.model = {
    //   transaction_type: '100400',
    //   channel: 'WEB',
    //   user_agent: 'Browser',
    //   profile: this.form.value,
    //   images: this.base64ImageArray
    // }
    console.log(this.model);


    this._httpService.scoresPost('organization/create', this.form.value).subscribe(
      result => {
        console.log(result);

        if (result.status === 200) {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this.toastrService.error('Failed to create!', 'Failed!');
        }
      },
      error => {
      },
      complete => {
        this.loading = false;
      }

    );
  }
  private saveChanges(): any {
    this._httpService.put('user/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCES_CODE) {
          this.toastrService.success('Changes saved successfully!', 'Saved Changes!');
          this.activeModal.close('success');
        } else {
          this._httpService.handleErrorsFromServer(result.errors);
        }
      },
      error => {
        this.loading = false;
        this.errorMessages = error.error.error_messages;
      },
      complete => {
        this.loading = false;
      }

    );
  }
  public showPreview() {
    const reader = new FileReader();
    for (let x = 0; x < this.arrayImage.length; x++) {
      if (this.arrayImage[x].files.length) {
        this.file = this.arrayImage[x].files[0];
        reader.onload = () => {
          let img = {};
          this.image = reader.result;
          let base = this.image.split(',')[1];
          img['image'] = base;
          this.base64ImageArray.push(img);
          console.log(this.base64ImageArray);
        };
        reader.readAsDataURL(this.file);
        reader.DONE;
      }
    }
  }
  // uploadImage() {
  //   // this.swalFire()
  //   let application_id = JSON.parse(localStorage.getItem('application_data'));
  //   this.base64image = this.image.split(',')[1];
  //   this.commandInterface = {
  //     applied_product_id: application_id.applied_product_id,
  //     citizenship: this.imageUpload.value.country,
  //     valuer_id: Number(this.imageUpload.value.valuer_id),
  //     images:  this.base64ImageArray,
  //     transaction_type: "100814"
  //   }
  //   this._httpService.post(this.commandInterface)
  //     .subscribe(result => {
  //       console.log(result);
  //       localStorage.setItem('upload_det', JSON.stringify(this.commandInterface))
  //       this.citizenshipDetails = result.response;

  //       //this.router.navigate(['payment'])
  //     })
  // }
  public processFile(imageInput): void {

    this.arrayImage.push(imageInput);
    console.log("Image Array", this.arrayImage);
    //Store
    this.showPreview();
    //console.log(imageInput);
    //let liste = this.add_image.push(imageInput)
    // console.log(liste);


  }

  removeImage(): void {
    this.image = '';
  }
  addImage(img) {

  }


  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}
