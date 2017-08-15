---
title: Serving from a cookieless domain?
date: 2014-12-28 00:00:00 Z
layout: link
type: link
link: http://www.jonathanklein.net/2014/02/revisiting-cookieless-domain.html
---

[Google](https://developers.google.com/speed/docs/insights/EnableCompression?csw=1#ServeFromCookielessDomain), [Yahoo](https://developer.yahoo.com/performance/rules.html#cookie_free) and others for long have been strongly recommending **to serve your static assets from a cookieless domain** for a 
faster site. [Jonathan Klein](http://www.jonathanklein.net/), however, questions this notion with the help of a comprehensive article supporting his claim that 
serving CSS files from the same domain as the base page might be a performance win.

This case study was the result of a recent experimentation done at [Etsy](https://www.etsy.com) and is accompanied by detailed analysis of the top 5 most
visited websites in the world. The conclusions are rather surprising given the [benefits of serving from a cookieless domain](http://www.ravelrumba.com/blog/static-cookieless-domain/).