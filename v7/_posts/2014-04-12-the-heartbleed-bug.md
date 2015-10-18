---
layout: post
title: The HeartBleed Bug
type: post
excerpt: The encryption flaw that punctured the heart of the Internet and has left almost two-thirds of the world's websites vulnerable to attack by hackers.
---

This [bug](http://heartbleed.com/) was discovered on April 07, 2014, by Neel Mehta from Google Security and the team of security engineers (Riku, Antti and Matti) from Codenomicon and has affacted v1.0.1 and 1.0.2-beta releases of OpenSSL including 1.0.1f and 1.0.2-beta1.

[XKCD does a better job](http://xkcd.com/1354/) of explaining a lay man's version of the bug. For a more technical description, I would recommend reading [Cloudfare's](http://blog.cloudflare.com/answering-the-critical-question-can-you-get-private-ssl-keys-using-heartbleed) version of explanation. They even had a [challenge page](https://www.cloudflarechallenge.com/heartbleed) setup to lure hackers to expose the vulnerabilities of the web server by hacking in to the private key of the SSL certificate.

Within 3 hours, [Fedor Indutny](https://twitter.com/indutny), a core team member of Node.js [cracked](https://twitter.com/indutny/statuses/454761620259225600) the encryption and made the [RSA key public](https://gist.github.com/indutny/a11c2568533abcf8b9a1). Someone also added a bounty on [Hacker News](https://news.ycombinator.com/item?id=7573679) for whoever published and confirmed successful completion of this challenge.

#### The Bug

The Heartbleed bug, revealed on Monday, was the product of a fluke introduced by a young German researcher. He admitted that he had unintentionally introduced the bug on New Year's Eve 2011 while working on bug fixes for OpenSSL.

The bug was missing a bound check in the handling of the TLS heartbeat extension that can be used to reveal up to 64k of memory to a connected client or server. The precise flaw in the source code is illustrated [here](https://github.com/openssl/openssl/commit/96db9023b881d7cd9f379b0c154650d6c108e9a3#diff-2) on Github, touted as a billion dollar mistake due to poor coding implementation which resulted into this bug.