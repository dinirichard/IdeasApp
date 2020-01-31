import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@app/material/material.module';
import { UiModule } from '@app/ui.module';
import { IdeasComponent } from './ideas/ideas.component';
import { IdeaEffects } from './state/idea.effects';
import { ideaReducer } from './state/idea.reducer';

const routes: Routes = [
  { path: '', component: IdeasComponent },
  // {
  //   path: 'new',
  //   component: NewIdeaComponent,
  //   canActivate: [AuthService]
  // },
  // {
  //   path: ':id',
  //   component: SelectedIdeaComponent,
  //   canActivate: [UUIDGuard],
  //   resolve: { data: IdeaResolver }
  // },
  // {
  //   path: ':id/edit',
  //   component: EditIdeaComponent,
  //   canActivate: [UUIDGuard, AuthService],
  //   resolve: { data: IdeaResolver }
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [IdeasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('ideas', ideaReducer),
    EffectsModule.forFeature([IdeaEffects])
  ]
})
export class IdeaModule { }
