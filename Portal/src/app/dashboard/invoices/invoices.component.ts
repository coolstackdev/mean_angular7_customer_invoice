import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/invoice.model';
import { InvoiceService } from '../../shared/invoice.service';
import { Globals } from '../../shared/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[];

  constructor(private router: Router, private invoiceService: InvoiceService, public globals: Globals) { }

  ngOnInit() {

    const invoiceSub = this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;

      console.log(this.invoices);

      invoiceSub.unsubscribe();
    })

  }

  deleteInvoice(id) {
    this.invoiceService.delInvoice(id).subscribe(res => {
      console.log(res)
      window.location.href = '/dashboard/invoice';
    },
      err => {
        console.log(err);
        window.location.href = '/dashboard/invoice';
      }
    );

  }

}
