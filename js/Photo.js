export class Photo {

    constructor(json) {
    
        this.id = json.id;
        this.title = json.title;
        this.description = json.description;
        this.secret = json.secret;
        this.server = json.server;
        this.originalsecret;
        this.rotation;
        this.images = [];
        
    }
    
    src(size="") {
        
        const secret = this.secret;
        let size_code="";
        
        switch(size) {
            case "original": 
                secret = this.originalsecret;
                size_code = "_o";
                break;
            
            case "square":
                size_code = "_s";
                break;
                
            case "thumbnail":
                size_code = "_t";
                break;
                
            case "small":
                size_code = "_m";
                break;
                
            case "medium":
                size_code = "";
                break;
                
            case "large":
                size_code = "_b";
                break;
        }
        
        return "https://live.staticflickr.com//"+this.server+"//"+this.id+"_"+secret+""+size_code+".jpg"
        
    }
    

}