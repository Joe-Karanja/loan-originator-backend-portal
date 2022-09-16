import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomValidators } from "ng2-validation";

import { HttpService } from '../../shared/http.service';

const password = new FormControl("", Validators.required);
const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {

  loading: boolean = false;
  public form: FormGroup;
  

  constructor(
    private _httpService: HttpService,
    private fb: FormBuilder, 
    private router: Router
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password,
      confirmPassword
    })
  }

  onSubmit() {
    this.loading = true;
    let model = {
      password: this.form.value.password
    };
    this._httpService.post("api/v1/user/set-password", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.router.navigate(["/auth/login"])
      }
    })
  }
}
