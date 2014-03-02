
$(document).ready(function() {

    $('article p, article li, article p a, code, .header__desc').hyphenate('en-us');

    $('.post__time').text(function (index, value) {
        return Math.round(parseFloat(value));
    });

    $('a[href^="http"]').attr('target','_blank');
    $('a[href^="//"]').attr('target','_blank');
    $('a[href^="mailto:"]').attr('target','_blank');

    $('code').click(function() {
        $(this).select();
    });

    $('.footer__top--link').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('.footer__search').keypress(function(e) {
        if(e.which === 13) {
            var url = 'http://google.com/search?q=' + $(this).val() + ' site:pankajparashar.com';
            window.open(url, '_blank');
        }
    });

});
