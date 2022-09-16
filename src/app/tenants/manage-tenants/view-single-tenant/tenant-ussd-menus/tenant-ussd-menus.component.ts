import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';
import { TenantUssdCodeAddComponent } from '../tenant-ussd-code-add/tenant-ussd-code-add.component';
import { TenantUssdMenuAddComponent } from '../tenant-ussd-menu-add/tenant-ussd-menu-add.component';

@Component({
  selector: 'app-tenant-ussd-menus',
  templateUrl: './tenant-ussd-menus.component.html',
  styleUrls: ['./tenant-ussd-menus.component.scss'],
  providers: [DatePipe]
})
export class TenantUssdMenusComponent implements OnInit {
  @Input() parentData;
  public formData;
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
        // { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;'},
        { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
        { name: 'deleteRecord', title: '<i class="fa fa-trash"></i>&nbsp;&nbsp;' },
        { name: 'manageLanguages',
        title: '<i class="fa fa-language" data-toggle="tooltip" title="Manage Languages!"></i>&nbsp;&nbsp;' }],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      field_key: {
        title: 'Field Key',
        type: 'string'
      },
      menu_value: {
        title: 'Menu Value',
        type: 'string'
      },
      order: {
        title: 'Order',
        type: 'string'
      },
      active: {
        title: 'Active',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      is_dynamic: {
        title: 'Dynamic',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      is_entry: {
        title: 'Is Entry',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      is_registration: {
        title: 'Is Reg',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      ends_menu: {
        title: 'Ends Menu',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
    public datePipe: DatePipe, public toastrService: ToastrService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.dataSet = this._httpService.getAdvanced(this.parentData.tenant_name + '/ussd/menus');
  //  this.loadData();
  }
  private loadData(): any {
    this._httpService.get(this.parentData.tenant_name + '/ussd/menus').subscribe(
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
    this.formData = formData;
    this.modalRef = this.modalService.open(TenantUssdMenuAddComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Menu ';
    } else {
      this.modalRef.componentInstance.title = 'Add Menu';
    }
    this.modalRef.componentInstance.parentData = this.parentData;
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete(this.parentData.tenant_name + '/ussd/menu/' +  event.data.id).subscribe(
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
}
