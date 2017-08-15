---
title: Font-face saga of Chrome
date: 2014-02-09 00:00:00 Z
layout: link
type: link
link: https://code.google.com/p/chromium/issues/detail?id=236298
---

Apparently, Google Chrome has been infected with a wierd bug that causes web fonts to randomly disappear and fallback to the default system fonts. Initially, I thought I was the only one facing this problem, becuase either hovering the text or reloading the page solved the issue.

But after stumbling across this [bug tracker](https://code.google.com/p/chromium/issues/detail?id=236298), I realised that this bug not only affects me (I am on OS X Mavericks) but all other platforms as well. [Typekit also clarified](http://blog.typekit.com/2014/02/04/chrome-bug-affecting-web-fonts/) that this nothing to do with their font rendering service.

I am surprised that this issue crept through the stable release channel of both M31 and M32. Although it is not a security or stability issue, this bug affects the quality of text and it just so happens that we really need text on the Web!

> The Chrome team is aware of the problem and has already fixed the bug. The bug fix will be in Chrome 33, which is planned for release in late February. If you’re still experiencing the issue in Chrome Canary (which has the bug fixed), please [let the Chrome team know in the bug report](https://code.google.com/p/chromium/issues/detail?id=236298).
