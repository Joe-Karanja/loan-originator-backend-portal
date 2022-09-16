import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tenant-currency',
  templateUrl: './add-tenant-currency.component.html',
  styleUrls: ['./add-tenant-currency.component.scss']
})
export class AddTenantCurrencyComponent implements OnInit {

 
  @Input() title;
  @Input() parentData;
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
      currency_code: [this.formData ? this.formData.currency_code : '', Validators.compose([Validators.required])],
      currency_iso_code: [this.formData ? this.formData.currency_iso_code : '', Validators.compose([Validators.required])],
      currency_name: [this.formData ? this.formData.currency_name : '', Validators.compose([Validators.required])]
    });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post('setting/' + this.parentData.tenant_name + '/currency', this.form.value).subscribe(
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
    this._httpService.put('setting/' + this.parentData.tenant_name + '/currency/' + this.formData.id , this.form.value).subscribe(
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
