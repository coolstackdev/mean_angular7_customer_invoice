import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { Invoice } from '../../shared/invoice.model';
import { InvoiceService } from '../../shared/invoice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  user: User;
  invoices: Invoice[];
  userID;

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userID = params["id"];
    })
  }

  ngOnInit() {

    const userSub = this.invoiceService.getUser(this.userID).subscribe(user => {
      this.user = user;
      console.log('sel user');
      console.log(user);


      const invoiceSub = this.invoiceService.getCustomerInvoice(this.user._id).subscribe(invoices => {
        this.invoices = invoices;
        console.log('invoices');
        console.log(invoices);

        invoiceSub.unsubscribe();
      });

      userSub.unsubscribe();

    })

  }

}
