var store = null;
var mqtt = null;
var newsDiff = 0;

function checkUser(mail, password) {
    if( mail=='' && password=='' ) {
        mqtt = new Mqtt( 'testtopic' );
        mqtt.establishConnection();
        
        return true;
    }
    
    return false;
}

function logout() {
    mqtt.disconnect();
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
                    '<img src="/ios/img/case_self_marker.png" class="item-thumb" />'+
                    '<div class="item-content">'+item.title+'<br />'+item.content+'</div>'+
                    '<img src="/ios/img/details.png" style="float:right;margin:0.5em;" />'+
                    '<div style="clear:both;"></div>'+
                '</div>'
            );
        }
        
        $('#news').append('<div id="news-footer"></div>');
    }
}