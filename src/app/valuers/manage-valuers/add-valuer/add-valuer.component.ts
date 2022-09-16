import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-valuer',
  templateUrl: './add-valuer.component.html',
  styleUrls: ['./add-valuer.component.scss']
})
export class AddValuerComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    this.form = this.fb.group({
      valuer_name: [this.formData ? this.formData.valuer_name : '', [Validators.required]],
      valuer_description: [this.formData ? this.formData.valuer_description : '', [Validators.required]],
      valuer_address: [this.formData ? this.formData.valuer_address : '', [Validators.required]],
      valuer_location: [this.formData ? this.formData.valuer_location : '', [Validators.required]],
      valuer_email: [this.formData ? this.formData.valuer_email : '', [Validators.required]],
    });
    if(this.formData){
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
    this.form.value.username = localStorage.getItem('username');
    this.form.value.transaction_type = '10031';
    this._httpService.post('', this.form.value).subscribe(
      result => {
        if (result.response.response_code === '00') {
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


  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }


}
