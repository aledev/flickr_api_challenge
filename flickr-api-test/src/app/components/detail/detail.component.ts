import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlickrService } from '../../_services/flickr.service';

import { SearchModel } from '../../_models/search.model';
import { LiteItemModel } from '../../_models/lite-item.model';

@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [FlickrService]
})

export class DetailComponent implements OnInit, OnDestroy  {
  tag: string;
  userId: string;
  private sub: any;
  private listItems: LiteItemModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private flickrService: FlickrService) {
  }

  ngOnInit() {   
    this.sub = this.route.params.subscribe(params => {
      this.tag = params['tag'];
      this.userId = params['userId'] === undefined ? '' : params['userId'];    
      this.getDetailData(); 
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  // Method to obtain the "detail data" of the flickr-api past search
  // In this case, we're obtain data just for tag and userId (optional) parameters
  public getDetailData(){            
      // Create a query object to do the request 
      let searchItem : SearchModel = {
        tag : this.tag,
        userId : this.userId,
        itemsPerPage : 0,
        success : false                
      };

      console.log(searchItem);

      // We call the flicker-api to get the detail data
      this.flickrService.getPhotosDetail(searchItem)
      .subscribe(
        response => {
          // If the response is null, we do nothing           
          if(response === null){
            this.listItems = [];
          }
          else{                   
            // Otherwise, we've to add the successfull query item(s) to our list (listItems)
            response.forEach(element => {
              // Create a new ListModel object with the service properties
              let item : LiteItemModel = {
                tag: element.tag,
                imageUrl: element.imageUrl,
                title: element.title
              };              
              // Object that will be added to the list  
              this.listItems.push(item); 
            });          
          }
        });          
    }
}
