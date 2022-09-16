import { HttpService } from 'src/app/shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-close-cycle',
  templateUrl: './close-cycle.component.html',
  styleUrls: ['./close-cycle.component.scss']
})
export class CloseCycleComponent implements OnInit {

  @Input() title;
  @Input() formData;
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

    console.log('This is the form data');
    console.log(this.formData);

    this.form = this.fb.group({
      cycleId: [this.formData ? this.formData.cycleId : ''],
    });
  }
  public submitData(): void {
    this.loading = true;
    this._httpService.scoresPost('loan/cycle/close', this.form.value).subscribe(
      result => {
        if (result.status === 200) {
          this.toastrService.success('Cycle Closed successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this.toastrService.error(result.message, 'Error!');
          this.activeModal.close('error');
        }
      },
      error => {
        this.errorMessages = error.error.error_messages;
      },
      complete => {
        this.loading = false;
      }

    );
  }
  public closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

}
