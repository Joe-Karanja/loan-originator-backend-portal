import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-completed-valuations',
  templateUrl: './view-completed-valuations.component.html',
  styleUrls: ['./view-completed-valuations.component.scss']
})
export class ViewCompletedValuationsComponent implements OnInit {
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
    this.form = this.fb.group({
      premium_amount: ['', Validators.compose([Validators.required])],
      log_book_check: [0, Validators.compose([Validators.nullValidator])],
      driving_licence_check: [0, Validators.compose([Validators.nullValidator])],
      valuer_report_check: [0, Validators.compose([Validators.nullValidator])],
      images_check: [0, Validators.compose([Validators.nullValidator])],
      ntsa_check: [0, Validators.compose([Validators.nullValidator])],
      iprs_check: [0, Validators.compose([Validators.nullValidator])],
      comment: ['', Validators.compose([Validators.required])]
    });
    this.loadBenefits();
    this.loadApplication();
  }
  private loadApplication(): void {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "product",
      "where_clause": "",
      "where_value": "",
      "transaction_type": "100001"
    };
    this._httpService.post('', model).subscribe(
      result => {
        let completedValuation = result.list.valuation_completed;
        this.application = completedValuation.filter((record) => {
          return String(record.applied_product_id) == String(this.application_id);
        });
        this.application = this.application[0];
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

  public submit(action: string): void {
    const model = {
      "username": localStorage.getItem('username'),
      "applied_product_id": String(this.application_id),
      "premium_amount": this.form.value.premium_amount,
      "log_book_check": this.form.value.log_book_check ? 1 : 0,
      "driving_licence_check": this.form.value.driving_licence_check ? 1 : 0,
      "valuer_report_check": this.form.value.valuer_report_check ? 1 : 0,
      "images_check": this.form.value.images_check ? 1 : 0,
      "ntsa_check": this.form.value.ntsa_check  ? 1 : 0,
      "iprs_check": this.form.value.iprs_check  ? 1 : 0,
      "comment": this.form.value.comment,
      "action": action,
      "transaction_type": "30000"
    };
    this._httpService.post('', model).subscribe(
      result => {
        this.router.navigate(['/motor/valuations/completed']);
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }

}
