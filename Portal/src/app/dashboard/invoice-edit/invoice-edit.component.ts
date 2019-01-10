import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/invoice.model';
import { User } from '../../shared/user.model';
import { InvoiceService } from '../../shared/invoice.service';
import { Globals } from '../../shared/global';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {

  invoiceID;
  invoice: Invoice;
  users: User[];

  constructor(private router: Router, private invoiceService: InvoiceService, public globals: Globals, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.invoiceID = params["id"];
    })
  }

  ngOnInit() {

    const invoiceSub = this.invoiceService.getInvoice(this.invoiceID).subscribe(invoice => {
      this.invoice = invoice;
      invoiceSub.unsubscribe();
    });

    const userSub = this.invoiceService.getUsers().subscribe(users => {
      this.users = users;
      userSub.unsubscribe();

      console.log(users);
    })

  }

  onSubmit() {
    console.log(this.invoice);

    this.invoiceService.updateInvoice(this.invoice).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('dashboard/invoice');
    },
      err => {
        console.log(err);
      }
    );
  }
}
