import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-audit-trail',
  templateUrl: './view-audit-trail.component.html',
  styleUrls: ['./view-audit-trail.component.scss']
})
export class ViewAuditTrailComponent implements OnInit {
  @Input() formData;
  constructor() { }

  ngOnInit() {
    console.log(this.formData);
  }

}
