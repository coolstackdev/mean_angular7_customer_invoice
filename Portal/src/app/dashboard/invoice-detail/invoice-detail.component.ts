import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/invoice.model';
import { InvoiceService } from '../../shared/invoice.service';
import { Globals } from '../../shared/global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Invoice;
  invoiceID: string;

  constructor(private invoiceService: InvoiceService, public globals: Globals, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.invoiceID = params["id"];
    })
  }

  ngOnInit() {

    const invoiceSub = this.invoiceService.getInvoice(this.invoiceID).subscribe(invoice => {
      this.invoice = invoice;
      console.log('component');
      console.log(invoice);
      invoiceSub.unsubscribe();
    })
  }

}
