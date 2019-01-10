import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomersComponent },
      { path: 'invoice', component: InvoicesComponent },
      { path: 'invoice/add', component: InvoiceAddComponent },
      { path: 'invoice/edit/:id', component: InvoiceEditComponent },
      { path: 'invoice/detail/:id', component: InvoiceDetailComponent },
      { path: 'customer', component: CustomersComponent },
      { path: 'customer/add', component: CustomerAddComponent },
      { path: 'customer/edit/:id', component: CustomerEditComponent },
      { path: 'customer/detail/:id', component: CustomerDetailComponent },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
