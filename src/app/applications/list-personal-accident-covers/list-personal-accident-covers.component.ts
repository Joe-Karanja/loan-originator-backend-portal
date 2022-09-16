import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-personal-accident-covers',
  templateUrl: './list-personal-accident-covers.component.html',
  styleUrls: ['./list-personal-accident-covers.component.scss'],
  providers: [DatePipe]
})
export class ListPersonalAccidentCoversComponent implements OnInit {

  public formData;
  public modalRef: NgbModalRef;
  public settings;
  dataSet: any;
  public isLoaded: boolean = false;

  public products: any;
  public categories: any;
  public subcategories: any;
  public ngOnChanges() { }
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
        ],
        position: 'right' // left|right
      },
      delete: {
        deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
        confirmDelete: true
      },
      noDataMessage: 'No data found',
      columns: {
       
        pa_accident_cover_id: {
          title: 'Cover ID',
          type: 'string'
        },
        username: {
          title: 'Applicant',
          type: 'string'
        },
        defects: {
          title: 'Physical Defects',
          type: 'string'
        },
        injuries: {
          title: 'Injuries',
          type: 'string'
        },
        next_of_kin_name: {
          title: 'Next of Kin',
          type: 'string'
        },
        next_of_kin_id: {
          title: 'NOK ID Number',
          type: 'string'
        },
        start_date: {
          title: 'Start Date',
          type: 'string'
        },
        end_date: {
          title: 'End Date',
          type: 'string'
        },
        cover_active: {
          title: 'Cover Is Active',
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
      "entity": "pa_accident_cover",
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
    // this.router.navigate(['applications', data.applied_product_id]);
  }









}



