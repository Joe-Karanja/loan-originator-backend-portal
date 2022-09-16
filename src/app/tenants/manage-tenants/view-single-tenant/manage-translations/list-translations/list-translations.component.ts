import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';
import { AddTranslationComponent } from '../add-translation/add-translation.component';

@Component({
  selector: 'app-list-translations',
  templateUrl: './list-translations.component.html',
  styleUrls: ['./list-translations.component.scss']
})
export class ListTranslationsComponent implements OnInit {
  @Input() parentData;
  @Input() menu;
  @Input() title;
  public modalRef: NgbModalRef;
  public settings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
      { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
      { name: 'deleteRecord', title: '<i class="fa fa-trash"></i>&nbsp;&nbsp;' },
    ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      language_id: {
        title: 'Language',
        type: 'string',
        valuePrepareFunction: (language_id) => {
          return this.getLanguageName(language_id);
        }
      },
      title_template: {
        title: 'Title Template',
        type: 'string'
      },
      text_template: {
        title: 'Text Template',
        type: 'string'
      },
      invalid_selection_message: {
        title: 'Invalid Selection Message',
        type: 'string'
      },
      is_active: {
          title: 'Is Active',
          type: 'custom',
          renderComponent: LabelBooleanComponent
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  tenantLanguages: any;
  constructor(
    public activeModal: NgbActiveModal, private _httpService: HttpService,
    private modalService: NgbModal, private router: Router, public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loadTenantLanguages();
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get(this.parentData.tenant_name + '/ussd/menu/' + this.menu.id + '/translations').subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.dataSet = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public openModal(formData) {
    this.modalRef = this.modalService.open(AddTranslationComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Translation ';
    } else {
      this.modalRef.componentInstance.title = 'Add Translation';
    }
    this.modalRef.componentInstance.parentData = this.parentData;
    this.modalRef.componentInstance.menu = this.menu;
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete( this.parentData.tenant_name + '/ussd/menu/' + this.menu.id + '/translation/' + event.data.id).subscribe(
        result => {
          if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
            this.toastrService.success(event.data.id, 'Deleted!');
            this.loadData();
          } else {
            this.toastrService.error(event.data.id, 'Failed to Delete!');
          }
        }
      );
    } else {
      event.confirm.reject();
    }
  }
  private viewRecord(data: any) {
    this.router.navigate(['tenants', data.id]);
  }
  public onCustomAction(event: any): void {
    switch (event.action) {
      case 'viewRecord':
        this.viewRecord(event.data);
        break;
      case 'deleteRecord':
        this.onDeleteConfirm(event);
        break;
      case 'editRecord':
        this.openModal(event.data);
        break;
      default:
        break;
    }
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
  private getLanguageName(id: any): string {
   let tenant = this.tenantLanguages.filter((rec) => {
      return  Number(rec.id) === Number(id);
    });
  return tenant ? tenant[0].language : 'Not Set';
  }
}
