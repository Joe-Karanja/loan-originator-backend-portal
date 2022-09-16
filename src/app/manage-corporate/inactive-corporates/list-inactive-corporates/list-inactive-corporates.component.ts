import { CreateCompanyDialogComponent } from '../../create-company-dialog/create-company-dialog.component';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AddValuerComponent } from '../../../valuers/manage-valuers/add-valuer/add-valuer.component';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-corporates',
  templateUrl: './list-inactive-corporates.component.html',
  providers: [DatePipe],
  styleUrls: ['./list-inactive-corporates.component.scss']
})
export class ListInactiveCorporatesComponent implements OnInit {

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
      delete: true,
      custom: [
        { name: 'viewCorporate', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;&nbsp;' },
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger text-center mr-2"></i>Disable &nbsp;&nbsp;&nbsp;',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {

      name: {
        title: 'Company Name',
        type: 'string',
        filter: false
      },
      reg_no: {
        title: 'Registration',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false
      },
      kra_pin: {
        title: 'KRA',
        type: 'string',
        filter: false
      },
      branch: {
        title: 'KRA',
        type: 'string',
        filter: false
      },
      physical_address: {
        title: 'Address',
        type: 'string',
        filter: false
      }
    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  dataSet: any;
  username: any;
  userType: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService, public router: Router) { }
  ngOnInit() {
    this.loadData();
    this.userType = JSON.parse(localStorage.getItem('user_details'))
    console.log(this.userType);

  }
  private loadData(): any {


    this._httpService.model.entity = 'organization';
    this._httpService.model.where_clause = '';
    this._httpService.model.where_value = '';
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {
        this.dataSet = result.list; //? result.list.reverse(): '';

      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  public openModal(parentData: any) {

    this.modalRef = this.modalService.open(CreateCompanyDialogComponent, {size: 'lg'});
    this.modalRef.componentInstance.title = 'Add New Company';
    this.modalRef.componentInstance.parentData = '';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public editRecord(formData: any) {
    // this.modalRef = this.modalService.open(CreateAssessmentComponent);
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
  private viewCorporate(data: any): void {
    console.log('1234');

    this.router.navigate(['list-corporates', data.id], { skipLocationChange: true });
  }
  uploadEmployees(){
    console.log('upload');

  }




  onCustomAction(event) {
    switch (event.action) {
      case 'viewCorporate':
        this.viewCorporate(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }


}
