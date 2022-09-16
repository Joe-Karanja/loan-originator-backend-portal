import { ViewAuditTrailComponent } from './../view-audit-trail/view-audit-trail.component';

import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-audit-trail-list',
  templateUrl: './audit-trail-list.component.html',
  styleUrls: ['./audit-trail-list.component.scss'],
  providers: [DatePipe]
})
export class AuditTrailListComponent implements OnInit {
  @Input() data;
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
      delete: true,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      created_at: {
        title: 'Timestamp',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      action_name: {
        title: 'Action Name',
        type: 'string'
      },
      ip_address: {
        title: 'IP Address',
        type: 'string'
      },
      url_path: {
        title: 'URL Path',
        type: 'string'
      },
    /**  created_at: {
        title: 'Created On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
      }, **/

    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('user/activities').subscribe(
      result => {
        if (result.response_code === 200) {
          this.dataSet = result.data.map(obj => {
            return obj;
          });
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public openModal(parentData: any) {
  //  this.modalRef = this.modalService.open(CreateAssessmentComponent);
    this.modalRef.componentInstance.title = 'Add User';
    this.modalRef.componentInstance.parentData = '';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public editRecord(formData: any) {
  //  this.modalRef = this.modalService.open(CreateAssessmentComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'Edit User: ' + formData.username;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('profile/' + event.data.id).subscribe(
        result => {
          if (result.response_code === 200) {
            event.confirm.resolve();
            this.toastrService.success(event.data.id, 'Deleted!');
          } else {
            this.toastrService.error(event.data.id, 'Failed to Delete!');
          }
        }
      );
    } else {
      event.confirm.reject();
    }
  }
  public viewRecord(formData: any) {
    this.modalRef = this.modalService.open(ViewAuditTrailComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      }
    }, (reason) => {
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'viewrecord':
        this.viewRecord(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }
}
