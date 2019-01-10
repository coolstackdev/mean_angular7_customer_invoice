import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { InvoiceService } from '../../shared/invoice.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customer = new User();

  constructor(private router: Router, private invoiceService: InvoiceService, private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.customer);

    // this.invoiceService.addCustomer(this.customer).subscribe(res => {
    //   console.log(res)

    //   this.router.navigateByUrl('dashboard');

    // },
    //   err => {
    //     console.log(err);
    //   }
    // );

    this.userService.postUser(this.customer).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('dashboard');
    },
      err => {
        console.log(err);
      }
    );
  }
}
