// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

    client: 'esb_clientid',
    password: 'Y2hhbWFzZWNyZXQ=',

    auditEndpoint: 'http://10.111.210.6:9398/audit-logs/',
    dbAPIEndpoint: 'http://10.111.210.6:9398/reporting/db-api/execute-operation',
    loginEndpoint: 'http://10.111.210.6:9398/user-management/oauth/token',
    managerEndpoint: 'http://10.111.210.70:7910/manager/',
    storedEndpoint: 'http://10.111.210.6:9398/reporting/db-api/execute-stored-procedure',
    universalEndpoint: 'http://10.111.210.6:9398/user-management/',

 baseUrl: 'http://saccotest.ekenya.co.ke:8092/insurance-channel'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
