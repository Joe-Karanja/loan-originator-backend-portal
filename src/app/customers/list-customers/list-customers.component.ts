import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewPoliciesComponent } from '../view-policies/view-policies.component';
import { ViewClaimsComponent } from '../view-claims/view-claims.component';
import { ViewCustomerInvestmentsComponent } from '../view-customer-investments/view-customer-investments.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [DatePipe]
})
export class ListCustomersComponent implements OnInit {


  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;

  public products: any;
  public categories: any;
  public subcategories: any;
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
          // { name: 'viewPolicies', title: '<i class="fa fa-eye"> Policies</i>&nbsp' },
          // { name: 'viewClaims', title: '<i class="fa fa-eye red"> Claims</i>&nbsp' },
          // { name: 'viewInvestments', title: '<i class="fa fa-eye red"> Investments</i>&nbsp' }
        ],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
        first_name: {
          title: 'First Name',
          type: 'string'
        }, 
        // middle_name: {
        //   title: 'Middle Name',
        //   type: 'string'
        // },
        last_name: {
          title: 'Last Name',
          type: 'string'
        },
        mobile_number: {
          title: 'Phone No',
          type: 'string'
        },
        id_number: {
          title: 'ID No',
          type: 'string'
        },
        // kra_pin: {
        //   title: 'KRA Pin',
        //   type: 'string'
        // },
        // date_of_birth: {
        //   title: 'D.O.B',
        //   type: 'string'
        // },
        // gender: {
        //   title: 'Gender',
        //   type: 'string'
        // },
       
        esb_timestamp: {
          title: 'Registration Date',
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
    this.loadData();
  }


  private loadData(): any {
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
        this.dataSet = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

  public viewPolicies(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(ViewPoliciesComponent);
    this.modalRef.componentInstance.title = 'Policies belonging to: ' + this.formData.first_name + ' ' + this.formData.last_name;
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public viewClaims(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(ViewClaimsComponent);
    this.modalRef.componentInstance.title = 'Claims belonging to: ' + this.formData.first_name + ' ' + this.formData.last_name;
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public viewInvestments(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(ViewCustomerInvestmentsComponent);
    this.modalRef.componentInstance.title = 'Investments belonging to: ' + this.formData.first_name + ' ' + this.formData.last_name;
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
      case 'viewPolicies':
        this.viewPolicies(event.data);
        break;
        case 'viewClaims':
          this.viewClaims(event.data);
          break;
          case 'viewInvestments':
            this.viewInvestments(event.data);
            break;
      default:
        break;
    }
  }
  private viewRecord(data: any) {
    this.router.navigate(['/motor/applications', data.applied_product_id]);
  }
}
