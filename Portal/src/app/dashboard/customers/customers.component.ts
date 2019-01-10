import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { InvoiceService } from '../../shared/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private invoiceService: InvoiceService) { }

  ngOnInit() {
    const userSub = this.invoiceService.getUsers().subscribe(users => {
      this.users = users;
      userSub.unsubscribe();
      console.log(users);
    })

  }

  deleteCustomer(id) {
    console.log('del clicked' + id);

    this.invoiceService.delCustomer(id).subscribe(res => {
      console.log(res)
      window.location.href = '/dashboard';
    },
      err => {
        console.log(err);
        window.location.href = '/dashboard';
      }
    );

  }

}
