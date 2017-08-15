---
title: Mocking Python
date: 2016-09-18 00:00:00 Z
layout: post
type: post
excerpt: The Python mock library has largely been a black hole when it comes to efficiently
  unit testing a Python code. Hopefully, this article will help you understand the
  essential bits to bump up that test coverage.
---

Whether it is about mocking an object, class, method or a function, in Python,
everything can be more or less decomposed into a handful of similar steps. Throughout the article,
we would only make use of the `patch` decorator that can be imported as,

{% highlight python %}
>>> from mock import patch
{% endhighlight %}
 
> In-case you're version of Python doesn't come bundled up with the `mock` library, 
then you could install it by running the following command, in you're nearest terminal,

{% highlight sh %}
$ pip install mock
{% endhighlight %}

### Mock the return value of a function

Let's say you want to mock the return value of a function `f2` that is being
called from the function `f1`. 

{% highlight python %}
>>> def f2():
...     return 'Inside f2'
...
>>> def f1():
...     print( f2() )
...
>>> f1()
Inside f2
{% endhighlight %}

We'll patch the `return_value` of the function `f2` by applying a decorator to our
test function, `test_f1`.

{% highlight python %}
>>> @patch('__main__.f2')
... def test_f1(mock_f2):
...     mock_f2.return_value = 'Inside mock f2'
...     f1()
... 
>>> test_f1()
Inside mock f2
{% endhighlight %}

### Mock a variable in function scope

Let's say we want to mock the value of a variable `x` local to a function scope of `f1`.

{% highlight python %}
>>> def f1():
...     x = 1
...     print( x )
...
>>> f1()
1
{% endhighlight %}

As per Alex Martelli, this is impossible to mock as explained in this [Stackoverflow answer](http://stackoverflow.com/a/28688149/903446).
Instead use a default argument, as part of the function signature.

{% highlight python %}
>>> def f1(x=None):
...     x = x or 1
...     print( x )
...
>>> f1()
1
{% endhighlight %}

Now it is easy to write a test function, by simply calling the function with the 
expected value.

{% highlight python %}
>>> def test_f1():
...     f1(x=2)
...
>>> test_f1()
2
{% endhighlight %}

### Mock a variable in module scope

Let's say we want to mock the value of a variable `x` local to a module scope of `module.py`.

{% highlight python %}
#: Contents of module.py
x = 1
def f1():
    print( x )
{% endhighlight %}

Since, `x` is in a global scope for module `module.py`, you can mock the value without using
`patch`.

{% highlight python %}
>>> import module
>>> def test_f1():
...     module.x = 2
...     module.f1()
...
>>> test_f1()
2
{% endhighlight %}

If you want to achieve the same behavior, using the `@patch` decorator, then it can be done 
in the following way,

{% highlight python %}
>>> import module
>>> @patch('module.x', 2)
... def test_f1():
...     module.f1()
... 
>>> test_f1()
2
{% endhighlight %}

### Mock an instance attribute

Let's say we want to mock an attribute `attr1` of an instance `obj1` of class `MyClass`.

{% highlight python %}
>>> class MyClass:
...     attr1 = 1
...     def f1( self ):
...         print( self.attr1 )
... 
>>> obj1 = MyClass()
>>> obj1.f1()
1
{% endhighlight %}

This could easily be achieved without using the `@patch` decorator in the following way,

{% highlight python %}
>>> def test_f1():
...     obj = MyClass()
...     obj.attr1 = 2
...     obj.f1()
...
2
{% endhighlight %}

Implementing the same behavior using `@patch`,

{% highlight python %}
>>> @patch('__main__.MyClass.attr1', 2)
... def test_f1():
...     obj1 = MyClass()
...     obj1.f1()
... 
>>> 
>>> test_f1()
2
{% endhighlight %}

### Mock an instance method

Let's say we want to mock a method `f1` of an instance `obj1` of class `MyClass`.

{% highlight python %}
>>> class MyClass:
...     def f2( self ):
...         return 'Inside f2' 
...     
...     def f1( self ):
...         print( self.f2() )
... 
>>> obj1 = MyClass()
>>> obj1.f1()
Inside f2
{% endhighlight %}

Now we could patch the `MyClass` and change the `return_value` of function `f2`.

{% highlight python %}
>>> @patch('__main__.MyClass.f2')
... def test_f1(mock_f2):
...     mock_f2.return_value = 'Inside mock f2'
...     obj1 = MyClass()
...     obj1.f1()
... 
>>> 
>>> test_f1()
Inside mock f2
{% endhighlight %}

### Mock the instance itself

Mocking a class instance can be done by changing the `return_value` attribute
of the mocked class.

{% highlight python %}
>>> class MyClass:
...     def __init__(self):
...         print( 'Inside init' )
... 
>>> 
>>> MyClass()
Inside init

>>> @patch('__main__.MyClass')
... def test_f(mock_MyClass):
...     mock_MyClass.return_value = 'Inside mock init'
...     print( MyClass() )
...
Inside mock init
{% endhighlight %}

In nutshell, we manage to test each scenario without using `Mock` or `MagicMock`. In
most of the cases, `patch` should be enough to unit test your code.
