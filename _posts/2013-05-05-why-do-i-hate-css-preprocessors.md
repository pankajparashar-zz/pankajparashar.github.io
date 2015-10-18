---
layout: post
title: Why do I hate CSS preprocessors?
type: post
excerpt: Preprocessors solves a problem that doesn’t really exist! Continue reading my musings about using a pre-processing tool for a language like CSS.
---

For the past few months I have been struggling to convince myself to switch to a CSS preprocessing language like [Sass](http://sass-lang.com/) or [LESS](http://www.lesscss.org/). But on the contrary, I ended up documenting the reasons for not using a CSS preprocessor. Here’s why,

> Since, the time I wrote this article, I've moved on to use SCSS as my primary pre-processing language, due to its ability to understand plain CSS as well. I don't use all the features offered by SCSS, but use only few of them like variables, mixins, nesting etc. that helps me write better CSS – **November 23, 2013**.

#### Another language to write CSS?

CSS preprocessor is just another language to write CSS. It takes you away from the simplicty of CSS. Moreover, if it gets into your head then there is every chance that one day you might forget the CSS syntax altogether.

I realized this problem when I started using the Sass with [Compass](http://compass-style.org/) (that provides readymade add-ons) to use the [mixin for box-shadow](http://compass-style.org/reference/compass/css3/box_shadow/) by simply passing the parameters.

The mixin works wonderfully well, but wait! did I forget how to write the CSS for box-shadow? Agreed that care has been taken to keep the syntax similar, but who really wants to learn a new language that essentially gives the output in CSS?

#### Losing the bigger picture

Writing pure CSS always brings me closer to the fact that how simple this language is. I write my HTML and JavaScript keeping in mind the simplicity that css can offer. This ensures that my CSS is always used for the presentational aspects only, whereas the complexities are dealt by JavaScript.

<figure><img src="https://d262ilb51hltx0.cloudfront.net/fit/t/1800/756/0*MIhIq2HVG_osB0mU.jpeg">
<figcaption>Code mess created with pre-processor tools like Sass!</figcaption></figure>

However, the variables, mixins, extends, nesting etc., in preprocessors forces us to define our approach to write CSS in a programmatic manner rather than aesthetic one. Hence, it is easier to get carried away and lose the bigger picture, isn’t it?

#### Bloated output CSS file

Pundits will quickly discard this point as almost every CSS preprocessing tool on this earth is capable of minifying the output CSS. However, the final file size has more to do with the code written inside the file than just gzip and minification.

> <a href="http://blog.millermedeiros.com/the-problem-with-css-pre-processors/">Studies</a> have proved that preprocessors have the tendency of generating redundant snippets of code, when the actual css could have been much smaller.

Lea Verou explains this phenomenon with examples in her [opinionated article on CSS preprocessors](http://lea.verou.me/2011/03/on-css-preprocessors/).

#### Needs additional setup

I write my CSS in either Notepad or Vim. The editor and the browser are the only 2 pieces of software that I use for front-end development.

I don’t want to add additional tools or libraries to my existing workflow. I prefer to keep my workflow light and portable that allows me to work on my code literally from anywhere on any operating system. But preprocessors flirt with this principle since they cannot work without additional toolset like - [Ruby](https://www.ruby-lang.org/en/) (for Sass on Windows) and [Node PM](http://nodejs.org/) (for LESS).

#### Maintenance and Debugging

For a team of CSS developers, do you really expect each one of them to know Sass/LESS? If no, then what happens if another developer wants to edit the CSS file but doesn’t know Sass?

Debugging is even harder; when you know that the developer tool of the browser shows you the code and the line number of the css file. Do you want to manually trace the piece of code in your Sass file?

I do understand the advantages and the benefits that these preprocessors bring to the plate, but with an additional cost. There are counter-arguments probably to every point that I have made in this article. But that still wouldn’t change my opinion and the way I feel about CSS Preprocessors.

I don’t hate them but I don’t like them either!
