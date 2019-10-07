import { Flickr } from './Flickr.js'; 
import { Photoset } from './Photoset.js'; 
import { Photo } from './Photo.js'; 

export async function loadFlickr(api_key, user_id) {
    
    const flickr = new Flickr(api_key, user_id);
    
    return fetchPhotosets(flickr.api_key, flickr.user_id).then((photosets_json) => {
        
        return buildPhotosets(flickr.api_key, photosets_json);
        
    }).then((photosets) => { 
        
        flickr.photosets = photosets; 
        
        return flickr; 
    
    });
     
}

async function fetchPhotosets(api_key, user_id) {
    
    const url = "https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key="+api_key+"&user_id="+user_id+"&format=json&nojsoncallback=1";
    
    return fetchJSON(url).then((json) => {
       return json.photosets.photoset; 
    });
    
}

async function fetchPhotos(api_key, photoset_id) {
    
    const url = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+api_key+"&photoset_id="+photoset_id+"&format=json&nojsoncallback=1";
    
    return fetchJSON(url).then((json) => {
       return json.photoset.photo; 
    });
    
}

async function fetchInfo(api_key, photo_id) {
    
    const url = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+api_key+"&photo_id="+photo_id+"&format=json&nojsoncallback=1";
    
    return fetchJSON(url).then((json) => {
        return json.photo;
    });
    
}

async function fetchJSON(src) {
    
    const response = await fetch(src);
    return response.json();
    
}

async function buildPhotosets(api_key, photosets_json) {
    
    const photoset_requests = photosets_json.map((photoset_json) => {

        const photoset = new Photoset(photoset_json);

        fetchPhotos(api_key, photoset.id).then((photos_json) => {
            
            return buildPhotos(api_key, photos_json);

        }).then(photos => photoset.photos = photos);

        return photoset;

    });

    return Promise.all(photoset_requests);
    
}

async function buildPhotos(api_key, photos_json) {
    
    const photo_requests = photos_json.map((photo_json) => {

        const photo = new Photo(photo_json);

        fetchInfo(api_key, photo.id).then((info_json) => {

            photo.originalsecret = info_json.originalsecret;
            photo.rotation = info_json.rotation;

        });

        return photo;

    });

    return Promise.all(photo_requests);
    
}