import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';
import { TenantLanguagesAddComponent } from '../tenant-languages-add/tenant-languages-add.component';

@Component({
  selector: 'app-tenant-languages-list',
  templateUrl: './tenant-languages-list.component.html',
  styleUrls: ['./tenant-languages-list.component.scss'],
  providers: [DatePipe]
})
export class TenantLanguagesListComponent implements OnInit {
  @Input() parentData;
  public formData;
  public modalRef: NgbModalRef;
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
      { name: 'editRecord', title: '<i class="fa fa-pencil"></i>&nbsp;&nbsp;' },
      { name: 'deleteRecord', title: '<i class="fa fa-trash"></i>&nbsp;&nbsp;' }],
      position: 'right' // left|right
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      language: {
        title: 'Language',
        type: 'string'
      },
      iso_code: {
        title: 'ISO CODE',
        type: 'string'
      },
        is_default: {
          title: 'Is Default',
          type: 'custom',
          renderComponent: LabelBooleanComponent
      },
      created_on: {
      title: 'Created On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
      },
      last_update_on: {
           title: 'Last Updated On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy hh:mm:ss');
          return formatted;
        },
      },
       last_update_by: {
        title: 'Last Updated By',
        type: 'string'
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };
  dataSet: any;
  constructor(config: NgbModalConfig, private _httpService: HttpService, private modalService: NgbModal, private router: Router,
    public datePipe: DatePipe, public toastrService: ToastrService) {
       // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    }
  ngOnInit() {
    console.log();
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('setting/' + this.parentData.tenant_name + '/languages').subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.dataSet = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public openModal(formData) {
    this.formData = formData;
    this.modalRef = this.modalService.open(TenantLanguagesAddComponent);
    if (formData) {
      this.modalRef.componentInstance.title = 'Edit Language ';
    } else {
      this.modalRef.componentInstance.title = 'Add Language';
    }
    this.modalRef.componentInstance.formData = this.formData;
    this.modalRef.componentInstance.parentData = this.parentData;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('setting/' + this.parentData.tenant_name + '/language/' + event.data.id).subscribe(
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

}
