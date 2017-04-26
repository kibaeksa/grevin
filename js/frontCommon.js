$.fn.openLayerPopup = function(options){
  $('body').css({
      position:'relative',
      overflow:'hidden'
  });

  $('#'+options.id).fadeIn(200);
}

var bClose = function () {
  $('.tip-cp-layerpop-wrapper').hide();

  $('body').css({
      position:'relative',
      overflow:'visible'
  });
}
