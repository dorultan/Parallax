'use strict';

(function($){
	$.fn.parallax = function(options) {

		var settings = $.extend({}, this.parallax.defaults, options);

		return this.each(function(){
			var api = new API($(this), settings);
			api.init();
		})
	}

	$.fn.parallax.defaults = {
		aspRatio: 30,
		attachment: true,
		attachmentOffset: 0
	}

	function API(elem, options) {
		this.elem = elem;
		this.opts = options;
	}

	API.prototype = {
		
		init: function(){
			var elemOff = this.getElemOffsets();
			var that = this;
			var id;

			$(window).on('scroll load', function(){
				requestAnimationFrame(req);
			
			})

			function req() {
				that.doParallax({
					Top: elemOff.Top,
					Bottom: elemOff.Bottom,
					id: id
				})
			}
		},

		getElemOffsets: function() {
			var elem = this.elem;
			var offTop;
			var offBottom;

			if(elem !== undefined) {
				offTop = elem.parent().offset().top;
				offBottom = offTop + elem.parent().height();
			}

			return {
				Top: offTop,
				Bottom: offBottom
			}
		},

		doParallax: function(context) {
			var that = this;
			var opts = this.opts,
				win = $(window),
				winOffT = win.scrollTop(),
				winOffB = winOffT + win.height(),
				ratio = (winOffT - context.Top) / opts.aspRatio,
				start = this.shouldStart(winOffB, context.Top),
				stop = this.shouldStop(winOffT, context.Bottom, ratio);
				this.backgroundParallax(ratio, start, stop, context.id);
				this.backgroundAttachment(ratio, start, stop, context.id);

		},

		shouldStart: function(winOffB, elemOffT) {
			var winB = winOffB;
			var elemT = elemT;

			if(winOffB >= (elemOffT / 2)) {
				
				return true;
			}

			return false;
		},

		shouldStop: function(winOffT, elemOffB, ratio) {
			var winT = winOffT;
			var elemB = elemOffB;
			var stop = (winT - elemB);

			if(stop >= ratio) {

				return true;
			}

			return false;
		},

		//effects

		backgroundParallax: function(Y, start, stop, id) {
			var elem = this.elem;
			

			if(elem !== undefined) {
				if(start && !stop) {
						elem.css({
							'transform': 'translate3d(0,' + Y + '%, 0)'
						})
				} else {
					cancelAnimationFrame(id);
					id = 0;
				}
			}
		},

		backgroundAttachment: function(Y, start, stop, id) {
			var opts = this.opts;
			var elem = this.elem;
			var top = opts.attachmentOffset - Y;
			var children;

			if(elem.children() !== undefined && opts.attachment) {
				children = elem.children();
			}

			if(start && !stop) {
				children.css('top', top + '%');
			} else {
				cancelAnimationFrame(id);
				id = 0;
			}
		}
	}

	function _isRelativePos(elem) {

		if(arguments.length) {
			if(elem.css('position') === 'relative') {
				return true;
			}
		}

		return false;
	}


	function _hasData(element, type, value) {
		var elem;
		var has = false;

		if(!arguments.length) {
			return;
		}

		if($.type(element) !== 'null') {
			elem = element;
			
			 if(element.data()[type] === value) {
				has = true;
			}
		}
		return has;
	}
})(jQuery);