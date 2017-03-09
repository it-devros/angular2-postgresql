import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, PurchaseService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { MaterialComponent } from './material/index';
import { QuantityComponent } from './quantity/index';
import { FinalizeComponent } from './finalize/index';
import { DispatchComponent } from './dispatch/index';
import { IndicateComponent } from './indicate/index';
import { ReceiptComponent } from './receipt/index';
import { ConfirmComponent } from './confirm/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MaterialComponent,
        QuantityComponent,
        FinalizeComponent,
        DispatchComponent,
        IndicateComponent,
        ReceiptComponent,
        ConfirmComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        PurchaseService,

        
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }