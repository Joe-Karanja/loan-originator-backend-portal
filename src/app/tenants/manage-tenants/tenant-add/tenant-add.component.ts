import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-add',
  templateUrl: './tenant-add.component.html',
  styleUrls: ['./tenant-add.component.scss']
})
export class TenantAddComponent implements OnInit {

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
      username: [this.formData ? this.formData.username : '', Validators.compose([Validators.required])],
      email_address: [this.formData ? this.formData.email_address : '', Validators.compose([Validators.required, Validators.email])],
      tenant_name: [this.formData ? this.formData.tenant_name : '', Validators.compose([Validators.required])],
      database_name: [this.formData ? this.formData.database_name : '', Validators.compose([Validators.required])],
      database_host: [this.formData ? this.formData.database_host : '', Validators.compose([Validators.required])],
      database_port: [this.formData ? this.formData.database_port : '', Validators.compose([Validators.required])],
      database_user: [this.formData ? this.formData.database_user : '', Validators.compose([Validators.required])],
      database_password: [this.formData ? this.formData.database_password : '', Validators.compose([Validators.nullValidator])],
      database_dialect: [this.formData ? this.formData.database_dialect : '', Validators.compose([Validators.nullValidator])],
      database_params: [this.formData ? this.formData.database_params : '', Validators.compose([Validators.nullValidator])],
      description: [this.formData ? this.formData.description : '', Validators.compose([Validators.required])],
    });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post('tenants/tenants', this.form.value).subscribe(
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
    this.form.value.id = this.formData.id;
    this._httpService.put('tenants/tenant/' + this.formData.id , this.form.value).subscribe(
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
