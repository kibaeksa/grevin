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

    $('#global-navigation').bind('mouseenter',function(){
        gnbMouseOver();
    });

    $('#global-navigation').bind('mouseleave',function(){
        console.log('gnb out');
        gnbMouseOut();
    });

    $('#global-navigation>ul>li').bind('mouseenter',function(){
        gnbMouseOver();
    });

    $('#header .gnb-contents-wrapper').bind('mouseenter',function(){
        console.log('gnb content enter');
        clearTimeout(timerMouseOut);
        gnbMouseOver();
    });

    $('#header .gnb-contents-wrapper').bind('mouseleave',function(){
        console.log('gnb content out');
        gnbMouseOut();
    });

    function gnbMouseOver(){
        clearTimeout(timerMouseOut);
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
