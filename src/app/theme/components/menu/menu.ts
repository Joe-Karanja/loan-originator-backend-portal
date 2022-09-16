import {Menu} from './menu.model';

export const verticalMenuItems = [
    new Menu(1, 'Dashboards', null, null, 'tachometer', null, true, 0),
    new Menu(11, 'Loans Dashboard', '/', null, 'tachometer', null, false, 1),
    // new Menu(12, 'Pension Dashboard', '/analytics/pension', null, 'tachometer', null, false, 1),
    // new Menu(12, 'Applications Dashboard', '/analytics/motor', null, 'tachometer', null, false, 1),
    // new Menu(13, 'Motor Cover Claims', '/analytics/claims', null, 'tachometer', null, false, 1),
    // new Menu(14, 'Personal Accident Covers', '/analytics/personal', null, 'tachometer', null, false, 1),
    // new Menu(13, 'Travel Insurance', '/analytics/travel', null, 'tachometer', null, false, 1),

    // LOans Module

    new Menu(12000, 'Loans Module', null, null, 'money', null, true, 0),
    new Menu(12005, 'Loan Applications', '/loans/applications', null, 'th-list', null, false, 12000),
    new Menu(12006, 'Loan Cycles', '/loans/bank/cycles', null, 'th-list', null, false, 12000),


    // Nmetoa hii as it is not necessary for the Salary Advance Demo
    // new Menu(12002, 'Business Loan Applications', '/loans/business-loan-applications', null, 'th-list', null, false, 12000),
    // Nmetoa hii as it is not necessary for the Salary Advance Demo


    new Menu(12009, 'Risk Assessment', null, null, 'money', null, true, 0),
    new Menu(12001, 'Corporate/SME', '/loans/business-loan-assessment', null, 'th-list', null, false, 12009),


    // Motor vehicle
    // Third Party
    // new Menu(2222, 'Motor 3rd Party', null, null, 'th-list', null, true, 0),
    // new Menu(22221, 'Applications', '/motor/third-party/new', null, 'th-list', null, false, 2222),
    // new Menu(22222, 'Claims', '/motor/third-party/claims/all', null, 'th-list', null, false, 2222),
    // Comprehensive
    // new Menu(3333, 'Motor Comprehensive', null, null, 'th-list', null, true, 0),
    // new Menu(33331, 'Applications', '/motor/comprehensive/new', null, 'th-list', null, false, 3333),
    // new Menu(33332, 'Claims', '/motor/comprehensive/claims/all', null, 'th-list', null, false, 3333),
    // new Menu(33332, 'Claims', null, null, 'th-list', null, true, 3333),
    // new Menu(5001, 'Applications', null, null, 'th-list', null, true, 33332),
    // new Menu(50011, 'New', '/motor/applications/new', null, 'th-list', null, false, 5001),


    //// Applications
    // new Menu(5000, 'Motor Vehicle Insurance', null, null, 'th-list', null, true, 0),
    // new Menu(5001, 'Applications', null, null, 'th-list', null, true, 5000),
    // new Menu(50011, 'New', '/motor/applications/new', null, 'th-list', null, false, 5001),
    //// Valuations
    // new Menu(5002, 'Valuations', null, null, 'th-list', null, true, 5000),
    // new Menu(50021, 'Pending', '/motor/valuations/pending', null, 'th-list', null, false, 5002),
    // new Menu(50022, 'Completed', '/motor/valuations/completed', null, 'check', null, false, 5002),
    // Customers
    //// Payments
    // new Menu(5003, 'Payments', null, null, 'money', null, true, 5000),
    // new Menu(50031, 'Pending', '/motor/payments/pending', null, 'th-list', null, false, 5003),
    // new Menu(50032, 'Completed', '/motor/payments/paid', null, 'check', null, false, 5003),
    //// Claims
    // new Menu(5004, 'Claims', null, null, 'sign-language', null, true, 5000),
    // new Menu(50041, 'New Claims', '/motor/claims/new', null, 'th-list', null, false, 5004),
    // new Menu(50042, 'Under Inspection', '/motor/claims/inspection', null, 'th-list', null, false, 5004),
    // new Menu(50043, 'Pending Approval', '/motor/claims/pending', null, 'th-list', null, false, 5004),
    // new Menu(50044, 'Closed Claims', '/motor/claims/completed', null, 'th-list', null, false, 5004),

    // Personal Accident

    // new Menu(7000, 'Personal Accident Insurance', null, null, 'th-list', null, true, 0),
    // new Menu(7001, 'Personal Covers', '/applications/pac', null, 'th-list', null, false, 7000),

    // Travel
    // new Menu(7700, 'Travel Insurance', null, null, 'th-list', null, true, 0),
    // new Menu(7701, 'Travel Covers', '/applications/travel', null, 'th-list', null, false, 7700),

    // Investment
    // new Menu(1200, 'Investments Module', null, null, 'institution', null, true, 0),
    // new Menu(1201, 'Unit Trusts', '/investments/unit-trusts', null, 'th-list', null, false, 1200),
    // new Menu(1202, 'Private Wealth', '/investments/private-wealth', null, 'th-list', null, false, 1200),
    // new Menu(1203, 'Institutional Investors', '/investments/institutional-investors', null, 'th-list', null, false, 1200),
    // Customer

    // new Menu(4444, 'Customers Module', null, null, 'users', null, true, 0),
    // new Menu(44441, 'All Customers', '/customers/list', null, 'th-list', null, false, 4444),


    // new Menu(5000, 'Applications For Covers', null, null, 'th-list', null, true, 0),
    // new Menu(5001, 'Motor Vehicle', '/applications/all', null, 'th-list', null, false, 5000),

    // new Menu(7000, 'Manage Claims', null, null, 'th-list', null, true, 0),
    // new Menu(7001, 'Pending Claims', '/claims/pending', null, 'th-list', null, false, 7000),
    // new Menu(7002, 'Approved Claims', '/claims/approved', null, 'th-list', null, false, 7000),

    // new Menu(4000, 'Rescue 24/7', '/applications/rescues', null, 'ambulance', null, false, 0),

    // new Menu(8000, 'Valuations', null, null, 'th-list', null, true, 8000),
    // new Menu(8001, 'Pending', '/valuations/pending', null, 'th-list', null, false, 8000),
    // new Menu(8002, 'Valued', '/valuations/valued', null, 'th-list', null, false, 8000),

    new Menu(19000, 'Manage Corporates', null, null, 'university', null, true, 0),
    new Menu(19001, 'Active Corporates', '/list-corporates/list', null, 'briefcase', null, false, 19000),
    new Menu(19002, 'Inactive Corporates', '/list-corporates/inactive/list', null, 'briefcase', null, false, 19000),
    // new Menu(9999, 'Manage Garages', '/configs/garages', null, 'th-list', null, false, 0),


    new Menu(6000, 'Users Management', null, null, 'users', null, true, 0),
    new Menu(6001, 'Users', '/users/list', null, 'th-list', null, false, 6000),

    new Menu(2000, 'System Configurations', null, null, 'cogs', null, true, 0),

    // Nmetoa hii as it is not necessary for the Salary Advance Demo
    // new Menu(2001, 'Loan Products', '/configs/loan-products', null, 'th-list', null, false, 2000),
    // Nmetoa hii as it is not necessary for the Salary Advance Demo

    // Added new Menus for scoring params and Qualification criteria
    // new Menu(2002, 'Scoring Matrices', '/configs/scoring-matrices', null, 'th-list', null, false, 2000),
    new Menu(200, 'Revenue Share', '/configs/revenue-share', null, 'th-list', null, false, 2000),

    new Menu(2002, 'Scoring Params', '/configs/scoring-risks', null, 'th-list', null, false, 2002),
    new Menu(2003, 'Qualification Criteria', '/configs/qualification-criteria', null, 'th-list', null, false, 2002),
    new Menu(2004, 'CB Base Rate', '/configs/cb-base-rate', null, 'th-list', null, false, 2002),


    // new Menu(2001, 'Insurance Products', '/configs/products', null, 'th-list', null, false, 2000),
    // new Menu(2002, 'Investment Products', '/configs/investment-products', null, 'th-list', null, false, 2000),
//  new Menu(2003, 'Garages', '/configs/garages', null, 'th-list', null, false, 2000),

    new Menu(2003, 'RBAC', null, null, 'users', null, true, 2000),
    new Menu(20032, 'Profiles', '/configs/rbac/profiles', null, 'th-list', null, false, 2003),

    new Menu(11000, 'Workflows', null, null, 'spinner', null, true, 0),
    new Menu(11001, 'Workflows List', '/workflow/list', null, 'th-list', null, false, 11000),
    // new Menu(11008, 'Audit Trail', null, null, 'spinner', null, true, 0),
    // new Menu(11001, 'Assessment Audit Trail', '/workflow/list', null, 'th-list', null, false, 11008),
];

export const horizontalMenuItems = [
    new Menu(1, 'Dashboard', '/', null, 'tachometer', null, false, 0),
];
