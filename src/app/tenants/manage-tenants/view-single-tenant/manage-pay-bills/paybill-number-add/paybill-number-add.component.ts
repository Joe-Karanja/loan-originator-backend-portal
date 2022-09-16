import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paybill-number-add',
  templateUrl: './paybill-number-add.component.html',
  styleUrls: ['./paybill-number-add.component.scss']
})
export class PaybillNumberAddComponent implements OnInit {
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
      short_code_1: [this.formData ? this.formData.short_code_1 : '', Validators.compose([Validators.required])],
      short_code_2: [this.formData ? this.formData.short_code_2 : '', Validators.compose([Validators.required])],

      checkout_code: [this.formData ? this.formData.checkout_code : '', Validators.compose([Validators.required])],
      checkout_pass_key: [this.formData ? this.formData.checkout_pass_key : '', Validators.compose([Validators.required])],
     
      initiator_name: [this.formData ? this.formData.initiator_name : '', Validators.compose([Validators.required])],
      initiator_password: [this.formData ? this.formData.initiator_password : '', Validators.compose([Validators.nullValidator])],
     
      bill_consumer_key: [this.formData ? this.formData.bill_consumer_key : '', Validators.compose([Validators.required])],
      bill_consumer_secret: [this.formData ? this.formData.bill_consumer_secret : '', Validators.compose([Validators.required])],
    
      offline_confirmation_action: [this.formData ? this.formData.offline_confirmation_action : '', Validators.compose([Validators.required])],
      test_msisdn: [this.formData ? this.formData.test_msisdn : '', Validators.compose([Validators.required])],
    
      active: [this.formData ? this.formData.active : false, Validators.compose([Validators.nullValidator])],
      is_test: [this.formData ? this.formData.is_test : false, Validators.compose([Validators.nullValidator])],
    });
  }
  public submitData(): void {
    this.loading = true;
    this.form.value.tenant_id = this.parentData.id;
    this._httpService.post('paybill/bill', this.form.value).subscribe(
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
    this.form.value.tenant_id = this.parentData.id;
    this._httpService.put('paybill/' + this.formData.id , this.form.value).subscribe(
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
