/*********************************************** 
 usage: log('inside coolFunc', this, arguments);
 link: http://goo.gl/qUnCZ
 ***********************************************/
  
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

Modernizr.load([
{
	  load:'//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js',
      complete: function () {
			// Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
		  if(!window.jQuery) { 
		  	Modernizr.load('js/libs/jquery-1.8.2.min.js') }
			$('#input').css("color", "#FF6400");
			jQuery(function($){ $('a[href^="http://"]') .not('[href*="pankajparashar.com"]') .attr('target','_blank'); });
      }
  },
  {
	  load:'//api.easyjquery.com/easyjquery.js',
	  complete: function() {
			EasyjQuery_Get_IP("my_callback");
			console.log('Load was performed.'); 		  
	  }
  },
  { load:'//bitbucket.org/mckamey/countdown.js/raw/tip/countdown.js',
  	complete: function(){
		document.getElementById("count-up").innerHTML = countdown(new Date(1989, 9, 15));
	}
 },
  { 
  	load:'//raw.github.com/timrwood/moment/1.6.2/min/moment.min.js',
	complete: function(){
		document.getElementById("date").innerHTML = moment().format("dddd, MMMM DD YYYY, HH:mm:ss");
		setInterval(function() {
    document.getElementById("date").innerHTML = moment().format("dddd, MMMM DD YYYY, HH:mm:ss");
    document.getElementById("count-up").innerHTML = countdown(new Date(1989, 9, 15));
}, 1000);

	}
   }
]);

function my_callback(json) { document.getElementById("ip-address").innerHTML="#2: IP - <a href='#'>" + json.IP + "</a>"; }

<!-- Asynchronous Google Analytics Snippet compressed by Mathias Bynens : http://goo.gl/2s19j -->
_gaq = [['_setAccount', 'UA-27630966-2'], ['_setDomainName', 'pankajparashar.com'], ['_trackPageview']]; (function(d, t) { var g = d.createElement(t), s = d.getElementsByTagName(t)[0]; g.src = '//www.google-analytics.com/ga.js'; s.parentNode.insertBefore(g, s) } (document, 'script'))

/* place any jQuery/helper plugins in here, instead of separate, slower script files.
$.getScript('https://raw.github.com/timrwood/moment/1.6.2/min/moment.min.js', function() {
    $.getScript('https://bitbucket.org/mckamey/countdown.js/raw/tip/countdown.js', function() {
		console.log('Load was performed.');
	});		
});
*/