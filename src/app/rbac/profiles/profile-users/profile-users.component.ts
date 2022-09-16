import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { DataExportationService } from '../../../shared/data-exportation.service';
import { HttpService } from '../../../shared/http.service';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.component.html',
  styleUrls: ['./profile-users.component.scss']
})
export class ProfileUsersComponent implements OnInit {

  cardTitle: string;
  columnsToDisplay: any = {};
  dataToExport: any[];
  loading: boolean = false;
  page: number = 1;
  perPage: number = 10;
  mandatoryColumns = ["First Name", "Last Name", "Email", "Phone Number", "Status", "CreatedOn"];
  total: number;
  userColumns: any;
  users: any[];

  constructor(
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // retrieves profile users
  loadData(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    const profileName = this.route.snapshot.paramMap.get('profile');
    this.cardTitle = profileName.toUpperCase() + " " +  "Profile Users"
    let model = {
      page: this.page - 1,
      size: this.perPage
    }
    this._httpService.retrieveData(`api/v1/workflow/get-users-in-profile/${id}`, model).subscribe(res => {
      if(res['status'] === 200) {
        this.users = res['data'];
        let columnsList = [];
        this.users.map(user => {
          Object.keys(user).map(it => {
            columnsList.push(it);
          })
        })
        columnsList = Array.from(new Set(columnsList));
        columnsList.map(item => {
          switch(item) {
            case "id":
              this.columnsToDisplay['ID'] = "id";
              break;
            case "createdOn":
              this.columnsToDisplay["CreatedOn"] = "createdOn";
              break;
            case "email":
              this.columnsToDisplay["Email"] = "email";
              break;
            case "phoneNumber":
              this.columnsToDisplay["Phone Number"] = "phoneNumber";
              break;
            case "firstName":
              this.columnsToDisplay["First Name"] = "firstName";
              break;
            case "lastName":
              this.columnsToDisplay["Last Name"] = "lastName";
              break;
            case "remarks":
              this.columnsToDisplay["Remarks"] = "remarks";
              break;
            case "firstTimeLogin":
              this.columnsToDisplay["Status"] = "firstTimeLogin";
              break;
            case "isBlocked":
              this.columnsToDisplay["Blocked"] = "isBlocked";
              break;
          }
        })
        this.loading = false;
      } else {
        this.toastr.error("Profile users were not retrieved",  "Error!");
      }
    })
  }

  //decouples user and profile
  decouple(element): void {
      const id = this.route.snapshot.paramMap.get("id");
      const profile = this.route.snapshot.paramMap.get("profile");
      let model = {
        userEmail: element.email,
        profileId: id
      };
     Swal.fire({
       title: 'Are you sure?',
       text: `You are about to remove the ${element.firstName} from the ${profile} profile`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#14314f',       cancelButtonColor: '#d51317',        confirmButtonText: 'Yes, revoke user'
     }).then((swalResult) => {
       if(swalResult.value) {
         this._httpService.post("api/v1/workflow/remove-user-profile", model).subscribe(res => {
           if (res["status"] === 200) {
            this.loadData();
            Swal.fire(
              'Done',
              'User removed from profile',
              'success'
            );
           }
         })

       }
     })
  }

  //navigates to single user view
  viewUser(element): void {
    this.router.navigate(['/users/view-user', element.id])
  }

  //updates request page and size params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadData();
  }

  //exports users xlsx
  exportXLSX(): void {
    let usersToExport = [];
    this.users.map(item => {
      let container = {};
      this.mandatoryColumns.map(col => {
        container[col] = item[this.columnsToDisplay[col]];
        usersToExport.push(container);
      })
    });
    let entries = this.getUniqueListBy(usersToExport, "Email");
    this.dataToExport = entries;
    this.exportUsersXLSX(this.dataToExport, "users-list");
  }

  exportUsersXLSX(dataArray, title): void {
    this._dataExportationService.exportDataXlsx(dataArray, title);
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
}
