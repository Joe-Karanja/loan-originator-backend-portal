import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ListTranslationsComponent } from '../manage-translations/list-translations/list-translations.component';

@Component({
  selector: 'app-tenant-ussd-menu-add',
  templateUrl: './tenant-ussd-menu-add.component.html',
  styleUrls: ['./tenant-ussd-menu-add.component.scss']
})
export class TenantUssdMenuAddComponent implements OnInit {
  @Input() title;
  @Input() formData;
  @Input() parentData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public ussdServices: any = [];
  public tenantLanguages: any = [];
  public value_types = [
    'string', 'float'
  ];
  public modalRef: NgbModalRef;
  public menus: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService,
    config: NgbModalConfig,
    ) { }

  ngOnInit() {
    this.loadUssdServices();
    this.loadTenantLanguages();
    this.loadMenus();
    this.form = this.fb.group({
      service_id: [this.formData ? this.formData.service_id : 0, Validators.compose([Validators.nullValidator])],
      field_key: [this.formData ? this.formData.field_key : '', Validators.compose([Validators.required])],
      menu_value: [this.formData ? this.formData.menu_value : '', Validators.compose([Validators.nullValidator])],
      value_type: [this.formData ? this.formData.value_type : 'string', Validators.compose([Validators.required])],
      order: [this.formData ? this.formData.order : '', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      parent_id: [this.formData ? this.formData.parent_id : 0, Validators.compose([])],
      // tslint:disable-next-line: max-line-length
      is_dynamic: [this.formData ? this.formData.is_dynamic : false, Validators.compose([Validators.nullValidator])],
      next_menu_id: [this.formData ? this.formData.next_menu_id : 0, Validators.compose([Validators.nullValidator])],
      active: [this.formData ? this.formData.active : true, Validators.compose([Validators.nullValidator])],

      invalid_selection_message: [this.formData ? this.formData.invalid_selection_message : '', Validators.compose([Validators.required])],
      language_id: [this.formData ? this.formData.language_id : '', Validators.compose([Validators.required])],
      title_template: [this.formData ? this.formData.title_template : '', Validators.compose([Validators.required])],
      text_template: [this.formData ? this.formData.text_template : '', Validators.compose([Validators.required])],
      is_active: [this.formData ? this.formData.is_active : true, Validators.compose([Validators.nullValidator])],
      
      is_entry: [this.formData ? this.formData.is_entry : false, Validators.compose([Validators.nullValidator])],
      is_registration: [this.formData ? this.formData.is_registration : '', Validators.compose([Validators.nullValidator])],
      ends_menu: [this.formData ? this.formData.ends_menu : false, Validators.compose([Validators.nullValidator])],
      
    });
       // remove language fields on update
       if(this.formData){
        this.form.removeControl('is_active');
        this.form.removeControl('language_id');
        this.form.removeControl('title_template');
        this.form.removeControl('text_template');
        this.form.removeControl('invalid_selection_message');
      }
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.post(this.parentData.tenant_name + '/ussd/menus', this.form.value).subscribe(
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
    this._httpService.patch(this.parentData.tenant_name + '/ussd/menu/' + this.formData.id, this.form.value).subscribe(
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
  private loadUssdServices(): any {
    this._httpService.get(this.parentData.tenant_name + '/service/transaction').subscribe(
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
  private loadMenus(): any {
    this._httpService.get(this.parentData.tenant_name + '/ussd/menus').subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.menus = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public listLanguages(menu: any): any {
     this.modalRef = this.modalService.open(ListTranslationsComponent);
     this.modalRef.componentInstance.parentData = this.parentData;
     this.modalRef.componentInstance.menu = this.formData;
     this.modalRef.componentInstance.title = 'Manage Menu Translations';
     this.modalRef.componentInstance.parentData = this.parentData;
     this.modalRef.result.then((result) => {
       if (result === 'success') {
        // this.loadData();
       }
     }, (reason) => {
     });
  }
}
