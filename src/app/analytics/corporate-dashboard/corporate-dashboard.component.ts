import {Router} from '@angular/router';
import {HttpService} from './../../shared/services/http.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-corporate-dashboard',
    templateUrl: './corporate-dashboard.component.html',
    styleUrls: ['./corporate-dashboard.component.scss']
})
export class CorporateDashboardComponent implements OnInit {
    public shown = false;
    public selectedProduct: any;
    noOfLoansData: any[] = [
        {
            name: 'Jan',
            value: 6
        },
        {
            name: 'Feb',
            value: 12
        },
        {
            name: 'Mar',
            value: 16
        },
        {
            name: 'Apr',
            value: 12
        },
        {
            name: 'May',
            value: 16
        },
        {
            name: 'Jun',
            value: 12
        },
        {
            name: 'Jul',
            value: 16
        },
        {
            name: 'Aug',
            value: 12
        },
        {
            name: 'Sept',
            value: 16
        },
        {
            name: 'Oct',
            value: 12
        },
        {
            name: 'Nov',
            value: 16
        },
        {
            name: 'Dec',
            value: 16
        }

    ];
    amountOfLoansData: any[] = [
        {
            name: 'Jan',
            value: 60000
        },
        {
            name: 'Feb',
            value: 120000
        },
        {
            name: 'Mar',
            value: 160000
        },
        {
            name: 'Apr',
            value: 12000
        },
        {
            name: 'May',
            value: 15660
        },
        {
            name: 'Jun',
            value: 12000
        },
        {
            name: 'Jul',
            value: 165666
        },
        {
            name: 'Aug',
            value: 14220
        },
        {
            name: 'Sept',
            value: 166000
        },
        {
            name: 'Oct',
            value: 10000
        },
        {
            name: 'Nov',
            value: 15000
        },
        {
            name: 'Dec',
            value: 11000
        }

    ];

    view: any[] = [530, 350];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Month';
    showYAxisLabel = true;
    yAxisLabel = 'No. Of Loans';

    colorScheme = {
        domain: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']
    };

    _Username: string;
    dashData: any;
    analytics_data: any;
    all_apps: any;
    public employees;
    public employeesBgColor = {domain: ['#2a6592']};
    public amountBorrowed;
    public amountBorrowedBgColor = {domain: ['#669900']};
    public uniqueEmployees;
    public uniqueEmployeesBgColor = {domain: ['#e60000']};
    public totalLoansNumber;
    public totalLoansNumberBgColor = {domain: ['#b36b00']};

    user_type: any;
    disburse: any;
    employerVerified: any;
    employerVerifiedBgColor: any;
    stanchartVerifiedBgColor: any;
    stanchartVerified: any;
    queryDate: any;

    startDate: any;
    endDate: any;

    constructor(
        private httpService: HttpService,
        public router: Router
    ) {
        this.employees = [{name: 'Total Employees', value: 102}];
        this.totalLoansNumber = [{name: 'Total No of Loans', value: 40}];
        this.amountBorrowed = [{name: 'Total Amount Borrowed', value: 350300}];
        this.uniqueEmployees = [{name: 'Total Active Employees', value: 7}];
        this._Username = this.httpService.Username();
        console.log(this._Username);
        // Object.assign(this, { single })
    }

    loadDataSummary() {
        const model = {
            transaction_type: '100700',
            transaction_code: '100720'
        };
        this.httpService.post('', model).subscribe(res => {
            console.log(res.list);
            this.dashData = res.list[1];
            console.log(this.dashData);
        });
    }

    ngOnInit() {
        this.loadDataSummary();
        this.analytics_data = this.dashData;
        this.user_type = JSON.parse(localStorage.getItem('user_details')) ? JSON.parse(localStorage.getItem('user_details')).user_type : '';
        if (this.user_type === 'user') {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['analytics/corporate']);
        }
        this.loadDataSummary();
        // this.loadDataSummary()
    }

    onSelect(event) {
        this.shown = true;
        this.selectedProduct = event;
        console.log(event);
    }

    getDate(event: any) {
        console.log('here is the date');
        console.log(event);
        this.startDate = event[0];
        this.endDate = event[1];
    }
}
