$( document ).ready(function() {
    
    init();
    
    $('#login-button').click( function() {
        if( checkUser( $('#login-mail').val(), $('#loginpw').val() ) )
            setupDashboard();
    });
    
    $('#reg-button').click( function() {
        
    });
    
    $('#logout').click( function() {
        setupLogin();
        logout();
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
    $('#news, #missions').css({'height': (windowHeight-headerHeight-footerHeight-10) + 'px'});
    
    toggleTabs($('#news-tab').get(0));
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