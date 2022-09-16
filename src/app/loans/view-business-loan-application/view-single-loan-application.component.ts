import {OpenBusinessDocDialogComponent} from './open-doc-dialog/open-doc-dialog.component';
import {HttpService} from 'src/app/shared/services/http.service';
import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {OpenAdditionalApprovalsDialogForBusinessComponent} from './open-additional-approvals-dialog/open-additional-approvals-dialog.component';

export interface TreeNodeInterface {
    key: string;
    name: string;
    weight?: number;
    level?: number;
    expand?: boolean;
    address?: string;
    children?: TreeNodeInterface[];
    parent?: TreeNodeInterface;
}


@Component({
    selector: 'app-view-single-loan-application',
    templateUrl: './view-single-loan-application.component.html',
    styleUrls: ['./view-single-loan-application.component.scss']
})
export class ViewBusinessLoanApplicationComponent implements OnInit {
    public isLoaded = false;
    public application: any = true;
    public application_id: any;
    public verified = false;
    public submitted = false;
    public rejected = false;
    public appoved = false;
    public username: any;
    dialogRef: NgbModalRef;
    get_uname: any;
    public loggedInAs: string;

    public matrices: any;

    public scoreTotal: any;

    isProcessed = false;


    listOfMapData: TreeNodeInterface[];
    mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _httpService: HttpService,
        public fb: FormBuilder,
        private modalService: NgbModal,
        public toastrService: ToastrService,
        public router: Router) {
    }

    ngOnInit() {

        this.loadMatrices();

        this.username = JSON.parse(localStorage.getItem('user_details'));
        // console.log(this.username);

        this._activatedRoute.params.subscribe(params => {
            if (typeof params.id !== 'undefined') {
                this.application_id = params.id;
            }
            console.log(this.application_id);

            // this.form = this.fb.group({
            //   premium_amount: ['', [Validators.required]]
            // });
        });
        this.loadApplication();
        this.loggedInAs = localStorage.getItem('logged_in_as');
    }

    public markAs(action: string): void {
        // this.get_uname = JSON.parse(localStorage.getItem('user_details')).company_details.email;
        const model = {
            username: this.username.username,
            loan_id: Number(this.application_id),
            status_desc: action,
            transaction_type: '100402'
        };
        this._httpService.post('', model).subscribe(
            result => {
                console.log(result);
                if (result.response.response_code === '00') {

                    this.toastrService.success(action, 'Success!');
                } else if (result.response.response_code === '99') {
                    this.toastrService.error(action, 'Error occured!, try again...');
                } else if (result.response.response_code === '57') {
                    this.toastrService.warning('You have no permission', 'Permission Error');
                }
            },
            error => {
            },
            complete => {
                this.loadApplication();
            }
        );
    }

    openDocument(doc: any) {
        this.dialogRef = this.modalService.open(OpenBusinessDocDialogComponent);
        this.dialogRef.componentInstance.docData = doc;
        this.dialogRef.componentInstance.userData = this.username;


    }

    openAdminApprovalsDialog(doc: any) {
        this.dialogRef = this.modalService.open(OpenAdditionalApprovalsDialogForBusinessComponent, {
            size: 'lg',
        });
        this.dialogRef.componentInstance.docData = doc;
        this.dialogRef.componentInstance.userData = this.username;

    }

    collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
        if (!$event) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.key === d.key)!;
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
        const stack: TreeNodeInterface[] = [];
        const array: TreeNodeInterface[] = [];
        const hashMap = {};
        stack.push({...root, level: 0, expand: false});

        while (stack.length !== 0) {
            const node = stack.pop()!;
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({...node.children[i], level: node.level! + 1, expand: false, parent: node});
                }
            }
        }

        return array;
    }

    visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
        if (!hashMap[node.key]) {
            hashMap[node.key] = true;
            array.push(node);
        }
    }

    getCollateralType() {

        if (this.application.collateralType === 0) {
            return 'Cash/treasury bills';
        } else if (this.application.collateralType === 1) {
            return 'Property';
        } else if (this.application.collateralType === 2) {
            return 'Motor Vehicles';
        } else if (this.application.collateralType === 3) {
            return 'Debenture/Shares';
        } else if (this.application.collateralType === 4) {
            return 'Insurance';
        } else if (this.application.collateralType === 5) {
            return 'Unsecured';
        }
    }





    getCRBReport() {
        if (this.application.crbReport === 0) {
            return '+ listing with performing facilities';
        } else if (this.application.crbReport === 1) {
            return '+ listing with default history';
        } else if (this.application.crbReport === 2) {
            return '- listing';
        }
    }

    private loadApplication(): void {

        console.log('this._activatedRoute.queryParamMap');
        const opts = this.router.url.split('/');
        console.log('opts');
        console.log(opts[opts.length - 1]);

        this._httpService.scoresGet(`loans/${opts[opts.length - 1]}`).subscribe(
            result => {
                console.log('result');
                console.log(result);

                this.application = result.data;
                console.log(this.application);
            }
        );
    }

    private loadMatrices(): void {

        console.log('this._activatedRoute.queryParamMap');
        const opts = this.router.url.split('/');
        console.log('opts');
        console.log(opts[opts.length - 1]);


        this._httpService.scoresGet(`loans/loanAnalysis/v2/${opts[opts.length - 1]}`).subscribe(
            result => {
                console.log('matrix.data');
                console.log(result.data.analysis);

                this.scoreTotal = result.data.analysis.reduce((acc, current) => acc + current.total, 0)

                const mapped = result.data.analysis.map((riskGroup, riskGroupIndex) => {
                    return {
                        key: riskGroupIndex + 1,
                        name: riskGroup.name,
                        weight: riskGroup.total,
                        children: riskGroup.groups.map((scoreGroup, scoreGroupIndex) => {
                            return {
                                key: (riskGroupIndex + 1) + '-' + (scoreGroupIndex + 1),
                                name: scoreGroup.name,
                                weight: scoreGroup.total,
                                children: scoreGroup.parameterGroups.map((parameterGroup, parameterGroupIndex) => {
                                    return {
                                        key: (riskGroupIndex + 1) + '-' + (scoreGroupIndex + 1) + '-' + (parameterGroupIndex + 1),
                                        name: parameterGroup.name,
                                        weight: parameterGroup.value,
                                        evalScore: parameterGroup.evalScore
                                    };
                                })
                            };
                        })
                    };

                });


                this.listOfMapData = mapped;

                this.listOfMapData.forEach(item => {
                    this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
                });


                console.log(this.matrices);
            }
        );
    }

    printPage() {
        window.print();
    }
}
