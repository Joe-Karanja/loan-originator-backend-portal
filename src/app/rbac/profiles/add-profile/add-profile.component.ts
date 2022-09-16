import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../../shared/http.service';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {
  
  cardTitle: string;
  Disabled = "Disabled";
  edit: boolean;
  errorMessage: string;
  form: FormGroup;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddProfileComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.edit = this.data['editProfile'];
    this.cardTitle = this.edit ? "Edit Profile Details" : "Create a New Profile"
    this.form = this.fb.group({
      name: [this.data.data ? this.data.data.name : '', Validators.compose([Validators.required])],
      remarks: [this.data.data ? this.data.data.remarks : '', Validators.compose([Validators.required])],
      status: [this.data.data ? this.data.data.isActive.toString() : 'false', Validators.compose([Validators.required])]
    });
  }

  //determines error message to return
  

  //creates new profile
  addProfile(): void {
    this.loading = true;
    let statusDet = this.form.value.status == 'true' ? true : false;
    let model = {
      name: this.form.value.name,
      remarks: this.form.value.remarks,
      isActive: statusDet, 
      previousData: {}
    };
    this._httpService.post('api/v1/workflow/add-profile', model).subscribe(res => {
      if (res['status'] === 200) {
        if (res["message"] == "Data staged successfully") {
          this.toastr.success('Profile created, awaiting approval', 'Success!');
        } else {
          this.toastr.success('Profile created', 'Success!');
        }
        this.close();
        this.loading = false;
      } else if (res['status'] === 403) {
        this.errorMessage = this._httpService.loadErrorMessage();
        this.loading = false;
      } else {
        this.toastr.error(res.message, 'Error!');
      }
    })
  }

  //updates profile details
  editProfileDetails(): void {
    let statusDet = this.form.value.status == 'true' ? true : false;
    let model = {
      id: this.data['data']['id'],
      name: this.form.value.name,
      remarks: this.form.value.remarks,
      isActive: statusDet,
      previousData: {
        id: this.data['data']['id'],
        name: this.data['data']['name'],
        remarks: this.data['data']['remarks'],
        isActive: this.data['data']['isActive']
      }
    };
    this._httpService.post('api/v1/workflow/edit/profile/', model).subscribe(res => {
      if (res['status'] === 200) {
        this.toastr.success('Profile details updated, awaiting approval', 'Success!');
        this.close();
      } else if (res['status'] === 403) {
        this.errorMessage = this._httpService.loadErrorMessage();
        this.loading = false;
      } else {
        this.toastr.error('Profile details were not updated ' + res.message, 'Error!');
        this.errorMessage = res.message;
        this.loading = false;
      }
    })
  }

  //closes creation dialog
  close(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

}
