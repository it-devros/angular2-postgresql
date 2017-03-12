import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, PurchaseService, AlertService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    moduleId: module.id,
    templateUrl: 'material.component.html'
})

export class MaterialComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    supplier: Supplier;
    now_date: number;
    now_month: number;
    now_year: number;
    price: number[] = [];
    id_sup_mater: number[] = [];
    materials: any[] = [];
    types: any[] = [];
    type_mater: any[] = [];
    print_maters: any[] = [];
    flag_set: any[] = [];
   

    constructor(
            private route: ActivatedRoute,
            private router: Router,
            private alert: AlertService,
            private purchase: PurchaseService,
            private userService: UserService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.supplier = JSON.parse(localStorage.getItem('selectedSupplier'));
        var time_temp = new Date();
        this.now_date = time_temp.getDate();
        this.now_month = time_temp.getMonth();
        this.now_year = time_temp.getFullYear();

        this.getData(this.supplier.id_suppliers).subscribe((data) =>{
            data[0].forEach((d:any) => {
                this.id_sup_mater.push(d.id_material); 
            });

            this.materials = data[1];
            this.types = data[2];

            this.materials.forEach((m :any) => {
                if(this.id_sup_mater.includes(m.id_material)) {
                    this.print_maters.push(m);
                }
            });

            this.print_maters.map((p:any) => {
                let type = this.types.filter((t:any) => {
                    return t.id_materialtype == p.id_materialtype;
                });
                if(type.length > 0) {
                    p.id_materialtype = type[0].description;
                }
            });
            console.log("print", this.print_maters);
        });
       
    }

    ngOnInit() {
        this.loadAllUsers();
        
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    getData(id: any): Observable<any> {
        return Observable.forkJoin([
            this.purchase.getMaterialBySupplierID(id),
            this.purchase.getMaterialsAll(),
            this.purchase.getTypesAll()
        ])
        .map((data: any[]) => {
            return data;
        });
    }

    setMaterial(id: any) {
        if (this.flag_set.includes(id))
        {
            let flag_set_temp = this.flag_set.filter((element: any) => {
                return element != id;
            });
            this.flag_set = flag_set_temp;
        }
        else
        {
            this.flag_set.push(id);
        }
        console.log("flag", this.flag_set);
    }

    goQuantity() {
        if(this.flag_set.length == 0)
        {
            this.alert.error('You must select at least one Material.');
        }
        else
        {
            localStorage.setItem('selectedMaterialsID', JSON.stringify(this.flag_set));
            this.router.navigate(['/quantity']);
            
        }
    }

}