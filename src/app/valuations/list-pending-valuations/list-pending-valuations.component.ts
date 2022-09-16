import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-pending-valuations',
  templateUrl: './list-pending-valuations.component.html',
  styleUrls: ['./list-pending-valuations.component.scss'],
  providers: [DatePipe]
})
export class ListPendingValuationsComponent implements OnInit {
  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;

  public products: any;
  public categories: any;
  public subcategories: any;
  public ngOnChanges() {
  }
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
          // { name: 'viewRecord', title: '<i class="fa fa-eye text-center mr-2"></i>View &nbsp;&nbsp;' },
          { name: 'editRecord', title: '<i class="fa fa-pencil">Value now</i>&nbsp;&nbsp;' },
],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
        customer_name: {
          title: 'Applicant',
          type: 'string'
        },
        customer_mobile_number: {
          title: 'Phone No',
          type: 'string'
        },
        customer_email_address: {
          title: 'Email',
          type: 'string'
        },
        reg_no: {
          title: 'Car Reg No',
          type: 'string'
        },
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
    // this.loadProducts();
    // this.loadCategories();
    // this.loadSubCategories();
    this.loadData();
  }


  private loadData(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "valuation",
      "where_clause": "valuer_id",
      "where_value": String(localStorage.getItem('valuer_id')),
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.dataSet = result.list.filter(rec => {
          return rec.valuation_status === 'FORWARDED_TO_VALUER';
        });
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
    //    this.viewRecord(event.data);
        break;
      case 'deleteRecord':
        this.onDeleteConfirm(event);
        break;
      case 'editRecord':
        this.doValuation(event.data);
        break;
      default:
        break;
    }
  }


  public doValuation(data: any): void {
    this.router.navigate(['valuations', data.valuation_id]);
  }
}
