import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-ussd-code-add',
  templateUrl: './tenant-ussd-code-add.component.html',
  styleUrls: ['./tenant-ussd-code-add.component.scss']
})
export class TenantUssdCodeAddComponent implements OnInit {
  @Input() title;
  @Input() formData;
  @Input() parentData;
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
      ussd_code: [this.formData ? this.formData.ussd_code : '', Validators.compose([Validators.required])],
      inactive_message: [this.formData ? this.formData.inactive_message : '', Validators.compose([Validators.required])],
      active: [this.formData ? this.formData.active : '', Validators.compose([Validators.required])],
      production_mode: [this.formData ? this.formData.production_mode : '', Validators.compose([Validators.required])],
      product_message: [this.formData ? this.formData.product_message : '', Validators.compose([Validators.required])],
      description: [this.formData ? this.formData.description : '', Validators.compose([Validators.required])],
        });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post('ussdcodes/' + this.parentData.id, this.form.value).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this._httpService.handleErrorsFromServer(result.errors);
        }
      },
      error => {
        this.errorMessages = error.error.error_messages;
      },
      complete => {
        this.loading = false;
      }

    );
  }
  public saveChanges(): void {
    this.loading = true;
    this._httpService.put('ussdcodes/' + this.parentData.id + '/' + this.formData.id , this.form.value).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE ){
          this.toastrService.success('Changes saved!', 'Saved Successfully!');
          this.activeModal.close('success');
        } else {
          this._httpService.handleErrorsFromServer(result.errors);
        }
      },
      error => {
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
