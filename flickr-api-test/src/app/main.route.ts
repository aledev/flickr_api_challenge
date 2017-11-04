import { Routes, RouterModule }   from '@angular/router';
import { AppComponent } from './components/main/app.component';

export const mainRoutes: Routes = [
  { path: '', component: AppComponent }
];
export const mainRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(mainRoutes);