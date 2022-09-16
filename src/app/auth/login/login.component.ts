import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  form: FormGroup;
  loading: boolean;
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService

  ) { 
    if (authService.currentUser) {
      this.router.navigate(['/']);
    } else {
      authService.logout();
    }
  }

  ngOnInit(): void {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  //logs in user
  login(): void {
    this.loading = true;
    this.authService.login(this.form.value.email, this.form.value.password)
      .pipe(first())
            .subscribe(res =>  {
              let user = JSON.parse(localStorage.getItem('currentUser'));
              if (user.isFirstTimeLogin == false) {
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.router.navigate(["/auth/set-password"])
              }             
            },
            error => {
                if (error) {
                    this.errorMessage = error.error.error_description;
                    this.loading = false;
                }
            });
    
  }
}
