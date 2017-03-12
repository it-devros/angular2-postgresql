import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, PurchaseService, AlertService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    moduleId: module.id,
    templateUrl: 'quantity.component.html'
})

export class QuantityComponent implements OnInit {
    currentUser: User;
    supplier: Supplier;
    users: User[] = [];
    now_date: number;
    now_month: number;
    now_year: number;
    materials: any[] = [];
    ids: any[] = [];
    types: any[] = [];
    p_quantity: any[] = [];
    p_sum: any[] = [];
    sum: any;
    sumcom: any;

    constructor(
            private route: ActivatedRoute,
            private router: Router,
            private alert: AlertService,
            private purchase: PurchaseService,
            private userService: UserService
        ) {

            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.supplier = JSON.parse(localStorage.getItem('selectedSupplier'));
            this.ids = JSON.parse(localStorage.getItem('selectedMaterialsID'));
            
            var time_temp = new Date();
            this.now_date = time_temp.getDate();
            this.now_month = time_temp.getMonth();
            this.now_year = time_temp.getFullYear();

            this.getData().subscribe((data) =>{
            
                this.materials = data[0];
                this.types = data[1];

                let maters = data[0].filter((element: any) => {
                        return this.ids.includes(element.id_material);
                });

                this.materials = maters;
                console.log("materials", this.materials);

                this.materials.map((p:any) => {
                let type = this.types.filter((t:any) => {
                    return t.id_materialtype == p.id_materialtype;
                });
                if(type.length > 0) {
                    p.id_materialtype = type[0].description;
                }
            });

        });
        
        this.sum = 0;
        this.sumcom = 0;

    }

    ngOnInit() {
        this.loadAllUsers();
        
    }

    setSum(quantity: any) {
        this.sum = 0;
        var temp_sum = 0;
        for(var i = 0 ; i < this.p_quantity.length ; i++)
        {
            if(this.p_quantity[i] == quantity)
            {
                temp_sum = quantity * this.materials[i].price;
            }
        }
        this.sum = temp_sum + this.sumcom;
        this.sumcom = this.sum;
    }

    goFinalize() {
        if(this.p_quantity.length == 0)
        {
            this.alert.error('You must select at least one Quantity.');
        }
        else
        {
            localStorage.setItem('selectedQuantity', JSON.stringify(this.p_quantity));
            this.router.navigate(['/finalize']);
            
        }
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    getData(): Observable<any> {
        return Observable.forkJoin([
            this.purchase.getMaterialsAll(),
            this.purchase.getTypesAll()
        ])
        .map((data: any[]) => {
            return data;
        });
    }

}