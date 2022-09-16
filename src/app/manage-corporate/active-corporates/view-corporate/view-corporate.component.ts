import { CreateAdminDialogComponent } from './create-admin-dialog/create-admin-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-corporate',
  templateUrl: './view-corporate.component.html',
  providers: [DatePipe, CurrencyPipe],
  styleUrls: ['./view-corporate.component.scss']
})
export class ViewCorporateComponent implements OnInit {

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
      customer_name: {
        title: 'Applicant Name',
        type: 'string'
      },
      phone_number: {
        title: 'Mobile Number',
        type: 'string',
      },
      product_name: {
        title: 'Loan Type',
        type: 'string'
      },
      repayment_rating: {
        title: 'Repayment Rating',
        type: 'html',
        valuePrepareFunction: (value) => {
          const formatted = '<span class="badge badge-success">Good</span>';
          return formatted;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'Good', title: 'Good'},
              {value: 'Delayed', title: 'Delayed'},
              {value: 'Defaulter', title: 'Defaulter'}
            ],
          },
        },

      },
      amount: {
        title: 'Loan Amount',
        type: 'string',
        valuePrepareFunction: (value) => {
          const formatted = this.currencyPipe.transform(value, 'Kes.');
          return formatted;
        },
      },
      interest_rate: {
        title: 'Interest Rate',
        type: 'string',
      },

      duration_days: {
        title: 'Repayment Period (Months)',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value + ' month(s)';
        },
      },
      loan_fee: {
        title: 'Loan Fee',
        type: 'string',
        valuePrepareFunction: (value) => {
          const formatted = this.currencyPipe.transform(value, 'Kes.');
          return formatted;
        },
      },
      // loan_balance: {
      //   title: 'Loan Balance',
      //   type: 'string',
      //   valuePrepareFunction: (value) => {
      //     const formatted = this.currencyPipe.transform(value, 'Kes.');
      //     return formatted;
      //   },
      // },
      created_on: {
        title: 'Application Date',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
      },
    },
    pager: {
      display: true,
      perPage: 5
    }
  };
  dataSet: any;
  userType: any;
  company_id: any;
  company: any;
  loanConfig: any;
  company_loans: any;



  // For employees table
  public employeesTempData: any = [{
    "id": 1,
    "city": "Nairobi",
    "country": "kenya",
    "email_address": "maina.allex@eclectics.io",
    "employer_id": 1,
    "first_name": "John",
    "kra_pin": "A00019292929",
    "last_name": "Doe",
    "middle_name": "Javier",
    "mobile_number": "260772529841",
    "monthly_income": 10000.0,
    "national_id": "6473829028",
    "position": "software dev"
  }, {
    "id": 2,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "d_salaash@gmail.com",
    "employer_id": 1,
    "first_name": "David",
    "kra_pin": "A003838383838",
    "last_name": "Salaash",
    "middle_name": "Dsalaash",
    "mobile_number": "254708453901",
    "monthly_income": 100000.0,
    "national_id": "30323145",
    "position": "Developer"
  }, {
    "id": 3,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "davidkimani77@gmail.com",
    "employer_id": 1,
    "first_name": "Daniel",
    "kra_pin": "A002929292",
    "last_name": "Kimani",
    "middle_name": "Mwangi",
    "mobile_number": "254798997948",
    "monthly_income": 100000.0,
    "national_id": "25478545",
    "position": "Management"
  }, {
    "id": 6,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "morri5@gmail.com",
    "employer_id": 1,
    "first_name": "Morris",
    "kra_pin": "A00293993I",
    "last_name": "Murega",
    "middle_name": "Kiboori",
    "mobile_number": "254723686428",
    "monthly_income": 3000000.0,
    "national_id": "3025861",
    "position": "Management"
  }, {
    "id": 7,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "dsalaash76@gmail.com",
    "employer_id": 1,
    "first_name": "David",
    "kra_pin": "A00019292929",
    "last_name": "Mwai",
    "middle_name": "Salaash",
    "mobile_number": "25472368648",
    "monthly_income": 100000.0,
    "national_id": "30245861",
    "position": "Management"
  }, {
    "id": 8,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "bornfacesingi@gmail.com",
    "employer_id": 1,
    "first_name": "Bornface",
    "kra_pin": "A00388477",
    "last_name": "Singi",
    "middle_name": "N",
    "mobile_number": "25470642014",
    "monthly_income": 250000.0,
    "national_id": "394484737",
    "position": "Management"
  }, {
    "id": 9,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "bonnie2334@gmail.com",
    "employer_id": 1,
    "first_name": "Bonnie",
    "kra_pin": "A00019292929",
    "last_name": "Singi",
    "middle_name": "Bonnie",
    "mobile_number": "254734406645",
    "monthly_income": 1.939393333E9,
    "national_id": "30258123",
    "position": "Management"
  }, {
    "id": 10,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "dankimani23@gmail.com",
    "employer_id": 1,
    "first_name": "Daniel",
    "kra_pin": "A004948884I",
    "last_name": "M",
    "middle_name": "Kimani",
    "mobile_number": "254769219440",
    "monthly_income": 240000.0,
    "national_id": "288377466",
    "position": "Developer"
  }, {
    "id": 11,
    "city": "Mombasa",
    "country": "Kenya",
    "email_address": "salimngachira@gmail.com",
    "employer_id": 1,
    "first_name": "Salim",
    "kra_pin": "A00334788I",
    "last_name": "Ngachira",
    "middle_name": "Mwenesi",
    "mobile_number": "254728699128",
    "monthly_income": 250000.0,
    "national_id": "30495867",
    "position": "Software Developer"
  }, {
    "id": 12,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "bravinkimutai@gmail.com",
    "employer_id": 1,
    "first_name": "Bravin",
    "kra_pin": "A004948884I",
    "last_name": "M",
    "middle_name": "Kimutai",
    "mobile_number": "254769259440",
    "monthly_income": 240000.0,
    "national_id": "288377466",
    "position": "Developer"
  }, {
    "id": 13,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "m@dmail.com",
    "employer_id": 1,
    "first_name": "M",
    "kra_pin": "233334445",
    "last_name": "N",
    "middle_name": "O",
    "mobile_number": "2345567778",
    "monthly_income": 20000.0,
    "national_id": "302344994",
    "position": "D"
  }, {
    "id": 14,
    "city": "Nairobi",
    "country": "Kenya",
    "email_address": "edwinloman@gmail.com",
    "employer_id": 1,
    "first_name": "Edwin",
    "kra_pin": "A002933393I",
    "last_name": "Kiploman",
    "middle_name": "Cheruiyot",
    "mobile_number": "254728445332",
    "monthly_income": 500000.0,
    "national_id": "320011554",
    "position": "Software Engineer"
  }];
  public employeesSettings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      // custom: [
      //   // {name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;&nbsp;'},
      //   // { name: 'editrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
      // ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      // created_on: {
      //   title: 'Applied on',
      //   type: 'string',
      //   valuePrepareFunction: (date) => {
      //     const raw = new Date(date);
      //     const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
      //     return formatted;
      //   },
      // },
      product_id: {
        title: '#',
        type: 'text',
        filter: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        }
      },
      first_name: {
        title: 'Employee Names',
        type: 'string',
        valuePrepareFunction: (value, row, cell) => {
          return `${row.first_name} ${row.middle_name} ${row.last_name}`;
        }
      },
      // last_name: {
      //     title: 'Last Name',
      //     type: 'string'
      // },
      email_address: {
        title: 'Email',
        type: 'string'
      },
      // amount: {
      //   title: 'Amount',
      //   type: 'string'
      // },
      mobile_number: {
        title: 'Tel',
        type: 'string'
      },
      national_id: {
        title: 'National ID',
        type: 'string'
      },
      monthly_income: {
        title: 'Monthly Income',
        type: 'string'
      },
      //
      // loan_limit: {
      //     title: 'Loan Limit',
      //     type: 'string'
      // },

      // disbursement_status: {
      //   title: 'Disbursed',
      //   type: 'string'
      // },


    },
    pager: {
      display: true,
      perPage: 20
    }
  };
  employeesDataSet: any;
  // For employees table

  // For loans table
  public loansTempData: any = [
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
  public loansSettings = {
    selectMode: 'single',  // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        // {name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;'}
         ],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {

      customerId: {
        title: '#',
        type: 'string',
        filter: false
      },
      customerName: {
        title: 'Employee Name',
        type: 'string'

      },

      processingFee: {
        title: 'Processing Fee',
        type: 'string',
        valuePrepareFunction: (value) => {
          const formatted = this.currencyPipe.transform(value, 'Kes.');
          return formatted;
        },
      },

      totalDisbursed: {
        title: 'Total Disbursed',
        type: 'string',
        valuePrepareFunction: (value) => {
          const formatted = this.currencyPipe.transform(value, 'Kes.');
          return formatted;
        },
      },
      loanAmount: {
        title: 'Loan Amount',
        type: 'string',
        valuePrepareFunction: (value) => {
          const formatted = this.currencyPipe.transform(value, 'Kes.');
          return formatted;
        },
      },

      status: {
        title: 'Loan Status',
        type: 'html',
        filter: false,
        valuePrepareFunction: (value) => {
          let formatted;
          if (value) {
            formatted = '<span class="badge badge-success" style="text-align: center;">Success</span>';
          } else {
            formatted = '<span class="badge badge-danger" style="text-align: center;">Failed</span>';
          }
          return formatted;
        },
      },
      appliedOn: {
        title: 'Date',
        filter: false,
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
        },
      },
    },
    pager: {
      total: 100,
      display: true,
      perPage: 15
    }
  };
  loansDataSet: any;
  // For loans table


  constructor(private _activatedRoute: ActivatedRoute,
              private _httpService: HttpService, private modalService: NgbModal,
              public datePipe: DatePipe, public toastrService: ToastrService,
              public router: Router,
              private currencyPipe: CurrencyPipe
    ) { }
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {

      if (typeof params.id !== 'undefined') {
        this.company_id = params.id;
      }
    });
    this.userType = this._httpService.Username();
    this.loadValuer();
    this.loadOrgLoans();

    this.loadEmployeeLoans();
    this.loadLoansTable();
  }
  private loadValuer(): void {
    this._httpService.model.entity = 'organization';
    this._httpService.model.where_clause = 'id';
    this._httpService.model.where_value = this.company_id;
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {

        this.company = result.list[0];
        console.log(this.company);


        this._httpService.scoresGet(`organization/loan/config/${this.company.id}`).subscribe(
            data => {

              this.loanConfig = data.data;
              console.log('this.loanConfig');
              console.log(this.loanConfig);
            },
            error => {
            },
            complete => {
              this.isLoaded = true;
              // this.loadData();
            }
        );


      },
      error => {
      },
      complete => {
        this.isLoaded = true;



        // this.loadData();
      }
    );



  }
  loadOrgLoans(): void {
    this._httpService.model.entity = 'loans';
    this._httpService.model.where_clause = 'organization_id';
    this._httpService.model.where_value = this.company_id;
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {

        this.company_loans = result.list;
        console.log(this.company_loans);
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
        // this.loadData();
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
     this.modalRef = this.modalService.open(CreateAdminDialogComponent);
     this.modalRef.componentInstance.title = 'Add Admin User';
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

    this.employeesDataSet = this.employeesTempData;

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

  private loadLoansTable() {
    // this.isLoaded = false;

    this.loansDataSet = this.loansTempData;

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
