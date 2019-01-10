import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

import { environment } from '../../environments/environment';
import { Invoice } from './invoice.model';
import { User } from './user.model';
import { Globals } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  globals: Globals;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  getInvoices() {
    return this.http.get(environment.apiBaseUrl + '/invoices', this.noAuthHeader).pipe(map((response: any) =>
      response.map(invoice => new Invoice().deserialize(invoice)))
    );
  }

  getInvoice(id): Observable<Invoice> {
    return this.http.get(environment.apiBaseUrl + '/invoices/invoice/' + id, this.noAuthHeader).pipe(map((response: any) => new Invoice().deserialize(response)));
  }

  delInvoice(id) {
    return this.http.delete(environment.apiBaseUrl + '/invoices/' + id, this.noAuthHeader);
  }

  getCustomerInvoice(id) {
    return this.http.get(environment.apiBaseUrl + '/invoices/customer/' + id, this.noAuthHeader).pipe(map((response: any) =>
      response.map(invoice => new Invoice().deserialize(invoice)))
    );
  }

  updateInvoice(invoice) {
    console.log('service file');
    return this.http.post(environment.apiBaseUrl + '/invoices/update', invoice, this.noAuthHeader);
  }

  addInvoice(invoice) {
    return this.http.post(environment.apiBaseUrl + '/invoices/add', invoice, this.noAuthHeader);
  }


  getUsers() {
    return this.http.get(environment.apiBaseUrl + '/customers', this.noAuthHeader).pipe(map((response: any) =>
      response.map(user => new User().deserialize(user)))
    );
  }

  getUser(id): Observable<User> {
    return this.http.get(environment.apiBaseUrl + '/customers/' + id, this.noAuthHeader).pipe(map((response: any) => new User().deserialize(response)));
  }

  updateCustomer(id, customer) {
    console.log('service file');
    return this.http.put(environment.apiBaseUrl + '/customers/' + id, customer, this.noAuthHeader);
  }

  delCustomer(id) {
    console.log("client service file: " + id);

    return this.http.delete(environment.apiBaseUrl + '/customers/' + id, this.noAuthHeader);
  }

  // $scope.getInvoice = function () {
  //   var id = $routeParams.id;
  //   $http.get('/api/invoices/' + id).success(function (response) {
  //     $scope.invoice = response;
  //     //Fill Select
  //     $scope.invoice.customer_id = response.customer._id;
  //     $scope.invoice.status = response.invoice.status;
  //   });
  // }

  // $scope.getCustomers = function () {
  //   $http.get('/api/customers').success(function (response) {
  //     $scope.customers = response;
  //   });
  // }

  // $scope.addInvoice = function () {
  //   $http.post('/api/invoices/', $scope.invoice).success(function (response) {
  //     window.location.href = '/#invoices';
  //   });
  // }

  // $scope.updateInvoice = function () {
  //   $http.put('/api/invoices/' + $scope.invoice._id, $scope.invoice).success(function (response) {
  //     window.location.href = '/#invoices';
  //   });
  // }

  // $scope.deleteInvoice = function (id) {
  //   $http.delete('/api/invoices/' + id).success(function (response) {
  //     window.location.href = '/#invoices';
  //   });
  // }

}
