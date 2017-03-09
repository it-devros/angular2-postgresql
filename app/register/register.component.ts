import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    console.log(data);
                    if (data.command == 'INSERT')
                    {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    }
                    if (data.command == 'SELECT')
                    {
                        console.log("failed");
                        this.alertService.error('Registration failed because there is your email already.');
                        this.loading = false;
                    }
                },
                error => {
                    console.log(error);
                    this.alertService.error('Registration failed because there is your email already.');
                    this.loading = false;
                });
    }
}
