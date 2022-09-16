import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';


import { HttpService } from '../../shared/http.service';
import { DataExportationService } from "../../shared/data-exportation.service";

import { AddProfileComponent } from './add-profile/add-profile.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  columnsToDisplay: any = {};
  dataToExport: any;
  editProfile: boolean;
  endDate: string;
  exportTitle: string;
  loading: boolean;
  page: number = 1;
  perPage: number = 10;
  profileColumns: any[];
  profileExportColumns: string[];
  profileExportRows: any[];
  profiles: any[];
  mandatoryColumns: string[] = ["ID", "Profile Name", "Description", "Status", "CreatedOn"];
  startDate: string;
  total: number;

  constructor(
    public dialog: MatDialog,
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
   }

  ngOnInit(): void {
    this.loadProfiles();
  }

  //retrieves available profiles
  loadProfiles(): void {
    this.loading = true;
    // this.page = event;
    let model = {
      page: this.page - 1,
      size: this.perPage
    };
    this._httpService.retrieveData('api/v1/workflow/get-profiles', model).subscribe(res => {
      if (res['status'] === 200) {
        this.profiles = res['data']['content'];
        this.total = res['data']['totalElements'];
        this.loading = false;
        let cols = [];
        this.profiles.map(item => {
          Object.keys(item).map(ky => {
            cols.push(ky);
          })
        });
        cols = Array.from(new Set(cols));
        cols.map(item => {
          switch(item) {
            case "id":
              this.columnsToDisplay["ID"] = "id";
              break;
            case "name":
              this.columnsToDisplay["Profile Name"] = "name";
              break;
            case "remarks":
              this.columnsToDisplay["Description"] = "remarks";
              break;
            case "isActive":
              this.columnsToDisplay["Status"] = "isActive";
              break;
            case "createdOn":
              this.columnsToDisplay["CreatedOn"] = "createdOn";
              break;
          }
        });
        this.profileColumns = Object.keys(cols);
      } else {
        this.loading = false;
        this.toastr.error("Profiles cannot be retrieved", "Error");
      }
    })
  }

  //updates request params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadProfiles();
  }

  //captures selected date range
  datedData(dateStart: HTMLInputElement, dateEnd: HTMLInputElement): void {
  }

  //triggers the dialog that handles profile creation
  createProfile(data: any): void {
    this.editProfile = false;
    const dialogRef = this.dialog.open(AddProfileComponent, {data: {data: data, editProfile: this.editProfile}, height: '440px', width: '480px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadProfiles();
    });
  }

  //updates profile details
  editProfileDetails(element): void {
    this.editProfile = true;
    const dialogRef = this.dialog.open(AddProfileComponent, {data: {data: element, editProfile: this.editProfile}, height: '440px', width: '480px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadProfiles();
    });
  }

  //navigates to single profiles view
  viewProfile(element): void {
    this.router.navigate(['/rbac/profile', element.id, {profile: element.name}]);
  }

  //exports profiles xlsx
  exportXLSX(): void {
    let usersToExport = [];
    this.profiles.map(item => {
      let container = {};
      this.mandatoryColumns.map(col => {
        container[col] = item[this.columnsToDisplay[col]];
        usersToExport.push(container);
      })
    });
    let entries = this.getUniqueListBy(usersToExport, "Profile Name");
    this.dataToExport = entries;

    this.exportUsersXLSX(this.dataToExport, "profiles-list");
  }

  exportUsersXLSX(dataArray, title): void {
    this._dataExportationService.exportDataXlsx(dataArray, title);
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  /** exports available profiles to PDF */
  exportProfilesPDF(): void {
    this.mandatoryColumns = this.mandatoryColumns;
    this.exportTitle = "profiles.pdf";
    this.profileExportColumns = this.mandatoryColumns;
    this.profileExportRows = this.profiles.map(profile => {
      let container = [];
      this.mandatoryColumns.map(col => {
        container.push(profile[this.columnsToDisplay[col]]);
      })
      return container;
    })
    this.exportToPDF(this.profileExportColumns, this.profileExportRows, this.exportTitle);
  }

  exportToPDF(cols, rows, title): void {
    this._dataExportationService.exportToPdf(cols, rows, title);
  }

}
