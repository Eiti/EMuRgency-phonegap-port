var LocalStorageStore = function() {

    this.getNumberOfItems = function() {
        return news.length;
    }
    
    this.findById = function(id) {
        var news = JSON.parse(window.localStorage.getItem("news"));
        
        for (var i=0; i < news.length; i++) {
            if(news[i].id === id) {
                return news[i];
            }
        }
        
        return null;
    }

    var news = [{"id": 1, "title": "Foo", "content": "Lorem ipsum"},{"id": 2, "title": "Bar", "content": "dolor"},{"id": 3, "title": "3", "content": "4"},{"id": 4, "title": "5", "content": "4"}];

    window.localStorage.setItem("news", JSON.stringify(news));

}