import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, PurchaseService, AlertService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
    moduleId: module.id,
    templateUrl: 'confirm.component.html'
})

export class ConfirmComponent implements OnInit {
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
    selected_flag_confirm: number;
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
        this.dispatch_num = localStorage.getItem('dispatchNum');
        this.dispatch_date = localStorage.getItem('dispatchDate');
        this.entered = JSON.parse(localStorage.getItem('enteredQuantities'));
        console.log(user);
        console.log(supplier);
        this.currentUser = user;
        this.selectedSupplier = supplier;
        this.selectedOrder = order;
        this.selected_flag_confirm = 0;

        this.getData(this.currentUser.email, this.selectedSupplier.id_suppliers).subscribe((data) =>{

            let lines = data[0];
            let ords = data[1];
            let maters = data[2];

            this.polines = lines.filter((t: any) => {
                return t.id_purchase_order == this.selectedOrder.id_purchase_orders;
            });

            let mater_description;
            this.polines.forEach((m: any) => {

                mater_description = maters.filter((t:any) => {
                    return t.id_material == m.id_material;
                });
                mater_description.forEach((e:any ) => {
                    this.print_maters.push(e);
                });
            });
            
            console.log("polines", this.polines);
            console.log("print_maters", this.print_maters);

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

    goConfirm() {
        this.purchase.savedispatch(this.selectedOrder.id_purchase_orders, this.dispatch_date).subscribe(
            data => {
                this.purchase.savedispatchline(this.polines).subscribe(
                    date => {
                        this.alert.success('Dispatch request completed successfully.');
                        this.purchase.updatePO(this.selectedOrder.id_purchase_orders).subscribe(data => {
                            
                        });
                    },
                    error => {
                        this.alert.error('Some errors detected.');
                });
            },
            error => {
                this.alert.error(error);
        });
    }

    
}
