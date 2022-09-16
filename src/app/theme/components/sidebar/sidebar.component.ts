import { HttpService } from './../../../shared/services/http.service';
import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../menu/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidebarComponent implements OnInit {
  public settings: Settings;
  public menuItems: Array<any>;
  loggedIn: any;
  company: any;
  companyDetails: any;
  constructor(public appSettings: AppSettings,
    public menuService: MenuService, private router: Router,
    private httpService: HttpService) {
    // =  localStorage.getItem('username')
    this.loggedIn = JSON.parse(localStorage.getItem('user_details'))?
     JSON.parse(localStorage.getItem('user_details')).user_type: '';
    //  N.parse(localStorage.getItem('user_details')).company_details.company_name: '';
    this.companyDetails = httpService.Username() ? httpService.Username() : '';
    console.log(httpService.Username())
    this.settings = this.appSettings.settings;
    this.menuItems = this.menuService.getVerticalMenuItems();
    if (this.loggedIn !== 'user') {
      this.menuItems = [
        // new Menu(8000, 'Valuations', null, null, 'th-list', null, true, 0),
        // new Menu(8001, 'Pending', '/valuations/pending', null, 'th-list', null, false, 8000),
        // new Menu(8002, 'Valued', '/valuations/valued', null, 'th-list', null, false, 8000),
        new Menu(1, 'Dashboards', null, null, 'tachometer', null, true, 0),
        new Menu(11, 'Loans Dashboard', '/', null, 'tachometer', null, false, 1),
        new Menu(12000, 'Loans Module', null, null, 'money', null, true, 0),
        new Menu(12001, 'Applications', '/loans/applications', null, 'th-list', null, false, 12000),
        new Menu(12002, 'Loan Cycles', '/loans/cycles', null, 'th-list', null, false, 12000),
        new Menu(9000, 'Manage Employees', null, null, 'university', null, true, 0),
        new Menu(9001, 'Active Employees', '/employees/list', null, 'th-list', null, false, 9000),
        new Menu(9002, 'Inactive Employees', '/employees/inactive/list', null, 'th-list', null, false, 9000),

      //    Additional menu Items.
        new Menu(6000, 'Users Management', null, null, 'users', null, true, 0),
        new Menu(6001, 'Users', '/users/list', null, 'th-list', null, false, 6000),

        new Menu(2000, 'System Configurations', null, null, 'cogs', null, true, 0),

        new Menu(2003, 'RBAC', null, null, 'users', null, true, 2000),
        new Menu(20032, 'Profiles', '/configs/rbac/profiles', null, 'th-list', null, false, 2003),

        new Menu(11000, 'Workflows', null, null, 'spinner', null, true, 0),
        new Menu(11001, 'Workflows List', '/workflow/list', null, 'th-list', null, false, 11000),



      ];
      this.router.navigateByUrl('/');
    } else {

    }
  }

  ngOnInit() {
    if (sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
      });
      this.menuItems = newArr;
    }
  }

  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
      let child = menu.children[i].children[1];
      if (child) {
        if (child.classList.contains('show')) {
          child.classList.remove('show');
          menu.children[i].children[0].classList.add('collapsed');
        }
      }
    }
  }


}
