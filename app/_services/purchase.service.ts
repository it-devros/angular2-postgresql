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

    getMaterialsAll() {
        console.log("materials");
        return this.http.get('http://localhost:3000/api/materials').map((response: Response) => response.json());
    }

    getTypesAll() {
        console.log("types");
        return this.http.get('http://localhost:3000/api/types').map((response: Response) => response.json());
    }

    getMaterialBySupplierID(supplierID: number) {
        console.log("material");
        return this.http.get('http://localhost:3000/api/suppliers_materials' + supplierID).map((response: Response) => response.json());
    }

    getMaterialByID(materialID: number) {
        console.log("material - second");
        return this.http.get('http://localhost:3000/api/materials' + materialID).map((response: Response) => response.json());
    }

    getTypeByID(typeID: number) {
        console.log("type");
        return this.http.get('http://localhost:3000/api/types' + typeID).map((response: Response) => response.json());
    }

}