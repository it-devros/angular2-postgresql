import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, PurchaseService, AlertService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
    moduleId: module.id,
    templateUrl: 'indicate.component.html'
})

export class IndicateComponent implements OnInit {
    currentUser: any;
    // suppliers: Supplier[] = [];
    suppliers: Supplier[] = [];
    users: User[] = [];
    selectedSupplier: any;
    polines: any[] = [];
    orders: any[] = [];
    selected_flag_order: number;

    constructor(
                private route: ActivatedRoute,
                private router: Router,
                private alert: AlertService,
                private userService: UserService,
                private purchase: PurchaseService) {
        console.log(localStorage.getItem('currentUser'));
        // this.currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let supplier = JSON.parse(localStorage.getItem('selectedSupplier'));
        console.log(user);
        console.log(supplier);
        this.currentUser = user;
        this.selectedSupplier = supplier;
        this.selected_flag_order = 0;

        this.getData(this.currentUser.email, this.selectedSupplier.id_suppliers).subscribe((data) =>{
            let polines = data[0];
            let orders = data[1];

            orders.forEach((m: any) => {
                this.polines = polines.filter((t: any) => {
                    return t.id_purchase_order == m.id_purchase_orders;
                });
            });
            console.log(orders);
            this.orders = orders;

        });


    }

    ngOnInit() {
        
    }

    getData(email: any, id_supplier: any): Observable<any> {
        return Observable.forkJoin([
            this.purchase.getPolinesByemail(email),
            this.purchase.getOrderBySupplier(id_supplier)
        ])
        .map((data: any[]) => {
            return data;
        });
    }

    selectOrder(selected_order: any) {
        console.log(selected_order);
        localStorage.setItem('selectedOrder', JSON.stringify(selected_order));
        this.selected_flag_order = 1;
    }

    goReceipt() {
        if(this.selected_flag_order == 1)
        {
            this.router.navigate(['/receipt']);
        }
        else
        {
            this.alert.error('You must select a Order.');
        }
    }

}