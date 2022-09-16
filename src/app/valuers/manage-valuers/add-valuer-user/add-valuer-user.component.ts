import { HttpService } from 'src/app/shared/services/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-valuer-user',
  templateUrl: './add-valuer-user.component.html',
  styleUrls: ['./add-valuer-user.component.scss']
})
export class AddValuerUserComponent implements OnInit {
  @Input() title;
  @Input() formData;
  @Input() valuer;

  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }


  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      kra_pin: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      position: ['', [Validators.required]],
      monthlyIncome: ['', [Validators.required]],
      loanLimit: ['', [Validators.required]],

    });
    if (this.formData) {
      this.form.removeControl('password');
    }
  }

  public submitData(): void {
    if (this.formData) {
     this.saveChanges();
    } else {
      this.createRecord();
    }
    this.loading = true;
  }


  private createRecord(): any {
    console.log('creating');
    // this.form.value.username = localStorage.getItem('username');
    // this.form.value.transaction_type = '10050';
    // this.form.value.valuer_id = String(this.valuer.valuer_id);

    let model = this.form.value;
    model.employerId = 1,
    model.loanLimit = 200,

    this._httpService.scoresPost('employer/create/employee', model).subscribe(

      result => {
        // if (result.status === 200) {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
          this.loading = false;
        // } else {
        //   this.toastrService.error('Failed to create!', 'Failed!');
        //   this.loading = false;
        // }
      }

    );
  }
  private saveChanges(): any {

    let model = this.form.value;
    model.employerId = 1,
    model.loanLimit = 200,

        this._httpService.scoresPost('employer/create/employee', model).subscribe(

        result => {
          // if (result.status === 200) {
            this.toastrService.success('Record created successfully!', 'Created Successfully!');
            this.activeModal.close('success');
            this.loading = false;
          // } else {
          //   this.toastrService.error('Failed to create!', 'Failed!');
          //   this.loading = false;
          // }
        }
    );
  }


  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

}
