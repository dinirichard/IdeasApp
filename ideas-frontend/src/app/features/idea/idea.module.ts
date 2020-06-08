import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgCountPipeModule } from 'angular-pipes';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '@app/material/material.module';
import { IdeasComponent, DialogNewIdeaComponent } from './ideas/ideas.component';
import { IdeaEffects } from './state/idea.effects';
import { ideaReducer } from './state/idea.reducer';
import { SelectedIdeaComponent } from './selected-idea/selected-idea.component';
import { IdeaResolver } from './idea.resolver';
import { UuidGuard } from '@app/services/uuid.guard';
import { NewIdeaComponent } from './new-idea/new-idea.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DateAgoPipe } from '@app/services/date-ago.pipe';
const routes: Routes = [
    { path: '', component: IdeasComponent },
    // {
    //   path: 'new',
    //   component: NewIdeaComponent,
    //   canActivate: [AuthService]
    // },
    {
        path: ':id',
        component: SelectedIdeaComponent,
        canActivate: [UuidGuard],
        resolve: { data: IdeaResolver },
    },
    // {
    //   path: ':id/edit',
    //   component: EditIdeaComponent,
    //   canActivate: [UuidGuard, AuthService],
    //   resolve: { data: IdeaResolver }
    // },
    { path: '**', redirectTo: '' },
];

@NgModule({
    declarations: [IdeasComponent, SelectedIdeaComponent, NewIdeaComponent, DialogNewIdeaComponent],
    imports: [
        CommonModule,
        MaterialModule,
        InfiniteScrollModule,
        NgCountPipeModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('ideas', ideaReducer),
        EffectsModule.forFeature([IdeaEffects]),
    ],
    providers: [IdeaResolver],
})
export class IdeaModule { }
