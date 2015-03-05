---
layout: post
title: Best practices vs HTTP 2.0
type: post
excerpt: This post is all about the introduction of HTTP 2.0 into the mainstream by putting it side-to-side with some of the best practices that we have engineered and cultivated over the years.
---

### Best practice 1 - Concatenation of assets

Spriting multiple images, concatenating your CSS and JS files and inlining your assets with base64 are some of the techniques 
that we have engineered to avoid multiple HTTP requests. We all know how expensive a single HTTP request can be, given the 
roundtrips required to perform just handshake between the client and the server. 

HTTP2 is here to change this practice by providing us the ability to keep the connection between the client and server 
open for re-use for extended periods. This would eliminate the need for frequent handshakes per request between the client and 
the server.

### Best practice 2 - Compression of assets

Compression of assets is a common technique to reduce the payload being exchanged across the network. This reduces the time 
taken to send/receive the message and consume less bandwidth while exchanging data. 

Well, with the advent of HTTP2 this technique is no more required, as HTTP2 uses compression, unlike HTTP1, and so the size of 
the request is significantly smaller and thus faster.

### Best practice 3 - Domain sharding

The HTTP 1.1 spec allowed a client to use maximum two TCP connections for each host. So, in order to not violate the spec 
clever sites simply invented the concept of **Domain Sharding**. It basically means spreading out your service on as many
different hosts as possible to double the amount of simultaneous connections the browser will allow in order to get your files. 

HTTP2 support multiplexing, which essentially means that we can send and receive multiple resources at the same time over one
connection, thus avoiding the need to scatter your resources across multiple domains.

[Experts believe](https://mattwilcox.net/web-development/http2-for-front-end-web-developers) that using these best practices 
on a HTTP2 server can actually make things slower. If you are interested in digging out more on HTTP2, then following links 
can give you a jump start,

- Matt Wilcox on [HTTP2 for frontend developers](https://mattwilcox.net/web-development/http2-for-front-end-web-developers).
- Daniel Stenberg's PDF: [HTTP2 vs HTTP1](http://daniel.haxx.se/http2/http2-v1.10.pdf).
- Official HTTP/2 [Homepage](https://http2.github.io/).