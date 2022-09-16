import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { RBACRoutingModule } from './rbac-routing.module';
import { ProfilesComponent } from './profiles/profiles.component';
import { RolesComponent } from './roles/roles.component';
import { AddProfileComponent } from './profiles/add-profile/add-profile.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { ViewProfileComponent } from './profiles/view-profile/view-profile.component';
import { ProfileRolesComponent } from './profiles/profile-roles/profile-roles.component';
import { ProfileUsersComponent } from './profiles/profile-users/profile-users.component';
import { ApproveProfileComponent } from './profiles/approve-profile/approve-profile.component';


@NgModule({
  declarations: [
    ProfilesComponent,
    RolesComponent,
    AddProfileComponent,
    AddRoleComponent,
    ViewProfileComponent,
    ProfileRolesComponent,
    ProfileUsersComponent,
    ApproveProfileComponent,
  ],
  imports: [
    CommonModule,
    RBACRoutingModule,
    SharedModule
  ]
})
export class RbacModule { }
