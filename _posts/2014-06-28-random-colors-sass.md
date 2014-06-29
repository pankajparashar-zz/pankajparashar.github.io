---
layout: post
title: Random colors in Sass
type: post
excerpt: Randomly generating numbers in Sass is easy using the random() function that was released in v3.3. Interestingly, we can extend this concept to randomly generate colors as well.

---

I have been working on a soon-to-be released project for which I needed a bunch of randomly generated colors. Ofcourse, I could have taken the JavaScript route to accomplish this, but I wanted to keep my setup light, as the project itself was completely CSS-based. This brought me to the idea of using Sass to randomly generate colors for the CSS. Ofcourse, I knew that we could use [Sass to randomly generate numbers](https://github.com/sass/sass/blob/master/doc-src/SASS_CHANGELOG.md#330-7-march-2014), I was keen to extend this concept for colors as well. 

The idea is to randomly generate a number and assign it to each component of the color. For intuitiveness and simplicity, I used the RGB color model and randomly generated the red, green and the blue components of the color in Sass. Minimum and maximum range for each color component is 0 and 255. However, Sass random() starts from 1. We can tackle this problem in the following way,

<pre><code>
$red: random(256)-1;
$green: random(256)-1;
$blue: random(256)-1;</code></pre>

We can extend the same concept for alpha channel as well which typically accepts values between 0 to 1. In this case, we'll keep the precision after decimal to 2 places only by dividing the randomly generated number by 100.

<pre><code>
$alpha: random(100)/100;

.random-color {
    color: rgb($red, $green, $blue);
    background-color: rgba($red, $green, $blue, $alpha);
}</code></pre>

However, Sass does some [funky stuff with colors](https://github.com/sass/sass/issues/363#issuecomment-35144591) that makes the output CSS appear in a different format in comparison to the authored style. For example,

<pre>
    <code>
// Sass -> Compiled CSS        
rgb(255, 0, 0) -> red
rgb(255, 200, 100) -> #ffc864
rgba(255, 100, 100, .05) -> rgba(255, 100, 100, 0.05)</code></pre>

To counter this problem, [I created a string template](https://twitter.com/pankajparashar/status/462623911180394497) with the desired format and just needed to substitue the values for each color component. But before we could set this value to any of the CSS properties, we have to remove the quotes.

<pre><code>        
.random-color {
    color: unquote("rgb(#{$red}, #{$green}, #{$blue})");
    background-color: unquote("rgba(#{$red}, #{$green}, #{$blue}, #{$alpha})");
}</code></pre>

... and the compiled CSS is exactly how we authored originally in the .scss file,
<pre>
    <code>        
.random-color {
    color: rgb(70, 110, 219);
    background-color: rgba(70, 110, 219, 0.88);
}</code></pre>

### Scalable
The above code is good if you are sparingly using this concept, however, it is always better we can improvise this idea into a scalable solution with much more color format options and easy-to-use configuration. 

Let's create a random color component using Sass maps,

<pre>
    <code>
$color: (
    percent: (
        red: random(101)-1, green: random(101)-1, blue: random(101)-1,
        saturation: random(101)-1, light: random(101)-1
    ),
    octal: ( red: random(256)-1, green: random(256)-1, blue: random(256)-1 ),
    deg: ( hue: random(361)-1 ),
    fraction: ( alpha: random(100)/100 )
);</code></pre>

The color map is divided into base and the actual color component. To retrieve individual color components, we'll build a function that will traverse through the nested color map to fetch the right component,

<pre>
    <code>
@function color($base, $component) {
    @return map-get(map-get($color, $base), $component);
}</code>
</pre>

We can then easily retrieve the red color component in octal format by using <code>color(octal, red)</code>. Everytime we need a random color, we can call a function and pass the relevant format in which we need the randomly generated color. In-case, there is no argument, we will generate a named color, for which we need the Sass list of 147 color names valid in CSS.

<pre>
    <code>
$named-colors: 'AliceBlue', 'AntiqueWhite', ..., 'YellowGreen';</code></pre>

... and the usage,

<pre>
    <code>
.random-color {
    border-top-color: getRandomColor();
    border-right-color: getRandomColor("hex");
    border-bottom-color: getRandomColor("rgb");
    border-left-color: getRandomColor("%rgb");
    outline-top-color: getRandomColor("hsl");
    outline-right-color: getRandomColor("rgba");
    outline-bottom-color: getRandomColor("%rgba");
    outline-left-color: getRandomColor("hsla");
}</code></pre>

Now, onto the crucial part of the code that will hook the requested color format with the corresponding randomly generated color map.

<pre>
    <code>
@function getRandomColor($format: NULL) {
    @if $format == "hex" {
        @return rgb(color(octal, red), color(octal, green), color(octal, blue));
    }
    @else if $format == "rgb"   { ... }
    @else if $format == "%rgb"  { ... }
    @else if $format == "rgba"  { ... } 
    @else if $format == "%rgba" { ... }
    @else if $format == "hsl"   { ... } 
    @else if $format == "hsla"  { ... } 
    @else { 
        @return nth($named-colors, random(147));
    }
}</code></pre>

For the complete code, make sure you check out the [gist](https://gist.github.com/pankajparashar/413419cdbdd1b9d58de3) or the working example on [Sassmeister](http://sassmeister.com/gist/413419cdbdd1b9d58de3) to get you started.
