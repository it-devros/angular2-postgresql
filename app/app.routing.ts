import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { MaterialComponent } from './material/index';
import { QuantityComponent } from './quantity/index';
import { FinalizeComponent } from './finalize/index';
import { DispatchComponent } from './dispatch/index';
import { IndicateComponent } from './indicate/index';
import { ReceiptComponent } from './receipt/index';
import { ConfirmComponent } from './confirm/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'material', component: MaterialComponent, canActivate: [AuthGuard] },
    { path: 'quantity', component: QuantityComponent, canActivate: [AuthGuard] },
    { path: 'finalize', component: FinalizeComponent, canActivate: [AuthGuard] },
    { path: 'dispatch', component: DispatchComponent, canActivate: [AuthGuard] },
    { path: 'indicate', component: IndicateComponent, canActivate: [AuthGuard] },
    { path: 'receipt', component: ReceiptComponent, canActivate: [AuthGuard] },
    { path: 'confirm', component: ConfirmComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);