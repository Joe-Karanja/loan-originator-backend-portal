import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AddValuerUserComponent } from '../add-valuer-user/add-valuer-user.component';
@Component({
  selector: 'app-view-valuer',
  templateUrl: './view-valuer.component.html',
  styleUrls: ['./view-valuer.component.scss'],
  providers: [DatePipe]
})
export class ViewValuerComponent implements OnInit {
  public valuer_id: any;
  public valuer: any;
  public isLoaded = false;
  public formData;
  public modalRef: NgbModalRef;
  public selectedCategory;
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
        // { name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
        //  { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      date_created: {
        title: 'Date applied',
        type: 'string'
      },
      Amount: {
        title: 'Amount',
        type: 'string'
      },
      interest_rates: {
        title: 'Rates (%)',
        type: 'string'
      },
      status: {
        title: 'Loan Status',
        type: 'string'
      },

    },
    pager: {
      display: true,
      perPage: 5
    }
  };
  dataSet: any;
  userType: any;
  cust_id: any;
  customer: any;
  loan_id: any;

  // For employees table
  public tempData: any = [
    {
      id: 1,
      customerId: 1,
      customerName: 'John Javier',
      organizationId: 1,
      cycleId: 1,
      processingFee: 70,
      totalDisbursed: 0,
      loanAmount: 6000,
      status: true,
      appliedOn: '2022-02-16 03:17:06'
    },
    {
      id: 2,
      customerId: 3,
      customerName: 'Daniel Mwangi',
      organizationId: 1,
      cycleId: 1,
      processingFee: 100,
      totalDisbursed: 0,
      loanAmount: 8000,
      status: true,
      appliedOn: '2022-02-16 03:21:25'
    },
    {
      id: 3,
      customerId: 2,
      customerName: 'David Dsalaash',
      organizationId: 1,
      cycleId: 1,
      processingFee: 1000,
      totalDisbursed: 0,
      loanAmount: 5000,
      status: true,
      appliedOn: '2022-02-24 09:16:20'
    },
    {
      id: 4,
      customerId: 6,
      customerName: 'Morris Kiboori',
      organizationId: 1,
      cycleId: 1,
      processingFee: 400,
      totalDisbursed: 0,
      loanAmount: 2000,
      status: true,
      appliedOn: '2022-02-24 09:20:56'
    },
    {
      id: 5,
      customerId: 6,
      customerName: 'Morris Kiboori',
      organizationId: 1,
      cycleId: 1,
      processingFee: 400,
      totalDisbursed: 0,
      loanAmount: 2000,
      status: true,
      appliedOn: '2022-02-24 09:20:56'
    },
    {
      id: 6,
      customerId: 11,
      customerName: 'Salim Mwenesi',
      organizationId: 1,
      cycleId: 1,
      processingFee: 600,
      totalDisbursed: 0,
      loanAmount: 3000,
      status: true,
      appliedOn: '2022-02-24 09:38:26'
    },
    {
      id: 7,
      customerId: 11,
      customerName: 'Salim Mwenesi',
      organizationId: 1,
      cycleId: 1,
      processingFee: 600,
      totalDisbursed: 0,
      loanAmount: 30000000,
      status: false,
      appliedOn: '2022-02-24 09:38:26'
    }
  ];
  public employeesSettings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        // { name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
        //  { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      appliedOn: {
        title: 'Date applied',
        type: 'string',
        valuePrepareFunction: (value, row, cell) => {
          return new Date(value).toDateString()
        }

      },
      loanAmount: {
        title: 'Amount',
        type: 'string'
      },
      status: {
        title: 'Loan Status',
        type: 'string',
        valuePrepareFunction: (value, row, cell) => {
          if (value === true) {
            return 'Disbursed';
          } else {
            return 'Pending Disbursement';
          }
        }
      },

    },
    pager: {
      display: true,
      perPage: 100
    }
  };
  employeesDataSet: any;
  // For employees table



  constructor(private _activatedRoute: ActivatedRoute, private _httpService: HttpService, private modalService: NgbModal,
              public datePipe: DatePipe, public toastrService: ToastrService,
              public router: Router,
    ) { }
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.loan_id = params.id;
      }
    });
    this.userType = this._httpService.Username();
    this.loadValuer();

    this.loadEmployeeLoans();

  }
  private loadValuer(): void {
    this._httpService.model.entity = 'customer';
    this._httpService.model.where_clause = 'customer_id';
    this._httpService.model.where_value = this.loan_id;
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {

        this.customer = [];
            // result.list[0];

        console.log(this.customer);
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
        this.loadData();
      }
    );
  }
  private loadData(): any {
    this.isLoaded = false;
    this._httpService.model.entity = 'valuer_login';
    this._httpService.model.where_clause = 'valuer_id';
    this._httpService.model.where_value = this.valuer_id;
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
     this.modalRef = this.modalService.open(AddValuerUserComponent);
     this.modalRef.componentInstance.title = 'Add User';
     this.modalRef.componentInstance.valuer_id = Number(this.valuer_id);
     this.modalRef.componentInstance.valuer = this.valuer;
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


  onCustomAction(event) {
    switch (event.action) {
      case 'viewrecord':
        this.viewInsuranceSubCats(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }
  private viewInsuranceSubCats(data: any): void {
    this.selectedCategory = data;
  }

  private loadEmployeeLoans() {
    // this.isLoaded = false;

    this.employeesDataSet = this.tempData;

    // this.isLoaded = true;

    // this._httpService.scoresGet(`loan/?size=15&page=0&orgId=1`).subscribe(
    //     result => {
    //       console.log(result);
    //
    //     },
    //     error => {
    //     },
    //     complete => {
    //       this.isLoaded = true;
    //     }
    // );
  }
}
