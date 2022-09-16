import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles/profiles.component';
import { RolesComponent } from './roles/roles.component';
import { ViewProfileComponent } from './profiles/view-profile/view-profile.component';

const routes: Routes = [
    {
        path: 'all-profiles',
        component: ProfilesComponent,
        data: {
            title: 'List Profiles',
            breadcrumb: [
                {
                    label: 'List Profiles',
                    url: 'all-profiles'
                }
            ]
        }
    },
    {
        path: 'all-roles',
        component: RolesComponent,
        data: {
            title: 'List Roles',
            breadcrumb: [
                {
                    title: 'List Roles',
                    url: 'all-roles'
                }
            ]
        }
    },
    {
        path: 'profile/:id',
        component: ViewProfileComponent,
        data: {
            title: 'View Profile',
            breadcrumb: [
                {
                    title: "Profile {{profile.name}}",
                    url: 'profile/:id'
                }
            ]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RBACRoutingModule { }