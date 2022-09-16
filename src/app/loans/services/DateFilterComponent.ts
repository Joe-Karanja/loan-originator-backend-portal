import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import {DefaultFilter} from 'ng2-smart-table/components/filter/filter-types/default-filter';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

@Component({
    selector: 'date-filter',
    template: `<input [formControl]="inputControl" class="form-control" type="date" />`
})
export class DateFilterComponent extends DefaultFilter implements OnInit, OnChanges {
    inputControl = new FormControl('');

    constructor() {
        super();
    }

    ngOnInit() {
        this.inputControl.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(this.delay),
            )
            .subscribe((value: number) => {
                this.query = value !== null ? this.inputControl.value.toString() : '';
                this.setFilter();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.query) {
            this.query = changes.query.currentValue;
            this.inputControl.setValue(this.query);
        }
    }
}
