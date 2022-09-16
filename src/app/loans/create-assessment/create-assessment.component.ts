import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {HttpService} from 'src/app/shared/services/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatHorizontalStepper, MatStepper} from '@angular/material';
import {mod} from 'ngx-bootstrap/chronos/utils';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-assessment.component.html',
    styleUrls: ['./create-assessment.component.scss']
})
export class CreateAssessmentComponent implements OnInit, AfterViewInit {

    constructor(
        public activeModal: NgbActiveModal,
        public fb: FormBuilder,
        private _httpService: HttpService,
        private httpClient: HttpClient,
        public toastrService: ToastrService) {
    }

    @ViewChild(MatStepper) myStepper: MatStepper;
    @ViewChild('stepper') stepper: MatHorizontalStepper;
    @ViewChild('fileInput') fileInput: ElementRef;

    @Input() title;
    @Input() formData;

    public loading = false;
    public hasErrors = false;
    public errorMessages;
    public form: FormGroup;

    businessApplicationForm: FormGroup;
    docsForm: FormGroup;


    public assignedProfilesModel: number[] = [];
    public thirdControlSettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true
    };
    public thirdControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find...',
        defaultTitle: 'Select Item(s)',
        allSelected: 'All selected',
    };
    public profiles: IMultiSelectOption[] = [];

    ngAfterViewInit() {
        this.myStepper._getIndicatorType = () => 'number';
    }

    ngOnInit() {

        if (this.formData !== '') {
            this.formData.boardMeetingEvidenced = this.formData.boardMeetingEvidenced ? 1 : 0;
            this.formData.turnOverInlineWithFinancials = this.formData.turnOverInlineWithFinancials ? 1 : 0;
            this.formData.excessesInAccountEvidenced = this.formData.excessesInAccountEvidenced ? 1 : 0;
            this.formData.influencedByPolitics = this.formData.influencedByPolitics ? 1 : 0;
            this.formData.loanRepaymentOnSchedule = this.formData.loanRepaymentOnSchedule ? 1 : 0;
            this.formData.incidenceOfUnpaidCheques = this.formData.incidenceOfUnpaidCheques ? 1 : 0;
            this.formData.ethicalIssuesArisingFromBsActivities = this.formData.ethicalIssuesArisingFromBsActivities ? 1 : 0;
            this.formData.environmentalIssuesArisingFromBusiness = this.formData.environmentalIssuesArisingFromBusiness ? 1 : 0;
            this.formData.lawCompliant = this.formData.lawCompliant ? 1 : 0;
        }

        this.businessApplicationForm = this.fb.group({
            businessName: [this.formData ? this.formData.businessName : '', Validators.required],
            operationYrs: [this.formData ? this.formData.operationYrs : '', Validators.required],
            category: [this.formData ? this.formData.category : '', Validators.required],
            tel: [this.formData ? this.formData.tel : '', Validators.required],
            town: [this.formData ? this.formData.town : '', Validators.required],
            street: [this.formData ? this.formData.street : '', Validators.required],
            poBox: [this.formData ? this.formData.poBox : '', Validators.required],
            contactFirstName: [this.formData ? this.formData.contactFirstName : '', Validators.required],
            contactLastName: [this.formData ? this.formData.contactLastName : '', Validators.required],
            contactTel: [this.formData ? this.formData.contactTel : '', Validators.required],
            businessPin: [this.formData ? this.formData.businessPin : '', Validators.required],

            // Financial Parameters
            currentLiability: [this.formData ? this.formData.currentLiability : 0, Validators.required],
            currentAsset: [this.formData ? this.formData.currentAsset : 0, Validators.required],
            inventory: [this.formData ? this.formData.inventory : 0, Validators.required],
            longTermDebt: [this.formData ? this.formData.longTermDebt : 0, Validators.required],
            shortTermDebt: [this.formData ? this.formData.shortTermDebt : 0, Validators.required],
            shareHolderEquity: [this.formData ? this.formData.shareHolderEquity : 0, Validators.required],
            capital: [this.formData ? this.formData.capital : 0, Validators.required],
            netIncome: [this.formData ? this.formData.netIncome : 0, Validators.required],
            totalAssets: [this.formData ? this.formData.totalAssets : 1, Validators.required],
            totalCashInflows: [this.formData ? this.formData.totalCashInflows : 1, Validators.required],
            totalCashOutflows: [this.formData ? this.formData.totalCashOutflows : 1, Validators.required],
            grossEarning: [this.formData ? this.formData.grossEarning : 1, Validators.required],
            capitalShares: [this.formData ? this.formData.capitalShares : 1, Validators.required],
            businessManagementExperience: [this.formData ? this.formData.businessManagementExperience : 0, Validators.required],
            //    Other Parameters
            boardMeetingEvidenced: [this.formData ? this.formData.boardMeetingEvidenced : 1, Validators.required],
            turnOverInlineWithFinancials: [this.formData ? this.formData.turnOverInlineWithFinancials : 1, Validators.required],
            excessesInAccountEvidenced: [this.formData ? this.formData.excessesInAccountEvidenced : 1, Validators.required],
            crbReport: [this.formData ? this.formData.crbReport : 0, Validators.required],
            collateralType: [this.formData ? this.formData.collateralType : 1, Validators.required],
            influencedByPolitics: [this.formData ? this.formData.influencedByPolitics : 1, Validators.required],
            ethicalIssuesArisingFromBsActivities: [this.formData ? this.formData.ethicalIssuesArisingFromBsActivities : 1, Validators.required],
            lawCompliant: [this.formData ? this.formData.lawCompliant : 0, Validators.required],
            loanRepaymentOnSchedule: [this.formData ? this.formData.loanRepaymentOnSchedule : 1, Validators.required],
            incidenceOfUnpaidCheques: [this.formData ? this.formData.incidenceOfUnpaidCheques : 1, Validators.required],
            environmentalIssuesArisingFromBusiness: [this.formData ? this.formData.environmentalIssuesArisingFromBusiness : 1, Validators.required],



        });
        this.docsForm = this.fb.group({});
        if (this.formData) {
            this.form.removeControl('password');
            this.form.removeControl('confirm_password');
        }
    }

    public loadProfiles(): void {

        this._httpService.get('profiles').subscribe(
            result => {
                if (result.response_code === 200) {
                    this.profiles = result.data;
                    this.profiles = result.data.map(obj => {
                        obj.name = obj.profile_name;
                        return obj;
                    });
                }
            }
        );
    }

    public submitData(): void {
        if (this.formData) {
            this.saveChanges();
        } else {
            this.createRecord();
        }
        this.loading = true;
    }

    public closeModal(): void {
        this.activeModal.dismiss('Cross click');
    }

    changedLoanAmount($event): void {

    }

    public submit(): void {

        console.log('this.businessApplicationForm.value.incidenceOfUnpaidCheques');
        console.log(this.businessApplicationForm.value.incidenceOfUnpaidCheques);

        const model = { ...this.businessApplicationForm.value,
            boardMeetingEvidenced: (this.businessApplicationForm.value.boardMeetingEvidenced === 1 || this.businessApplicationForm.value.boardMeetingEvidenced === '1') ? true : false,
            turnOverInlineWithFinancials: (this.businessApplicationForm.value.turnOverInlineWithFinancials === 1 || this.businessApplicationForm.value.turnOverInlineWithFinancials === '1') ? true : false,
            excessesInAccountEvidenced: (this.businessApplicationForm.value.excessesInAccountEvidenced === 1 || this.businessApplicationForm.value.excessesInAccountEvidenced === '1') ? true : false,
            influencedByPolitics: (this.businessApplicationForm.value.influencedByPolitics === 1 || this.businessApplicationForm.value.influencedByPolitics === '1') ? true : false,
            loanRepaymentOnSchedule: (this.businessApplicationForm.value.loanRepaymentOnSchedule === 1 || this.businessApplicationForm.value.loanRepaymentOnSchedule === '1') ? true : false,
            environmentalIssuesArisingFromBusiness: (this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === 1 || this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === '1') ? true : false,
            ethicalIssuesArisingFromBsActivities: (this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === 1 || this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === '1') ? true : false,
            incidenceOfUnpaidCheques: (this.businessApplicationForm.value.incidenceOfUnpaidCheques === 1 || this.businessApplicationForm.value.incidenceOfUnpaidCheques === '1') ? true : false,
            // tslint:disable-next-line:radix
            crbReport: parseInt(this.businessApplicationForm.value.crbReport),
            // tslint:disable-next-line:radix
            collateralType: parseInt(this.businessApplicationForm.value.collateralType),
            // tslint:disable-next-line:radix
            lawCompliant: parseInt(this.businessApplicationForm.value.lawCompliant),

        };


        console.log('here is the model being sent to the Backend');
        console.log(model);

        this._httpService.scoresPost('loans/apply', model)
            .subscribe(res => {
                console.log(res);
                if (res) {
                    this.toastrService.success('Record created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create!', 'Failed!');
                }
            }
        );
    }

    private createRecord(): any {
        // this.businessApplicationForm.value.transaction_type = '10001';


        console.log('this.businessApplicationForm.value.incidenceOfUnpaidCheques');
        console.log(this.businessApplicationForm.value.incidenceOfUnpaidCheques);


        const model = { ...this.businessApplicationForm.value,
            boardMeetingEvidenced: (this.businessApplicationForm.value.boardMeetingEvidenced === 1 || this.businessApplicationForm.value.boardMeetingEvidenced === '1') ? true : false,
            turnOverInlineWithFinancials: (this.businessApplicationForm.value.turnOverInlineWithFinancials === 1 || this.businessApplicationForm.value.turnOverInlineWithFinancials === '1') ? true : false,
            excessesInAccountEvidenced: (this.businessApplicationForm.value.excessesInAccountEvidenced === 1 || this.businessApplicationForm.value.excessesInAccountEvidenced === '1') ? true : false,
            influencedByPolitics: (this.businessApplicationForm.value.influencedByPolitics === 1 || this.businessApplicationForm.value.influencedByPolitics === '1') ? true : false,
            loanRepaymentOnSchedule: (this.businessApplicationForm.value.loanRepaymentOnSchedule === 1 || this.businessApplicationForm.value.loanRepaymentOnSchedule === '1') ? true : false,
            environmentalIssuesArisingFromBusiness: (this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === 1 || this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === '1') ? true : false,
            ethicalIssuesArisingFromBsActivities: (this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === 1 || this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === '1') ? true : false,
            incidenceOfUnpaidCheques: (this.businessApplicationForm.value.incidenceOfUnpaidCheques === 1 || this.businessApplicationForm.value.incidenceOfUnpaidCheques === '1') ? true : false,
            // tslint:disable-next-line:radix
            crbReport: parseInt(this.businessApplicationForm.value.crbReport),
            // tslint:disable-next-line:radix
            collateralType: parseInt(this.businessApplicationForm.value.collateralType),
            // tslint:disable-next-line:radix
            lawCompliant: parseInt(this.businessApplicationForm.value.lawCompliant),
        };

        this._httpService.scoresPost('loans/apply', model).subscribe(
            result => {
                if (result.response.status === 200) {
                    this.toastrService.success('Record created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create!', 'Failed!');
                }
            },
            error => {
            },
            complete => {
                this.loading = false;
            }
        );
    }

    private saveChanges(): any {

        console.log('this.businessApplicationForm.value.incidenceOfUnpaidCheques');
        console.log(this.businessApplicationForm.value.incidenceOfUnpaidCheques);

        const model = { ...this.businessApplicationForm.value,
            boardMeetingEvidenced: (this.businessApplicationForm.value.boardMeetingEvidenced === 1 || this.businessApplicationForm.value.boardMeetingEvidenced === '1') ? true : false,
            turnOverInlineWithFinancials: (this.businessApplicationForm.value.turnOverInlineWithFinancials === 1 || this.businessApplicationForm.value.turnOverInlineWithFinancials === '1') ? true : false,
            excessesInAccountEvidenced: (this.businessApplicationForm.value.excessesInAccountEvidenced === 1 || this.businessApplicationForm.value.excessesInAccountEvidenced === '1') ? true : false,
            influencedByPolitics: (this.businessApplicationForm.value.influencedByPolitics === 1 || this.businessApplicationForm.value.influencedByPolitics === '1') ? true : false,
            loanRepaymentOnSchedule: (this.businessApplicationForm.value.loanRepaymentOnSchedule === 1 || this.businessApplicationForm.value.loanRepaymentOnSchedule === '1') ? true : false,
            environmentalIssuesArisingFromBusiness: (this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === 1 || this.businessApplicationForm.value.environmentalIssuesArisingFromBusiness === '1') ? true : false,
            ethicalIssuesArisingFromBsActivities: (this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === 1 || this.businessApplicationForm.value.ethicalIssuesArisingFromBsActivities === '1') ? true : false,
            incidenceOfUnpaidCheques: (this.businessApplicationForm.value.incidenceOfUnpaidCheques === 1 || this.businessApplicationForm.value.incidenceOfUnpaidCheques === '1') ? true : false,
            // tslint:disable-next-line:radix
            crbReport: parseInt(this.businessApplicationForm.value.crbReport),
            // tslint:disable-next-line:radix
            collateralType: parseInt(this.businessApplicationForm.value.collateralType),
            // tslint:disable-next-line:radix
            lawCompliant: parseInt(this.businessApplicationForm.value.lawCompliant),
        };


        console.log('here is the model being sent to the Backend');
        console.log(model);

        this._httpService.scoresPost('loans/apply', model).subscribe(
            result => {
                if (result.response.status === 200) {
                    this.toastrService.success('Record created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create!', 'Failed!');
                }
            },
            error => {
            },
            complete => {
                this.loading = false;
            }
        );
    }

    onChange($event: Event) {

    }
}
