---
layout: post
title: Magic methods
type: post
excerpt: Apart from __init__, Python's got a bunch of very useful magic methods that most of us do not use in day-to-day practice. This article is all about the dunder methods that can add magic to your python code.
---

Python's collection of magic methods can broadly be classified into the following
categories,

- Construction & Destruction
- Operators
- Builtins
- Type Conversion
- Attribute access
- Containers & Dicts
- Context Managers

### Construction & Destruction

`__new__(cls, *args)` - It is the first method invoked when you create an object
 of a class.  
`__init__(self, *args)` - Invoked after the `__new__` during the initialization
of an object.  
`__del__(self)` - It is called when the object is garbage collected. Contrary to
popular belief, it is not called when we execute `del obj` statement.  

{% highlight python %}
obj = MyClass()     #: Calls __new__ and then __init__
{% endhighlight %}

### Operators

Operators are further divided into Comparison, Arithmetic, Refleced Arithmetic,
Augmented Assignment and Unary operators.

**1. Comparison operators**  
`__eq__(self, other)` - Implements equality `==`  
`__ne__(self, other)` - Implements inequality `!=`  
`__lt__(self, other)` - Implements less-than `<`  
`__gt__(self, other)` - Implements greater-than `>`  
`__le__(self, other)` - Implements less-than-or-equal-to `<=`  
`__ge__(self, other)` - Implements greater-than-or-equal-to `>=`  

{% highlight python %}
obj1 = MyClass()
obj2 = MyClass()

obj1 == obj2    #: Calls __eq__
obj1 != obj2    #: Calls __ne__
obj1 < obj2     #: Calls __lt__
obj1 > obj2     #: Calls __gt__
obj1 <= obj2    #: Calls __le__
obj1 >= obj2    #: Calls __ge__
{% endhighlight %}

**2. Arithmetic operators**  
`__add__(self, other)` - Implements addition `+`  
`__sub__(self, other)` - Implements subtraction `-`  
`__mul__(self, other)` - Implements multiplication `*`  
`__div__(self, other)` - Implements division `/`  
`__floordiv__(self, other)` - Implements integer division `//`  
`__truediv__(self, other)` - Implements true division  
`__mod__(self, other)` - Implements modulo `%`  
`__divmod__(self, other)` - Implements `divmod()` builtin  
`__pow__` - Implements power-of `**`  
`__lshift__(self, other)` - Implements left bitwise shift `<<`  
`__rshift__(self, other)` - Implements right bitwise shift `>>`  
`__and__(self, other)` - Implements bitwise AND `&`  
`__or__(self, other)` - Implements bitwise OR `|`  
`__xor__(self, other)` - Implements bitwise XOR `^`  

{% highlight python %}
obj = MyClass()

obj + 1         #: Calls __add__
obj - 1         #: Calls __sub__
obj * 1         #: Calls __mul__
obj / 1         #: Calls __div__ (if from __future__ import division then Calls __truediv__)
obj // 1        #: Calls __floordiv__
obj ** 2        #: Calls __pow__
obj << 1        #: Calls __lshift__
obj >> 1        #: Calls __rshift__
obj & 1         #: Calls __and__
obj | 1         #: Calls __or__
obj ^ 1         #: Calls __xor__
{% endhighlight %}

**3. Reflected Arithmetic operators**  

Reflected Arithmetic comes into the picture when operands are switched around,
thus creating a reflection. For example, `obj + other` can be switched to `other + obj`
which calls a different set of magic methods, listed below,

`__radd__(self, other)` - Implements addition `+`  
`__rsub__(self, other)` - Implements subtraction `-`  
`__rmul__(self, other)` - Implements multiplication `*`  
`__rdiv__(self, other)` - Implements division `/`  
`__rfloordiv__(self, other)` - Implements integer division `//`  
`__rtruediv__(self, other)` - Implements true division  
`__rmod__(self, other)` - Implements modulo `%`  
`__rdivmod__(self, other)` - Implements `divmod()` builtin  
`__rpow__` - Implements power-of `**`  
`__rlshift__(self, other)` - Implements left bitwise shift `<<`  
`__rrshift__(self, other)` - Implements right bitwise shift `>>`  
`__rand__(self, other)` - Implements bitwise AND `&`  
`__ror__(self, other)` - Implements bitwise OR `|`  
`__rxor__(self, other)` - Implements bitwise XOR `^`  

