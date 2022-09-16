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
  selector: 'app-list-comprehensive-applications',
  templateUrl: './list-comprehensive-applications.component.html',
  styleUrls: ['./list-comprehensive-applications.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ListComprehensiveApplicationsComponent implements OnInit {


  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;
  public status: string = 'VALUED';

  public products: any;
  public categories: any;
  public subcategories: any;
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
        // applied_product_id: {
        //   title: 'Application ID',
        //   type: 'string'
        // },
        channel: {
          title: 'Channel',
          type: 'string'
        },
        // product_id: {
        //   title: 'Product',
        //   type: 'string',
        //   valuePrepareFunction: (data) => {
        //     return this.loadProductName(data);
        //   },
        // },
        // category_id: {
        //   title: 'Category',
        //   type: 'string',
        //   valuePrepareFunction: (data) => {
        //     return this.loadCategoryName(data);
        //   },
        // },
        sub_category_id: {
          title: 'Intended Use',
          type: 'string',
          valuePrepareFunction: (data) => {
            return this.loadSubCategoryName(data);
          },
        },
        full_name: {
          title: 'Applicant',
          type: 'string'
        },
        mobile_number: {
          title: 'Phone No',
          type: 'string'
        },
        car_reg_no: {
          title: 'Reg No',
          type: 'string'
        },
        car_make: {
          title: 'Car Make',
          type: 'string'
        },
        car_model: {
          title: 'Car Model',
          type: 'string'
        },
        yom: {
          title: 'Year',
          type: 'string'
        },
        current_value: {
          title: 'Self Valuation',
          type: 'string',
          valuePrepareFunction: (value) => {
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
        },

        // type_of_vehicle: {
        //   title: 'Vehicle Type',
        //   type: 'string'
        // },
        // number_of_passengers: {
        //   title: 'Passengers',
        //   type: 'string'
        // },
        ntsa_online: {
          title: 'NTSA System Status',
          type: 'custom',
          renderComponent: LabelOnlineComponent
        },
        ntsa_correct: {
          title: 'NTSA Check',
          type: 'custom',
          renderComponent: LabelPassedComponent
        },
        iprs_online: {
          title: 'IPRS System Status',
          type: 'custom',
          renderComponent: LabelOnlineComponent
        },

        iprs_correct: {
          title: 'IPRS Check',
          type: 'custom',
          renderComponent: LabelPassedComponent
        },
        // valuation_status: {
        //   title: 'Status',
        //   type: 'string'
        // },
        esb_timestamp: {
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
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
    this.loadData();
  }


  private loadData(): any {
    this.isLoaded = false;
    const model = {
      // "username": localStorage.getItem('username'),
      // "entity": "applied_product",
      // "where_clause": "",
      // "where_value": "",
      // "transaction_type": "100001"

      "username": "",
      "entity": "applied_product",
      "where_clause": "valuation_status",
      "where_value": this.status,
      "transaction_type": "10071",
      "order_by": "desc"
    };
    this._httpService.post('', model).subscribe(
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




  private loadProducts(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "product",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.products = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  private loadCategories(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "category",
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
  private loadSubCategories(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "sub_category",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.subcategories = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

  public loadProductName(id: any): string {
    const product = this.products.filter((rec) => {
      return String(rec.product_id) === String(id);
    });
    return product[0].product_name;
  }
  public loadCategoryName(id: any): string {
    const category = this.categories.filter((rec) => {
      return String(rec.category_id) === String(id);
    });
    return category[0].category_name;
  }
  public loadSubCategoryName(id: any): string {
    const data = this.subcategories.filter((rec) => {
      return String(rec.sub_category_id) === String(id);
    });
    return data[0].sub_category_name;
  }

  public toggleStatus(status:  string): void {
    this.status = status;
    this.loadData();
  }
}
