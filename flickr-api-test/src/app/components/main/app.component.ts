import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="app">
              <h3>Flickr api test challenge app</h3>
              <router-outlet></router-outlet>
            </div>`
})
export class AppComponent {}