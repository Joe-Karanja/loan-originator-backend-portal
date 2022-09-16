import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CustomValidators } from "ng2-validation";
import { ToastrService } from "ngx-toastr";

import { HttpService } from '../../shared/http.service';

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit {

  errorMessage: string;
  loading: boolean = false;
  public form: FormGroup;

  constructor(
    private _httpService: HttpService,
    private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ]
    });
  }

  onSubmit() {
    this.loading = true;
    let model = {
      email: this.form.value.email
    }
    this._httpService.post("api/v1/user/forget-password", model).subscribe(res => {
      if (res['status'] === 200) {
        this.loading = false;
        this.toastr.success("Reset password link sent", "Success!");
        this.router.navigate(["/session/signin"]);
      } else {
        this.loading = false;
        this.errorMessage = "Password reset link was not sent" + "\n" + res.message;
      }
    })
    
  }
}
