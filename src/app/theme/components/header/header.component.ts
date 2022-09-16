import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {MenuService} from '../menu/menu.service';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService],
    animations: [
        trigger('showInfo', [
            state('1', style({transform: 'rotate(180deg)'})),
            state('0', style({transform: 'rotate(0deg)'})),
            transition('1 => 0', animate('400ms')),
            transition('0 => 1', animate('400ms'))
        ])
    ]
})
export class HeaderComponent implements OnInit {
    public showHorizontalMenu: boolean = true;
    public showInfoContent: boolean = false;
    public settings: Settings;
    public menuItems: Array<any>;
    titleDisplayName: any = 'Bank';

    constructor(public appSettings: AppSettings, private router: Router,
                public menuService: MenuService, public _authService: AuthService) {
        this.settings = this.appSettings.settings;
        this.menuItems = this.menuService.getHorizontalMenuItems();
    }

    ngOnInit() {
        if (window.innerWidth <= 768) {
            this.showHorizontalMenu = false;
        }

        const companyName: any = JSON.parse(localStorage.getItem('company_details'));

        if (companyName && companyName.name) {
            this.titleDisplayName = companyName.name.split(' ')[0];
        }
    }


    public closeSubMenus() {
        let menu = document.querySelector('#menu0');
        if (menu) {
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

    @HostListener('window:resize')
    public onWindowResize(): void {
        if (window.innerWidth <= 768) {
            this.showHorizontalMenu = false;
        } else {
            this.showHorizontalMenu = true;
        }
    }

    public logout(): void {
        this._authService.logout();
    }
}
