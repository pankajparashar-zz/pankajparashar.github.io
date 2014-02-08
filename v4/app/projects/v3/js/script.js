$(document).ready(function() {	
		  
	$("a[href^='http']").attr("target","_blank");
	$("a[href^='//']").attr("target","_blank");
	$("a[href^='mailto:']").attr("target","_blank");	
	
});