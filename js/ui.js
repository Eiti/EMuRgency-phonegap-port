$( document ).ready(function() {
    
    init();
    
    $('#login-button').click( function() {
        setupDashboard();
    });
    
    $('#reg-button').click( function() {
        
    });
    
    $('#back-button, #logout').click( function() {
        setupLogin();
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
    $('#login').css({'top': (windowHeight/2-loginHeight/1.5) + 'px'});
}

function setupDashboard() {
    hideAllBut('#dash-board');
    
    $('#missions-tab').removeClass('tab-active');
    $('#missions').hide();
    
    var windowHeight = $(window).height();
    var headerHeight = $('#header').height();
    var footerHeight = $('#footer').outerHeight();
    $('#news, #missions').css({'height': (windowHeight-headerHeight-footerHeight-30) + 'px'});
}

function hideAllBut(selector) {
    $('.view').hide();
    $(selector).show();
}

function toggleTabs(clicked) {
    $('.tab').removeClass('tab-active');
    $(clicked).addClass('tab-active');
    
    $('.dash-board-tab').hide();
    
    if( clicked == $('#news-tab').get(0) )
        $('#news').show();
    else
        $('#missions').show();
}