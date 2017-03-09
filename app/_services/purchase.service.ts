import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Supplier } from '../_models/index';


@Injectable()
export class PurchaseService {
    
    constructor(private http: Http) { }

    getSuppliers() {
        console.log("supplier");
        return this.http.get('http://localhost:3000/api/suppliers').map((response: Response) => response.json());
    }

}