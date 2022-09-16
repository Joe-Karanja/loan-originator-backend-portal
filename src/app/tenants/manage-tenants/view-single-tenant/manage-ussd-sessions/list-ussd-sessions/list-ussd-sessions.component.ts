import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';
import { ViewRequestsInASessionComponent } from '../view-requests-in-a-session/view-requests-in-a-session.component';

@Component({
  selector: 'app-list-ussd-sessions',
  templateUrl: './list-ussd-sessions.component.html',
  styleUrls: ['./list-ussd-sessions.component.scss'],
  providers: [DatePipe]
})
export class ListUssdSessionsComponent implements OnInit {

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
     { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;' },
    //  { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
    //  { name: 'deleteRecord', title: '<i class="fa fa-trash"></i>&nbsp;&nbsp;' }
    ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      // session_id: {
      //   title: 'Session ID',
      //   type: 'string'
      // },
      phone_number: {
        title: 'Phone No.',
        type: 'string'
      },
      service_code: {
        title: 'Service Code',
        type: 'string'
      },
      service_provider: {
        title: 'Service Provider.',
        type: 'string'
      },
      session_completed: {
        title: 'Completed',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      authenticated: {
        title: 'Authenticated',
        type: 'custom',
        renderComponent: LabelBooleanComponent
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
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('session/' + this.parentData.tenant_name + '/sessions').subscribe(
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
  // this.modalRef = this.modalService.open(AddTenantCurrencyComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Transaction ';
    } else {
      this.modalRef.componentInstance.title = 'Add Transaction';
    }
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.componentInstance.parentData = this.parentData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public openViewModal(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(ViewRequestsInASessionComponent);
    this.modalRef.componentInstance.title = 'View Session: ' + formData.session_id;
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.componentInstance.parentData = this.parentData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('setting/' + this.parentData.tenant_name + '/currency/' + event.data.id).subscribe(
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

  public onCustomAction(event: any): void {
    switch (event.action) {
      case 'viewRecord':
        this.openViewModal(event.data);
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
