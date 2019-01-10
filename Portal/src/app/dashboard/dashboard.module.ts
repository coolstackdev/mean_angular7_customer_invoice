import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InvoicesComponent,
    InvoiceAddComponent,
    InvoiceDetailComponent,
    InvoiceEditComponent,
    CustomersComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})

export class DashboardModule { }
