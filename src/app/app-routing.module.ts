import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'user', redirectTo: '/user', pathMatch: 'full' },
      { path: 'image', redirectTo: '/image', pathMatch: 'full'},
      { path: '', redirectTo: '/home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
