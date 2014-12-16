---
layout: link
title: Mistakes in the Design of CSS by W3C
type: link
link: http://wiki.csswg.org/ideas/mistakes
---

I'm glad that the [CSS working group](http://wiki.csswg.org/main) wiki compiled
a list of mistakes that were made in the design of CSS and are willing to
correct if anyone invents a time machine. My favorite one's are,

* `rgba()` and `hsla()` should not exist, `rgb()` and `hsl()` should have gotten
   an optional fourth parameter for opacity.
* The `currentcolor` keyword should have a dash, `current-color`.
* Box-sizing should be border-box by default.
* `background-size` with one value should duplicate its value, not default the
  second one to `auto`.
* `white-space: nowrap` should be `white-space: no-wrap`.

It is very easy to screw things up, even for design decisions made to build a
language used on the web that literally affects the entire world. But it takes
a great deal of courage to acknowledge the mistakes commited in the past and
develop a genuine intention to resolve them.

Hence, I laud the working group members for this!