{% highlight python %}
obj = MyClass()

1 + obj         #: Calls __add__
1 - obj         #: Calls __sub__
1 * obj         #: Calls __mul__
1 / obj         #: Calls __div__ (if from __future__ import division then Calls __truediv__)
1 // obj        #: Calls __floordiv__
1 ** obj        #: Calls __pow__
1 << obj        #: Calls __lshift__
1 >> obj        #: Calls __rshift__
1 & obj         #: Calls __and__
1 | obj         #: Calls __or__
1 ^ obj         #: Calls __xor__
{% endhighlight %}

**4. Augmented assignment operators**  
`__iadd__(self, other)` - Implements addition with assignment `+=`  
`__isub__(self, other)` - Implements subtraction with assignment `-=`  
`__imul__(self, other)` - Implements multiplication with assignment `*=`  
`__ifloordiv__(self, other)` - Implements integer division with assignment `//=`  
`__idiv__(self, other)` - Implements division with assignment `/=`  
`__itruediv__(self, other)` - Implements true division with assignment `/=`  
`__imod__(self, other)` - Implements modulo with assignment `%=`  
`__ipow__` - Implements exponents with assignment `**=`  
`__ilshift__(self, other)` - Implements left bitwise shift with assignment `<<=`  
`__irshift__(self, other)` - Implements right bitwise shift with assignment `>>=`  
`__iand__(self, other)` - Implements bitwise AND with assignment `&=`  
`__ior__(self, other)` - Implements bitwise OR with assignment `|=`  
`__ixor__(self, other)` - Implements bitwise XOR with assignment `^=`  

{% highlight python %}
obj1 = MyClass()
obj2 = MyClass()

obj1 += obj2    #: Calls __iadd__
obj1 -= obj2    #: Calls __isub__
obj1 *= obj2    #: Calls __imul__
obj1 /= obj2    #: Calls __idiv__ (if from __future__ import division then Calls __itruediv__)
obj1 //= obj2   #: Calls __ifloordiv__
obj1 **= 2      #: Calls __ipow__
obj1 <<= obj2   #: Calls __ilshift__
obj1 >>= obj2   #: Calls __irshift__
obj1 &= obj2    #: Calls __iand__
obj1 |= obj2    #: Calls __ior__
obj1 ^= obj2    #: Calls __ixor__
{% endhighlight %}

**5. Unary operators**  
`__pos__(self)` - Implements unary positive `+`  
`__neg__(self)` - Implements negation `-`  
`__invert__(self)` - Implements inversion `~`  

{% highlight python %}
>>> obj = MyClass()

>>> +obj    #: Calls __pos__
>>> -obj    #: Calls __neg__
>>> ~obj    #: Calls __invert__
{% endhighlight %}

### Builtins

Python provides a useful bunch of magic methods for `builtins` and few methods
of the `math` library as well.

`__abs__(self)` - Implements `abs()`  
`__round__(self, n)` - Implements `round()` (n: number of decimal places)  
`__repr__(self)` - Implements `repr()`  
`__format__(self, istr)` - Implements `format()`  
`__hash__(self)` - Implements `hash()`  
`__bool__(self)` - Implements `bool()`  
`__dir__(self)` - Implements `dir()`  
`__isinstance__(self, instance)` - Implements `isinstance()`  
`__issubclass__(self, subclass)` - Implements `issubclass()`
`__call__(self, *args)` - Implements an instance of a class to be called as a function   
`__sizeof__(self)` - Implements `sys.getsizeof()`  
`__floor__(self)` - Implements `math.floor()`  
`__ceil__(self)` - Implements `math.ceil()`  
`__trunc__(self)` - Implements `math.trunc()`

