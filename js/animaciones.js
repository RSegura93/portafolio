class Animation {
	constructor (cont, options){
		var self=this;
		self.max_rounds = options.max_rounds?options.max_rounds:6;
		self.stop = options.stop!=null?options.stop:true;
		self.start = options.start?options.start:false;
		self.container = cont;
		self.intervalClip = false;
		self.rounds = 0;
		self.images = self.container.find("img");
		self.visible = $(self.images[0]);
		self.toFadeOut;
		self.visiblePosition = {top:0,bottom:0};
		var visibles = self.images.filter(function(index){
			return !($(self.images[index]).hasClass("hidden"));
		});
		self.visible = (visibles.length<1)?
			$(self.images[0]):$(visibles[0]);
		// self.container.mouseenter(function(){self.startClip();});
		// self.container.mouseleave(function(){self.stopClip();});
		if(self.start)self.startClip();
	}
	startClip =  function (){
		var self = this;
		if(self.intervalClip)return;
		fadeIn(self.visible);
		self.intervalClip = setInterval(function(){
			self.toFadeOut = (self.visible[0].nextSibling)?
							self.visible.next():
							$(self.images[0]);
			self.visible.addClass("hidden")
					.removeClass("active")
					.removeClass("fadein");
			setTimeout(function(){
				self.toFadeOut.removeClass("hidden")
					.addClass("active");
				self.visible = self.toFadeOut;
				if(self.rounds==self.max_rounds)
					self.stopClip(self.container);
				self.rounds++;
			},50);
		},1500);
	}

	stopClip = function (){
		var self=this;
		setTimeout(function(){self.stopClipInmidiate();},1500);
	}

	stopClipInmidiate = function(){
		if (!this.stop) return;
		clearInterval(this.intervalClip);
		this.intervalClip=false;
		this.rounds = 0;
		this.container.find("img.active")
			.removeClass("hidden").removeClass("fadein");
	}

	checkVisible = function(){
		this.visiblePosition = Animation.checkVisible( this.container);
	}
}
Animation.animaciones = [];
Animation.timer=false;
Animation.checkEachSecond = function(){
	setInterval(Animation.checkVisiblesToAnimate, 1500)
}
Animation.checkVisiblesToAnimate = function(){
	var animaciones = Animation.animaciones;
	if( animaciones.length<1 )return;
	if( Animation.timer ) return;
	Animation.timer=true;
	setTimeout(function(){Animation.timer=false;},600);
	var animacion = false;
	var ve1;
	var maxV = {top:100000,bottom:10000000,perc:-100000000, index:-1};
	for (var i = 0; i < animaciones.length; i++) {
		animaciones[i].checkVisible();
		ve1 = animaciones[i].visiblePosition;
		if ((ve1.perc==maxV.perc)?(ve1.top<=maxV.top):(ve1.perc>maxV.perc) ){
			// its missing when displayed mode "en resumen"
			// 2 with the same top and perc
			// if( (Math.round(Math.random(10))%2) && // random, could be 0 or 1
			// 	ve1.perc==maxV.perc && ve1.top==maxV.top ) continue;
			maxV.top = ve1.top ;
			maxV.bottom = ve1.bottom;
			maxV.perc = ve1.perc ;
			maxV.index = i;
		}
	}
	for (var i = 0; i < animaciones.length; i++)
		if( i != maxV.index ) animaciones[i].stopClip();
	if(animaciones[maxV.index].visiblePosition.perc>30){
		animaciones[maxV.index].startClip();
	}
}

Animation.checkVisible = function ( elm ) {
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height(),
	    top = y-st,
	    bottom = (vpH + st) - (y + elementHeight),
	    visibility_porcentage = Math.round( 100 * (  1 + ( (top>=0?0:top)
	    				+ (bottom>=0?0:bottom) ) / elementHeight ) );
	return {
    	top: top,
    	bottom: bottom,
    	perc: visibility_porcentage
    };
}
