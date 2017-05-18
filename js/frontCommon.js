$.fn.openLayerPopup = function(options){
  $('body').css({
      position:'relative',
      overflow:'hidden'
  });

  $('#'+options.id).fadeIn(200);
}

var bClose = function (){
  $('.tip-cp-layerpop-wrapper').hide();

  $('body').css({
      position:'relative',
      overflow:'visible'
  });
};

/* GNB Clouser */
(function(){
    var timer;
    var timerMouseOut;
    var isGnbOver = false;

    $('#global-navigation>ul>li').bind('mouseenter',function(){
        gnbMouseOver();
        openGnbMenu($(this).attr('data-gnbmenu'));
    });

    $('#global-navigation>ul>li').bind('mouseleave',function(){
        gnbMouseOver();
        openGnbMenu($(this).attr('data-gnbmenu'));
    });

    $('#header .gnb-contents-wrapper').bind('mouseenter',function(){
        clearTimeout(timerMouseOut);
        gnbMouseOver();
    });

    $('#header .gnb-contents-wrapper').bind('mouseleave',function(){
        gnbMouseOut();
    });

    $('.gnb-contents-wrapper>div .gnb-box2 li').bind('mouseover',function(){
        if($(this).hasClass('active')){
            return false;
        }
        var elemLists = $(this).parent().find('li');
        var elemConts = $(this).parents('.gnb-box2').siblings('.gnb-box3').find('.box');

        elemLists.removeClass('active');
        $(this).addClass('active');

        if(!$(this).hasClass('no_content')){
            elemConts.removeClass('active');
            elemConts.eq($(this).index()).addClass('active');
        }

    });

    function openGnbMenu(elemId){
        $('.gnb-contents-wrapper>div').removeClass('open');
        $('#'+elemId).addClass('open');
    }

    function gnbMouseOver(){
        clearTimeout(timerMouseOut);
        clearTimeout(timer);
        $('#header').addClass('gnb-before-over');
        setTimeout(function(){
            clearTimeout(timerMouseOut);
            timer = setTimeout(function(){
                $('#header').addClass('gnb-over');
            },10);
        },10);
    }

    function gnbMouseOut(delayTime){
        var dt = delayTime == undefined ? 300 : delayTime;
        timerMouseOut = setTimeout(function(){
            $('#header').removeClass('gnb-over');
            timer = setTimeout(function(){
                $('#header').removeClass('gnb-before-over');
            },250);
        },dt);
    }
})();
