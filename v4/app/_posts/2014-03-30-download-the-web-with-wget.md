---
layout: post
title: Download the web with WGET
type: post
excerpt: Having recently discovered the power of wget command, I have written this article to remind myself the various ways we could use this command to download the world wide web.

---

The name `wget` is derived from the amalgamation of `World Wide Web` and `Get`. The UNIX [manual page](http://unixhelp.ed.ac.uk/CGI/man-cgi?wget) describes it as,

{% highlight sh %}

$ man wget
GNU Wget is a free utility for non-interactive download of files from
the Web. It supports HTTP, HTTPS, and FTP protocols, as well as retrieval
through HTTP proxies.

{% endhighlight %}

Wget can follow links in HTML and XHTML pages and create local versions
of remote web sites, fully recreating the directory structure of the
original site. The best part is that Wget respects the Robot Exclusion Standard [(/robots.txt)](/robots.txt)

The help page is good enough to explain all the available options that comes bundled with the `wget` package,

{% highlight sh %}

pankajparashar@macbook-pro: ~
$ wget -h
GNU Wget 1.14, a non-interactive network retriever.
Usage: wget [OPTION]... [URL]...

Mandatory arguments to long options are mandatory for short options too.

Startup:
  -V,  --version           display the version of Wget and exit.
  -h,  --help              print this help.
  -b,  --background        go to background after startup.
  -e,  --execute=COMMAND   execute a `.wgetrc'-style command.

Logging and input file:
  -o,  --output-file=FILE    log messages to FILE.
  -a,  --append-output=FILE  append messages to FILE.
  -q,  --quiet               quiet (no output).
  -v,  --verbose             be verbose (this is the default).
  -nv, --no-verbose          turn off verboseness, without being quiet.
       --report-speed=TYPE   Output bandwidth as TYPE.  TYPE can be bits.
  -i,  --input-file=FILE     download URLs found in local or external FILE.
  -F,  --force-html          treat input file as HTML.
  -B,  --base=URL            resolves HTML input-file links (-i -F)
                             relative to URL.
       --config=FILE         Specify config file to use.

Download:
  -t,  --tries=NUMBER            set number of retries to NUMBER (0 unlimits).
       --retry-connrefused       retry even if connection is refused.
  -O,  --output-document=FILE    write documents to FILE.
  -nc, --no-clobber              skip downloads that would download to
                                 existing files (overwriting them).
  -c,  --continue                resume getting a partially-downloaded file.
       --progress=TYPE           select progress gauge type.
  -N,  --timestamping            don't re-retrieve files unless newer than
                                 local.
  --no-use-server-timestamps     don't set the local file's timestamp by
                                 the one on the server.
  -S,  --server-response         print server response.
       --spider                  don't download anything.
  -T,  --timeout=SECONDS         set all timeout values to SECONDS.
       --dns-timeout=SECS        set the DNS lookup timeout to SECS.
       --connect-timeout=SECS    set the connect timeout to SECS.
       --read-timeout=SECS       set the read timeout to SECS.
  -w,  --wait=SECONDS            wait SECONDS between retrievals.
       --waitretry=SECONDS       wait 1..SECONDS between retries of a retrieval.
       --random-wait             wait from 0.5*WAIT...1.5*WAIT secs between retrievals.
       --no-proxy                explicitly turn off proxy.
  -Q,  --quota=NUMBER            set retrieval quota to NUMBER.
       --bind-address=ADDRESS    bind to ADDRESS (hostname or IP) on local host.
       --limit-rate=RATE         limit download rate to RATE.
       --no-dns-cache            disable caching DNS lookups.
       --restrict-file-names=OS  restrict chars in file names to ones OS allows.
       --ignore-case             ignore case when matching files/directories.
  -4,  --inet4-only              connect only to IPv4 addresses.
  -6,  --inet6-only              connect only to IPv6 addresses.
       --prefer-family=FAMILY    connect first to addresses of specified family,
                                 one of IPv6, IPv4, or none.
       --user=USER               set both ftp and http user to USER.
       --password=PASS           set both ftp and http password to PASS.
       --ask-password            prompt for passwords.
       --no-iri                  turn off IRI support.
       --local-encoding=ENC      use ENC as the local encoding for IRIs.
       --remote-encoding=ENC     use ENC as the default remote encoding.
       --unlink                  remove file before clobber.

Directories:
  -nd, --no-directories           don't create directories.
  -x,  --force-directories        force creation of directories.
  -nH, --no-host-directories      don't create host directories.
       --protocol-directories     use protocol name in directories.
  -P,  --directory-prefix=PREFIX  save files to PREFIX/...
       --cut-dirs=NUMBER          ignore NUMBER remote directory components.

HTTP options:
       --http-user=USER        set http user to USER.
       --http-password=PASS    set http password to PASS.
       --no-cache              disallow server-cached data.
       --default-page=NAME     Change the default page name (normally
                               this is `index.html'.).
  -E,  --adjust-extension      save HTML/CSS documents with proper extensions.
       --ignore-length         ignore `Content-Length' header field.
       --header=STRING         insert STRING among the headers.
       --max-redirect          maximum redirections allowed per page.
       --proxy-user=USER       set USER as proxy username.
       --proxy-password=PASS   set PASS as proxy password.
       --referer=URL           include `Referer: URL' header in HTTP request.
       --save-headers          save the HTTP headers to file.
  -U,  --user-agent=AGENT      identify as AGENT instead of Wget/VERSION.
       --no-http-keep-alive    disable HTTP keep-alive (persistent connections).
       --no-cookies            don't use cookies.
       --load-cookies=FILE     load cookies from FILE before session.
       --save-cookies=FILE     save cookies to FILE after session.
       --keep-session-cookies  load and save session (non-permanent) cookies.
       --post-data=STRING      use the POST method; send STRING as the data.
       --post-file=FILE        use the POST method; send contents of FILE.
       --content-disposition   honor the Content-Disposition header when
                               choosing local file names (EXPERIMENTAL).
       --content-on-error      output the received content on server errors.
       --auth-no-challenge     send Basic HTTP authentication information
                               without first waiting for the server's
                               challenge.

HTTPS (SSL/TLS) options:
       --secure-protocol=PR     choose secure protocol, one of auto, SSLv2,
                                SSLv3, and TLSv1.
       --no-check-certificate   don't validate the server's certificate.
       --certificate=FILE       client certificate file.
       --certificate-type=TYPE  client certificate type, PEM or DER.
       --private-key=FILE       private key file.
       --private-key-type=TYPE  private key type, PEM or DER.
       --ca-certificate=FILE    file with the bundle of CA's.
       --ca-directory=DIR       directory where hash list of CA's is stored.
       --random-file=FILE       file with random data for seeding the SSL PRNG.
       --egd-file=FILE          file naming the EGD socket with random data.

FTP options:
       --ftp-user=USER         set ftp user to USER.
       --ftp-password=PASS     set ftp password to PASS.
       --no-remove-listing     don't remove `.listing' files.
       --no-glob               turn off FTP file name globbing.
       --no-passive-ftp        disable the "passive" transfer mode.
       --preserve-permissions  preserve remote file permissions.
       --retr-symlinks         when recursing, get linked-to files (not dir).

WARC options:
       --warc-file=FILENAME      save request/response data to a .warc.gz file.
       --warc-header=STRING      insert STRING into the warcinfo record.
       --warc-max-size=NUMBER    set maximum size of WARC files to NUMBER.
       --warc-cdx                write CDX index files.
       --warc-dedup=FILENAME     do not store records listed in this CDX file.
       --no-warc-compression     do not compress WARC files with GZIP.
       --no-warc-digests         do not calculate SHA1 digests.
       --no-warc-keep-log        do not store the log file in a WARC record.
       --warc-tempdir=DIRECTORY  location for temporary files created by the
                                 WARC writer.

Recursive download:
  -r,  --recursive          specify recursive download.
  -l,  --level=NUMBER       maximum recursion depth (inf or 0 for infinite).
       --delete-after       delete files locally after downloading them.
  -k,  --convert-links      make links in downloaded HTML or CSS point to
                            local files.
  -K,  --backup-converted   before converting file X, back up as X.orig.
  -m,  --mirror             shortcut for -N -r -l inf --no-remove-listing.
  -p,  --page-requisites    get all images, etc. needed to display HTML page.
       --strict-comments    turn on strict (SGML) handling of HTML comments.

Recursive accept/reject:
  -A,  --accept=LIST               comma-separated list of accepted extensions.
  -R,  --reject=LIST               comma-separated list of rejected extensions.
       --accept-regex=REGEX        regex matching accepted URLs.
       --reject-regex=REGEX        regex matching rejected URLs.
       --regex-type=TYPE           regex type (posix).
  -D,  --domains=LIST              comma-separated list of accepted domains.
       --exclude-domains=LIST      comma-separated list of rejected domains.
       --follow-ftp                follow FTP links from HTML documents.
       --follow-tags=LIST          comma-separated list of followed HTML tags.
       --ignore-tags=LIST          comma-separated list of ignored HTML tags.
  -H,  --span-hosts                go to foreign hosts when recursive.
  -L,  --relative                  follow relative links only.
  -I,  --include-directories=LIST  list of allowed directories.
  --trust-server-names             use the name specified by the redirection
                                   url last component.
  -X,  --exclude-directories=LIST  list of excluded directories.
  -np, --no-parent                 don't ascend to the parent directory.

{% endhighlight %}

We'll go through the various use-cases and how to use wget commmand to accomplish basic tasks. For all the examples, we'll use the long format to specify the options, because they are verbose and self-explanatory.

**Download the index page of a website**  
You can download the file located at the root of the url by simply specifying the website address.
{% highlight sh %}
$ wget http://google.com
{% endhighlight %}
However, you would have no control over the name of the file downloaded in your local system.

**Download and save using a different filename**  
Fortunately, wget allows to explicitly specify the name of the downloaded file, as shown below,
{% highlight sh %}
$ wget --output-document=index.html http://google.com
{% endhighlight %}

**Download the entire website**  
If you want to clone the entire website and restrict the pages only to the specified domain for offline viewing, then wget has got you covered.
{% highlight sh %}
$ wget \
    --mirror \
    --recursive \
    --no-clobber \
    --page-requisites \
    --adjust-extension \
    --convert-links \
    --domains pankajparashar.com \
    --no-parent \
        pankajparashar.com
{% endhighlight %}
You could also specify the file extensions that you may/may not want to download by specifying the --accept=LIST or --reject=LIST appropriately.

**User-agent masking**  
You can also simulate the download by explicitly specifying the user agent. Might be useful for websites that block download for few UAs
{% highlight sh %}
$ wget --user-agent=Mozilla http://google.com
{% endhighlight %}

**Download file via FTP url**  
{% highlight sh %}
# Anonymous FTP
$ wget ftp://cdn.pankajparashar.com/file.txt

# FTP download using wget with username and password authentication.
$ wget --ftp-user=USERNAME --ftp-password=PASSWORD ftp://cdn.pankajparashar.com/file.txt
{% endhighlight %}
