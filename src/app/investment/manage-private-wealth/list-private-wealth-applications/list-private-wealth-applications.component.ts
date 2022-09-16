import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelOnlineComponent } from 'src/app/shared/components/label-online/label-online.component';
import { LabelPassedComponent } from 'src/app/shared/components/label-passed/label-passed.component';



@Component({
  selector: 'app-list-private-wealth-applications',
  templateUrl: './list-private-wealth-applications.component.html',
  styleUrls: ['./list-private-wealth-applications.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ListPrivateWealthApplicationsComponent implements OnInit {



  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;
  public status: string = 'PENDING';

  public customers: any;
  public categories: any;
  public ngOnChanges() {}
  constructor(config: NgbModalConfig, private _httpService: HttpService,
    public currencyPipe: CurrencyPipe,
    private modalService: NgbModal, private router: Router,
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
          { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;' }],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
        created_at: {
          title: 'Application Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            const raw = new Date(date);
            const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
            return formatted;
          },
        },
        customer_id: {
          title: 'Customer',
          type: 'string',
          valuePrepareFunction: (value) => {
            return this.getCustomerName(value);
          },
        },
        category_id: {
          title: 'Category',
          type: 'string',
          valuePrepareFunction: (value) => {
            return this.getCategoryName(value);
          },
        },
        investment_value: {
          title: 'Investment Value',
          type: 'string',
          valuePrepareFunction: (value) => {
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
        },
        management_value: {
          title: 'Management Fee',
          type: 'string',
          valuePrepareFunction: (value) => {
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
        },
        initial_fee_value: {
          title: 'Initial Fee',
          type: 'string',
          valuePrepareFunction: (value) => {
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
        },
        maturity: {
          title: 'Maturity (Months)',
          type: 'string'
        },
        benefit_value: {
          title: 'Return Value',
          type: 'string',
          valuePrepareFunction: (value) => {
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
        },


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
  this.loadCustomers();
  this.loadCategories();
  }


  private loadCustomers(): any {
    this.isLoaded = false;
    const model = {
      "username": "",
      "entity": "customer",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.customers = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  public openModal(formData) {
    this.formData = formData;
    //  this.modalRef = this.modalService.open(TenantAddComponent);
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

  private loadData(): any {
    this.isLoaded = false;
    const model = {
      "username": "",
      "entity": "applied_investment",
      "where_clause": "status",
      "where_value": this.status,
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.dataSet = result.list.filter((rec) => {
          return Number(rec.product_id) == 3;
        });
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
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
  private viewRecord(data: any) {
    this.router.navigate(['/motor/applications', data.applied_product_id]);
  }

  private loadCategories(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "investment_category",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.categories = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

  public getCategoryName(id: any): string {
    const category = this.categories.filter((rec) => {
      return String(rec.category_id) === String(id);
    });
    return category[0].category_name;
  }
  public getCustomerName(id: any): string {
    const data = this.customers.filter((rec) => {
      return String(rec.customer_id) === String(id);
    });
    return data[0].first_name + ' '+  data[0].last_name;
  }

  public toggleStatus(status:  string): void {
    this.status = status;
    this.loadData();
  }

}
