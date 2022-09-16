import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-view-policies',
  templateUrl: './view-policies.component.html',
  styleUrls: ['./view-policies.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ViewPoliciesComponent implements OnInit {

  @Input() title;
  @Input() formData;
  public dataSet;
  public settings;
  public products: any;
  public categories: any;
  public subcategories: any;
  public isLoaded: boolean = false;
  constructor(
    public activeModal: NgbActiveModal, public currencyPipe: CurrencyPipe,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.loadSubCategories();
    this.loadData();
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

        product_id: {
          title: 'Product',
          type: 'string',
          valuePrepareFunction: (data) => {
            return this.loadProductName(data);
          },
        },
        category_id: {
          title: 'Category',
          type: 'string',
          valuePrepareFunction: (data) => {
            return this.loadCategoryName(data);
          },
        },
        sub_category_id: {
          title: 'Intended Use',
          type: 'string',
          valuePrepareFunction: (data) => {
            return this.loadSubCategoryName(data);
          },
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


        // esb_timestamp: {
        //   title: 'Application Date',
        //   type: 'string',
        //   valuePrepareFunction: (date) => {
        //     const raw = new Date(date);
        //     const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
        //     return formatted;
        //   },
        // },
      },
      pager: {
        total: 100,
        display: true,
        perPage: 10
      }
    };
  }
  private loadData(): any {

    const model = {
      "username": "",
      "entity": "applied_product",
      "where_clause": "policy_active",
      "where_value": 'Y',
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
      }
    );
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

  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }


}
