import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../../shared/http.service';

import { ApproveProfileComponent } from '../approve-profile/approve-profile.component';

@Component({
  selector: 'app-profile-roles',
  templateUrl: './profile-roles.component.html',
  styleUrls: ['./profile-roles.component.scss']
})
export class ProfileRolesComponent implements OnInit {

  aRole: any;
  assignedRoles: any[] = [];
  assignedRolesOptions: string[];
  authorizeAssignUnassign: boolean = false;
  disableBtn: boolean = false;
  removeRole: boolean = false;
  role: any;
  rolesToApprove: string[];
  rolesToAssign: string[];
  rolesToRemove: string[];
  rrole: any;
  searchText: string;
  searchRole: string;
  unassignedRoles: any[] = [];
  page: number = 1;
  size: number = 10;

  constructor(
    public dialog: MatDialog,
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  //retrieves profile roles
  loadData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let model = {
      page: this.page - 1,
      size: this.size
    };
    this._httpService.retrieveData(`api/v1/workflow/get-roles-in-profiles/${id}`, model).subscribe(res => {
      if (res['status'] === 200) {
        this.assignedRoles = res['data']['present'];
        this.unassignedRoles = res['data']['absent'];
        let user = JSON.parse(localStorage.getItem("userRoles"));
        this.authorizeAssignUnassign = user.includes("assign_remove_role");
      }
    })
  }

  removeRoles(event): void {
    this.disableBtn = true;
    //console.log("roles to remove: ", event);
    this.rolesToRemove = event;
  }

  //assigns roles to profiles
  assignRole(event): void {
    this.disableBtn = false;
    this.rolesToAssign = event;
  }

  //checks if item on assigned list is checked
  /** call this during role asignation, logic not complete */
  validateChecked(event): void {
    if (event) {
      this.disableBtn = true;
    } else {
      this.disableBtn = false;
    }
  }

  //moves selected unassigned roles to assigned roles array
  assignRoles(element): void {
    const id = +this.route.snapshot.paramMap.get('id');
    let assignArray = [];
    if (element.length !== 0) {
      element.map(item => {
        assignArray.push(item);
      })
    };
    let model = {
      profileId: id,
      roleIds: assignArray,
      isActive: "true",
      remarks: "Assign roles to profile",
      previousData: {}
    };
    this._httpService.post('api/v1/workflow/add-roles-to-profile', model).subscribe(res => {
      if(res['status'] === 200) {
        if (res["message"] == "Data staged successfully") {
          this.toastr.success("Roles assigned successfully awaiting approval", "Success!");
        } else {
          this.toastr.success("Roles assigned successfully", "Success!");
          this.loadData();
        }
      } else {
        assignArray.length == 1 ? this.toastr.error("Role not assigned", "Error!") : this.toastr.error("Roles not Assigned", "Error!");
      }
    })
  }

  //removes role from assigned list
  removeAssignedRoles(element): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (element.length !== 0) {
      const dialogRef = this.dialog.open(ApproveProfileComponent, {data: {data: element, title: "Remove Role/s", edit: false, profileId: id}, height: '330px', width: '400px', disableClose: true});
      dialogRef.afterClosed().subscribe(() => {
        let removeIds = [];
        element.map(item => {
          removeIds.push(item);
        });
        this.loadData();
      })
    }
  }
}
