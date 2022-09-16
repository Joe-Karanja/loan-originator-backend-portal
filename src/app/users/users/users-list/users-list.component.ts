import { CreateUserComponent } from './../create-user/create-user.component';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ViewUserComponent } from '../view-user/view-user.component';
import _ from 'lodash';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [DatePipe]
})
export class UsersListComponent implements OnInit {
  public isLoaded = false;
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
        { name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;&nbsp;' },
        // { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa fa-pencil text-center mr-2 text-success"></i><span class="text-success">Edit</span>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      id: {
        title: '#',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        }
      },

      first_name: {
        title: 'Full Name',
        type: 'string',
        filter: false,
      valuePrepareFunction: (value, row, cell) => {
          return `${row.first_name} ${row.middle_name} ${row.last_name}`;
        }
      },
      email_address: {
        title: 'Email Address',
        type: 'string',
        filter: false

      },
      mobile_number: {
        title: 'Phone Number',
        type: 'string',
        filter: false
      },
      profile: {
        title: 'Profile',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value, row, cell) => {
          return _.sample(['ADMIN', 'MAKER', 'CHECKER']);
        }
      }
    },
    pager: {
      display: true,
      perPage: 5
    }
  };
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this._httpService.model.entity = 'staff';
    this._httpService.model.where_clause = '';
    this._httpService.model.where_value = '';
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {
        this.dataSet = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  public openModal(parentData: any) {
    this.modalRef = this.modalService.open(CreateUserComponent);
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
    this.modalRef = this.modalService.open(CreateUserComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'Edit User';
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
    this.modalRef = this.modalService.open(ViewUserComponent);
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
