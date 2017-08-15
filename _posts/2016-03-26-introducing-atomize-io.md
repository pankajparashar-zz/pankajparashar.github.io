---
title: Introducing Atomize IO
date: 2016-03-26 00:00:00 Z
layout: post
type: post
excerpt: Over the weekend, I pushed out a new update to the Atomize IO app and this
  post is all about, explaining how those numbers are calculated.
---

If you are unfamiliar with [Atomize IO](https://atomize-io.herokuapp.com/), then make sure you checkout the web app
and run it against your website. I have been massively impressed with the idea behind [Atomic CSS](http://acss.io/)
and always wanted to build something to find out, how much duplicate CSS declarations
live inside the CSS codebase of popular websites and by how much they can benefit by adopting the Atomic CSS methodology.

Atomize IO answers both the questions and represents the results with bunch of numbers.
In the next section, I will outline the principle and algorithm developed to calculate these numbers.

### Principle

Since, Atomic CSS relies on single purpose classes, it manages to avoid duplicate
declarations in the CSS codebase. However, a typical CSS codebase is flooded with
duplicate declarations scattered across various classes, much thanks to the semantic
classes we are used to writing. This leads to redundancy, bloat and maintenance overhead.  

Hence, it becomes imperative to identify all the unique property-value pairs,
construct a ruleset containing each pair with a unique class selector to identify the ruleset.

### Algorithm

1. Grab the input URL.  
2. Make a request to the URL and get the HTML in response.
3. Grab all the CSS files that are linked in the HTML.  
4. Extract only those CSS styles that are used in the HTML.
5. Run through each ruleset and identify all the unique property-value pairs.
6. Construct a CSS file with each declaration in a new ruleset accompanied by a unique selector.
7. Now you can count the no. of declarations, selectors, rulesets found in CSS files
generated at **Step 4** (Before) and **Step 6** (After).

> **Note -** Step 4 is only used to generate numbers for Single Page CSS view. Combined
CSS view uses the complete CSS at Step 3.

### Caveats

There are few caveats in the above algorithm, that you should keep in mind while
interpreting these numbers.  

1. The approach doesn't take into account inline styles.  
2. Media queries are not handled separately. This means `div { color: red; }` and `@media screen { div { color: red; } }` will be counted as one.
3. Each vendor prefixed property will have a separate class. This is not the really case when using Atomic CSS styles.
4. Styling via JavaScript is not taken into the account.
5. Currently the selectors are named as `.styles+{counter}` to guarantee uniqueness. I am almost sure that an Atomic classname will be much shorter than this naming scheme.

As it stands, the approach is not completely perfect but still does a darn good
job of showcasing the benefits by simply adopting Atomic CSS methodology.
Need proof? check the stats of [twitter.com](https://atomize-io.herokuapp.com/twitter.com) here,

<figure>
    <img src="http://res.cloudinary.com/dw9fem4ki/image/upload/c_scale,w_800/v1458987639/Screen_Shot_2016-03-26_at_3.48.46_PM_afogfs.png">
    <figcaption>Atomize IO stats for twitter.com. Also see this <a href="https://twitter.com/necolas/status/713123463301455873">tweet</a> by Nicolas Gallagher.</figcaption>
</figure>
