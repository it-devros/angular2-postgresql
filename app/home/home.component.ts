import { Component, OnInit } from '@angular/core';

import { User, Supplier } from '../_models/index';
import { UserService, AuthenticationService, PurchaseService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: any;
    suppliers: Supplier[] = [];
    users: User[] = [];

    constructor(private userService: UserService,
                private auth: AuthenticationService,
                private purchase: PurchaseService) {
        console.log(localStorage.getItem('currentUser'));
        // this.currentUser = localStorage.getItem('currentUser');
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        this.currentUser = user;
        let supplies = this.purchase.getSuppliers();
        console.log(supplies);
        // this.currentUser = this.auth.getCurrentUser();
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
}