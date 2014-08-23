---
layout: post
title: Regular Expressions in Python
type: post
excerpt: Regular expressions are hard but this post is not going to make them seem harder. Instead it attempts to simplify the complications surrounding the world of regex.

---

In Python, the module that deals with regular expressions is called [re](https://docs.python.org/2/library/re.html).

<pre class="language-python"><code>import re</code></pre>

### Basic patterns

The power of regular expressions is that they can specify patterns, not just fixed characters. Here are the most basic patterns used for pattern matching,

`a`, `X`, `9` - Ordinary characters that match themselves  
`.` - Matches any single character except newline character  
`\w` - Matches any single letter, digit or underscore  
`\W` - Matches any character not part of `\w`  
`\s` - Matches a single whitespace character like: space, newline, tab, return  
`\S` - Matches any character not part of `\s`  
`\t`, `\n`, `\r` - Matches tab, newline, return respectively  
`\d` - Matches decimal digit 0-9  
`^` - Start of the string (and start of the line in-case of multiline string)  
`$` - End of the string (and newline character in-case of multiline string)  
`\` - Inhibit the specialness of a character  
`[abc]` - Matches `a` or `b` or `c`  
`[a-zA-Z0-9]` - Matches any letter from (`a` to `z`) or (`A` to `Z`) or (`0` to `9`)  
`\A` - Matches only at the start of the string even in MULTILINE mode  
`\Z` - Matches only at the end of the string even in MULTILINE mode
`\b` - Matches only the beginning or end of the word

> The `r` at the start of the pattern string designates a python **raw** string which passes through backslashes without change which is very handy for regular expressions (Java needs this feature badly!). I recommend that you always write pattern strings with the `r` just as a habit.

**Examples**  
Match ordinary characters like `iii`

<pre class="language-python"><code>>>> match = re.search(r'iii', 'piiig') 
'iii'</code></pre>

Match a single character using `.`

<pre class="language-python"><code>>>> match = re.search(r'i.i', 'pirig') 
'iri'</code></pre>

Match any single letter, digit or underscore using `\w`

<pre class="language-python"><code>>>> match = re.search(r'i\wi', 'piaig') 
'iai'</code></pre>

Match any non-word character using `\W`

<pre class="language-python"><code>>>> match = re.search(r'i\Wi', 'pi@ig') 
'i@i'</code></pre>

Match a single whitespace character using `\s`

<pre class="language-python"><code>>>> match = re.search(r'i\si', 'pi ig') 
'i i'</code></pre>

Match any non-whitespace character using `\S`

<pre class="language-python"><code>>>> match = re.search(r'i\Si', 'piAig') 
'iAi'</code></pre>

Match tab character using `\t`

<pre class="language-python"><code>>>> match = re.search(r'i\ti', 'pi   ig') 
'i\ti'</code></pre>

Match decimal digit using `\d`

<pre class="language-python"><code>>>> match = re.search(r'i\di', 'pi9ig') 
'i9i'</code></pre>

Match start of the string

<pre class="language-python"><code>>>> match = re.search(r'^pii', 'piigpii') 
'pii'</code></pre>

Match end of the string

<pre class="language-python"><code>>>> match = re.search(r'pii$', 'piigpii') 
'pii'</code></pre>

Match literal character `\n`

<pre class="language-python"><code>>>> match = re.search(r'\.iig', 'pii.iig') 
'.iig'</code></pre>

Match any character in `a`, `b` or `c`

<pre class="language-python"><code>>>> match = re.search(r'p[abc]g', 'pbg') 
'pbg'</code></pre>

Match any decimal digit between 0-9

<pre class="language-python"><code>>>> match = re.search(r'p[0-9]g', 'p7g') 
'p7g'</code></pre>

> Inside the square bracket `[]`, dot `.` means literal dot. Hence, no need to escape them. To use a dash `-` inside a square bracket 
without indicating a range, put it at the end of the possible values like, `[a-zA-Z-]`. An up-hat `(^)` at the start of a square-bracket set inverts it, so `[^ab]` means any char except 'a' or 'b'.

### Repetitions

It becomes quite tediuos to represent a repeating pattern. Fortunately, regex handles this gracefully with the following
expressions,

`+` - one or more characters  
`*` - zero or more characters  
`?` - zero or one character  

**Examples**  
Match one or more characters using `+`

<pre class="language-python"><code>>>> match = re.search(r'pi+g', 'piiiig') 
'piiiig'</code></pre>

Match zero or more characters using `*`

<pre class="language-python"><code>>>> match = re.search(r'pi*g', 'pg') 
'pg'</code></pre>

Matche zero or one character using `?`

<pre class="language-python"><code>>>> match = re.search(r'pi?g', 'piiiigpigpg') 
'pig'</code></pre>

> There is an extension to regular expression where you add a `?` at the end, such as `.*?` or `.+?`, changing them to be non-greedy. Now they stop as soon as they can. So to match a pattern like `<b>bold></b><i>italic</i>` we could use the regex `<.*?>` to get this `['<b>', '</b>', '<i>', '</i>']`

### .search() and .findall() and .compile()

`findall()` matches all occurrences of a pattern in a string, but `search()` finds only the first occurrence of the pattern within the string while traversing from left-to-right.

For example, lets find out all the occurences of email address from the given string,

<pre class="language-python"><code>>>> string = 'purple alice@google.com, blah monkey bob@abc.com blah dishwasher'
>>> re.findall(r'[\w.-]+@[\w]+\.[\w]+', string)
['alice@google.com', 'bob@abc.com']</code></pre>

<figure>
    <img src="http://res.cloudinary.com/dw9fem4ki/image/upload/v1408788930/regxper_dazjby.png">
    <figcaption>Regular Expression Visualizer - <a href="http://regexper.com">Regexper</a>. Another handy tool is <a href="http://leaverou.github.io/regexplained/">RegExplained</a> by Lea Verou.</figcaption>
</figure>

`compile()` compiles the regular expression into a regular expression object that can be used later with `.search()`, `.findall()` or `.match()`. If you are using the same regex repeatedly, then it is much efficient to compile the regex first and then apply it on strings.

<pre class="language-python"><code>>>> pat = re.compile('^foo')
>>> pat.findall('foobar')
['foo']</code></pre>

### Optional flags

These are functions that take options to modify the behavior of the pattern match. The option flag is added as an extra argument to the `search()` or `findall()` etc., e.g. `re.search(pat, str, re.IGNORECASE)`. Flags are available in the re module under two names, a long name such as `IGNORECASE` and a short, one-letter form such as `I`. Multiple flags can be specified by bitwise OR-ing them; `re.I | re.M` sets both the I and M flags.

`re.IGNORECASE` - Case insensitive pattern matchin, so `a` matches both `a` and `A`  
`re.DOTALL` - Allows dot (`.`) to match newline  
`re.MULTILINE` - Within a string made of many lines, allow ^ and $ to match the start and end of each line  

**Example**  

<pre class="language-python"><code>>>> pat = re.compile('^foo.', re.IGNORECASE | re.DOTALL | re.MULTILINE)
>>> pat.findall('Foo\nfOO\n')
['Foo\n', 'fOO\n']</code></pre>
