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
    { path: 'material', component: MaterialComponent },
    { path: 'quantity', component: QuantityComponent },
    { path: 'finalize', component: FinalizeComponent },
    { path: 'dispatch', component: DispatchComponent },
    { path: 'indicate', component: IndicateComponent },
    { path: 'receipt', component: ReceiptComponent },
    { path: 'confirm', component: ConfirmComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);