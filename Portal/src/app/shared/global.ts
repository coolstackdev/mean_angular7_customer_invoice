import { Injectable } from '@angular/core';
import { Invoice } from './invoice.model';

@Injectable()
export class Globals {

    invoice_id: string;
    selInvoice = new Invoice();

}