export class Photoset {
    
    constructor(json) {
        
        this.id = json.id;
        this.title = json.title["_content"];
        this.description = json.description["_content"];
        this.photos = [];
        
    }
    
}