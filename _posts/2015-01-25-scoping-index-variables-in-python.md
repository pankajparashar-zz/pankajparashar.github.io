---
layout: post
title: Scoping index variables in Python
type: post
excerpt: The way scoping of index variables work in Python might surprise a few! This article is all about dealing with them by considering few scenarios and understanding the behavior.
---

Thanks to [Eli Bendersky](http://eli.thegreenplace.net/) for bringing this to my attention by [writing about](http://eli.thegreenplace.net/2015/the-scope-of-index-variables-in-pythons-for-loops/) it on his blog. Let's
take a few scenarios and you're job is to guess the output,

#### Scenario 1

{% highlight python %}
>>> for i in []:
...    pass
>>> print(i)       # Output?
{% endhighlight %}

Since, there is no element in the list, the `for` loop simply doesn't run leaving `i` as an undefined variable in the current
scope. Hence, you'll get,

{% highlight python %}
>>> print(i)
NameError: name 'i' is not defined
{% endhighlight %}

#### Scenario 2

{% highlight python %}
>>> for i in [1,2,3]:
...    pass
>>> print(i)       # Output?
{% endhighlight %}

You might think this would produce the same error as above. This is where things become different. In Python, the scoping rules 
are fairly simple and elegant: a block is either a module, a function body or a class body. Within a function body, names are 
visible from the point of their definition to the end of the block (including nested blocks such as nested functions). Hence, you'll get,

{% highlight python %}
>>> print(i)
3
{% endhighlight %}

This behavior has been [well documented](https://docs.python.org/dev/reference/compound_stmts.html#for) in the official specification,

> The for-loop makes assignments to the variables(s) in the target list. [...] Names in the target list are not deleted when 
the loop is finished, but if the sequence is empty, they will not have been assigned to at all by the loop.