import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact the Admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser.firstName = '';
    this.userService.selectedUser.lastName = '';
    this.userService.selectedUser.company = '';
    this.userService.selectedUser.logoUrl = '';
    this.userService.selectedUser.email = '';
    this.userService.selectedUser.phone = '';
    this.userService.selectedUser.street = '';
    this.userService.selectedUser.state = '';
    this.userService.selectedUser.city = '';
    this.userService.selectedUser.zip = '';
    this.userService.selectedUser.password = '';

    form.resetForm();
    this.serverErrorMessages = '';
  }

}
