---
layout: post
title: Github pages with custom domain
type: post
excerpt: Setup custom domain on the user page and then all the project pages of Github repositories will automatically appear under the same url.
---

Github provides two types of pages,  
- User pages  
- Project pages

#### User pages

It is nothing but a Github repository with a special name `username.github.io` and all the contents of this repository must be in the `master` branch. For example, [pankajparashar.github.io](https://github.com/pankajparashar/pankajparashar.github.io) is a repository for user pages under my Github username, [pankajparashar](https://github.com/pankajparashar).

By default, the user pages are available under the url, `http://username.github.io`.

#### Project pages

Project pages are project specific files lying in the `gh-pages` branch of the repository. These pages can be accessed via the url `username.github.io/repository_name`.

For example,

{% highlight sh %}
Repository name -> Color Stack  
URL -> http://pankajparashar.github.io/color-stack
{% endhighlight %}

#### Custom domain

Now, coming to the meat of the article, custom domain can be set for both user and project pages. Moreover, the steps to setup the domain also remains the same for both the categories. However, this article will only deal with setting up custom domain for the user pages only.

**Step 1**  
Create the repository `username.github.io` on Github. For reference, check my [user repository on Github](https://github.com/pankajparashar/pankajparashar.github.io).

**Step 2**  
Add a CNAME file containing the custom domain name that you want to map. In my case, the [CNAME](https://github.com/pankajparashar/pankajparashar.github.io/blob/master/CNAME) file contains, `pankajparashar.com`

**Step 3**  
Login to your domain name registrar and create a `A` record that maps the domain to the Github's IP address - `204.232.175.78`. (Infact, this IP Address no longer works and has been [deprecated by Github](https://github.com/blog/1925-github-pages-legacy-ip-brownout). The new IP Addresses are, `192.30.252.153` and `192.30.252.154` as mentioned in [this article](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/).)

> There is no guarantee that this IP address will remain the same forever. Indeed, Github has changed its value in the past. Presumably Github will notify users appropriately before any future changes. If they do change it, you'll have to adjust the configuration at your DNS registrar accordingly.

Theoretically it can take 30 mins to 2 hours for the DNS propagation to complete, but in my experience this change took 1 full day to reflect. Once the propagation is complete, whenever you visit `pankajparashar.github.io` you will be redirected to my custom domain `pankajparashar.com`.

The interesting part is that all the project pages are also being redirected under the same [Top-Level domain](http://en.wikipedia.org/wiki/Top-level_domain). This is fantastic, because for years I have been trying to bring all my projects and the personal website under the same domain. This process makes my entire workflow completely seamless. 

> My Color Stack project, available at the url [pankajparashar.github.io/color-stack](http://pankajparashar.github.io/color-stack) is now automatically being redirected to [pankajparashar.com/color-stack](http://pankajparashar.github.io/color-stack).

By the way, this tweet from [@jackrugile](https://twitter.com/jackrugile) triggered me to write this piece,

<blockquote><p><a href="https://twitter.com/jackrugile">@jackrugile</a> CNAME for user pages only and then the project pages (gh-pages) will automatically appear under the domain name set in the file.<br><br>&mdash; Pankaj Parashar, <a href="https://twitter.com/pankajparashar/statuses/432094472902430721">February 8, 2014</a></p></blockquote>
