import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Model that the view will send with the query parameters
import { SearchModel } from '../_models/search.model';

@Injectable()
export class FlickrService{
    result : Observable<any>;
    // Flickr api key
    apiKey = '530bf8156cfb70d0a7f891e9e74ee790';

    // Empty constructor
    constructor(private http:Http) {        
    }

    // Method to get the result of the flickr-api query
    // The query parameters are: tags, items per page(one by default) and user id
    getSearchResult(queryItem: SearchModel){
        // Url with the parameters to search by tag, and limit the ammount of items per page
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search` +
                  `&api_key=${this.apiKey}&tags=${queryItem.tag}&per_page=${queryItem.itemsPerPage}` + 
                  `&extras=date_taken,owner_name,url_q,date_upload,views&sort=interestingness-desc` +
                  `&user_id=${queryItem.userId}&format=json&nojsoncallback=1`;
        return this.http.get(url)
            .map(res => res.json())
            .map((val) => {        
                if(val.stat === 'ok'){
                    if(val.photos.photo.length > 0){     
                        //If the request status is ok 
                        return val.photos.photo.map((photo: any) => {
                            return {
                                tag: queryItem.tag,
                                imageUrl: photo.url_q,
                                title: photo.title,
                                ownerName: photo.ownername,
                                dateTaken: photo.datetaken,
                                uploadDate: photo.dateupload,
                                views: photo.views,
                                userId: queryItem.userId
                            }
                        });
                    }
                    else{
                        // If isn't.. return null
                        return null;
                    }
                }
                else{ 
                    // Otherwise.. return null
                    return null;
                }
            });          
    }

    getPhotosDetail(queryItem: SearchModel){
         // Url with the parameters to search by tag and userId
         let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}` +
                   `&tags=${queryItem.tag}&extras=url_q&sort=interestingness-desc&user_id=${queryItem.userId}` +
                   `&format=json&nojsoncallback=1`;
    
         return this.http.get(url)
            .map(res => res.json())
            .map((val) => {        
                if(val.stat === 'ok'){     
                    //If the request status is ok 
                    if(val.photos.photo.length > 0){     
                        return val.photos.photo.map((photo: any) => {
                            return {
                                tag: queryItem.tag,
                                imageUrl: photo.url_q,
                                title: photo.title
                            }
                        });
                    }
                    else{
                          // If isn't.. return null
                          return null;
                    }
                }
                else{ 
                    // Otherwise.. return null
                    return null;
                }
            });          
    }
}