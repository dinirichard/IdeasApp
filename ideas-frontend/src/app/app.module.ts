import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthService } from '@app/services/auth.service';
import { ApiService } from '@app/services/api.service';
import { AppStoreModule } from './store/app-store.module';
import { AuthComponent } from './components/auth/auth.component';
import { UiModule } from './ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UuidGuard } from './services/uuid.guard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DateAgoPipe } from './services/date-ago.pipe';

@NgModule({
    declarations: [AppComponent, AuthComponent, NavbarComponent],
    imports: [
        AppRoutingModule,
        AppStoreModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UiModule,
        MaterialModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
    ],
    providers: [AuthService, ApiService, UuidGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
