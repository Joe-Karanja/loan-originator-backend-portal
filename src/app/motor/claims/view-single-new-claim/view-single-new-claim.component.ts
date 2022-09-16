import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-view-single-new-claim',
  templateUrl: './view-single-new-claim.component.html',
  styleUrls: ['./view-single-new-claim.component.scss']
})
export class ViewSingleNewClaimComponent implements OnInit {
  private application_id: any;
  public application: any;
  public isLoaded: boolean = false;
   public form: FormGroup;
   public selectGarageForm: FormGroup;
   public assessmentForm: FormGroup;
   public invoiceForm: FormGroup;
   public image;
   public inspectors;
   public garages;

 constructor(private _activatedRoute: ActivatedRoute, 
  private _httpService: HttpService, public fb: FormBuilder, public globalService: GlobalService,
  private modalService: NgbModal, public toastrService: ToastrService, public router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.application_id = params['id'];
      }
      this.form = this.fb.group({
        staff_id: ['', [Validators.required]]
      });
  
      this.selectGarageForm = this.fb.group({
        garage_id: ['', [Validators.required]]
      });

      this.assessmentForm = this.fb.group({
        inspection_report: ['', [Validators.nullValidator]],
        action: ['', [Validators.required]],
        sub_action: ['', [Validators.nullValidator]],
        narration: ['', [Validators.required]],
      
      });

      this.invoiceForm = this.fb.group({
        invoice_no: ['', [Validators.required]],
        invoice_amount: ['', [Validators.required]]
      
      });
    });
    this.loadClaimDetails();
    this.loadInspectors();
    this.loadGarages();
  }
  private loadClaimDetails(): void {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "client_claim",
      "where_clause": "client_claim_id",
      "where_value": this.application_id,
      "transaction_type": "10071"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.application = result.list[0];
      },
      error => {
      },
      complete => {
        this.image = JSON.parse(this.application.image_string);
        this.image = this.image.map((rec) => {
          rec.path = this.globalService.resourceHost + rec.image;
          return rec
        });
        console.log('Da')
        console.log(this.image);
        this.isLoaded = true;
      }
    );
  }
  
  public submitData(): void {
    console.log(this.form.value);
    const model = {
      "username": localStorage.getItem('username'),
      "client_claim_id": Number(this.application_id),
      "staff_id": Number(this.form.value.staff_id),
      "transaction_type": "30023"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if(result.response.response_code == '00'){
          this.toastrService.success('Assigned to supervisor!', 'Success!');
          this.router.navigateByUrl('motor/comprehensive/claims/all');
        } else{
        this.toastrService.error('Failed to assign to supervisor!', 'Failed!');
        }
      },
      error => {
      },
      complete => {

      }
    );
  }

  public assignGarage(): void {
    const model = {
      "username": localStorage.getItem('username'),
      "client_claim_id": Number(this.application_id),
      "garage_id": Number(this.selectGarageForm.value.garage_id),
      "transaction_type": "990004"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if(result.response.response_code == '00'){
          this.toastrService.success('Assigned to garage!', 'Success!');
          this.router.navigateByUrl('motor/comprehensive/claims/all');
        } else{
        this.toastrService.error('Failed to assign to garage!', 'Failed!');
        }
      },
      error => {
      },
      complete => {

      }
    );
  }

  public loadInspectors(): void {
    this._httpService.model.entity = 'staff';
    this._httpService.model.where_clause = '';
    this._httpService.model.where_value = '';
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {
        this.inspectors = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

  public loadGarages(): void {
    this._httpService.model.entity = 'garage';
    this._httpService.model.where_clause = '';
    this._httpService.model.where_value = '';
    this._httpService.model.transaction_type = '10071';

    this._httpService.post('', this._httpService.model).subscribe(
      result => {
        this.garages = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  public actionChanged(action: string): void {
    console.log(action);
    this.assessmentForm.value.sub_action = action == 'ACCEPTED' ? this.assessmentForm.value.sub_action : '';
  }
  public submitReport(): void {
    const model = {
      "username": localStorage.getItem('username'),
      "client_claim_id": Number(this.application_id),
      "action": this.assessmentForm.value.action,
      "sub_action": this.assessmentForm.value.sub_action,
      "narration": this.assessmentForm.value.narration,
      "transaction_type": "30021"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if(result.response.response_code == '00'){
          this.toastrService.success('Report submitted!', 'Success!');
          this.router.navigateByUrl('motor/comprehensive/claims/all');
        } else{
        this.toastrService.error('Failed to submit report!', 'Failed!');
        }
      },
      error => {
      },
      complete => {

      }
    );
  }


public markAsRepaired(): void {
  const model = {
    "username": localStorage.getItem('username'),
    "client_claim_id": Number(this.application_id),
    "claim_status": "REPAIRED",
    "transaction_type": "990005"
  };
  this._httpService.post('', model).subscribe(
    result => {
      if(result.response.response_code == '00'){
        this.toastrService.success('Marked as repaired!', 'Success!');
        this.router.navigateByUrl('motor/comprehensive/claims/all');
      } else{
      this.toastrService.error('Failed to mark as repair!', 'Failed!');
      }
    },
    error => {
    },
    complete => {

    }
  );
}

public submitInvoice(): void {
  const model = {
    "username": localStorage.getItem('username'),
    "client_claim_id": Number(this.application_id),
    "invoice_amount": Number(this.invoiceForm.value.invoice_amount),
    "invoice_no": this.invoiceForm.value.invoice_no,
    "transaction_type": "990006"
  };
  this._httpService.post('', model).subscribe(
    result => {
      if(result.response.response_code == '00'){
        this.toastrService.success('Marked as repaired!', 'Success!');
        this.router.navigateByUrl('motor/comprehensive/claims/all');
      } else{
      this.toastrService.error('Failed to mark as repair!', 'Failed!');
      }
    },
    error => {
    },
    complete => {

    }
  );
}

public markAsPaid(): void {
  const model = {
    "username": localStorage.getItem('username'),
    "client_claim_id": Number(this.application_id),
    "claim_status": "COMPLETE",
    "transaction_type": "990005"
  };
  this._httpService.post('', model).subscribe(
    result => {
      if(result.response.response_code == '00'){
        this.toastrService.success('Payment has been completed!', 'Success!');
        this.router.navigateByUrl('motor/comprehensive/claims/all');
      } else{
      this.toastrService.error('Failed to complete payment!', 'Failed!');
      }
    },
    error => {
    },
    complete => {

    }
  );
}
}
