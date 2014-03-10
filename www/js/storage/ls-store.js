function LocalStorageStore() {
    
    this.news = [{"id": 1, "title": "Foo?", "content": "Lorem ipsum"},{"id": 2, "title": "Bar", "content": "dolor"}];
    
    this.getNumberOfItems = function() {
        return this.news.length;
    }
    
    this.findById = function(id) {
        //var news = JSON.parse(window.localStorage.getItem("news"));
        
        for( var i=0; i < this.news.length; i++ ) {
            if( this.news[i].id === id ) {
                return this.news[i];
            }
        }
        
        return null;
    }
    
    this.addItem = function(item) {
        this.news.push(item);
    }
    
    this.size = function() {
        return this.news.length;
    }
    
    this.last = function() {
        return this.news[this.size()-1];
    }

}