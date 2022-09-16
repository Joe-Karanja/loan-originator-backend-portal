import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-do-valuation',
  templateUrl: './do-valuation.component.html',
  styleUrls: ['./do-valuation.component.scss']
})
export class DoValuationComponent implements OnInit {
  public image:any;
  @Input() title;
  @Input() formData;
  @Input() parentData;
  public loading = false;
  public hasErrors = false;
  public errorMessages;
  public form: FormGroup;
  private valuation_id: any;
  public application: any;
  public isLoaded: boolean = false;
  
   constructor(private _activatedRoute: ActivatedRoute, private _httpService: HttpService, 
     public fb: FormBuilder, private modalService: NgbModal, public toastrService: ToastrService, public router: Router) { }
 
   ngOnInit() {
     this._activatedRoute.params.subscribe(params => {
       if (typeof params['id'] !== 'undefined') {
         this.valuation_id = params['id'];
       }
     });
     this.form = this.fb.group({
      corporate_ref_no: [ '', Validators.compose([Validators.nullValidator])],  
      examiner: [ '', Validators.compose([Validators.required])],     
      location_of_inspection: [ '', Validators.compose([Validators.required])],     
      date_of_inspection: [ '', Validators.compose([Validators.nullValidator])],  
      general_condition: [ '', Validators.compose([Validators.required])],     
      assessed_value: [ '', Validators.compose([Validators.required])],  

      date_of_reg: [ '', Validators.compose([Validators.nullValidator])],    
      serial_no: [ '', Validators.compose([Validators.nullValidator])],     
      car_type: [ '', Validators.compose([Validators.nullValidator])],     
      yom: [ '', Validators.compose([Validators.nullValidator])],         
      make: [ '', Validators.compose([Validators.nullValidator])],     
      color: [ '', Validators.compose([Validators.nullValidator])],    
      engine_rating: [ '', Validators.compose([Validators.nullValidator])],     
      engine_no: [ '', Validators.compose([Validators.nullValidator])],  
      fuel_type: [ '', Validators.compose([Validators.nullValidator])],      
      odometer_reading: [ '', Validators.compose([Validators.nullValidator])],     
      chasis_no: [ '', Validators.compose([Validators.nullValidator])],   
      tyres: [ '', Validators.compose([Validators.nullValidator])],    
      coach_work: [ '', Validators.compose([Validators.nullValidator])],     
      mechanical: [ '', Validators.compose([Validators.nullValidator])],     
      electrical: [ '', Validators.compose([Validators.nullValidator])],     
      anti_theft: [ '', Validators.compose([Validators.nullValidator])],     
      note_value: [ '', Validators.compose([Validators.nullValidator])],     
         
   
      // extras: [ '', Validators.compose([Validators.nullValidator])],     
      // remarks: [ '', Validators.compose([Validators.nullValidator])],     
      // broker: [ '', Validators.compose([Validators.nullValidator])],   
      // remedy: [ '', Validators.compose([Validators.nullValidator])],     
      // amendment: [ '', Validators.compose([Validators.nullValidator])],   

   
      // country_of_origin: [ '', Validators.compose([Validators.nullValidator])],     
      // destination: [ '', Validators.compose([Validators.nullValidator])] 
    });
     this.loadApplication();
   }
   private loadApplication(): void {
     this.isLoaded = false;
     const model = {
       "username": localStorage.getItem('username'),
       "entity": "valuation",
       "where_clause": "valuation_id",
       "where_value": this.valuation_id,
       "transaction_type": "10071"
     };
     this._httpService.post('', model).subscribe(
       result => {
         this.application = result.list[0];
       },
       error => {
       },
       complete => {
         this.isLoaded = true;
       }
     );
   }

   fileChange(input){
    const reader = new FileReader();
    if (input.files.length) {
        const file = input.files[0];
        reader.onload = () => {
            this.image = reader.result;
        }
        reader.readAsDataURL(file);           
    }
}

removeImage():void{
    this.image = '';
}

public submitData(): void {
  console.log(localStorage.getItem('username'));
  this.isLoaded = false;
  this.form.value.username = localStorage.getItem('username');
  this.form.value.transaction_type = '10083';
  this.form.value.valuation_id = Number(this.valuation_id);
  this.form.value.assessed_value = Number(this.form.value.assessed_value);
  this.form.value.note_value = Number(this.form.value.note_value);



  this._httpService.post('', this.form.value).subscribe(
    result => {
      if(result.response.response_code == '00'){
        this.toastrService.success('Valuation completed successfully!', 'Success!');
        this.router.navigateByUrl('valuations/valued');
      } else{
      this.toastrService.error('Failed to valuate!', 'Failed!');
      }
    },
    error => {
    },
    complete => {
      this.isLoaded = true;
    }
  );
}

}
