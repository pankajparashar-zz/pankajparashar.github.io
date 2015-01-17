---
layout: post
title: Beautify CSS code using Codepen
type: post
excerpt: Few would argue that Codepen has been an indispensable tool for the Frontend developer community. Although, I have been using Codepen for a long time, only recently, I realised that it can also be used to beautify your compressed CSS code.
---

Recently, I [tweeted](https://twitter.com/pankajparashar/status/554256377841844224) about using 
[Codepen](http://codepen.io/) to beautify your CSS code. I got few reactions in response asking me to explain the 
process. The idea is simple — 

1. Copy-paste your compressed code in the CSS section.
2. Select a pre-processor of your choice that allows you to write native CSS code.
3. Switch to the compiled version and extract the output.

I've also got a GIF version of the above steps,

<figure>
    <img src="//res.cloudinary.com/dw9fem4ki/image/upload/v1421489236/beautify-css_swilwg.gif">
    <figcaption>3-step process to beautify your compressed CSS code.</figcaption>
</figure>

Currently, this approach would work with LESS, Stylus and Scss. It obviously wouldn't work with the indented syntax
version of Sass, simply because it doesn't consider the CSS syntax as valid. Unfortunately, this approach doesn't work 
for other languages like HTML and JavaScript.

> Although, Markdown supports HTML tags, the compiled version does not beautify the HTML tags.

This hidden feature can take Codepen a notch higher and bring it very close to fully functional code editor.