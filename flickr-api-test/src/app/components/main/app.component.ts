import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../_services/flickr.service';
import { SearchModel } from '../../_models/search.model';
import { ListModel } from '../../_models/list.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from '../../_services/storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';

import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FlickrService]
})

export class AppComponent implements OnInit {  
  title = 'app';
  model: Observable<any>;
  private listItems: ListModel[] = [];
  private queryItem : SearchModel;

  constructor(private flickrService: FlickrService){
  }

  ngOnInit(){
      // Empty queryItem
      this.queryItem = {
        tag : '',
        itemsPerPage : 1,
        userId : '',
        success: true // by default this flag is true to hide the non-data-found notification
      };       
  }

  // Event that will be triggered by the filter on the main page
  public onSubmit(){
    // We call the flicker-api to get some data
    this.flickrService.getSearchResult(this.queryItem)
      .subscribe(
        response => {
          // If the response is null, we've to notify the user           
          if(response === null){
            this.queryItem.success = false;
          }
          else{                   
            // Otherwise, we've to add the successfull query to our list (listItems)
            this.queryItem.success = true; 
            // Object that will be added to the list
            let item : ListModel = {
              dateTaken : response[0].dateTaken,
              tag: response[0].tag,
              imageUrl: response[0].imageUrl,
              title: response[0].title,
              ownerName: response[0].ownerName,
              uploadDate: response[0].uploadDate,
              views: response[0].views,
              userId: response[0].userId
            };
            console.log(item);
            this.listItems.push(item); 
          }
        });          
  }

  public onClearData(){
    this.queryItem = {
      tag : '',
      itemsPerPage : 1,
      userId : '',
      success: true // by default this flag is true to hide the non-data-found notification
    };       
    this.listItems = [];
  }

  public onGoToDetail(){    
  }
}
