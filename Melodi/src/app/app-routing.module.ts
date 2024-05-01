import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormGirasComponent } from './formularios/form-giras/form-giras.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'form-giras', component: FormGirasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
