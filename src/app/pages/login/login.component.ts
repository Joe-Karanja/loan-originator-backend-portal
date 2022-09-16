import { HttpService } from 'src/app/shared/services/http.service';
import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements AfterViewInit {
    public _loginForm: FormGroup;
    public _formErrors: any;
    public _submitted = false;
    public _errorMessage = '';
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public username: AbstractControl;
    public password: AbstractControl;
    public login_as_valuer: AbstractControl;
    private model: any = {};
    _Username: string;
    corp_model: { password: any; email: any; transaction_type: string; };

    constructor(router: Router, fb: FormBuilder, private _httpService: HttpService, private _router: Router) {
        this.router = router;
        this.form = fb.group({
            //     'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'username': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'login_as_valuer': ['', Validators.compose([Validators.nullValidator])],
        });

        //  this.email = this.form.controls['email'];
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
        this.login_as_valuer = this.form.controls['login_as_valuer'];
        this._Username = this._httpService.Username()

    }

    public onSubmit(elementValues: Object): void {
        //   user/valuer
        //    user_type'
        let user_type;

        console.log('this.form.value.login_as_valuer');
        console.log(this.form.value.login_as_valuer);

        user_type = this.form.value.login_as_valuer ? 'user' : '';
        // comment this out
        // user_type = "user";

        // this.form.value.transaction_type = "10006";
            this.model = {
                "username": this.form.value.username,
                "password": this.form.value.password,
                "transaction_type": "10006",
                "user_type": user_type
            };
            this.corp_model = {
                "password": this.form.value.password,
                "email": this.form.value.username,
                "transaction_type": "10006",
            };

        console.log(this.model);
        if (this.form.valid) {
            this._submitted = true;

            // Normal Login as Bank
            if (this.model.user_type !== '') {
                this._httpService.login('', this.model).subscribe(
                    result => {
                        console.log(result);

                        if (result.response.response_code === '00') {
                            console.log(result)
                            localStorage.setItem('user_details', JSON.stringify(result))
                            // localStorage.setItem('company_details', JSON.stringify())
                            localStorage.setItem('username', result.username);
                            localStorage.setItem('profile', result.response.profile);
                            localStorage.setItem('logged_in_as', user_type);
                            //  if(this._Username === 'dave'){
                            //  localStorage.setItem('valuer_id', result.response.valuer_id);
                            //  this.router.navigate(['analytics/corporate'])
                            //  }
                            //  else{
                            this.router.navigate(['/']);
                            //  }

                        } else {
                            this._errorMessage = 'Invalid Credentials';
                        }
                    },
                    error => {
                        this._errorMessage = 'Server Error';
                        this._submitted = false;
                    }
                );
            } else {
                this._httpService.scoresPost('organization/login', {
                    "password": this.form.value.password,
                    "username": this.form.value.username
                }).subscribe(
                    result => {
                        console.log(result);

                        if (result.status === 200) {
                            localStorage.setItem('user_details', JSON.stringify(result.data.name));
                            localStorage.setItem('company_details', JSON.stringify(result.data));
                            // localStorage.setItem('username', result.data.username);
                            // localStorage.setItem('profile', result.response.profile);
                            // localStorage.setItem('logged_in_as', user_type);
                            this.router.navigate(['/']);
                        } else {
                            this._errorMessage = 'Invalid Credentials';
                        }
                    },
                    error => {
                        this._errorMessage = 'Server Error';
                        this._submitted = false;
                    }
                );
            }
        }
    }

    ngAfterViewInit(): void {
        document.getElementById('preloader').classList.add('hide');
    }

}
