---
layout: post
title: CSS Selectors Level 4
type: post
excerpt: Not-so long ago I remember writing about CSS Selectors Level 3. Fast-forward 14 months, I'm now writing about the next specification of CSS that aims to improve and enhance CSS3 by introducing wide-range of new selectors and pseudo-classes.
---

> There's no such thing as CSS4, as pointed out by Tab Atkins on [his blog](http://www.xanthir.com/b4Ko0). 
CSS3 is the current **evolution** of CSS, in which the recommendations are split into modules that 
can be progressed independently. Instead of there being a **CSS4**, the modules have levels, like Level 3, Level 4 etc.

The complete specification has a lot of new selectors, but a few of them run the risk of getting dropped before the 
specification reaches [candidate recommendation](http://stackoverflow.com/questions/2864202/difference-between-the-proposed-recommendation-and-the-candidate-recommendati). 
Following is the list of new selectors that I think, are going to be the most useful ones,

#### :has()

The relational pseudo class `:has()` accepts a list of selectors as an argument to target those elements that contain 
atleast one element from the list.

{% highlight css %}
/**
 * Match <a> elements that contain an <img> tag as 
 * the direct child **/
 
a:has(> img)

/**
 * Match <dt> elements that are immediately followed 
 * by another <dt> element **/

dt:has(+ dt)

/**
 * Match <section> elements that don’t contain any 
 * header elements **/
 
section:not(:has(h1, h2, h3, h4, h5, h6))

/**
 * Match <section> elements that contains anything that's 
 * not a header element **/

section:has(:not(h1, h2, h3, h4, h5, h6))
{% endhighlight %}  
 
#### Multiple attribute selectors

Multiple attribute selectors can be used to represent several attributes of an element, or several conditions on 
the same attribute. 

{% highlight css %}
/* Here, the selector represents a span element whose hello attribute 
has exactly the value 'Cleveland' and whose goodbye attribute has 
exactly the value 'Columbus' */

span[hello="Cleveland"][goodbye="Columbus"]
{% endhighlight %} 

#### :dir() and :lang()

The `:dir()` pseudo-class allows the author to write selectors that represent an element based on its 
directionality as determined by the document language. The `:lang()` pseudo-class represents an element 
that is in one of the languages listed in its argument. It accepts a comma-separated list of one or more 
language ranges as its argument.

{% highlight css %}
:dir(ltr) # Matches all elements with 'dir' as 'ltr'

/**
 * Match elements with `lang` attribute defined either 
 * as French or German **/

:lang(fr, de) 
{% endhighlight %} 

#### :empty

The :empty pseudo-class represents an element that has no children at all.

{% highlight css %}
/**
 * For instance, to target a paragragh tag that has no children 
 * at all [<p></p>], we could use **/

p:empty
{% endhighlight %} 

#### :only-child

The `:only-child` pseudo-class represents an element that has no siblings at all. It is exactly same as 
`:first-child:last-child` or `:nth-child(1):nth-last-child(1)`, but with a lower specificity.

{% highlight css %}
/** 
 * Match if the element is the only child of its parent, 
 * like [<div><p></p></div>] **/

p:only-child
{% endhighlight %} 

#### Typed Child-indexed Pseudo-classes

{% highlight css %}
# Target every-even [img] element
img:nth-of-type(2n) 

# Target the 2nd last [img] element
img:nth-last-of-type(2n)

# Target the first [img] element within its parent scope
img:first-of-type

# Target the last [img] element within its parent scope
img:last-of-type

# Target the [img] element when there is no similar 
# element within its parent scope
img:only-of-type
{% endhighlight %}

The introduction of these selectors, gives us a lot more flexiblity while writing CSS, reduces dependencies 
on JavaScript for trivial tasks and eventually makes CSS an extremely powerful language. If you want to keep an 
eye on the progress of CSS Selectors Level 4 specification, then I would strongly recommend you to bookmark this link, 

> [http://dev.w3.org/csswg/selectors-4/](dev.w3.org/csswg/selectors-4/)