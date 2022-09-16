import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-single-claim',
  templateUrl: './view-single-claim.component.html',
  styleUrls: ['./view-single-claim.component.scss']
})
export class ViewSingleClaimComponent implements OnInit {
  private application_id: any;
  public application: any;
  public isLoaded: boolean = false;
   public form: FormGroup;
   public image;
 constructor(private _activatedRoute: ActivatedRoute, 
  private _httpService: HttpService, public fb: FormBuilder,
  private modalService: NgbModal, public toastrService: ToastrService, public router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.application_id = params['id'];
      }
      this.form = this.fb.group({
        settlement_amount: ['', [Validators.required]]
      });
    });
    this.loadApplication();
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
        console.log(this.image);
        this.isLoaded = true;
      }
    );
  }
  
  public submitData(): void {
    const model = {
      "username": localStorage.getItem('username'),
      "client_claim_id": Number(this.application_id),
      "claim_status": "APPROVED",
      "settlement_amount": this.form.value.settlement_amount,
      "status_description": "Has been approved",
      "transaction_type": "30021"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if(result.response.response_code == '00'){
          this.toastrService.success('Valuation completed successfully!', 'Success!');
          this.router.navigateByUrl('valuations/valued');
        } else{
        this.toastrService.error('Failed to valuate!', 'Failed!');
        }
      },
      error => {
      },
      complete => {

      }
    );
  }
}
