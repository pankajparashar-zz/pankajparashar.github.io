---
title: How 11 lines of JavaScript broke the Internet?
date: 2016-03-24 00:00:00 Z
layout: link
type: link
link: http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos?mt=1458754433021
---

Roughly around 1430 hours Pacific time on Tuesday, March 22nd, 2016, [@npmjs](https://www.npmjs.com)
observed hundreds of failures per minute for missing dependencies requesting
for the now-unpublished package, `left-pad`. Notably popular open source libraries
like Babel, React etc stopped working as this package was enlisted as one of the
dependencies in the `package.json` file.  

This resulted into large-scale build and deployment
failures across the internet, and eventually led to mass fallout on [Github](https://github.com/azer/left-pad/issues/4),
[Twitter](https://twitter.com/search?f=tweets&vertical=default&q=left-pad%20npm&src=typd),
[Reddit](https://www.reddit.com/r/programming/comments/4bjss2/an_11_line_npm_package_called_leftpad_with_only/) and
[Hacker News](https://news.ycombinator.com/item?id=11340510).

### What is this package for?

At the time of writing, `left-pad` is one of the most popular open source package
registered at NPM, with roughly 2.5M downloads per month. All it does, is implement
a basic left-pad string function using just 11 lines of JavaScript,

{% highlight js %}
module.exports = leftpad;
function leftpad (str, len, ch) {
    str = String(str);
    var i = -1;
    if (!ch && ch !== 0) ch = ' ';
    len = len - str.length;
    while (++i < len) {
        str = ch + str;
    }
    return str;
}{% endhighlight %}

### What happened behind the scenes?

Azer Koculu, the developer of this package pulled out approximately 250 packages
from the NPM registry (including `left-pad`) in protest to alleged harassment from
the patent lawyer of the Kik messaging app. Azer has blogged about his version
of the story on [Medium](https://medium.com/@azerbike/i-ve-just-liberated-my-modules-9045c06be67c#.viwantd7j).
Shortly after this went live, Mike Roberts, a head of messenger at Kik, came up
with their [side of the story](https://medium.com/@mproberts/a-discussion-about-the-breaking-of-the-internet-3d4d2a83aa4d#.fda03v7ce).

Mike's response shows Kik in poor light, as evident here,

> **@Bob Stratton** (Kik's patent lawyer) - We don’t mean to be a dick about it, but
 it’s a registered Trademark in most countries around the world and if you
 actually release an open source project called kik, our trademark lawyers are
 going to be banging on your door and taking down your accounts and stuff like
 that — and we’d have no choice but to do all that because you have to enforce
 trademarks or you lose them.

NPM were not far too behind in publishing the timeline of the events as it unfolded
on thier [blog](http://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm).

### Who's to blame?

Some of the folks in the community think that **@Azer** reacted too aggressively
by unpublishing all the packages in anger. Majority of the people agree that **@Kik**
were trying to bullshit their way with lawyers and patents to streamroll a hapless
open-source contributor. **@npmjs** failed to play it nicely too, as they transferred
the ownership of the package without acquiring consent from the owner or sending
prior notification.

All in all, David Haney, who works at StackOverflow, came up with [an interesting
piece](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/)
to sum up with the conclusions that the Node.js community should take the blame too!

> Shortly after I published this piece, the Internet just broke again! but this
time not due to an error but due to this, [left-pad.io](http://left-pad.io/)!
