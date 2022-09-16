import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-claim-under-inspection',
  templateUrl: './view-claim-under-inspection.component.html',
  styleUrls: ['./view-claim-under-inspection.component.scss']
})
export class ViewClaimUnderInspectionComponent implements OnInit {
  private application_id: any;
  public application: any;
  public isLoaded: boolean = false;
  public form: FormGroup;
  public image;
  public inspectors;

  constructor(private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService, public fb: FormBuilder,
    private modalService: NgbModal, public toastrService: ToastrService, public router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.application_id = params['id'];
      }
      this.form = this.fb.group({
        police_absract_check: [0, Validators.compose([Validators.nullValidator])],
        inspection_check: [0, Validators.compose([Validators.nullValidator])],
        medical_check: [0, Validators.compose([Validators.nullValidator])],
        image_check: [0, Validators.compose([Validators.nullValidator])],
        inspection_comment: ['', Validators.compose([Validators.required])]
      });
    });
    this.loadApplication();
    this.loadInspectors();
  }
  private loadApplication(): void {
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
        this.isLoaded = true;
      }
    );
  }

  public submitData(): void {
    const model = {
      "client_claim_id": Number(this.application_id),
      "police_absract_check": this.form.value.police_absract_check ? 1 : 0,
      "inspection_check": this.form.value.inspection_check ? 1 : 0,
      "medical_check": this.form.value.medical_check ? 1 : 0,
      "image_check": this.form.value.image_check ? 1 : 0,
      "inspection_comment": this.form.value.inspection_comment,
      "transaction_type": "30024"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if (result.response.response_code == '00') {
          this.toastrService.success('Forwarded to approver!', 'Success!');
          this.router.navigateByUrl('motor/claims/pending');
        } else {
          this.toastrService.error('Failed to forward!', 'Failed!');
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

}
