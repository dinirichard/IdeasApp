import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material/material.module';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducer';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UuidGuard } from '@app/services/uuid.guard';
import { DateAgoPipe } from '@app/services/date-ago.pipe';

const routes: Routes = [
    { path: '', component: UsersComponent },
    {
        path: 'profile',
        component: UserProfileComponent,
    },
];

@NgModule({
    declarations: [UsersComponent, UserProfileComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('users', userReducer),
        EffectsModule.forFeature([UserEffects]),
        // InfiniteScrollModule,
    ],
})
export class UserModule { }
