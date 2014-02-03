var store = null;
var newsDiff = 0;

function checkUser(mail, password) {
    return (mail=='' && password=='');
}

function getNewsItem(index) {
    return store.findById(index);
}

function fillNews() {
    if(store==null)
        store = new LocalStorageStore();
    
    var lastStoreItem = getNewsItem(store.getNumberOfItems());
    var lastHtmlItem = $('#news .item').last().attr('id');
    
    if( lastStoreItem.title != lastHtmlItem ) {
        for(var i=1; i<=store.getNumberOfItems(); ++i) {
            var item = getNewsItem(i);
            
            $('#news').append(
                '<div class="item" id="'+item.title+'">'+
                    '<img src="../img/case_self_marker.png" class="item-thumb" />'+
                    '<div class="item-content">'+item.title+'<br />'+item.content+'</div>'+
                    '<img src="../img/details.png" style="float:right;margin:0.5em;" />'+
                    '<div style="clear:both;"></div>'+
                '</div>'
            );
        }
        
        $('#news').append('<div id="news-footer"></div>');
    }
}