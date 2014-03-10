$.ajaxSetup( {
    url: "http://as-emurgency.appspot.com/api/activities/jsonp?page=0&callback=callback",
    global: true,
    dataType: 'jsonp',
    jsonp: 'callback',
    type: "GET",
    beforeSend: function( request ) {
        request.setRequestHeader( "Content-Type", "application/jsonp;charset=UTF-8" );
        request.setRequestHeader( "Accept", "application/jsonp;charset=UTF-8" );
    },
    success: function( response ) {
        console.log( 'resp: '+ response );
    },
    complete: function() {
        console.log( 'done' );
    },
    error: function(error) {
        console.log( 'failed')
        console.log( error );
    }
} );

$.ajax( { data: { "page" : 1 } } );

var dataDump;

function callback(data) {
    dataDump = data;
}

var store = null;
var mqtt = null;
var newsDiff = 0;
var newsTemp = $('#template');

function checkUser( mail, password ) {
    if( mail=='' && password=='' ) {
        mqtt = new Mqtt( 'testtopic/#' );
        mqtt.establishConnection();
        
        return true;
    }
    
    return false;
}

function logout() {
    mqtt.disconnect();
}

function onReceive( message ) {
    console.log("on receive: "+ message);
    
    if( store !== null ) {
        try {
            var parsed = $.parseJSON( message );
            console.log(parsed);
        
            store.addItem( parsed );
            fillNews();
        } catch(e) {}
        
        //parsed.items[0].verb;
    }
}

function getNewsItem( index ) {
    return store.findById( index );
}

function fillNews() {
    console.log("filling news");
    
    if( store == null )
        store = new LocalStorageStore();
    
    $('#news').text("");
    
    $(dataDump.items).each(function(index, item) {
        var temp = $(newsTemp).clone();
        temp.find('img').first().attr('src', item.actor.image);
        temp.find('.item-content').last().html(item.actor.id+'<br />'+item.actor.displayName);
        
        $('#news').append(temp);
    });
    
    $('#news').append('<div class="black-line"></div>');
}