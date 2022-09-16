import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';
import { TenantAddComponent } from '../tenant-add/tenant-add.component';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.scss'],
  providers: [DatePipe]
})
export class TenantsListComponent implements OnInit, OnChanges {
  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
    public datePipe: DatePipe, public toastrService: ToastrService) {
      this.settings = {
        selectMode: 'single',  // single|multi
        hideHeader: false,
        hideSubHeader: false,
        actions: {
          columnTitle: 'Actions',
          add: false,
          edit: false,
          delete: false,
          custom: [
            { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;'},
          { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
          { name: 'deleteRecord', title: '<i class="fa fa-trash"></i>&nbsp;&nbsp; <br>' },],
          position: 'right' // left|right
        },
        delete: {
          deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
          confirmDelete: true
        },
        noDataMessage: 'No data found',
        columns: {
          username: {
            title: 'Username',
            type: 'string'
          },
          email_address: {
            title: 'Email Address',
            type: 'string'
          },
          database_name: {
            title: 'Database Name',
            type: 'string'
          },
          database_host: {
            title: 'Database Host',
            type: 'string'
          },
          database_port: {
            title: 'Database Port',
            type: 'string'
          },
          // database_user: {
          //   title: 'Database User',
          //   type: 'string'
          // },
          // database_dialect: {
          //   title: 'Database Dialect',
          //   type: 'string'
          // },
          // database_params: {
          //   title: 'Database Params',
          //   type: 'string'
          // },
          description: {
            title: 'Description',
            type: 'string'
          },
          created_on: {
          title: 'Created On',
            type: 'string',
            valuePrepareFunction: (date) => {
              const raw = new Date(date);
              const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
              return formatted;
            },
          },
          last_update_on: {
               title: 'Last Updated On',
            type: 'string',
            valuePrepareFunction: (date) => {
              const raw = new Date(date);
              const formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss');
              return formatted;
            },
          },
           last_update_by: {
            title: 'Last Updated By',
            type: 'string'
          }
        },
        pager: {
          total: 100,
          display: true,
          perPage: 10
        }
      };
       // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    }
  ngOnInit() {
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges) {
   console.log(changes);
  }
  private loadData(): any {
    this._httpService.get('tenants/tenants').subscribe(
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
    this.modalRef = this.modalService.open(TenantAddComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Tenant ';
    } else {
      this.modalRef.componentInstance.title = 'Add Tenant';
    }
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
      this._httpService.delete('tenants/tenant/' + event.data.id).subscribe(
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
