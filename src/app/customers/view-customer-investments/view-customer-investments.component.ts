import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-view-customer-investments',
  templateUrl: './view-customer-investments.component.html',
  styleUrls: ['./view-customer-investments.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ViewCustomerInvestmentsComponent implements OnInit {


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
    private _httpService: HttpService,  public datePipe: DatePipe,
    public toastrService: ToastrService) { }
  ngOnInit() {
    this.loadCategories();
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
        created_at: {
          title: 'Application Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            const raw = new Date(date);
            const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
            return formatted;
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
  }
  private loadData(): any {

    const model = {
      "username": "",
      "entity": "applied_investment",
      "where_clause": "customer_id",
      "where_value": String(this.formData.customer_id),
      "transaction_type": "10071"
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



}
