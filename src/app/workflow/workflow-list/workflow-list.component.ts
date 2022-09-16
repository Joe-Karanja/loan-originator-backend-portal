import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { LabelBooleanComponent } from 'src/app/shared/components/label-boolean/label-boolean.component';


@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
  providers: [DatePipe]
})
export class WorkflowListComponent implements OnInit {


  public isLoaded = false;
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
      delete: true,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye text-center mr-2"></i>View ' },
      ],
      position: 'right'
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {
      name: {
        title: 'Workflow Name',
        type: 'string'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      is_active: {
        title: 'Is Active',
        type: 'custom',
        renderComponent: LabelBooleanComponent
      },
      created_at: {
        title: 'Created On',
        type: 'string',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        },
      },
    },
    pager: {
      display: true,
      perPage: 5
    }
  };
  dataSet: any;
  constructor(private _httpService: HttpService, private modalService: NgbModal,
    public datePipe: DatePipe, public toastrService: ToastrService, public router: Router) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this._httpService.model.entity = 'valuer';
    this._httpService.model.where_clause = '';
    this._httpService.model.where_value = '';
    this._httpService.model.transaction_type = '10071';

    this._httpService.get('http://localhost:3333/workflow/workflow').subscribe(
      result => {
        this.dataSet = result.data;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  public openModal(parentData: any) {
    this.modalRef = this.modalService.open(AddWorkflowComponent);
    this.modalRef.componentInstance.title = 'Add Workflow';
    this.modalRef.componentInstance.parentData = '';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public editRecord(formData: any) {
    // this.modalRef = this.modalService.open(CreateAssessmentComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'Edit Workflow: ' + formData.username;
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadData();
      }
    }, (reason) => {
    });
  }
  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this._httpService.delete('profile/' + event.data.id).subscribe(
        result => {
          if (result.response_code === 200) {
            event.confirm.resolve();
            this.toastrService.success(event.data.id, 'Deleted!');
          } else {
            this.toastrService.error(event.data.id, 'Failed to Delete!');
          }
        }
      );
    } else {
      event.confirm.reject();
    }
  }


  onCustomAction(event) {
    switch (event.action) {
      case 'viewrecord':
        this.viewCompany(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }
  private viewCompany(data: any): void {
    this.router.navigate(['valuers', data.valuer_id]);
  }


}
