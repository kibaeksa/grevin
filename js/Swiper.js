/**
* Swiper
* Image Slider
* @param {Object} options
		 width
		 loop
		 auto
		 duration
		 easing
		 autoDuration

*/
$.fn.Swipers = function(_options){

	var wrapperElem = $(this);
	var sliderElem = wrapperElem.children();
	var itemElems = sliderElem.children();

	var defaultOptions = {
		width : $(itemElems[0]).get(0).clientWidth,
		height : $(itemElems[0]).get(0).clientHeight,
		loop : false,
		auto : false,
		autoTime : _options.auto ? 3000 : false,
		dragable : false,
		easing : false,
		duration : 800,
		autoDuration : 800
	};
	var options = $.extend(defaultOptions,_options);
	if(options.auto && !options.loop){
		options.loop = true;
	}

	var index = 0;
	var prevIdx = -1;
	var length = itemElems.length;
	var moveValue = !!options.moveValue ? options.moveValue : options.width;

	var autoTimer;
	var isAnimating = false;

	function init(){

		if(options.loop){
			sliderElem.prepend($(itemElems[itemElems.length-1]).clone());
			sliderElem.append($(itemElems[0]).clone());
			itemElems =  sliderElem.children();
		}

		if(options.easing && !$.easing[options.easing]){
			options.easing = false;
		}

		wrapperElem.css({
			width : options.width,
			height : options.height,
			position : 'relative',
			overflow : 'hidden'
		});

		sliderElem.css({
			width : options.loop ? (itemElems.length + 2) * moveValue : itemElems.length * moveValue,
			height : options.height,
			position : 'absolute',
			overflow : 'hidden',
			left : options.loop ? options.width * -1 : 0
		});

		itemElems.css({
			width : options.width,
			height : options.height,
			float : 'left'
		});

		if(options.auto){
			autoTimer = setInterval(function(){
				checkAnimate(index+1,true);
			},options.autoTime);
		}

		if(!!options.init){
			options.init.call(wrapperElem.get(0) , length);
		}
	}

	function setIndex(idx){
		prevIdx = index;
		index = idx;
	}

	function checkAnimate(num,isAuto){
		var duration = !isAuto ? defaultOptions.duration : (defaultOptions.autoDuration || defaultOptions.duration);
		var animData = {
			isAuto : isAuto,
			duration : duration ? duration : undefined
		};

		if(options.loop){
			if(num < 0){

				setIndex(length-1);
				sliderElem.css({
					left : (length+1) * moveValue * -1
					});
				animData.num = length;
			}else if(num >= length){

				setIndex(0);
				sliderElem.css({
					left : 0
					});
				animData.num = 1;
			}else{
				animData.num = num+1;
				setIndex(num);
			}

		}else{
			// if(isAuto){
				if(num < 0 || num > length-1){
					return;
				}else{
					animData.num = num;
			}
			// }else{
				// if(num < 0 || num > length-1){
					// return false;
				// }
			// }

			setIndex(num);
		}

		animate(animData);

		}

	function animate(animOptions){

		var duration = animOptions.duration;
		var num = animOptions.num;
		var easing = animOptions.isAuto ? 'easeOutSine' : options.easing;

		if(options.autoTime && !animOptions.isAuto){
			clearInterval(autoTimer);
		}

		if($.easing.easeOutSine){
			sliderElem.stop().animate({
				left : moveValue * num * -1
			},duration,easing);
		}else{
			sliderElem.stop().animate({
				left : moveValue * num * -1
			},duration);
		}


		if(!!options.callback){
			options.callback.call($(itemElems[index]),index,prevIdx);
		}

		setTimeout(function(){
			isAnimating = false;
			if(options.autoTime && !animOptions.isAuto){
				clearInterval(autoTimer);
				autoTimer = setInterval(function(){
					checkAnimate(index+1,true);
				},options.autoTime);
			}
		},duration);
	}

	init();

	return {
		prev : function(){
			checkAnimate(index-1);
			return false;
		},
		next : function(){
			checkAnimate(index+1);
			return false;
		},
		move : function(_index){
			if(_index !== index){
				checkAnimate(_index);
			}
			return false;
		}
	}
}
