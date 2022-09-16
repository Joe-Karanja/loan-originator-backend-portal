import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tenant-notification-template',
  templateUrl: './add-tenant-notification-template.component.html',
  styleUrls: ['./add-tenant-notification-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTenantNotificationTemplateComponent  {
  public ckeditorContent: string;
  public config: any;
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
    public toastrService: ToastrService) {
      this.ckeditorContent = '<div>Hey we are testing CKEditor</div>';
      this.config = {
          uiColor: '#F0F3F4',
          height: '350',
          extraPlugins: 'divarea'
      };
    }
  ngOnInit(): void {
    this.form = this.fb.group({
      service_id: [this.formData ? this.formData.service_id : '', Validators.compose([Validators.required])],
       response_code: [this.formData ? this.formData.response_code : '', Validators.compose([Validators.required])],
       message_template: [this.formData ? this.formData.message_template : '', Validators.compose([Validators.required])],
       enabled: [this.formData ? this.formData.enabled : '', Validators.compose([Validators.required])]
    });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post('setting/' + this.parentData.tenant_name + '/languages', this.form.value).subscribe(
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
    this._httpService.put('setting/' + this.parentData.tenant_name + '/language/' + this.formData.id , this.form.value).subscribe(
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

  onChange(event: any) {
    setTimeout(() => {
      this.ckeditorContent = event;
    });
  }
  onReady(event: any) { }
  onFocus(event: any) { 
      console.log("editor is focused");
  }
  onBlur(event: any) {
  }

}
