$( document ).ready(function() {
    
    init();
    
    $('#login-button').click( function() {
        if( checkUser( $('#login-mail').val(), $('#loginpw').val() ) )
            setupDashboard();
    });
    
    $('#reg-button').click( function() {
        showMessage('not yet implemented', null);
    });
    
    $('#message-positive').click( function() {
        $('#message-box').slideUp( 250 );
    });
    
    $('#map-back').click( function() {
        hideAllBut('#dash-board');
        toggleTabs( document.getElementById('missions-tab') );
    });
    
    $('#logout').click( function() {
        setupLogin();
        logout();
    });
    
    $('.mission').click( function() {
        hideAllBut('#map-container');
        getLocation();
    });
    
    $('.tab').click( function() {
        toggleTabs(this);
    });

});

function init()  {
    setupLogin();
};

function setupLogin() {
    hideAllBut('#login');
    
    var windowHeight = $(window).height();
    var loginHeight = $('#login').height();
    //$('#login').css({'top': (windowHeight/2-loginHeight/1.5) + 'px'});
}

function setupDashboard() {
    hideAllBut('#dash-board');
    
    var windowHeight = $(window).height();
    var headerHeight = $('#header').height();
    var footerHeight = $('#footer').outerHeight();
    $('#news, #missions').css({'height': (windowHeight-headerHeight-footerHeight-12) + 'px'});
    
    toggleTabs($('#news-tab').get(0));
}

function showMessageBox(message, negative) {
    $('#message-text').text(message);
    $('#message-negative').hide();
    
    if( negative !== null ) {
        $('#message-negative').show();
        
        $('#message-negative').click( function() {
            negative();
            $('#message-box').slideUp( 250 );
        });
    }
    
    var box = $('#message-box');
    
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    
    $(box).css( { 'top': (windowHeight/2-box.height()/2) + 'px' } );
    $(box).css( { 'left': (windowWidth/2-box.width()/2) + 'px' } );
    
    box.slideDown( 250 );
}

function hideAllBut(selector) {
    $('.view').hide();
    $(selector).show();
}

function toggleTabs(clicked) {
    $('.tab').removeClass('tab-active');
    $(clicked).addClass('tab-active');
    
    $('.dash-board-tab').hide();
    
    if( clicked == $('#news-tab').get(0) ) {
        $('#news').show();
        fillNews();
    } else {
        $('#missions').show();
    }
}

function setDistance(distance,accuracy) {
    if( distance > 100 )
        $('#distance').html( "distance<br />"+ distance +"m" );
    else {
        $('#message-negative').val( 'close case' );
        
        showMessageBox( "almost there", function() {
            hideAllBut('#dash-board');
            toggleTabs( document.getElementById('missions-tab') );
            // mqtt stuff
        });
    }
}