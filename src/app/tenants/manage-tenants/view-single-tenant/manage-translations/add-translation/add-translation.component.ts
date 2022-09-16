import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss']
})
export class AddTranslationComponent implements OnInit {

  @Input() title;
  @Input() formData;
  @Input() parentData;
  @Input() menu;
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
    this.loadTenantLanguages();
    this.form = this.fb.group({
      language_id: [this.formData ? this.formData.language_id : '', Validators.compose([Validators.required])],
    //  menu_id: [this.formData ? this.formData.menu_id : '', Validators.compose([Validators.required])],

      title_template: [this.formData ? this.formData.title_template : '', Validators.compose([Validators.required])],
      text_template: [this.formData ? this.formData.text_template : '', Validators.compose([Validators.required])],

      invalid_selection_message: [this.formData ? this.formData.invalid_selection_message : '', Validators.compose([Validators.required])],
      is_active: [this.formData ? this.formData.is_active : false, Validators.compose([Validators.required])],
    });
  }
  public submitData(): void {
    this.loading = true;
    this.form.value.menu_id = this.menu.id;
    this._httpService.post( this.parentData.tenant_name + '/ussd/menu/' + this.menu.id + '/translations', this.form.value).subscribe(
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
    this.form.value.menu_id = this.menu.id;
    this._httpService.put( this.parentData.tenant_name + '/ussd/menu/' + this.menu.id + '/translation/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
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
