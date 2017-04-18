/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-02 10:39:06
 * @version $Id$
 */

(function($){
$.fn.yomi=function(){
	var data="";
	var _DOM=null;
	var TIMER;
	var createdom =function(dom){
		_DOM=dom;
		data=$(dom).attr("data-time");
		data = data.replace(/-/g,"/");
		data = Math.round((new Date(data)).getTime()/1000);
		reflash();
	};
	var reflash=function(){
		var	range  	= data-Math.round((new Date()).getTime()/1000),
					secday = 86400, sechour = 3600,
					days 	= parseInt(range/secday),
					hours	= parseInt((range%secday)/sechour),
					min		= parseInt(((range%secday)%sechour)/60),
					sec		= ((range%secday)%sechour)%60;
					
		$(_DOM).find(".days").html(nol(days));
		$(_DOM).find(".hours").html(nol(hours));
		$(_DOM).find(".minutes").html(nol(min));
		$(_DOM).find(".seconds").html(nol(sec));
	};
	TIMER = setInterval( reflash,1000 );
	var nol = function(h){
		if(h<0){
			h='0'+'0';
		}else if(h<10){
			h='0'+h;
		}
		return h;
	}
	return this.each(function(){
		var $box = $(this);
		createdom($box);
	});
}


$.fn.yomiNumber=function(){
	var data="";
	var lastTime=0;
	var _DOM=null;
	var TIMER;
	var createdom =function(dom){
		_DOM=dom;
		data=$(dom).attr("data-time");
		lastTime = Number(data);
		// data = Math.round((new Date(data)).getTime()/1000);
		reflash();
	};
	var reflash=function(){
		// var	range  	= data-Math.round((new Date()).getTime()/1000),
		var	range   = lastTime,
			secday  = 86400, sechour = 3600,
			days 	= parseInt(range/secday),
			hours	= parseInt((range%secday)/sechour),
			min		= parseInt(((range%secday)%sechour)/60),
			sec		= ((range%secday)%sechour)%60;
		
		lastTime = range - 1;
		$(_DOM).find(".days").html(nol(days));
		$(_DOM).find(".hours").html(nol(hours));
		$(_DOM).find(".minutes").html(nol(min));
		$(_DOM).find(".seconds").html(nol(sec));
	};
	TIMER = setInterval( reflash,1000 );
	var nol = function(h){
		if(h<0){
			h='0'+'0';
		}else if(h<10){
			h='0'+h;
		}
		return h;
	}
	return this.each(function(){
		var $box = $(this);
		createdom($box);
	});
}


})(Zepto);