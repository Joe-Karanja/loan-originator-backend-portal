import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../../shared/http.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  cardTitle: string;
  edit: boolean;
  errorMessage: string;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.edit = this.data.editBoolean;
    this.cardTitle = this.edit ? "Edit Role Details" : "Create New Role";
    this.form = this.fb.group({
      name: [this.data.data ? this.data.data.name : ''  , Validators.compose([Validators.required])],
      remarks: [this.data.data ? this.data.data.remarks : '', Validators.compose([Validators.required])],
      status: [this.data.data ? this.data.data.isActive.toString() : "false", Validators.compose([Validators.required])]
    })
  }

  //creates new role
  addRole(): void {
    this.loading = true;
    let activeStatus = this.form.value.status == "true" ? true : false;
    let model = {
      name: this.form.value.name,
      remarks: this.form.value.remarks,
      isActive: activeStatus,
      previousData: {}
    };
    this._httpService.post('api/v1/workflow/add-role', model).subscribe(res => {
      if (res['status'] === 200) {
        this.loading = false;
        this.toastr.success('Role created', 'Success!')
        this.close();
      }  else if (res['status'] === 403) {
        this.loading = false;
        this.errorMessage = this._httpService.loadErrorMessage();
        this.loading = false;
      } else {
        this.loading = false;
        this.toastr.error('Role was not created', 'Error');
        //this.close();
      }
    })
  }

  //edits existing role
  editRoleDetails(): void {
    let activeStatus = this.form.value.status == "true" ? true : false;
    let model = {
      name: this.form.value.name,
      roleId: this.data['data']['id'],
      isActive: activeStatus,
      remarks: this.form.value.remarks,
      previousData: {
        roleId: this.data['data']['id'],
        name: this.data['data']['name'],
        isActive: this.data['data']['isActive'],
        remarks: this.data['data']['remarks']
      }
    };
    this._httpService.post('api/v1/workflow/edit/role', model).subscribe(res => {
      if (res['status'] === 200) {
        this.toastr.success("Role details updated: ", "Success!");
        this.close();
      } else if (res['status'] === 403) {
        this.loading = false;
        this.errorMessage = this._httpService.loadErrorMessage();
        this.loading = false;
      } else {
        this.toastr.error("Role details were not updated", "Error!");
        //this.close();
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
