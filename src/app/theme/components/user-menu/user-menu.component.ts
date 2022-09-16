import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  constructor(  private authService: AuthService) { 
  
  }

  ngOnInit() {
  }
  logout(): void {
  this.authService.logout();
  }
}
