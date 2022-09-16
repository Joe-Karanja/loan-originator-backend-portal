import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {HttpService} from 'src/app/shared/services/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
    selector: 'app-create-user',
    templateUrl: './create-cycle.component.html',
    styleUrls: ['./create-cycle.component.scss']
})
export class CreateCycleComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal,
        public fb: FormBuilder,
        // tslint:disable-next-line:variable-name
        private _httpService: HttpService,
        private httpClient: HttpClient,
        public toastrService: ToastrService) {
    }

    @ViewChild('fileInput') fileInput: ElementRef;

    @Input() title;
    @Input() formData;

    public loading = false;
    public hasErrors = false;
    public errorMessages;
    public form: FormGroup;

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

    ngOnInit() {

        this.form = this.fb.group({
            startDate: [this.formData ? this.formData.businessName : '', Validators.required],
            endDate: [this.formData ? this.formData.operationYrs : '', Validators.required],
        });
    }


    public submitData(): void {
        this.saveChanges();
        this.loading = true;
    }

    public closeModal(): void {
        this.activeModal.dismiss('Cross click');
    }

    public submit(): void {

        const model = { ...this.form.value,
            orgId: 1,
            // tslint:disable-next-line:radix
            startDate: parseInt(this.form.value.startDate),
            // tslint:disable-next-line:radix
            endDate: parseInt(this.form.value.endDate),

        };


        console.log('this is the model to create a cycle');
        console.log(model);

        this._httpService.scoresPost('loan/cycle/create', model)
            .subscribe(res => {
                console.log(res);
                if (res) {
                    this.toastrService.success('Cycle created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create cycle!', 'Failed!');
                }
            }
        );
    }

    private saveChanges(): any {

        const model = { ...this.form.value,
            orgId: 1,
            // tslint:disable-next-line:radix
            startDate: parseInt(this.form.value.startDate),
            // tslint:disable-next-line:radix
            endDate: parseInt(this.form.value.endDate),
        };


        this._httpService.scoresPost('loan/cycle/create', model).subscribe(
            result => {
                if (result.response.status === 200) {
                    this.toastrService.success('Cycle created successfully!', 'Created Successfully!');
                    this.activeModal.close('success');
                } else {
                    this.toastrService.error('Failed to create Cycle!', 'Failed!');
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
