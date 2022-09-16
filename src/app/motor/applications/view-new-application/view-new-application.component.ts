import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-new-application',
  templateUrl: './view-new-application.component.html',
  styleUrls: ['./view-new-application.component.scss']
})
export class ViewNewApplicationComponent implements OnInit {
  public benefits;
  private application_id: any;
  public application: any;
  public isLoaded: boolean = false;
  public form: FormGroup;
  constructor(private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService, public fb: FormBuilder,
    private modalService: NgbModal, public toastrService: ToastrService, public router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.application_id = params['id'];
      }
      this.form = this.fb.group({
        premium_amount: ['', [Validators.required]]
      });
    });
    this.loadBenefits();
    this.loadApplication();
  }
  private loadApplication(): void {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "applied_product",
      "where_clause": "applied_product_id",
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
        this.isLoaded = true;
      }
    );
  }

  private loadBenefits(): void {
    this.isLoaded = false;
    const model = {
      "applied_product_id": String(this.application_id),
      "transaction_type": "7400"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.benefits = result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

  public submitData(): void {
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "applied_product",
      "where_clause": "applied_product_id",
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
        this.isLoaded = true;
      }
    );
  }

}
