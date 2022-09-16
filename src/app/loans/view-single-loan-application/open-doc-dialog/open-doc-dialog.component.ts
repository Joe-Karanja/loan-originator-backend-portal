import { HttpService } from './../../../shared/services/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-open-doc-dialog',
  templateUrl: './open-doc-dialog.component.html',
  styleUrls: ['./open-doc-dialog.component.scss']
})
export class OpenDocDialogComponent implements OnInit {
  @Input() docData: any;
  @Input() userData: any;
  username: any;
  constructor(
    private activeModal: NgbActiveModal,
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.username = this.httpService.Username()
  }
  close() {
    this.activeModal.close()
  }

}
