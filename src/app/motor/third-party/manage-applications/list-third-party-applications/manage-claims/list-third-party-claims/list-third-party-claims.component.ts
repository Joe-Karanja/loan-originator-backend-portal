import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelOnlineComponent } from 'src/app/shared/components/label-online/label-online.component';
import { LabelPassedComponent } from 'src/app/shared/components/label-passed/label-passed.component';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';


@Component({
  selector: 'app-list-third-party-claims',
  templateUrl: './list-third-party-claims.component.html',
  styleUrls: ['./list-third-party-claims.component.scss'],
  providers: [DatePipe, CurrencyPipe]
})
export class ListThirdPartyClaimsComponent implements OnInit {

  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;
  public status: string = 'SUBMITTED';

  public products: any;
  public categories: any;
  public subcategories: any;
  public ngOnChanges() {
  }
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
    public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public toastrService: ToastrService) {
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
          { name: 'viewRecord', title: '<i class="fa fa-eye"> view</i>&nbsp;&nbsp;' },
          ],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
        reg_no: {
          title: 'Registration Number',
          type: 'string'
        },
        mobile_number: {
          title: 'Phone No',
          type: 'string'
        },

        policy_number: {
          title: 'Policy No',
          type: 'string'
        },
        date_of_accident: {
          title: 'Accident Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            const raw = new Date(date);
            const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
            return formatted;
          },
        },
        place_of_accident: {
          title: 'Location',
          type: 'string'
        },
        obstruct_no: {
          title: 'OB No',
          type: 'string'
        },
        registered_in_cbs: {
          title: 'In AIMS/SIRIUS',
          type: 'custom',
          renderComponent: LabelBooleanComponent
        },
        valid_claim: {
          title: 'Claim Is Valid',
          type: 'custom',
          renderComponent: LabelBooleanComponent
        },
        invoice_amount: {
          title: 'Invoice Amount',
          type: 'string',
          valuePrepareFunction: (value) => {
            //const raw = new Curr(value);
            const formatted = this.currencyPipe.transform(value, 'Kes.');
            return formatted;
          },
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
    this.loadData();
  }


  private loadData(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "client_claim",
      "where_clause": "claim_status",
      "where_value": this.status,
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.dataSet = result.list.filter((rec) => {
          return rec.claim_status;
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
    this.router.navigate(['motor/claims', data.client_claim_id]);
  }
  public toggleStatus(status:  string): void {
    this.status = status;
    this.loadData();
  }

}
