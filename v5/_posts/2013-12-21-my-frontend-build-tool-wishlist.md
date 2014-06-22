---
layout: post
title: My frontend build tool wishlist...
type: post
excerpt: For quite a long time now, I have been toying around an idea of a perfect build tool to deploy front-end projects. This article is all about my wishlist from such a tool.

---

Assuming, you have completed the development work on the frontend of your next web project and are ready to deploy it in production. A typical project involves concatenating and minifying the assets, checking the code for errors, compressing the images and testing it across different combination and breed of browsers, devices and operating system. So, here goes my wishlist,

The typical build process of a project follows,

{% highlight css %}

Compilation > Linting > Concatenation > Compression > Miscellaneous

{% endhighlight %}

Hence, I have divided the build task into the following categories,

### Compilation

If you use some kind of a pre-processor in your workflow to write your HTML, CSS or JavaScript, the compilation of code into its raw form naturally becomes the first step of any build task.

- [HAML](http://haml.info/) / [MarkDown](https://daringfireball.net/projects/markdown/) / [Jade](http://jade-lang.com/) / [Slim](http://jade-lang.com/) to HTML.
- [Sass](http://sass-lang.com/) / [SCSS](http://sass-lang.com/) / [LESS](http://lesscss.org/) / [Stylus](http://learnboost.github.io/stylus/) to CSS.
- [Compass](http://compass-style.org/) / [Bourbon](http://bourbon.io/) to CSS.
- [CoffeeScript](http://coffeescript.org/) / [LiveScript](http://livescript.net/) / [TypeScript](http://www.typescriptlang.org/) to JavaScript.

### Linting

Linting refers to validating your code against errors, suspicous code and checking if the code corresponds to a certain style guidelines.

- Lint all `.html`, `.css` and `.js` files.
- Should have the ability to configure linting rules and flexiblity to add new style guidelines rules.

### Concatenation

Concatenation combines several files of the same type into a single file so that you can reduce the number of HTTP requests to the server.

- Combining `.css` and `.js` files separately with added flexiblity to choose the order in which the files are merged.
- Sprite all background images into a single image file and update the CSS code with the correct background url and position value of each image.

### Compression

Compression helps reduce the overall size of the resource being transferred across the network. Following are some of the ways we can achieve compression,

- Compress all the `.png`, `.jpg`, `.gif` and `.svg` images with the ability to choose the compression/optimization level.
- Minify the `.html`, `.css` and the `.js` document with optional features like add banner, keep special comments and report useful statistics at the end of the process.
- Generate source maps for CSS and JS files to define an exact mapping between the production code and the authored code.
- Remove unused CSS rulesets.

### Hashing

Using hash-ed filenames in addition to the Expiry headers, can help bust the cache without worrying about old assets wreaking havoc on your site.

- Rename assets (`.css`, `.js` and images embedded in CSS) with hash-ed filenames to bust the cache and update the references in the source code.
- Hashed filename can be a prefix, suffix or a custom naming pattern scheme.
- It should also have the ability to choose a pre-defined algorithm like [MD5](http://en.wikipedia.org/wiki/MD5), [SHA1](http://en.wikipedia.org/wiki/SHA-1), [SHA2](http://en.wikipedia.org/wiki/SHA-2) etc. or a custom algorithm to generate the hash value.
- An added flexibility to define the number of characters, salt of the output value.

### Miscellaneous

Some of the tasks that do not belong to any of the aforementioned categories are below,

- Add banner at the top of `.html`, `.css` and `.js` files indicating the license, author and the version no of the file with the ability to automatically increment the no. after every iteration.
- Resize images to a predetermined width/height to avoid excessive image resize/decode work on the client-side in the browser.
- Generate responsive images on demand at different resolutions for use with [PictureFill](https://github.com/scottjehl/picturefill) or [Srcset](http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/).
- Convert longhand CSS declarations to shorthand CSS equivalent.
- Automatically add vendor prefixes to CSS properties.
- Use Google's [Closure Stylesheets](https://code.google.com/p/closure-stylesheets/#Renaming) to rename CSS class names in the generated stylesheet, which helps reduce the size of the CSS that is eventually sent down to the user.
- Arrange CSS properties in alphabetical order to [improve the performance of the selector](http://coding.smashingmagazine.com/2012/10/02/csscomb-tool-sort-css-properties/).
- Convert assets like images and fonts to their equivalent base64 encoded data uris with the ability to choose the threshold size `(~4kb)`.
- Integration with unit testing framework like [Mocha](http://visionmedia.github.io/mocha/) or [Jasmine](http://pivotal.github.io/jasmine/) or [QUnit](http://qunitjs.com/) in a headless browser like [PhantomJS](http://phantomjs.org/).
- Automatically push static assets (like images) embedded in HTML directly to CDN (like [Amazon S3](http://aws.amazon.com/s3/) or [CloudFront](http://aws.amazon.com/cloudfront/) and update the new url in the source files.
- Automatically generate device screenshots on various combination of browsers and operating system via [BrowserStack's Screenshot API](http://www.browserstack.com/screenshots/api).
- Run through Google's [Pagespeed Optimizer API](https://developers.google.com/speed/pagespeed/) and the [Pingdom Tools API](http://tools.pingdom.com/) to gather Network Utilisation, Web Page Performance audit and other useful statistics that helps you gather significant information about the performance of your website.
- Identify all the links (both external/internal) that no-longer exists or doesn't return HTTP 200.
- Generate documentation of the entire project supported with CSS Style Guides and JavaScript functions.

### Grulp Project

I understand that no build tool would ever be able to meet the outrageous demands of the list above. However, I started with a [project on Github](https://github.com/pankajparashar/grulp) to compile a list of ready-to-use grunt/gulp plugins that accomplishes most of the tasks.

<figure>
    <img alt="Grulp" src="http://res.cloudinary.com/dw9fem4ki/image/upload/v1391875671/Grulp_d1t3u6.png">
    <figcaption><a href="https://github.com/pankajparashar/grulp">Grulp</a> - List of ready-to-use grunt/gulp plugins to build your next web project.</figcaption>
</figure>
