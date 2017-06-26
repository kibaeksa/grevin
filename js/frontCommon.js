$.fn.openLayerPopup = function(options){
  $('body').css({
      position:'relative',
      overflow:'hidden'
  });

  $('#'+options.id).fadeIn(200);
}

var bClose = function (){
  $('.modal-layerpopup-wrapper').hide();

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
        $('#global-navigation>ul>li').removeClass('active');
        $(this).addClass('active');
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
            $('#global-navigation>ul>li').removeClass('active');
            timer = setTimeout(function(){
                $('#header').removeClass('gnb-before-over');
            },250);
        },dt);
    }
})();

function itemSlider(options){
    // var elemContainer = $('.sns-hub-wrapper .slider-wrapper');
    var elemContainer = $(options.elemContainer);
    var elemSlider = elemContainer.children();
    var elemItems = elemSlider.children();
    var index = 0;
    var itemDisplayed = options.viewItems ? options.viewItems : 4;
    var length = elemItems.length;
    var moveValue = options.moveValue;

    if(length == itemDisplayed){
        elemContainer.find('.next').addClass('disable');
    }

    if(!!options.init){
        options.init.call(elemContainer,length);
    }

    function animate(){
        elemSlider.stop().animate({
            left : index * -moveValue
        });

        if(!!options.callback){
            options.callback.call(window , index);
        }
    }

    return {
        prev : function(){
            if(index == 0){
                return;
            }

            elemContainer.find('.next').removeClass('disable');

            index--;

            animate();

            if(index == 0){
                return 'done';
            }
        },
        next : function(){
            if(length == index + itemDisplayed){
                return;
            }

            elemContainer.find('.prev').removeClass('disable');

            index++;

            animate();

            if(length == index + itemDisplayed){
                return 'done';
            }
        }
    }
}

var floorApp = {};

floorApp.createDotDecoration = function(){
    var canvasElems = $('.canvas-dot-decoration');
    canvasElems.each(function(){
        var canvas = this;
        var ctx = canvas.getContext('2d');
        var color = $(this).attr('data-color');
        var pointWidth = 2;
        var pointHeight = 2;
        var padding = !!$(this).attr('data-padding') ? $(this).attr('data-padding')*1 : 10;

        var xAxisLength = canvas.width / (padding + pointWidth);
        var yAxisLength = canvas.height / (padding + pointHeight);

        var clearRect = function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
        };

        var dotPoint

        var draw = function(){

            var i = 0;
            var j = 0;
            var eachTimer = 0;

            for(; i < xAxisLength; i++){
                for(; j < yAxisLength; j++){
                    eachTimer += 15;
                    (function(i,j,eachTimer){
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        if(!!$(this).attr('data-radius')){
                            console.log(111);
                            ctx.arc(i * padding , j * padding ,$(this).attr('data-radius')*1,0,2*Math.PI);
                        }else{
                            ctx.rect(i * padding , j * padding ,pointWidth,pointHeight);
                        }

                        ctx.closePath();
                        ctx.fill();
                    })(i , j , eachTimer);
                }
                j = 0;
            }
        }

        draw();
    });
};

floorApp.createDotDecoration();


floorApp.slider = function(options){
    var containerElem = $(options.containerElem);
    var sliderElem = containerElem.children();
    var itemElems = sliderElem.children();

    var index = 0;
    var length = itemElems.length;
    var moveVal = containerElem.attr('data-width') || containerElem.width();

    containerElem.css({
        width : containerElem.attr('data-width'),
        height : containerElem.attr('data-height')
    });

    sliderElem.css({
        height : containerElem.attr('data-height')
    });

    for(var i = 0; i < length; i++){
        $(itemElems[i]).css({
            width : moveVal,
            left : i * moveVal
        });
    }


    if(containerElem.attr('data-width') != undefined && containerElem.attr('data-height') != undefined){
        var ratio = containerElem.attr('data-height') / containerElem.attr('data-width');
    }

    function animate(){
        sliderElem.animate({
            left : index * -moveVal
        });
    }

    function setResize(){
        var newValue = options.setResize();

        moveVal = newValue;
        containerElem.css({
            width : newValue,
            height : newValue * ratio
        });

        sliderElem.css({
            left : -newValue * index,
            height : newValue * ratio
        });

        for(var i = 0; i < length; i++){
            $(itemElems[i]).css({
                width : newValue,
                left : i * moveVal
            });
        }

    }

    if(!!options.setResize){
        setResize();
        $(window).resize(setResize);
    }

    return {
        next : function(){
            if(index == length-1){
                index = 0;
            }else{
                index += 1;
            }

            animate();
        },
        prev : function(){
            if(index == length-1){
                index = 0;
            }else{
                index -= 1;
            }

            animate();
        },
        slide : function(_index){
            if(index == _index || _index < 0 || _index > length-1 ){
                return false;
            }

            index = _index;

            animate();
        }
    }

}
