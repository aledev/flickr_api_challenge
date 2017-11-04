import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';;
import { Routes, RouterModule, provideRoutes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './components/main/app.component';
import { DetailComponent } from './components/detail/detail.component';
import { RootComponent } from './components/root/root.component';
import { routing, mainRoutingProviders } from './main.route';

export const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: AppComponent },
  { path: 'detail', component: DetailComponent }
];

@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    mainRoutingProviders,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),    
  ],
  providers: [],
  entryComponents: [RootComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule { }
