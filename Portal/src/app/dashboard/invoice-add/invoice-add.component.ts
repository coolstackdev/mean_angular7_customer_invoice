import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/invoice.model';
import { User } from '../../shared/user.model';
import { InvoiceService } from '../../shared/invoice.service';
import { Globals } from '../../shared/global';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {
  invoiceID;
  invoice: Invoice;
  users: User[];

  constructor(private router: Router, private invoiceService: InvoiceService, public globals: Globals, private route: ActivatedRoute) { }

  ngOnInit() {

    this.invoice = new Invoice();

    const userSub = this.invoiceService.getUsers().subscribe(users => {
      this.users = users;
      userSub.unsubscribe();

      console.log(users);
    })
  }


  onSubmit() {

    console.log(this.invoice);

    this.invoiceService.addInvoice(this.invoice).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('dashboard/invoice');
    },
      err => {
        console.log(err);
      }
    );
  }

}