{% highlight python %}
>>> obj = MyClass()

>>> abs(obj)                    #: Invokes __abs__
>>> round(obj)                  #: Invokes __round__
>>> repr(obj)                   #: Invokes __repr__
>>> ''.format(obj)              #: Invokes __format__
>>> hash(obj)                   #: Invokes __hash__
>>> bool(obj)                   #: Invokes __bool__
>>> dir(obj)                    #: Invokes __dir__
>>> isinstance(obj, MyClass)    #: Invokes __isinstance__
>>> issubclass(obj, object)     #: Invokes __issubclass__
>>> obj()                       #: Invokes __call__
>>> math.floor(obj)             #: Invokes __floor__
>>> math.ceil(obj)              #: Invokes __ceil__
>>> math.trunc                  #: Invokes __trunc__
>>> obj[0]                      #: Invokes __index__
{% endhighlight %}

### Type Conversion

`__int__(self)` - Implements `int()`  
`__long__(self)` - Implements `long()`  
`__float__(self)` - Implements `float()`  
`__complex__(self)` - Implements `complex()`  
`__oct__(self)` - Implements `oct()`  
`__hex__(self)` - Implements `hex()`  
`__str__(self)` - Implements `str()`  
`__unicode__(self)` - Implements `unicode()`  

{% highlight python %}
>>> obj = MyClass()

>>> int(obj)        #: Invokes __int__
>>> long(obj)       #: Invokes __long__
>>> float(obj)      #: Invokes __float__
>>> complex(obj)    #: Invokes __complex__
>>> oct(obj)        #: Invokes __oct__
>>> hex(obj)        #: Invokes __hex__
>>> str(obj)        #: Invokes __str__
>>> unicode(obj)    #: Invokes __unicode__
{% endhighlight %}

### Attribute Access

`__getattr__(self, name)` - Implements getter  
`__setattr__(self, name, value)` - Implements setter  
`__delattr__(self, name)` - Implements deleter  

{% highlight python %}
>>> obj = MyClass()

>>> obj.attr1           #: Invokes __getattr__
>>> obj.attr1 = 1       #: Invokes __setattr__
>>> del obj.attr1       #: Invokes __delattr__
{% endhighlight %}

### Containers & Dicts

`__len__(self)` - Implements `len()`  
`__index__(self)` - Implements `obj[i]`  
`__getitem__(self, key)` - Implements `obj[key]`  
`__setitem__(self, key, value)` - Implements `obj[key] = val`  
`__delitem__(self, key)` - Implements `del obj[key]`  
`__iter__(self)` - Implements `iter()`  
`__reversed__(self)` - Implements `reversed()`  
`__contains__(self, item)` - Implements `in` and `not in`  
`__missing__(self, key)` - Implements the behavior when a key is missing from dictionary  

{% highlight python %}
>>> obj = MyClass()

>>> len(obj)                #: Invokes __len__
>>> obj[0]                  #: Invokes __index__
>>> obj['key1']             #: Invokes __getitem__
>>> obj['key1'] = 'val1'    #: Invokes __setitem__
>>> del obj ['key1']        #: Invokes __delitem__
>>> iter(obj)               #: Invokes __iter__
>>> reversed(obj)           #: Invokes __reversed__
>>> 'key1' in obj           #: Invokes __contains__
>>> obj['key2']             #: Invokes __missing__ ('key2' is missing in obj)
{% endhighlight %}

### Context Managers

Context managers allow setup and cleanup actions to be taken for objects when
their creation is wrapped with a with statement. The behavior of the context
manager is determined by two magic methods,

`__enter__(self)` - Defines what the context manager should do at the beginning of the
block created by the with statement. Note that the return value of `__enter__`
is bound to the target of the `with` statement, or the name after the `as`.
`__exit__(self, exception_type, exception_value, traceback)` - Defines what the
context manager should do after its block has been executed (or terminates).

{% highlight python %}
>>> with open('file.txt') as fp:        #: Invokes __enter__
...     fp.read()                       #: At the end, invokes __exit__
{% endhighlight %}
