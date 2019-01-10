import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { Invoice } from '../../shared/invoice.model';
import { InvoiceService } from '../../shared/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: User;
  invoices: Invoice[];
  userID;

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.userID = params["id"];
    })
  }

  ngOnInit() {

    const userSub = this.invoiceService.getUser(this.userID).subscribe(user => {
      this.customer = user;

      console.log(user);

      userSub.unsubscribe();
    })

  }

  onSubmit() {
    console.log(this.customer);

    this.invoiceService.updateCustomer(this.customer._id, this.customer).subscribe(res => {
      console.log(res)

      this.router.navigateByUrl('dashboard');

    },
      err => {
        console.log(err);
      }
    );
  }

}
