import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {AgmCoreModule} from '@agm/core';
import {CalendarModule} from 'angular-calendar';
import {ToastrModule} from 'ngx-toastr';
import {PipesModule} from './theme/pipes/pipes.module';

import {NzTableModule} from 'ng-zorro-antd/table';
import {routing} from './app.routing';
import {AppSettings} from './app.settings';

import {AppComponent} from './app.component';
import {PagesComponent} from './pages/pages.component';
import {HeaderComponent} from './theme/components/header/header.component';
import {FooterComponent} from './theme/components/footer/footer.component';
import {SidebarComponent} from './theme/components/sidebar/sidebar.component';
import {VerticalMenuComponent} from './theme/components/menu/vertical-menu/vertical-menu.component';
import {HorizontalMenuComponent} from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import {BreadcrumbComponent} from './theme/components/breadcrumb/breadcrumb.component';
import {BackTopComponent} from './theme/components/back-top/back-top.component';
import {FullScreenComponent} from './theme/components/fullscreen/fullscreen.component';
import {ApplicationsComponent} from './theme/components/applications/applications.component';
import {MessagesComponent} from './theme/components/messages/messages.component';
import {UserMenuComponent} from './theme/components/user-menu/user-menu.component';
import {FlagsMenuComponent} from './theme/components/flags-menu/flags-menu.component';
import {SideChatComponent} from './theme/components/side-chat/side-chat.component';
import {FavoritesComponent} from './theme/components/favorites/favorites.component';
import {BlankComponent} from './pages/blank/blank.component';
import {SearchComponent} from './pages/search/search.component';
import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {SharedModule} from './shared/shared.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NzDropDownModule} from 'ng-zorro-antd';
import {NzIconModule} from 'ng-zorro-antd/icon';

import {
    MatAccordion,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MatVerticalStepper
} from '@angular/material';
import {NbDatepickerModule} from '@nebular/theme';
import {AddValuerComponent} from './valuers/manage-valuers/add-valuer/add-valuer.component';
import {AddValuerUserComponent} from './valuers/manage-valuers/add-valuer-user/add-valuer-user.component';
import {BsDatepickerModule, BsDropdownModule} from 'ngx-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        HttpClientModule,
        HttpModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        PerfectScrollbarModule,
        SharedModule,
        NgbModule,
        NzTableModule,
        MultiselectDropdownModule,
        NzDropDownModule,
        NzIconModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatTableModule,
        MatPaginatorModule,

        MatExpansionModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatChipsModule,

        AgmCoreModule.forRoot({
            // job apiKey: 'AIzaSyAwQJXjzQ82D6nQsjwHHYZ1T6tDlRJe220'
            apiKey: 'AIzaSyCeXaOKfJXQZuh-3wZmMmYSt5NruUJPVgU'
        }),
        CalendarModule.forRoot(),
        ToastrModule.forRoot(),
        PipesModule,
        routing,
        ModalModule.forRoot(),
        NbDatepickerModule.forRoot(),

        NgbModule,
        MultiselectDropdownModule,
        NgxSpinnerModule,
        NgMultiSelectDropDownModule.forRoot(),
        BsDropdownModule.forRoot(),
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        AppComponent,
        PagesComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        BackTopComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        FlagsMenuComponent,
        SideChatComponent,
        FavoritesComponent,
        BlankComponent,
        SearchComponent,
        NotFoundComponent,
    ],

    providers: [
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: SystemHttpInterceptor,
        //   multi: true
        // },
        AppSettings,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
