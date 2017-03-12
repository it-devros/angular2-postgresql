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

    savePurchase(id: number, sum: number) {
        console.log("save-ok");
        return this.http.post('http://localhost:3000/api/purchase_order', { 'id':id, 'sum': sum }).map((response: Response) => response.json());
    }

    saveLine(materials: any[], quantities: any[], id_supplier: number, client_name: any) {
        console.log("save-line");
        return this.http.post('http://localhost:3000/api/purchase_line', { 'materials': materials, 'quantities':quantities, 'id_supplier': id_supplier, 'client_name':client_name }).map((response: Response) => response.json());
    }

    getPolinesByemail(email: any) {
        return this.http.get('http://localhost:3000/api/polines' + email).map((response: Response) => response.json());
    }

    getOrderBySupplier(id_supplier: any) {
        return this.http.get('http://localhost:3000/api/orders' + id_supplier).map((response: Response) => response.json());
    }

    savedispatch(id: any, date: any) {
        return this.http.post('http://localhost:3000/api/dispatches', { 'id':id, 'date':date }).map((response: Response) => response.json());
    }

    savedispatchline(polines: any[]) {
        return this.http.post('http://localhost:3000/api/dispatch_line', { 'polines': polines }).map((response: Response) => response.json());
    }

    updatePO(id: any) {
        return this.http.put('http://localhost:3000/api/updatepo', { 'id': id }).map((response: Response) => response.json());
    }

}