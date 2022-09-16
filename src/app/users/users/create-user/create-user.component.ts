import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { HttpService } from 'src/app/shared/services/http.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @Input() title;
  @Input() formData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  public assignedProfilesModel: number[] = [];
  public thirdControlSettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'checkboxes',
      buttonClasses: 'btn btn-secondary btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true,
      showCheckAll: true,
      showUncheckAll: true
  };
  public thirdControlTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      searchPlaceholder: 'Find...',
      defaultTitle: 'Select Item(s)',
      allSelected: 'All selected',
  };
  public profiles: IMultiSelectOption[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private _httpService: HttpService,
    public toastrService: ToastrService) { }
  ngOnInit() {
    this.form = this.fb.group({
      email_address: [this.formData ? this.formData.email_address : '', [Validators.required, Validators.email]],
      first_name: [this.formData ? this.formData.first_name : '', [Validators.nullValidator]],
      middle_name: [this.formData ? this.formData.middle_name : '', [Validators.nullValidator]],
      last_name: [this.formData ? this.formData.last_name : '', [Validators.nullValidator]],
      mobile_number: [this.formData ? this.formData.mobile_number : '', [Validators.nullValidator]],
      username: [this.formData ? this.formData.username : '', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
    if(this.formData){
      this.form.removeControl('password');
      this.form.removeControl('confirm_password');
    }
  }
  public loadProfiles(): void {

    this._httpService.get('profiles').subscribe(
      result => {
        if (result.response_code === 200) {
          this.profiles = result.data;
          this.profiles = result.data.map(obj => {
           obj.name = obj.profile_name;
            return obj;
          });
        }
      }
    );
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
    this.form.value.transaction_type = '10001';
    this._httpService.post('', this.form.value).subscribe(
      result => {
        if (result.response.response_code === '00') {
          this.toastrService.success('Record created successfully!', 'Created Successfully!');
          this.activeModal.close('success');
        } else {
          this.toastrService.error('Failed to create!', 'Failed!');
        }
      },
      error => {
      },
      complete => {
        this.loading = false;
      }

    );
  }
  private saveChanges(): any {
    this._httpService.put('user/' + this.formData.id, this.form.value).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCES_CODE) {
          this.toastrService.success('Changes saved successfully!', 'Saved Changes!');
          this.activeModal.close('success');
        } else {
          this._httpService.handleErrorsFromServer(result.errors);
        }
      },
      error => {
        this.loading = false;
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
