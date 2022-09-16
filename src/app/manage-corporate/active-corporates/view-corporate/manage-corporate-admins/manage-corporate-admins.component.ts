
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-corporate-admins',
  templateUrl: './manage-corporate-admins.component.html',
  styleUrls: ['./manage-corporate-admins.component.scss'],
  providers: [DatePipe, CurrencyPipe],
})
export class ManageCorporateAdminsComponent implements OnInit {
  @Input() company_id;
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
      username: {
        title: 'Username',
        type: 'string'
      },
      created_at: {
        title: 'Created On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy HH:mm');
          return formatted;
        },
      },
      last_login: {
        title: 'Last Login',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy HH:mm');
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
  company: any;
  company_loans: any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService,
    public router: Router,
    private currencyPipe: CurrencyPipe
  ) { }
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {

      if (typeof params['id'] !== 'undefined') {
        this.company_id = params['id'];
      }
    });
    this.userType = this._httpService.Username()
    this.loadData();
  }


  private loadData(): any {
    this.isLoaded = false;
    this._httpService.model.entity = 'company_login';
    this._httpService.model.where_clause = 'org_id';
    this._httpService.model.where_value = this.company_id;
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
    //  this.modalRef = this.modalService.open(CreateAdminDialogComponent);
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
    console.log('formData');
    console.log(formData);
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

}
