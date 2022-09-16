import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';

import { DataExportationService } from "../../shared/data-exportation.service";
import { HttpService } from '../../shared/http.service';

import { AddRoleComponent } from './add-role/add-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  columnsJson: any = {};
  columnsProfiles: string[];
  dataSource: any[];
  dataToExport: any;
  displayedColumns: string[];
  editData: boolean;
  exportTitle: string;
  listOfColumns: string[] = ["ID", "Role Name", "Description", "Role Type", "Status", "canCreateWorkflow", "CreatedOn"]
  loading: boolean = false;
  page: number = 1;
  perPage: number = 10;
  roles: any[];
  rolesColumns: string[];
  rolesRows: any[];
  total: number;

  constructor(
    public dialog: MatDialog,
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  //captures selected date range
  datedData(dateStart: HTMLInputElement, dateEnd: HTMLInputElement): void {
  }

  // retrieves available roles
  loadData(): void {
    this.loading = true;
    let model = {
      page: this.page - 1,
      size: this.perPage
    };
    this._httpService.retrieveData('api/v1/workflow/get-roles', model).subscribe(res => {
      if (res['status'] === 200) {
        this.roles = res['data']['content'];
        this.total = res['data']['totalElements'];
        let cols = [];
        this.roles.map(role => {
          Object.keys(role).map(ky => {
            cols.push(ky);
          })
        });
        cols = Array.from(new Set(cols));
        cols.map(col => {
          switch(col) {
            case "id":
              this.columnsJson["ID"] = "id";
              break;
            case "name":
              this.columnsJson["Role Name"] = "name";
              break;
            case "remarks":
              this.columnsJson["Description"] = "remarks";
              break;
            case "isSystemRole":
              this.columnsJson["Role Type"] = "isSystemRole";
              break;
            case "isActive":
              this.columnsJson["Status"] = "isActive";
              break;
            case "canCreateWorkflow":
              this.columnsJson["canCreateWorkflow"] = "canCreateWorkflow";
              break;
            default:
              this.columnsJson["CreatedOn"] = "createdOn";
              break;
          }
        })
        this.loading = false;
      } else {
        this.toastr.error("Roles cannot be retrieved", "Error!");
        this.loading = false;
      }
    })
  }

  //updates request params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadData();
  }

  //triggers role creation dialog
  addRole(data: any): void {
    this.editData = false;
    const dialogRef = this.dialog.open(AddRoleComponent, {data: {data: data, editBoolean: this.editData}, height: '440px', width: '480px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  //triggers role edit dialog
  editRole(element): void {
    this.editData = true;
    const dialogRef = this.dialog.open(AddRoleComponent, {data: {data: element, editBoolean: this.editData}, height: '440px', width: '480px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  //exports roles to XLSX
  exportXLSX(): void {
    let rolesToExport = [];
    this.roles.map(role => {
      if (role["isSystemRole"] == "False") {
        role["isSystemRole"] = "Custom Role";
      } else {
        role["isSystemRole"] = "System Role";
      }
      if (role["isActive"] == true) {
        role["isActive"] = "Active";
      } else {
        role["isActive"] = "Inactive";
      }
      let container = {};
      this.listOfColumns.map(col => {
        container[col] = role[this.columnsJson[col]];
        rolesToExport.push(container);
      })
    });
    let entries = this.getUniqueListBy(rolesToExport, "ID");
    this.dataToExport = entries;
    this._dataExportationService.exportDataXlsx(this.dataToExport, "roles-list");
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  /**exports roles to pdf */
  exportPDF(): void {
    this.exportTitle = "roles-list.pdf";
    this.rolesColumns = this.listOfColumns;
    this.rolesRows = this.roles.map(role => {
      if (role["isSystemRole"] == "False") {
        role["isSystemRole"] = "Custom Role";
      } else {
        role["isSystemRole"] = "System Role";
      }
      if (role["isActive"] == true) {
        role["isActive"] = "Active";
      } else {
        role["isActive"] = "Inactive";
      }
      let container = [];
      this.listOfColumns.map(col => {
        container.push(role[this.columnsJson[col]]);
      })
      return container;
    });
    this._dataExportationService.exportToPdf(this.rolesColumns, this.rolesRows, this.exportTitle);
  }
}
