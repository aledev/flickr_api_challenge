import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';;
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './components/main/app.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'detail/:tag', component: DetailComponent },
  { path: 'detail/:tag/:userId', component: DetailComponent },
  {path: '**', component: HomeComponent} 
];

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AlertModule.forRoot(),    
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
