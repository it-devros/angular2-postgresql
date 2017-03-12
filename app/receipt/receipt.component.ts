import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, PurchaseService, AlertService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
    moduleId: module.id,
    templateUrl: 'receipt.component.html'
})

export class ReceiptComponent implements OnInit {
    currentUser: any;
    // suppliers: Supplier[] = [];
    suppliers: Supplier[] = [];
    users: User[] = [];
    selectedSupplier: any;
    selectedOrder: any;
    polines: any[] = [];
    orders: any[] = [];
    print_maters: any[] = [];
    entered: any[] = [];
    dispatch_num: any;
    dispatch_date: any;
    selected_flag_receipt: number;

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
        let order = JSON.parse(localStorage.getItem('selectedOrder'));
        console.log(user);
        console.log(supplier);
        this.currentUser = user;
        this.selectedSupplier = supplier;
        this.selectedOrder = order;
        this.selected_flag_receipt = 0;

        this.getData(this.currentUser.email, this.selectedSupplier.id_suppliers).subscribe((data) =>{

            let lines = data[0];
            let ords = data[1];
            let maters = data[2];

            console.log("selectedOrder:", this.selectedOrder);
            console.log("lines:", lines);
            console.log("orders:", ords);
            console.log("materials:", maters);

            this.polines = lines.filter((t: any) => {
                return t.id_purchase_order == this.selectedOrder.id_purchase_orders;
            });

            console.log("polines:", this.polines);

            //this.orders = ords;
            let mater_description;
            this.polines.forEach((m: any) => {

                mater_description = maters.filter((t:any) => {
                    return t.id_material == m.id_material;
                });
                mater_description.forEach((e:any ) => {
                    this.print_maters.push(e);
                });
            });
            
            console.log("maters:", this.print_maters);

        });


    }

    ngOnInit() {
        
    }

    getData(email: any, id_supplier: any): Observable<any> {
        return Observable.forkJoin([
            this.purchase.getPolinesByemail(email),
            this.purchase.getOrderBySupplier(id_supplier),
            this.purchase.getMaterialsAll()
        ])
        .map((data: any[]) => {
            return data;
        });
    }

    setDispatch_num() {
        this.selected_flag_receipt++;
        localStorage.setItem('dispatchNum', this.dispatch_num);
    }

    setEntered() {
        this.selected_flag_receipt = 2;
        localStorage.setItem('enteredQuantities', JSON.stringify(this.entered));
    }

    setDispatch_date() {
        this.selected_flag_receipt++;
        localStorage.setItem('dispatchDate', this.dispatch_date);
    }

    goConfirm() {
        if(this.selected_flag_receipt != 0)
        {
            this.router.navigate(['/confirm']);
        }
        else
        {
            this.alert.error('You must put in the dispatch number.');
        }
    }

}