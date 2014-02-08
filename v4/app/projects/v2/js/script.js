$(document).ready(function() {	
	
	if ($('.skills').length) {
	 	$(window).scroll(function() {
	        if ($(window).scrollTop() + $(window).height() - 100 >= $('.skills').offset().top) {
	            if(!$('.skills').attr('loaded')) {
	                $('.skills').attr('loaded', true);
					var list = document.querySelectorAll("dd > p");
					for(var i = 0; i < list.length; ++i) { $(list[i]).animate({width: list[i].innerHTML}, "slow"); }
	            }
	        }
	    });
	}
	  
	$("a[href^='http']").attr("target","_blank");
	$("a[href^='//']").attr("target","_blank");
	$("a[href^='mailto:']").attr("target","_blank");	
	
	$('.top').click(function () {
		$('body,html').animate({
				scrollTop: 0
				}, 800);
		return false;
	});

	$('#search').keypress(function(e) {
  		if(e.which == 13) {
  			var url = "http://google.com/search?q=" + $(this).val() + " site:pankajparashar.com";
    		window.open(url, '_blank');
  		}
	});
});