
/* 
 *	Google Analytics Snippet 
 *  Reference : https://developers.google.com/analytics/devguides/collection/gajs/ 
 *  Source	  : http://mathiasbynens.be/notes/async-analytics-snippet 
 */

var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-27630966-2']);
_gaq.push(['_setDomainName', 'pankajparashar.com']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); 
	ga.type = 'text/javascript'; 
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(ga, s);
})();