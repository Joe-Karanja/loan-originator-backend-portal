import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-rescue-calls',
  templateUrl: './list-rescue-calls.component.html',
  styleUrls: ['./list-rescue-calls.component.scss'],
  providers: [DatePipe]
})
export class ListRescueCallsComponent implements OnInit {

  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;

  public products: any;
  public categories: any;
  public subcategories: any;
  public ngOnChanges() {}
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
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
          // { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;' }
        ],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {

        twenty_four_seven_id: {
          title: 'ID #',
          type: 'string'
        },
        date_requested: {
          title: 'Date Requested',
          type: 'string',
          // valuePrepareFunction: (date) => {
          //   const raw = new Date(date);
          //   const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          //   return formatted;
          // },
        },
        request: {
          title: 'Request Type',
          type: 'string'
        },
        requested_by: {
          title: 'Requested By',
          type: 'string'
        },
        longitude: {
          title: 'Longitude',
          type: 'string'
        },
        latitude: {
          title: 'Latitude',
          type: 'string'
        },
        location: {
          title: 'Location Name',
          type: 'string'
        },
        rescued_by: {
          title: 'Rescued By',
          type: 'string'
        },
        rescued_time: {
          title: 'Time of rescue',
          type: 'string'
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
  }


  private loadData(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "twenty_four_seven",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "10071"
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
    this.router.navigate(['applications', data.applied_product_id]);
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

}
