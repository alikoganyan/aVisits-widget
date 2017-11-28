import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {MainComponent} from './layouts/main/main.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {path: ':widget', component: MainComponent}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
