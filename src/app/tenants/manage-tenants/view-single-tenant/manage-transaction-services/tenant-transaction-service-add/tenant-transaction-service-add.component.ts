import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-transaction-service-add',
  templateUrl: './tenant-transaction-service-add.component.html',
  styleUrls: ['./tenant-transaction-service-add.component.scss']
})
export class TenantTransactionServiceAddComponent implements OnInit {

  @Input() title;
  @Input() formData;
  @Input() parentData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public ussdServices: any = [];
  public tenantLanguages: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }

  ngOnInit() {
    this.loadUssdServices();
    this.loadTenantLanguages();
    this.form = this.fb.group({
      service_id: [this.formData ? this.formData.service_id : '', Validators.compose([Validators.required])],
      transaction_type: [this.formData ? this.formData.transaction_type : '', Validators.compose([Validators.required])],

      transaction_code: [this.formData ? this.formData.transaction_code : '', Validators.compose([Validators.required])],
      service_account: [this.formData ? this.formData.service_account : '', Validators.compose([Validators.required])],
      description: [this.formData ? this.formData.description : '', Validators.compose([Validators.required])],
     
      ip_address: [this.formData ? this.formData.ip_address : '', Validators.compose([Validators.nullValidator])],
      service_active: [this.formData ? this.formData.service_active : false, Validators.compose([Validators.nullValidator])],
    });
  }
  public submitData(): void {
    this.loading = true;
    this.form.value.transaction_type =  (this.form.value.transaction_type).toUpperCase();
    this.form.value.transaction_code =  (this.form.value.transaction_code).toUpperCase();
    this._httpService.post(this.parentData.tenant_name + '/service/transaction', this.form.value).subscribe(
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
    this.form.value.transaction_type =  (this.form.value.transaction_type).toUpperCase();
    this.form.value.transaction_code =  (this.form.value.transaction_code).toUpperCase();
    this._httpService.put(this.parentData.tenant_name + '/service/transaction/' + this.formData.id , this.form.value).subscribe(
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
  private loadUssdServices(): any {
    this._httpService.get('tenant/services').subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.ussdServices = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  private loadTenantLanguages(): any {
    this._httpService.get('setting/' + this.parentData.tenant_name + '/languages').subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.tenantLanguages = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }

}
