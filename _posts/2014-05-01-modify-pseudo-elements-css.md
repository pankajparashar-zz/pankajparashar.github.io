---
layout: post
title: Modify pseudo elements CSS via JS
type: post
excerpt: Quite often I run into situations where I need to modify the CSS styles of the pseudo elements dynamically. This post shows you different ways in which it can be done!

---

Sample markup and styles to start with,

{% highlight html %}
<p class="red">Hi, this is plain-old, sad-looking paragraph tag.</p>
{% endhighlight %}

{% highlight css %}
.red::before {
    content: 'red';
    color: red;
}
{% endhighlight %}

> **Objective**  
  To modify the color of the pseudo element - `.red::before` from `red` to `green`.

**Method 1**  
Write separate classes attached with psuedo element for each style and then using JavaScript or jQuery toggle between these classes.

{% highlight css %}
.green::before {
    content: 'green';
    color: green;
}
{% endhighlight %}

{% highlight js %}
$('p').removeClass('red').addClass('green');
{% endhighlight %}

**Method 2**  
Inject new styles to the existing document stylesheet directly either via JavaScript and the webpage will automatically reflect the new css.

{% highlight js %}
document.styleSheets[0].addRule('.red::before','color: green');
document.styleSheets[0].insertRule('.red::before { color: green }', 0);
{% endhighlight %}

**Method 3**  
Create a new stylesheet and inject the modified rules to the newly created document stylesheet either via JavaScript or jQuery.

JavaScript -
{% highlight js %}
// Create a new style tag
var style = document.createElement("style");

// Append the style tag to head
document.head.appendChild(style);

// Grab the stylesheet object
sheet = style.sheet

// Use addRule or insertRule to inject styles
sheet.addRule('.red::before','color: green');
sheet.insertRule('.red::before { color: green }', 0);
{% endhighlight %}

jQuery -
{% highlight js %}
$('<style>.red::before{color:green}</style>').appendTo('head');
{% endhighlight %}

**Method 4**  
At times you need the fetch the value of the property from the existing ruleset and then make the modifications based on some logic.

{% highlight js %}
var str = window.getComputedStyle($('.red'), '::before').getPropertyValue('content');
document.styleSheets[0].addRule('.red::before','content: "' + str + str + '"');
document.styleSheets[0].insertRule('.red::before { content: "' + str + str + '" }', 0);
{% endhighlight %}

**Method 5**  
We can alter a different DOM attribute of the element by combining it with the content property, we can change the content (but not other properties, like margin or color) of pseudo elements dynamically.

{% highlight html %}
<p class="red" data-attr="red">Hi, this is plain-old, sad-looking paragraph tag.</p>
{% endhighlight %}

{% highlight css %}
.red::before {
    content: attr(data-attr);
    color: red;
}
{% endhighlight %}

{% highlight js %}
$('.red').attr('data-attr', 'green');
{% endhighlight %}
