import {Component, Input, OnInit} from '@angular/core';
import {CreateUserComponent} from '../create-user/create-user.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../shared/services/http.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  @Input() formData;
  public modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  public editUser(formData: any) {
    this.modalRef = this.modalService.open(CreateUserComponent);
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = 'Edit User';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
      }
    }, (reason) => {
    });
  }

}
