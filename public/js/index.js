

(function($) {
    $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

    $('.accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('p');

        $(this).closest('.accordion').find('p').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });
})(jQuery);

$( document ).ready(function() {

    var settingsTab = '.modal-nav a';
    var settingsPane = '.dialog_tab_pane';

    $(settingsTab).on('click', function(){
        $(settingsPane).removeClass('active');
        $(settingsTab).removeClass('active');

        var settingsPaneId = $(this).data('pane-id');
        $('#'+settingsPaneId).addClass('active');

        $(this).addClass('active');
    });
});


$(document).ready( function(){

    // The flipping control-center
    // Two functions for every box :(

// 1
    $(".show-me_1").on("click", function() {
        $(".box").addClass("flip1");
    });
    $(".hide-me_1").on("click", function() {
        $(".box").removeClass("flip1");
    });
// 2
    $(".show-me_2").on("click", function() {
        $(".box").addClass("flip2");
    });
    $(".hide-me_2").on("click", function() {
        $(".box").removeClass("flip2");
    });
// 3
    $(".show-me_3").on("click", function() {
        $(".box").addClass("flip3");
    });
    $(".hide-me_3").on("click", function() {
        $(".box").removeClass("flip3");
    });
// 4
    $(".show-me_4").on("click", function() {
        $(".box").addClass("flip4");
    });
    $(".hide-me_4").on("click", function() {
        $(".box").removeClass("flip4");
    });
// 5
    $(".show-me_5").on("click", function() {
        $(".box").addClass("flip5");
    });
    $(".hide-me_5").on("click", function() {
        $(".box").removeClass("flip5");
    });
// 6
    $(".show-me_6").on("click", function() {
        $(".box").addClass("flip6");
    });
    $(".hide-me_6").on("click", function() {
        $(".box").removeClass("flip6");
    });
// 7
    $(".show-me_7").on("click", function() {
        $(".box").addClass("flip7");
    });
    $(".hide-me_7").on("click", function() {
        $(".box").removeClass("flip7");
    });
// 8
    $(".show-me_8").on("click", function() {
        $(".box").addClass("flip8");
    });
    $(".hide-me_8").on("click", function() {
        $(".box").removeClass("flip8");
    });
// 9
    $(".show-me_9").on("click", function() {
        $(".box").addClass("flip9");
    });
    $(".hide-me_9").on("click", function() {
        $(".box").removeClass("flip9");
    });

    $('[class*="-me_"]').click( function(){
        var boxclass = $('.box').attr('class');
        $('p.boxclass').html(boxclass);
    });


// Table Carousel

    $('button.next-table').click( function(){
        var currentone = $('.responsive-tables .active');
        var currenttwo = $('.responsive-tables .activetwo');
        var next = $('.responsive-tables .activetwo + [class*="little"]');
        var last = $('.responsive-tables .last');
        next.addClass('activetwo');
        currentone.removeClass('active').addClass('last');
        currenttwo.removeClass('activetwo').addClass('active');
        last.removeClass('last');

        var echonext = next.attr('class');
        //alert(echonext);


        if( echonext === undefined ){
            $('.little1').addClass('activetwo');
        }

    });

    $('button.prev-table').click( function(){
        var currentone = $('.responsive-tables .active');
        var currenttwo = $('.responsive-tables .activetwo');
        var prev = $('.responsive-tables .last').prev('[class*="little"]');
        var last = $('.responsive-tables .last');
        prev.addClass('last');
        currentone.removeClass('active').addClass('activetwo');
        last.removeClass('last').addClass('active');
        currenttwo.removeClass('activetwo');

        //alert(prev.attr('class'));

        if( prev.attr('class') === undefined ){
            $('.responsive-tables .little9').addClass('last');
        }

    });



}); // .ready-END


