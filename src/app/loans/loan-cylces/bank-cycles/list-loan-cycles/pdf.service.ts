import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {logo_image} from 'src/assets/report-logo';

@Injectable({
    providedIn: 'root'
})
export class PdfReportsService {
    data: any;
    dataSet: any;
    trx_status: string;

    constructor() {
    }

    ngOnInit() {

    }

    onCustomAction(event: any) {
        event;
    }

    getDocumentDefinition(data: any, title: string) {
        this.dataSet = data;
        console.log(...this.dataSet.dataArray);
        return {
            info: {
                title: title.toLowerCase(),
                author: 'john doe',
                subject: 'subject of document',
                keywords: 'keywords for document'
            },
            footer: {
                columns: [
                    '',
                    {
                        style: 'footerStyle',
                        alignment: 'right',
                        text: 'Footer text'
                    }
                ],
                margin: [0, 0]
            },
            content: [
                {
                    text: title,
                    bold: true,
                    fontSize: 10,
                    fontFamily: 'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif',
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                    style: 'bodyStyles'
                },
                {
                    columns: [
                        {
                            image: logo_image,
                            fit: [100, 100]
                        },
                        [
                            {
                                text: 'Salary Advance Summary Report',
                                style: 'Group'
                            },
                            {
                                text: 'Advancys LTD',
                                style: 'Group'
                            },
                            {
                                text: 'Nairobi',
                                style: 'subGroup'
                            },
                            {
                                text: moment().format('MMMM Do YYYY, h:mm, a'),
                                style: 'time'
                            }
                        ]
                    ],
                },
                {
                    columns: [
                        {
                            name: 'tableBody',
                            style: 'tableBStyles',
                            // layout: 'lightHorizontalLines',
                            table: {
                                widths: this.dataSet.widths,
                                body: [
                                    this.dataSet.header,
                                    ...this.dataSet.dataArray
                                ],
                            },
                        },
                    ],
                },

                {
                    text: 'Total Loans: 3\n' +
                        'Total Amount Kes.21,000',
                    bold: true,
                    fontSize: 10,
                    fontFamily: 'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif',
                    alignment: 'center',
                    margin: [10, 0, 0, 10],
                    style: 'bodyStyles'
                },

            ],
            styles: {
                Group: {
                    fontSize: 8,
                    alignment: 'right',
                    bold: true,
                    backgroundColor: '#024069',
                    fontFamily: 'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif'
                },
                time: {
                    fontSize: 7,
                    bold: true,
                    color: '#024069',
                    alignment: 'right'

                },
                subGroup: {
                    fontSize: 6,
                    bold: true,
                    backgroundColor: '#024069',
                    fontFamily: 'monospace',
                    color: '#003b4c',
                    alignment: 'right'
                },
                header: {
                    alignment: 'right'
                },
                bodyStyles: {
                    // background:'#d3d3d3',
                    border: '0px'
                },
                tableBg: {
                    backgroundColor: '#024069',
                    border: 'noBorders'
                },
                tableBStyles: {
                    fontSize: 6
                },
                tableHeader: {
                    fontSize: 7,
                    bold: true,
                    margin: [0, 2, 0, 2],
                    color: '#FFFFFF',
                    fillColor: '#024069'
                    // background:'#d3d3d3'
                },
                footerStyle: {
                    fontSize: 9,
                    bold: true,
                    color: '#FFFFFF',
                    fillColor: '#024069',
                    // background:'#d3d3d3'
                },
            },
        };
    }
}
