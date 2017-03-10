import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Supplier } from '../_models/index';
import { UserService, AuthenticationService, PurchaseService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: any;
    // suppliers: Supplier[] = [];
    suppliers: Supplier[] = [];
    users: User[] = [];
    selected_flag: number;
    

    constructor(
                private route: ActivatedRoute,
                private router: Router,
                private alert: AlertService,
                private userService: UserService,
                private auth: AuthenticationService,
                private purchase: PurchaseService) {
        console.log(localStorage.getItem('currentUser'));
        // this.currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        this.currentUser = user;
        this.purchase.getSuppliers().subscribe(
            data => { 
                this.suppliers = data
            },
            error => {
                this.alert.error('There are no suppliers.');
            });
        // this.currentUser = this.auth.getCurrentUser();
        this.selected_flag = 0;
    }

    ngOnInit() {
        
    }

    selectSupplier(selected_supplier: any) {
        console.log(selected_supplier);
        localStorage.setItem('selectedSupplier', JSON.stringify(selected_supplier));
        this.selected_flag = 1;
    }

    goMaterial() {
        if(this.selected_flag == 1)
        {
            this.router.navigate(['/material']);
        }
        else
        {
            this.alert.error('You must select a supplier.');
        }
    }

}