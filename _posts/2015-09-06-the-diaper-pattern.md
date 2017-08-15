---
title: The Diaper Pattern
date: 2015-09-06 00:00:00 Z
layout: link
type: link
link: http://mike.pirnat.com/2009/05/09/the-diaper-pattern-stinks/
---

[Mike Pirnat](http://mike.pirnat.com/) wrote about the diaper pattern almost
6 years ago, but the essence of his writing is still fresh in my mind. It refers
to the practice of catching generic exceptions in your code, allowing them to
silently pass through your code which could yield dangerous results.

Its called **diaper** because it catches all the shit. In practice, it is always
recommended to catch specific exceptions and let the code break for any runtime
exceptions. This principle is not new and has been captured in the
[Zen of Python - PEP20](https://www.python.org/dev/peps/pep-0020/).
