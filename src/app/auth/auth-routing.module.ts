import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from '../session/signin/signin.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'ESB Reporting Portal Login'
        }
    },
    {
        path: 'set-password',
        component: SigninComponent,
        data: {
            title: 'Set Password'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
