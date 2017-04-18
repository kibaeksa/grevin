$.fn.Swipers = function(_options){
	/*
		options
		* width
		* loop
		* auto
		* dragable
		* duration
		* easing
	*/

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
		duration : 800
	};
	var options = $.extend(defaultOptions,_options);

	var index = 0;
	var prevIdx = -1;
	var length = itemElems.length;
	var moveValue = !!options.moveValue ? options.moveValue : options.width;

	var autoTimer;
	var isClone = false;
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
	}

	function setIndex(idx){
		prevIdx = index;
		index = idx;
	}

	function checkAnimate(num,isAuto){
		if(isAnimating){
			return false;
		}

		var cb;
		isClone = false;

		if(options.loop){
			if(num < 0){
				isClone = true;
				setIndex(length-1);
				cb =function(){
					sliderElem.stop().css({
						left : (length) * -moveValue
					});
				};

			}else if(num >= length){
				isClone = true;
				setIndex(0);
				cb = function(){
					sliderElem.stop().css({
						left : -moveValue
					});
				};
			}else{
				setIndex(num);
			}
			animate(num+1 , cb);
		}else{
			if(isAuto){
				if(num < 0){
					num = length-1;
				}else if(num > length-1){
					num = 0;
				}
			}else{
				if(num < 0 || num > length-1){
					return false;
				}
			}

			setIndex(num);
			animate(num);
		}

	}

	function animate(num , cb){
		if(isAnimating){
			return false;
		}

		isAnimating = true;

		if(options.autoTime){
			clearInterval(autoTimer);
		}

		sliderElem.animate({
			left : moveValue * num * -1
		},options.duration,options.easing);

		if(!!options.callback){
			options.callback.call($(itemElems[index]),index,prevIdx);
		}

		setTimeout(function(){
			isAnimating = false;
			if(!!cb){
				cb();
			}

			if(options.autoTime){
				autoTimer = setInterval(function(){
					checkAnimate(index+1,true);
				},options.autoTime);
			}
		},options.duration);
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
