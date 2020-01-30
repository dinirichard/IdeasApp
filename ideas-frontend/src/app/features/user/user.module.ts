import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material/material.module';
import { UiModule } from '@app/ui.module';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducer';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }
