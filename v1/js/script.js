/* =================================== *
 * Author : Pankaj Parashar            * 
 * Last Updated : 2012-08-12           *
 * Compression Engine : YUI Compressor,http://marijnhaverbeke.nl//uglifyjs *
 * Version : 1.0                       * 
 * =================================== */

var goosh = new Object();
goosh.lib = new Object();

goosh.lib.namespace = function(C) {
    var D = C.split(".");
    var A = window;
    for (var B = 0; B < D.length; B++) {
        if (typeof A[D[B]] == "undefined") {
            A[D[B]] = new Object()
            }
        A = A[D[B]]
        }
};

goosh.lib.in_array = function(A, C) {
    var B;
    for (B = 0; B < A.length; B++) {
        if (A[B] == C) {
            return true
        }
    }
    return false
};

goosh.lib.chop = function(A) {
    if (A) {
        while (A.charAt(0) == " ") {
            A = A.substr(1)
            }
    }
    return A
};

goosh.lib.namespace("goosh.lib");
goosh.lib.get = function(A) {
    A = A.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var C = "[\\?&]" + A + "=([^&#]*)";
    var D = new RegExp(C);
    var B = D.exec(window.location.href);
    if (B == null) {
        return ""
    } else {
        return decodeURIComponent(B[1]).replace(/\+/g, " ")
        }
};
goosh.lib.namespace("goosh.lib.cookie");
goosh.lib.cookie.list = new Object();
goosh.lib.cookie.getfromstr = function(G, D) {
    var A = G.split(";");
    for (var C = 0; C < A.length; C++) {
        var F = A[C].split("=");
        var B = goosh.lib.chop(F[0]);
        var E = goosh.lib.chop(F[1]);
        if (D && goosh.lib.cookie.list[B] != E) {
            goosh.lib.cookie.set(B, E, 365)
            }
        goosh.lib.cookie.list[B] = E
    }
};
goosh.lib.cookie.get = function(A) {
    return goosh.lib.cookie.list[A]
    };
goosh.lib.cookie.set = function(B, D, F) {
    var E = new Date();
    var C = E.getTime() + (F * 24 * 60 * 60 * 1000);
    E.setTime(C);
    document.cookie = B + "=" + D + "; expires=" + E.toGMTString();
    if (goosh.config.user != "guest" && B != "loggedin") {
        var A = "";
        if (F < 0) {
            A = "&del=1"
        }
        goosh.ajax.query("http://goosh.appspot.com/cookie?key=" + encodeURIComponent(B) + "&val=" + encodeURIComponent(D) + "&callback=goosh.lib.cookie.fetch" + A, true)
        }
    goosh.lib.cookie.list[B] = D;
    return D
};
goosh.lib.cookie.del = function(A) {
    goosh.lib.cookie.set(A, "", -100);
    goosh.lib.cookie.list[A] = null
};
goosh.lib.cookie.getall = function() {
    return goosh.lib.cookie.list
};
goosh.lib.namespace("goosh.lang");
goosh.lang.list = {
    arabic: "ar",
    bulgarian: "bg",
    catalan: "ca",
    chinese: "zh",
    chinese_simplified: "zh-cn",
    chinese_traditional: "zh-tw",
    croatian: "hr",
    czech: "cs",
    danish: "da",
    dutch: "nl",
    english: "en",
    estonian: "et",
    filipino: "tl",
    finnish: "fi",
    french: "fr",
    german: "de",
    greek: "el",
    hebrew: "iw",
    hindi: "hi",
    hungarian: "hu",
    indonesian: "id",
    italian: "it",
    japanese: "ja",
    korean: "ko",
    latvian: "lv",
    lithuanian: "lt",
    norwegian: "no",
    persian: "fa",
    polish: "pl",
    portuguese: "pt",
    romanian: "ro",
    russian: "ru",
    serbian: "sr",
    slovak: "sk",
    slovenian: "sl",
    spanish: "es",
    swedish: "sv",
    thai: "th",
    turkish: "tr",
    ukrainian: "uk",
    vietnamese: "vi"
};
goosh.lang.reverse = new Object();

for (key in goosh.lang.list) {
    goosh.lang.reverse[goosh.lang.list[key]] = key
}
goosh.lib.namespace("goosh.gui");
goosh.gui.inputel = false;
goosh.gui.outputel = false;
goosh.gui.promptel = false;
goosh.gui.inputfield = false;
goosh.gui.bodyel = false;
goosh.gui.el = function(A) {
    return document.getElementById(A)
    };
goosh.gui.init = function() {
    goosh.gui.inputel = document.getElementById("input");
    goosh.gui.outputel = document.getElementById("output");
    goosh.gui.promptel = document.getElementById("prompt");
    goosh.gui.inputfield = document.getElementById("inputfield");
    goosh.gui.bodyel = document.getElementById("body");
    goosh.gui.clear();
    if (goosh.gui.inputfield.createTextRange) {
        goosh.gui.inputfield.onkeyup = new Function("return goosh.keyboard.mcursor(event);");
        goosh.gui.bodyel.onfocus = new Function("return goosh.gui.focusinput(event);");
        goosh.gui.bodyel.onclick = new Function("return goosh.gui.focusinput(event);");
        goosh.gui.bodyel.onkeydown = new Function("return goosh.keyboard.keyDownHandler(event);")
        } else {
        goosh.gui.inputfield.onkeyup = goosh.keyboard.mcursor;
        goosh.gui.bodyel.onfocus = goosh.gui.focusinput;
        goosh.gui.bodyel.onclick = goosh.gui.focusinput;
        goosh.gui.bodyel.onkeydown = goosh.keyboard.keyDownHandler
    }
    goosh.gui.clear();
};
goosh.gui.error = function(A) {
    goosh.ajax.stopall();
    goosh.gui.out("Error: " + A + "<br/> <br/>");
    goosh.gui.showinput();
    goosh.gui.focusinput();
    goosh.gui.scroll()
    };
goosh.gui.outln = function(A) {
    goosh.gui.out(A + "<br/>")
    };
goosh.gui.out = function(A) {
    var B = document.createElement("div");
    B.innerHTML = A;
    goosh.gui.outputel.appendChild(B)
    };
goosh.gui.less = function(A) {
    return "<span class='less'>" + A + "</span>"
};
goosh.gui.info = function(A) {
    return "<span class='info'>" + A + "</span>"
};
goosh.gui.clear = function() {
    goosh.gui.outputel.innerHTML = "";

};
goosh.gui.showinput = function() {
    goosh.gui.inputel.style.display = "block"
};
goosh.gui.hideinput = function() {
    goosh.gui.inputel.style.display = "none"
};
goosh.gui.focusinput = function() {
    var A = "";
    if (document.selection) {
        A = document.selection.createRange().text
    } else {
        if (window.getSelection) {
            A = window.getSelection().toString()
            }
    }
    if (A.length == 0) {
        document.f.q.value = document.f.q.value;
        if (goosh.gui.inputel.style.display != "none") {
            document.f.q.focus()
            }
    }
};
goosh.gui.updateprompt = function() {
    goosh.gui.prompt = goosh.config.user + goosh.config.host + goosh.config.mode + goosh.config.pend;
    goosh.gui.promptel.innerHTML = goosh.gui.prompt
};
goosh.gui.scroll = function() {
    window.scrollBy(0, 122500)
    };
goosh.gui.setstyle = function(B, E, D) {
    try {
        var A = goosh.gui.el(B);
        A.style[E] = D;
        return true
    } catch(C) {
        return false
    }
};
goosh.gui.setstyleclass = function(D, B) {
    var C = document.createElement("div");
    var A = "<br style='line-height:0px;'/><style>" + D + " {" + B + "}</style>";
    C.innerHTML = A;
    goosh.gui.bodyel.appendChild(C)
    };
goosh.lib.namespace("goosh.set");
goosh.set.base = function(name, def, txt, min, max) {
    this.name = name;
    this.txt = txt;
    this.def = def; (max) ? this.max = max: this.max = 2000; (min) ? this.min = min: this.min = 0;
    if (min && max) {
        this.txt += " (" + min + ".." + max + ")"
    }
    this.get = function() {
        return eval("" + this.name + ";")
        };
    this.set = function(val) {
        if (val >= this.min && val <= this.max) {
            eval("" + this.name + " = '" + val + "';")
            }
        return true
    }
};
goosh.set.list = new Object();
goosh.set.list.lang = new goosh.set.base("goosh.config.lang", "en", "Default Language");
goosh.set.list.lang.set = function(A) {
    if (goosh.lang.reverse[A]) {
        goosh.config.lang = A
    } else {
        if (goosh.lang.list[A]) {
            goosh.config.lang = goosh.lang.list[A]
            } else {
            return false
        }
    }
    return true
};
goosh.set.list.results = new goosh.set.base("goosh.config.numres", "4", "Number of results for Google search", 1, 100);
goosh.set.list.timeout = new goosh.set.base("goosh.config.timeout", "4", "timeout for ajax requests in seconds", 1, 100);
goosh.set.list["style.bg"] = new goosh.set.base("goosh.config.bgcolor", "", "goosh background color");

goosh.set.list["style.bg"].set = function(A) {
    if (goosh.gui.setstyle("body", "backgroundColor", A) && goosh.gui.setstyle("inputfield", "backgroundColor", A)) {
        goosh.config.bgcolor = A;
        return true
    } else {
        return false
    }
};

goosh.set.list["style.fg"] = new goosh.set.base("goosh.config.fgcolor", "", "goosh font color");
goosh.set.list["style.fg"].set = function(A) {
    if (goosh.gui.setstyle("body", "color", A) && goosh.gui.setstyle("inputfield", "color", A)) {
        goosh.config.fgcolor = A;
        return true
    } else {
        return false
    }
};
goosh.set.list["style.hl"] = new goosh.set.base("goosh.config.hlcolor", "#009900", "goosh highlight color");
goosh.set.list["style.hl"].set = function(A) {
    goosh.gui.setstyleclass(".info", "color: " + A);
    goosh.gui.setstyleclass("a:visited.info", "color: " + A);
    goosh.config.hlcolor = A;
    return true
};
goosh.set.list["style.sh"] = new goosh.set.base("goosh.config.shcolor", "#666666", "goosh 'shaded' color");
goosh.set.list["style.sh"].set = function(A) {
    goosh.gui.setstyleclass(".less", "color: " + A);
    goosh.config.shcolor = A;
    return true
};
goosh.set.list["style.link"] = new goosh.set.base("goosh.config.linkcolor", "#09c", "goosh link color");
goosh.set.list["style.link"].set = function(A) {
    goosh.gui.setstyleclass("a", "color: " + A);
    goosh.config.linkcolor = A;
    return true
};
goosh.set.list["style.vlink"] = new goosh.set.base("goosh.config.vlinkcolor", "#0099CC", "goosh visited link color");
goosh.set.list["style.vlink"].set = function(A) {
    goosh.gui.setstyleclass("a:visited", "color: " + A);
    goosh.config.vlinkcolor = A;
    return true
};
goosh.set.list["place.width"] = new goosh.set.base("goosh.config.mapwidth", "300", "width of map image", 20, 600);
goosh.set.list["place.height"] = new goosh.set.base("goosh.config.mapheight", "150", "height of map image", 20, 500);
goosh.set.init = function(A, C) {
    if (goosh.config.user != "guest") {
        if (!A) {
            goosh.ajax.query("http://goosh.appspot.com/cookie?callback=goosh.set.init");
            return
        } else {
            if (goosh.ajax.iscontext(A)) {
                goosh.gui.outln("");
                goosh.lib.cookie.getfromstr(document.cookie);
                goosh.lib.cookie.getfromstr(C, true)
                }
        }
    } else {
        goosh.gui.outln("");
        goosh.lib.cookie.getfromstr(document.cookie)
        }
    var B = goosh.lib.cookie.getall();
    for (key in goosh.set.list) {
        var D = false;
        if (B[key]) {
            D = B[key]
            }
        if (D && goosh.set.list[key].set(D)) {
            goosh.gui.outln("&nbsp;" + key + " => &quot;" + D + "&quot;.")
            } else {
            goosh.set.list[key].set(goosh.set.list[key].def)
            }
    }
    goosh.gui.outln("");
    goosh.getquery()
    };
goosh.lib.namespace("goosh.ajax");
goosh.ajax.contexts = new Array();
goosh.ajax.lastcontext = false;
goosh.ajax.stopall = function() {
    for (key in goosh.ajax.contexts) {
        goosh.ajax.iscontext(key)
        }
};
goosh.ajax.deletecontext = function(A) {
    goosh.gui.outln("Error: Operation timed out. " + A);
    if (!document.all) {
        goosh.gui.outln(goosh.gui.less('If you use the noscript firefox-extension, add "ajax.googleapis.com" to the whitelist.'))
        }
    goosh.gui.outln("");
    goosh.ajax.contexts[A] = false;
    var B = document.getElementById(A);
    if (B) {
        document.body.removeChild(B)
        }
    goosh.gui.showinput();
    goosh.gui.focusinput();
    goosh.gui.scroll();
    if (!document.all) {
        stop()
        }
};
goosh.ajax.iscontext = function(A) {
    if (goosh.ajax.contexts[A]) {
        clearTimeout(goosh.ajax.contexts[A]);
        goosh.ajax.contexts[A] = false;
        var B = document.getElementById(A);
        if (B) {
            document.body.removeChild(B)
            }
        return true
    } else {
        return false
    }
};
goosh.ajax.getcontext = function(A) {
    var C = new Date();
    var B = C.getTime();
    if (A) {
        B = A
    }
    goosh.ajax.contexts[B] = setTimeout("goosh.ajax.deletecontext('" + B + "');", 1000 * goosh.config.timeout);
    return B
};
goosh.ajax.query = function(A, D) {
    var B = "none";
    if (!D) {
        B = goosh.ajax.getcontext();
        goosh.ajax.lastcontext = B;
        goosh.gui.hideinput()
        }
    var C = document.createElement("script");
    document.body.appendChild(C);
    C.src = A + "&context=" + B + "&";
    C.id = B
};
goosh.lib.namespace("goosh.config");
goosh.config.apikey = "ABQIAAAA0cXSEVCNSwf_x74KTtPJMRQP4Q7D8MPck7bhT7upyfJTzVDU2BRxkUdd2AvzlDDF7DNUJI_Y4eB6Ug";
goosh.config.user = "[pankaj$";
goosh.config.host = "bash]";
goosh.config.mode = "";
goosh.config.pend = "~&nbsp;";
goosh.config.numres = 4;
goosh.config.timeout = 4;
goosh.config.start = 0;
goosh.config.moreobj;
goosh.config.lang = "en";
goosh.config.urls = new Array();
goosh.config.cmdlines = new Array();
goosh.config.cmdqueue = new Array();
goosh.lib.namespace("goosh.keyboard");
goosh.keyboard.suggestions = new Array();
goosh.keyboard.suggpos = 1;
goosh.keyboard.suggword = "";
goosh.keyboard.hist = new Array();
goosh.keyboard.histpos = 0;
goosh.keyboard.histtemp = 0;

/* ==== History commands ==== */
goosh.keyboard.suggest = function(B) {
    if (goosh.keyboard.suggpos > goosh.keyboard.suggestions[B].length) {
        goosh.keyboard.suggpos = 1
    }
    if (goosh.keyboard.suggestions[B][goosh.keyboard.suggpos]) {
        goosh.gui.inputfield.value = goosh.keyboard.suggestions[B][goosh.keyboard.suggpos]
        }
    var C = goosh.gui.inputfield;
    if (C.createTextRange) {
        var A = C.createTextRange();
        A.moveStart("character", B.length);
        A.select()
        } else {
        if (C.setSelectionRange) {
            C.setSelectionRange(B.length, C.value.length)
            }
    }
};
goosh.keyboard.dummyac = function() {
    this.Suggest_apply = function(C, D, A, B) {
        goosh.keyboard.suggestions[D] = A;
        goosh.keyboard.suggest(D);
        return true
    }
};
window.google = new Array();
window.google.ac = new goosh.keyboard.dummyac();
goosh.keyboard.keyDownHandler = function(B) {
    if (!B && window.event) {
        B = window.event
    }
    if (B) {
        _lastKeyCode = B.keyCode
    }
    if (B && B.keyCode == 9) {
        B.cancelBubble = true;
        B.returnValue = false;
        var C = goosh.keyboard.suggword;
        if (C != "") {
            if (!goosh.keyboard.suggestions[C]) {
                goosh.keyboard.suggpos = 1;
                var A = document.createElement("script");
                document.body.appendChild(A);
                A.src = "http://www.google.com/complete/search?hl=" + goosh.config.lang + "&js=true&qu=" + encodeURIComponent(C)
                } else {
                goosh.keyboard.suggpos += 2;
                goosh.keyboard.suggest(C)
                }
        }
        return false
    }
};
goosh.keyboard.mcursor = function(B) {
    var A = B.keyCode;
    if (goosh.keyboard.hist.length > 0) {
        if (A == 38 || A == 40) {
            if (goosh.keyboard.hist[goosh.keyboard.histpos]) {
                goosh.keyboard.hist[goosh.keyboard.histpos] = goosh.gui.inputfield.value
            } else {
                goosh.keyboard.histtemp = goosh.gui.inputfield.value
            }
        }
        if (A == 38) {
            goosh.keyboard.histpos--;
            if (goosh.keyboard.histpos < 0) {
                goosh.keyboard.histpos = 0
            }
        } else {
            if (A == 40) {
                goosh.keyboard.histpos++;
                if (goosh.keyboard.histpos > goosh.keyboard.hist.length) {
                    goosh.keyboard.histpos = goosh.keyboard.hist.length
                }
            }
        }
        if (A == 38 || A == 40) {
            if (goosh.keyboard.hist[goosh.keyboard.histpos]) {
                goosh.gui.inputfield.value = goosh.keyboard.hist[goosh.keyboard.histpos]
                } else {
                goosh.gui.inputfield.value = goosh.keyboard.histtemp
            }
        }
    }
    if (A != 9 && A != 13) {
        goosh.keyboard.suggword = goosh.gui.inputfield.value
    }
    if (A == 13) {
        goosh.command()
        }
};
goosh.lib.namespace("goosh.modules");
goosh.lib.namespace("goosh.module");
goosh.lib.namespace("goosh.modobj");
goosh.modules.list = new Array();
goosh.module.base = function() {
    this.mode = false;
    this.parameters = "";
    this.help = "no helptext yet.";
    this.helptext = "";
    this.hasmore = false;
    this.results = new Array()
    };
goosh.modules.register = function(name, base) {
    if (!base) {
        base = "base"
    }
    eval("goosh.module." + name + ".prototype = new goosh.module." + base + ";goosh.modobj." + name + " = new goosh.module." + name + ';goosh.modules.list["' + name + '"] = goosh.modobj.' + name + ";")
    };

/* ============ *
 * About Module *
 * ============ */
goosh.module.about = function() {
    this.name = "about";
    this.aliases = new Array("about", "abt");
    this.help = "read more about me";
    this.parameters = "[no parameters]";
    this.call = function(args) {
		goosh.gui.outln("");
		temp = "<span class='wall'>I am 23yrs old, Frontend UI/UX Designer + Web Developer, from <a href='http://goo.gl/maps/6uMN' title='19.089373,72.878494' rel='location'>Mumbai, India</a>.</span>";
		temp += "<br/><br/>";
		temp += "Projects,";
		temp += "<ul>";
		temp += "<li><a href='http://htmlcsstherightway.org/' title='HTML & CSS - The right way!' rel='github'>htmlcss-therightway</a> (Doing HTML & CSS the right way).</li>";
		temp += "<li><a href='http://github.com/pankajparashar/pankaj-parashar' title='Pankaj Parashar' rel='personal'>pankaj-parashar</a> (My personal website, available for your forking pleasure).</li>";
		temp += "<li><a href='http://github.com/pankajparashar/html5-boilerplate-plus' title='HTML5 Boilerplate+' rel='github'>h5bp-plus</a> (Extended version of HTML5 boilerplate).</li>";
		temp += "<li><a href='http://github.com/pankajparashar/shorthand-css' title='Shorthand CSS' rel='github'>shorthand-css</a> (Shorthand CSS generator).</li>";
		temp += "</ul>";


		temp += "<label>I Follow</label>,";
		temp += "<ul>";
		temp += "<li><a href='http://paulirish.com/' target='_blank' title='Paul Irish'>Paul Irish</a> (Developer advocate for <a href='http://chrome.google.com'>Google Chrome</a>).</li>";
		temp += "<li><a href='http://nicolasgallagher.com/' target='_blank' title='Nicolas Gallagher'>Nicolas Gallagher</a> (Frontend Engineer at <a href='http://twitter.com/'>Twitter</a>).</li>";
		temp += "<li><a href='http://mathiasbynens.be/' target='_blank' title='Mathias Bynens'>Mathias Bynens</a> (Freelance web developer from Belgium).</li>";
		temp += "<li><a href='http://hakim.se/' target='_blank' title='Hakim El Hattab'>Hakim El Hattab</a> (Lead Interactive Developer at <a href='http://www.qwiki.com/'>Qwiki</a>).</li>";
		temp += "<li><a href='http://desandro.com/'>David DeSandro</a> (Web designer at <a href='https://twitter.com/'>Twitter</a> a.k.a of <a href='http://isotope.metafizzy.co/'>Isotope</a> fame).</a> <span style='color:#898989'>(<a href='http://twitter.com/pankajparashar/web-developers/members' target='_blank' class='more_links'>+more</a>)</span></li>"
		temp += "</ul>";
		temp += "<label>Bookmarks</label>,";
        temp += "<ul>";
        temp += "<li><a href='http://www.smashingmagazine.com/'>Smashing Magazine</a> (Magazine for web designers & developers by <a href='http://www.smashingmagazine.com/author/vitaly-friedman/'>Vitaly Friedman</a>).</li>";
        temp += "<li><a href='http://tympanus.net/codrops/'>Codrops</a> (Useful resources and inspiration for creative minds).</li>";
		temp += "<li><a href='http://css-tricks.com'>CSS-Tricks</a> (Web design tutorials via <a href='http://chriscoyier.net/'>Chris Coyier</a>).</li>";
		temp += "<li><a href='http://www.inserthtml.com/'>Insert HTML</a> (Web Design and Development Blog by Johnny Simpson).</li>";
		temp += "<li><a href='http://www.impressivewebs.com/'>Impressive Webs</a> (Web Design Articles & Tutorials by Louis Lazaris). <span style='color:#898989'>(<a href='https://twitter.com/pankajparashar/web-design-blogs/members' target='_blank' class='more_links'>+more</a>)</span></li>";
        temp += "</ul>";        
		temp += "<label>Desk Configuration</label>,";
        temp += "<ul>";
        temp += "<li>System (15-inch Sony Vaio laptop, Samsung Galaxy S3).</li>";
        temp += "<li>Internet (Chrome, FileZilla, Skype, BitTorrent).</li>";
        temp += "<li>Security (Microsoft Security Essentials, TunnelBear).</li>";
        temp += "<li>Applications (7zip, TuneUp, Power ISO, VLC, Foxit Reader).</li>";
		temp += "<li>Development (Photoshop, Dreamweaver, Sublime Text).</li>";
		temp += "</ul>";
	    temp += "<label>Featured On</label>,";
		temp += "<table>";
		temp += "<tr>";
		temp += "<td><ul class='featured'><li><a href='http://www.verynicesites.com/sites/pankaj-parashar/' target='_blank' title='Very Nice Sites'>Very Nice Sites</a></li><li><a href='http://goo.gl/Ag8b3'>Smashing Web Designs</a></li></ul></td>";
		temp += "<td><ul class='featured'><li><a href='http://onepagelove.com/pankaj-parashar' target='_blank' title='One Page Love'>One Page Love</a></li><li><a href='http://goo.gl/SxKmI' title='HTML5 Boilerplate' rel='featured'>HTML5 Boilerplate</a></li></ul></td>";
		temp += "<td><ul class='featured'><li><a href='http://goo.gl/3uLst' title='Instant Shift' rel='featured'>Instant Shift</a></li><li><a href='http://www.1pagewebdesign.com/2012/08/pankaj-parashar/' target='_blank' title='1Page Web Design'>1-Page Web Design</a></li></ul></td>";
		temp += "</tr>";
		temp += "</table>";
		temp += "<br/>";
		temp += "<span class='wall'><a rel='license' href='http://creativecommons.org/publicdomain/zero/1.0/' title='Creative Commons CC0 1.0' target='_blank'>&copy;" + new Date().getFullYear() + "</a> | Powered by <a rel='application' href='https://appengine.google.com/' title='Google App Engine' target='_blank'>Google</a> | Hosted on <a href='http://github.com/'>GitHub</a> | Craft : <a href='http://validator.w3.org/check?uri=http%3A%2F%2Fpankajparashar.com%2F'>HTML5</a> + <a href='http://jigsaw.w3.org/css-validator/validator?uri=http%3A%2F%2Fpankajparashar.com%2F'>CSS3</a> | <a href='https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fpankajparashar.com%2F&source=tweetbutton&text=Pankaj%20Parashar&url=http%3A%2F%2Fpankajparashar.com&via=pankajparashar' title='Click to send this page to Twitter!' target='_blank' style='color:black;background-color:#1982d1;padding:0 2px'>Tweet</a>.</span>";
        goosh.gui.outln(temp);
		goosh.gui.outln("");
        /*goosh.gui.outln(" &nbsp;Font Stack,");<span style='color:#666'>19.089373,72.878494</span>
		goosh.gui.outln("<ul><li>Heading &nbsp;&nbsp;&nbsp;- Adelle Web (premium), Bree Serif.</li><li>Body &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Proxima Nova (premium), Segoe UI (premium).</li><li>Serif &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- FF Scala, Museo, Tanger</li><li>Sans Serif - FF Scala Sans, Museo Sans, PT Sans, Open Sans</li><li>Slab Serif - Museo Slab</li><li>Monospace &nbsp;- PT Mono, Consolas, Courier, Monaco.</li><li>Handwritten - Crimson Text</li><li>Web Safe &nbsp;&nbsp;- </li><li>Other &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Piron V.2</li></ul>");
		goosh.gui.outln(" &nbsp;Color Stack,");
		goosh.gui.outln("<ul><li>Blue &nbsp;&nbsp;- <span style='background-color:#1982D1;padding:0px 2px;'>#1982D1</span> <span style='background-color:#0BD4FB;padding:0px 2px;'>#0BD4FB</span> <span style='background-color:#87CFE6;padding:0px 2px;'>#87CFE6</span></li><li>Orange - </li><li>Red &nbsp;&nbsp;&nbsp;- <span style='background-color:#BB0F05;padding:0px 2px;color:#fff;'>#BB0F05</span></li><li>Green &nbsp;- <span style='background-color:#B1E583;padding:0px 2px;'>#B1E583</span></li><li>Yellow - <span style='background-color:#FFCB00;padding:0px 2px;'>#FFCB00</span></li></ul>");*/
        $('#input')[0].scrollIntoView();
		jQuery(function($){ $('a[href^="http://"]') .not('[href*="pankajparashar.com"]') .attr('target','_blank'); });
    }
};
goosh.modules.register("about");
/*=== End About Module ===*/

/*... Experiments Module ...*/
goosh.module.experiments = function() {
    this.name = "experiments";
    this.aliases = new Array("experiments", "exp");
    this.help = "checkout my lab for experiments";
    this.parameters = "[no parameters]";
    this.call = function(args) {
		temp = "<br/>";
		temp += "<label>jsFiddle</label>";
		temp += "<ul>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/63kqq/embedded/result/' target='_blank'>Rollover Links</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/E3HLW/' target='_blank'>Browser Detection</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/XBbfS/' target='_blank'>Text Effects</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/aCwfV/' target='_blank'>JavaScript String Method Reference</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/hwXrZ/' target='_blank'>Scroll Top</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/MFMcN/3/' target='_blank'>MouseWheel Scroll</a></li>";
		temp += "<li><a href='http://jsfiddle.net/pankajparashar/mDtVF/' target='_blank'>HTML5 Video</a></li>";
		temp += "</ul>";
		temp += "<label>Misc</label>";
		temp += "<ul>";
		temp += "<li><a href='http://tutorialzine.com/quizzes/take/313/' target='_blank'>HTML5 Quiz</a></li>";
		temp += "</ul>";
		goosh.gui.out(temp);
        $('#input')[0].scrollIntoView();
    }
};
//goosh.modules.register("experiments");
/*... End Experiments Module ...*/

//Projects module
goosh.module.projects = function() {
    this.name = "projects";
    this.aliases = new Array("projects", "proj");
    this.help = "checkout the projects under the hood";
    this.parameters = "[no parameters]";
    this.call = function(args) {
        goosh.gui.outln("--------------------------------------");
        goosh.gui.outln("&raquo;&nbsp;<a href='http://www.specsnglares.com/' target='_blank'>Specs 'N Glares</a> (E-commerce Website)<br/>--------------------------------------<br/>The experiment extensively uses JQuery to produce text effects like Typewriter & Scrambled. Check out the experiment on JSFiddle and see yourself how the text unfolds to produce the effects. Source - <a href='#'>Grab Bag</a>.<br/>")
            goosh.gui.outln("-----------------------------------");
        goosh.gui.outln("&raquo;&nbsp;<a href='http://jsfiddle.net/pankajparashar/E3HLW/' target='_blank'>Tuts<span style='font-family:verdana'>@</span>Blunder</a> (Tutorials Website)<br/>-----------------------------------<br/>This small piece of javascript code can identify the browser name, version and the underlying operating system with accuracy. The objective behind this experiment is to use javascript's capability to detect browsers and use it effectively to ensure browser compatibility. Checkout the experiment on JSFiddle. Source - <a href='#'>Quirksmode</a>.<br/>");
        goosh.gui.outln("----------------------------------");
        goosh.gui.outln("&raquo;&nbsp;<a href='http://jsfiddle.net/pankajparashar/XBbfS/' target='_blank'>Errors<span style='font-family:verdana'>@</span>Blunder</a> (Website)<br/>----------------------------------<br/>The experiment extensively uses JQuery to produce text effects like Typewriter & Scrambled. Check out the experiment on JSFiddle and see yourself how the text unfolds to produce the effects. Source - <a href='#'>Grab Bag</a>.<br/>");
    }
};
//goosh.modules.register("projects");

/*... Contact Module ...*/
goosh.module.contact = function() {
    this.name = "contact";
    this.aliases = new Array("contact", "con");
    this.help = "find out ways to contact me";
    this.parameters = "[no parameters]";
    this.call = function(args) {
        goosh.gui.outln("<table border='0' style='margin-left:2px;'><tr><td width='360px'><a href='mailto:email@pankajparashar.com?subject=I want to hire you' target='_blank' title='Get in touch on e-mail'>Email</a><br/>email<span style='color:#666'>[at]</span>pankajparashar<span style='color:#666'>[dot]</span>com</td><td><a href='https://www.facebook.com/pankaj.p.parashar' target='_blank' title='Subscribe to my facebook updates'>Facebook</a><br/>pankaj<span style='color:#666'>[dot]</span>p<span style='color:#666'>[dot]</span>parashar</td></tr><tr>&nbsp;</tr><tr><td><br/><a href='http://www.delicious.com/pankajparashar' target='_blank' title='Feast on my delicious bookmarks'>Delicious</a><br/>pankajparashar</td><td><br/><a href='https://twitter.com/#!/pankajparashar' target='_blank' title='Follow me on twitter'>Twitter</a><br/><span style='color:#666'>[at]</span>pankajparashar</td></tr><tr><td></td><td></td></tr><tr>&nbsp;</tr><tr><td><br/><a href='' target='_blank' title='Listen my grooveshark playlist'>Grooveshark</a><br/><span style='color:#666'>[hash]</span>pankajparashar<br/></td><td><br/><a href='http://gplus.to/pankajparashar'>Google+</a><br/><span style='color:#666'>[+]</span>pankajparashar</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td><a href='http://jsfiddle.net/user/pankajparashar/fiddles/'>jsFiddle</a><br/>jsfiddle.net/user/pankajparashar/fiddles/</td><td><a href='skype:pankajparashar1510?call'>Skype</a><br>pankajparashar<span style='color:#666'>1510</span></td></tr><tr><td>&nbsp;</td><td></td></tr><tr><td><a href='pinterest.com/pankajparashar/'>Pinterest</a><br/>pinterest.com/pankajparashar/</td><td><a href='https://github.com/pankajparashar/'>GitHub</a><br/>pankajparashar<span style='color:#666'>[dot]</span>github<span style='color:#666'>[dot]</span>com</td></tr></table>");
        $('#input')[0].scrollIntoView();
    }
};
goosh.modules.register("contact");
/*... End Contact Module ...*/

/*.... Credits Module ...*/
goosh.module.credits = function() {
    this.name = "credits";
    this.aliases = new Array("credits", "crdts");
    this.help = "external contribution to my site";
    this.parameters = "[no parameters]";
    this.call = function(args) {
        goosh.gui.outln("<dl>");
        goosh.gui.outln("<dt>Concept</dt><dd>This website uses <a href='http://www.goosh.org/' target='_blank'>Goosh</a> engine developed by <a href='mailto:grothkopp@gmail.com'>Stefan Grothkopp</a> powered by <a href='https://appengine.google.com/'>Google</a> and behaves similar to a UNIX shell.</dd>");
        goosh.gui.outln("<dt>TypeFace</dt><dd>Primary(<a href='http://en.wikipedia.org/wiki/Consolas'>Consolas</a>) + Backup(<a href='http://en.wikipedia.org/wiki/Courier_(typeface)'>Courier</a>) [Category - Fixed, Monospaced].<br/>Font face uses <a href='http://mathiasbynens.be/notes/unquoted-font-family'>Unquoted Font-Family</a> names in CSS, validated by <a href='http://mothereff.in/font-family'>Font-Face Name Validator</a> developed by <a href='http://mathiasbynens.be/'>Mathias Bynens</a>.</dd>");
        goosh.gui.outln("<dt>Scripts</dt><dd>jquery.min.js(90.39Kb) + countdown.js(15.37Kb) + moment.min.js(9.98Kb) + easyjquery.min.js(10.18Kb) + modernizer-2.5.3.min.js(14.92Kb) + ga.js(36.03Kb) = Total(176.87Kb).</dd>");
        goosh.gui.outln("<dt>Color Schemes <span class='color-scheme'><a class='light-blue' href='#' title=''>#3be</a><a class='dark-blue' href='#' title=''>#09c</a><a class='light-purple' href='#' title=''>#a6c</a><a class='dark-purple' href='#' title=''>#93c</a><a class='light-green' href='#' title=''>#9c0</a><a class='dark-green' href='#' title=''>#690</a><a class='light-orange' href='#' title=''>#fb3</a><a class='dark-orange' href='#' title=''>#f80</a><a class='light-red' href='#' title=''>#f44</a><a class='dark-red' href='#' title=''>#c00</a><a class='white' href='#' title=''>#fff</a><a class='black' href='#' title=''>#000</a></span></dt><dd><a href='http://developer.android.com/design/style/color.html'>Android Color Swatches</a> : Anchor Text(Default) - #0099CC, Anchor Text(Hover) - #0099CC, Shell Prompt - #FF8800, Help Text - #99CC00.</dd>");
        goosh.gui.outln("<dt>Browser Compatiblity</dt><dd>Adobe Browser Lab - Chrome 18(Windows), Firefox 11(OS X & Windows), IE (6/7/8/9), Safari 5.1. <br/>Adobe Shadow - iOS, Android & <a href='http://www.browserstack.com/'>BrowserStack</a> - Opera 12, Nightly.</dd>");
        goosh.gui.outln("<dt>Reset CSS</dt><dd>Initial version - <a href='http://meyerweb.com/'>Eric Meyer</a>. More recent version of Reset CSS modified by Richard Clark is available <a href='http://html5doctor.com/html-5-reset-stylesheet/'>here</a>.<br/>Version 2 - Normalize.css by Nicolas Gallagher (also part of H5BP).</dd>");
        goosh.gui.outln("<dt>Coding Standards</dt><dd>Template - H5BP + Bootstrap, <a href='http://isobar-idev.github.com/code-standards/'>NA Isobar</a> - Front-end Code Standards & Best Practices.<br/>Markup : HTML5 (W3C Draft Specs), Stylesheet : CSS3, Character Set : UTF-8</dd>");
        goosh.gui.outln("<dt>Optimisation Tools</dt><dd><a href='http://www.google.com/webmasters/tools/'>Google Webmaster Tools</a> + <a href='https://www.google.com/analytics/'>Google Site Analytics</a> (Compressed code manufactured by Mathias Bynens, available <a href='http://mathiasbynens.be/notes/async-analytics-snippet'>here</a>).");
        goosh.gui.outln("</dl>");
        $('#input')[0].scrollIntoView();
    }
};
goosh.modules.register("credits");
/*.... End Credits Module ...*/

//Web module
goosh.module.web = function() {
    this.name = "web";
    this.aliases = new Array("web", "search", "s", "w");
    this.mode = true;
    this.start = 0;
    this.args = "";
    this.parameters = "[keywords]";
    this.help = "google web search";
    this.helptext = "<span class='info'>examples:</span><br/><i>web foo bar</i>  - searches the web for &quot;foo bar&quot;<br/>";
    this.query = function(A, B) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/search/" + A + "?v=1.0&start=" + this.qstart + "&hl=" + goosh.config.lang + "&callback=goosh.modobj." + this.name + ".render&q=" + encodeURIComponent(B) + "&key=" + goosh.config.apikey + "&rsz=large")
        };
    this.renderResult = function(E, D, G, C, H) {
        var B = "";
        var A = this.start;
        B += "<br/><table width='980px'>";
        for (i = this.start; i < (this.start + parseInt(goosh.config.numres)); i++) {
            if (this.results[i]) {
                var F = this.results[i];
                A++;
                goosh.config.urls[A] = F.unescapedUrl;
                F.unescapedUrl = F.unescapedUrl.replace(/"/g, "&quot;");
                B += "<tr>";
                B += "<td valign='top' class='less'>&nbsp;&nbsp;" + A + ")&nbsp;</td>";
                B += "<td>";
                B += '<a href="' + F.unescapedUrl + '" target="_blank" style="color:blue">' + F.title + "</a>";
                B += "<br/>";
                B += F.content;
                B += "<br/>";
                B += '<a href="' + F.unescapedUrl + '" target="_blank" class="info" style="text-decoration:none; color:green">' + F.unescapedUrl + "</a>";
                B += "<br/>";
                if (F.thumb) {
                    B += '<a href="' + F.unescapedUrl + '" target="_blank">' + F.thumb + "</a><br/>"
                }
                B += "&nbsp;</td></tr>"
            }
        }
        goosh.gui.out(B + "</table>")
        };
    this.call = function(A) {
        if (A.length > 0) {
            this.start = 0;
            this.qstart = 0;
            this.results = new Array();
            this.args = A.join(" ");
            if (A.length > 1 && this.name == "site") {
                this.args = "site:" + this.args;
                this.cmd = "web"
            } else {
                if (this.name == "wiki") {
                    this.args = "site:" + goosh.config.lang + ".wikipedia.org " + this.args;
                    this.cmd = "web"
                } else {
                    this.cmd = this.name
                }
            }
            this.query(this.cmd, this.args)
            }
    };
    this.more = function() {
        if (this.args) {
            this.start += parseInt(goosh.config.numres);
            this.qstart = this.results.length;
            if (this.results.length < this.start + parseInt(goosh.config.numres)) {
                this.query(this.cmd, this.args)
                } else {
                this.renderResult()
                }
        }
    };
    this.render = function(C, B, E, A, F) {
        if (goosh.ajax.iscontext(C)) {
            if (B && B.results) {
                for (i = 0; i < B.results.length; i++) {
                    var D = B.results[i];
                    if (this.name == "blogs") {
                        B.results[i].unescapedUrl = D.postUrl
                    } else {
                        if (this.name == "images") {
                            B.results[i].thumb = "<img src='" + D.tbUrl + "'  width='" + D.tbWidth + "' height='" + D.tbHeight + "'/>"
                        } else {
                            if (this.name == "video") {
                                B.results[i].thumb = "<img src='" + D.tbUrl + "' width='130' height='97' />";
                                B.results[i].unescapedUrl = D.playUrl
                            }
                        }
                    }
                    this.results.push(B.results[i])
                    }
                this.hasmore = true;
                if (B.results.length < 8) {
                    this.hasmore = false;
                    moreobj = false
                }
            } else {
                this.hasmore = false;
                moreobj = false
            }
            if (this.hasmore && this.results.length < this.start + parseInt(goosh.config.numres)) {
                this.qstart = this.results.length;
                this.query(this.cmd, this.args);
                return
            }
            if (B && B.cursor && B.cursor.moreResultsUrl) {
                this.moreresurl = B.cursor.moreResultsUrl
            }
            if (!this.hasmore && this.moreresurl) {
                D = new Object();
                D.title = "More results at google";
                D.unescapedUrl = unescape(this.moreresurl);
                D.content = "";
                this.results.push(D)
                }
            this.renderResult(C, B, E, A, F);
            goosh.gui.showinput();
            goosh.gui.focusinput();
            goosh.gui.scroll()
            }
    }
};
goosh.modules.register("web");

/* =========== *
 * News Module *
 * =========== */

goosh.module.news = function() {
    this.name = "news";
    this.aliases = new Array("news", "n");
    this.mode = true;
    this.parameters = "[keywords]";
    this.help = "google news search";
    this.helptext = "<span class='info'>examples:</span><br/><i>blog foo bar</i>  - searches for &quot;foo bar&quot; news<br/>"
};
goosh.modules.register("news", "web");

/* =========== *
 * More Module *
 * =========== */
 
goosh.module.more = function() {
    this.name = "more";
    this.aliases = new Array("more", "m");
    this.help = "get more results";
    this.call = function(A) {
        if (goosh.config.moreobj && goosh.config.moreobj.hasmore) {
            goosh.config.moreobj.more()
            }
		$('#input')[0].scrollIntoView();
    }
};
goosh.modules.register("more");

/* =========== *
 * Blogs Module *
 * =========== */

goosh.module.blogs = function() {
    this.name = "blogs";
    this.aliases = new Array("blogs", "blog", "b");
    this.mode = true;
    this.parameters = "[keywords]";
    this.help = "google blog search";
    this.helptext = "<span class='info'>examples:</span><br/><i>blog foo bar</i>  - searches for &quot;foo bar&quot; blogs<br/>"
};
goosh.modules.register("blogs", "web");

/* =========== *
 * Read Module *
 * =========== */

goosh.module.read = function() {
    this.name = "read";
    this.aliases = new Array("read", "rss", "r");
    this.mode = false;
    this.start = 0;
    this.parameters = "[url]";
    this.help = "read feed of url";
    this.helptext = "<span class='info'>examples:</span><br/><i>read reddit.com</i>  - read reddit.com-feed<br/>";
    this.query = function(A, B) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&hl=" + goosh.config.lang + "&callback=goosh.modobj." + this.name + ".render&num=100&scoring=h&q=" + encodeURIComponent(B) + "&key=" + goosh.config.apikey)
        };
    this.lookup = function(A, B) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/feed/lookup?v=1.0&hl=" + goosh.config.lang + "&callback=goosh.modobj." + this.name + ".lookupdone&q=" + encodeURIComponent(B) + "&key=" + goosh.config.apikey)
        };
    this.lookupdone = function(C, B, D, A, E) {
        if (B) {
            if (B.url) {
                if (goosh.ajax.iscontext(C)) {
                    this.query(this.name, B.url)
                    }
            }
        } else {
            goosh.gui.error("feed &quot;" + this.args + "&quot; not found.<br/> Try the &quot;feed&quot;-command to find feeds.")
            }
    };
    this.call = function(A) {
        if (A.length > 0) {
            this.start = 0;
            this.results = new Array();
            this.args = A.join(" ");
            this.lookup(this.name, A.join(" "))
            }
    };
    this.render = function(C, B, E, A, F) {
        if (goosh.ajax.iscontext(C)) {
            if (B) {
                B.results = new Array();
                for (i = 0; i < B.feed.entries.length; i++) {
                    if (B.feed.entries[i]) {
                        B.results[i] = B.feed.entries[i]
                        }
                }
                for (i = 0; i < B.results.length; i++) {
                    if (B.results[i]) {
                        var D = B.results[i];
                        B.results[i].unescapedUrl = D.link;
                        B.results[i].content = D.contentSnippet
                    }
                }
                this.results = B.results;
                this.hasmore = true;
                this.renderResult(C, B, E, A, F);
                goosh.gui.showinput();
                goosh.gui.focusinput();
                goosh.gui.scroll()
                } else {
                goosh.gui.error("Error: feed &quot;" + this.args + "&quot; not found.<br/> Try the &quot;feed&quot;-command to find feeds.")
                }
        }
    };
    this.more = function() {
        if (this.args) {
            this.start += parseInt(goosh.config.numres);
            if (this.results.length <= this.start + parseInt(goosh.config.numres)) {
                this.hasmore = false;
                moreobj = false
            }
            this.renderResult()
            }
    }
};
//goosh.modules.register("read","web");
//Feed module
goosh.module.feeds = function() {
    this.name = "feeds";
    this.aliases = new Array("feeds", "feed", "f");
    this.mode = true;
    this.start = 0;
    this.args = "";
    this.parameters = "[keywords]";
    this.help = "google feed search";
    this.helptext = "<span class='info'>examples:</span><br/><i>feed foo bar</i>  - searches for &quot;foo bar&quot; feeds<br/><i>read 2</i>  - reads second result<br/>";
    this.query = function(A, B) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/feed/find?v=1.0&hl=" + goosh.config.lang + "&callback=goosh.modobj." + this.name + ".render&q=" + encodeURIComponent(B) + "&num=100&key" + goosh.config.apikey + "&")
        };
    this.call = function(A) {
        if (A.length > 0) {
            this.start = 0
        }
        this.results = new Array();
        this.args = A.join(" ");
        this.query(this.name, A.join(" "))
        };
    this.render = function(C, B, E, A, F) {
        if (goosh.ajax.iscontext(C)) {
            if (B && B.entries && B.entries.length > 0) {
                B.results = new Array();
                for (i = 0; i < B.entries.length; i++) {
                    if (B.entries[i]) {
                        B.results[i] = B.entries[i]
                        }
                }
                for (i = 0; i < B.results.length; i++) {
                    if (B.results[i]) {
                        var D = B.results[i];
                        B.results[i].unescapedUrl = D.url;
                        B.results[i].content = D.contentSnippet
                    }
                }
                this.results = B.results;
                this.hasmore = true;
                this.renderResult(C, B, E, A, F)
                } else {
                goosh.gui.error("No feeds found for &quot;" + this.args + "&quot;")
                }
            goosh.gui.showinput();
            goosh.gui.focusinput();
            goosh.gui.scroll()
            }
    };
    this.more = function() {
        if (this.args) {
            this.start += parseInt(goosh.config.numres);
            if (this.results.length <= this.start + parseInt(goosh.config.numres)) {
                this.hasmore = false;
                moreobj = false
            }
            this.renderResult()
            }
    }
};
goosh.modules.register("feeds", "web");

/* ============ *
 * Place Module *
 * ============ */
 
goosh.module.place = function() {
    this.name = "place";
    this.aliases = new Array("places", "place", "map", "p");
    this.mode = true;
    this.start = 0;
    this.args = "";
    this.parameters = "[address]";
    this.help = "google maps search";
    this.helptext = "<span class='info'>examples:</span><br/><i>place New York</i>  - show new york in a map<br/>";
    this.query = function(A, B) { goosh.ajax.query("http://maps.google.com/maps/geo?q=" + encodeURIComponent(B) + "&output=json&callback=goosh.modobj." + this.name + ".render&key=" + goosh.config.apikey + "&lang=" + goosh.config.lang) };
    this.call = function(A) {
        if (A.length > 0) {
            this.start = 0
        }
        this.results = new Array();
        this.args = A.join(" ");
        this.query(this.name, A.join(" "))
        };
    this.render = function(B) {
        if (goosh.ajax.iscontext(goosh.ajax.lastcontext)) {
            if (B && B.Placemark) {
                B.results = new Array();
                for (i = 0; i < B.Placemark.length; i++) {
                    if (B.Placemark[i]) {
                        this.hasmore = true;
                        var C = B.Placemark[i];
                        var D = C.AddressDetails.Accuracy;
                        var A = 5;
                        if (D >= 4) {
                            A = 10
                        }
                        if (D >= 6) {
                            A = 14
                        }
                        B.results[i] = new Array();
                        B.results[i].title = C.address;
                        B.results[i].unescapedUrl = "http://maps.google.com/maps?f=q&hl=" + goosh.config.lang + "&q=" + encodeURIComponent(C.address) + "&center=" + C.Point.coordinates[1] + "," + C.Point.coordinates[0] + "&zoom=" + (A);
                        B.results[i].content = "";
                        B.results[i].thumb = "<img src='http://maps.google.com/staticmap?center=" + C.Point.coordinates[1] + "," + C.Point.coordinates[0] + "&zoom=" + (A) + "&size=" + goosh.config.mapwidth + "x" + goosh.config.mapheight + "&maptype=roadmap&markers=" + C.Point.coordinates[1] + "," + C.Point.coordinates[0] + ",blue&key=" + goosh.config.apikey + "' width='" + goosh.config.mapwidth + "' height='" + goosh.config.mapheight + "'/>"
                    }
                }
                this.hasmore = true;
                this.results = B.results;
                this.renderResult(goosh.ajax.lastcontext, B)
                } else {
                goosh.gui.error("Place &quot;" + this.args + "&quot; not found.")
                }
            if (this.results.length <= this.start + parseInt(goosh.config.numres)) {
                this.hasmore = false;
                moreobj = false
            }
            goosh.gui.showinput();
            goosh.gui.focusinput();
            goosh.gui.scroll()
            }
        return true
    };
    this.more = function() {
        if (this.args) {
            this.start += parseInt(goosh.config.numres);
            if (this.results.length <= this.start + parseInt(goosh.config.numres)) {
                this.hasmore = false;
                moreobj = false
            }
            this.renderResult()
            }
    }
};
/* goosh.modules.register("place", "web"); */

/* ================ *
 * Translate Module *
 * ================ */
   
goosh.module.translate = function() {
    this.name = "translate";
    this.aliases = new Array("translate", "trans", "t");
    this.mode = true;
    this.args = "";
    this.parameters = "[lang1] [lang2] &lt;words>";
    this.help = "google translation";
    this.helptext = "<span class='info'>examples:</span><br/><i>translate en de What time is it?</i>  - translate &quot;What time is it?&quot; from english to german<br/><i>translate fr What time is it?</i>  - translate &quot;What time is it?&quot; to french<br/><i>translate Wie sp&auml;t ist es?</i>  - translates &quot;Wie sp&auml;t ist es?&quot; to your default language. language of text will be guessed.<br/>";
    this.query = function(B, A) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=" + encodeURIComponent(this.text) + "&langpair=" + this.lang1 + "%7C" + this.lang2 + "&callback=goosh.modobj." + this.name + ".render&key=" + goosh.config.apikey)
        };
    this.guess = function(A) {
        goosh.ajax.query("http://ajax.googleapis.com/ajax/services/language/detect?v=1.0&q=" + encodeURIComponent(A) + "&callback=goosh.modobj." + this.name + ".guessresult&key=" + goosh.config.apikey)
        };
    this.guessresult = function(C, B, D, A, E) {
        if (goosh.ajax.iscontext(C)) {
            if (B) {
                if (B.language) {
                    this.lang1 = B.language;
                    if (!this.lang2) {
                        this.lang2 = goosh.config.lang
                    }
                    this.query()
                    } else {
                    goosh.gui.error("could not guess language.")
                    }
            }
        }
    };
    this.renderResult = function(E, D, F, C, G) {
        var B = "";
        var A = this.start;
        if (goosh.ajax.iscontext(E)) {
            if (D) {
                if (D.translatedText) {
                    goosh.gui.outln("translating &quot;" + this.text + "&quot; from " + goosh.gui.info(goosh.lang.reverse[this.lang1]) + " to " + goosh.gui.info(goosh.lang.reverse[this.lang2]) + ":");
                    goosh.gui.outln("");
                    goosh.gui.outln(goosh.gui.info("&quot;" + D.translatedText + "&quot;"));
                    goosh.gui.outln("")
                    } else {
                    goosh.gui.error("no translation found.")
                    }
            }
            goosh.gui.showinput();
            goosh.gui.focusinput();
            goosh.gui.scroll()
            }
    };
    this.call = function(A) {
        this.args = A;
        this.lang1 = false;
        this.lang2 = false;
        if (A.length > 2 && (goosh.lang.list[A[0]] || goosh.lang.reverse[A[0]]) && (goosh.lang.list[A[1]] || goosh.lang.reverse[A[1]])) {
            if (goosh.lang.list[A[0]]) {
                this.lang1 = goosh.lang.list[A[0]]
                } else {
                this.lang1 = A[0]
                }
            if (goosh.lang.list[A[1]]) {
                this.lang2 = goosh.lang.list[A[1]]
                } else {
                this.lang2 = A[1]
                }
            this.text = A[2];
            for (i = 3; i < A.length; i++) {
                this.text += " " + A[i]
                }
            this.query(this.name, A)
            } else {
            var B = "";
            if (goosh.lang.list[A[0]] || goosh.lang.reverse[A[0]]) {
                if (goosh.lang.list[A[0]]) {
                    this.lang2 = goosh.lang.list[A[0]]
                    } else {
                    this.lang2 = A[0]
                    }
                B = A[1];
                for (i = 2; i < A.length; i++) {
                    B += " " + A[i]
                    }
            } else {
                B = A.join(" ")
                }
            this.text = B;
            this.guess(B)
            }
    };
    this.render = function(C, B, D, A, E) {
        this.renderResult(C, B, D, A, E)
        }
};
/* goosh.modules.register("translate"); */

/* ============= *
 * Images Module *
 * ============= */
 
goosh.module.images = function() {
    this.name = "images";
    this.aliases = new Array("images", "image", "img", "i");
    this.mode = true;
    this.help = "google image search";
    this.helptext = "<span class='info'>examples:</span><br/><i>images foo bar</i>  - searches for &quot;foo bar&quot; images<br/>"
};
goosh.modules.register("images", "web");

/* ============= *
 * Videos Module *
 * ============= */

goosh.module.video = function() {
    this.name = "video";
    this.aliases = new Array("videos", "video", "vid", "v");
    this.mode = true;
    this.parameters = "[keywords]";
    this.help = "google video search";
    this.helptext = "<span class='info'>examples:</span><br/><i>video foo bar</i>  - searches for &quot;foo bar&quot; videos<br/>"
};
goosh.modules.register("video", "web");

/* ============ *
 * Clear Module *
 * ============ */

goosh.module.clear = function() {
    this.name = "clear";
    this.aliases = new Array("clear", "c");
    this.help = "clear the screen";
    this.call = function(A) {
        goosh.gui.clear();
        goosh.gui.outln("<br/>");
    }
};
goosh.modules.register("clear");

/* =========== *
 * Wiki Module *
 * =========== */

goosh.module.wiki = function() {
    this.name = "wiki";
    this.aliases = new Array("wikipedia", "wiki");
    this.mode = true;
    this.help = "wikipedia search";
    this.helptext = "<span class='info'>examples:</span><br/><i>wiki foo bar</i>  - searches &quot;foo bar&quot; in wikipedia<br/>"
};
goosh.modules.register("wiki", "web");

/* =========== *
 * Help Module *
 * =========== */

goosh.module.help = function() {
    this.name = "help";
    this.aliases = new Array("help", "man", "ls", "h", "?");
    this.help = "displays help text";
    this.helptext = "";
    this.parameters = "[command]";
    this.call = function(C) {
        if (C[0] == "goosh") {
            C[0] = false
        }
        var B = "<span class='info'>";
        if (C[0]) {
            B += "help: " + C[0]
            }
        B += "</span><br/>";
        if (C[0] && !goosh.modules.list[C[0]]) {
            goosh.gui.error("command &quot;" + C[0] + "&quot; not found.");
            return false
        }
        B += "<table border='0' class='help'>";
        B += "<tr><td class='less' width='100px'>command</td><td class='less' width='130px'>alias</td><td class='less' width='220px'>parameters</td><td class='less'>description</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
        var A;
        for (key in goosh.modules.list) {
            if (!C[0] || key == C[0]) {
                A = goosh.modules.list[key];
                B += "<tr><td";
                if (A.mode) {
                    B += " class='info'"
                }
                B += ">";
                B += "" + A.name + "</td><td>";
                if (A.aliases.length > 1) {
                    B += "(";
                    for (i = 0; i < A.aliases.length; i++) {
                        if (A.aliases[i] != A.name) {
                            B += A.aliases[i];
                            B += ","
                        }
                    }
                    B = B.substr(0, B.length - 1);
                    B += ")"
                }
                B += "</td><td>";
                if (A.parameters) {
                    B += A.parameters
                }
                B += "</td><td>";
                B += "" + A.help + "\n";
                B += "</td></tr>"
            }
        }
        B += "</table>";
        if (C[0]) {
            B += " <br/>";
            B += A.helptext;
            B += " <br/>"
        } else {
            B += "<ul>";
            B += "<li>Enter green commands without parameters to change default mode.</li>";
            B += "<li>Anything that's not a command will search in current default mode.</li>";
            B += "<li>Aliases will expand to commands. Numbers will expand to corresponding search results.</li>";
            B += "<li>Use cursor up and down for command history.</li>";
            B += "<li>Enter keyword and hit the tab-key for tab-completion.</li>";
            B += "<li>Commands marked with * are experimental, use them with care and please report any bugs</li>";
            B += "</ul>"
        }
        goosh.gui.out(B)
		$('#input')[0].scrollIntoView();
        }
};
goosh.modules.register("help");

/* ========= *
 * CD Module *
 * ========= */

goosh.module.cd = function() {
    this.name = "cd";
    this.aliases = new Array("cd");
    this.parameters = "[command]";
    this.help = "change mode";
    this.helptext = "This exists just for convenience. Use &lt;command> without parameters instead.<br/>";
    this.call = function(A) {
        if (!A[0]) {
            A[0] = goosh.config.mode
        }
        if (A[0] && A[0] == "..") {
            A[0] = "web"
        }
        if (A[0] && goosh.modules.list[A[0]] && goosh.modules.list[A[0]].mode) {
            var B = goosh.modules.list[A[0]];
            goosh.config.mode = B.name;
            goosh.gui.updateprompt()
            } else {
            goosh.gui.error("command not found or command is not a mode.")
            }
    }
};
goosh.modules.register("cd");

/* =========== *
 * Site Module *
 * =========== */

goosh.module.site = function() {
    this.name = "site";
    this.aliases = new Array("site", "in");
    this.parameters = "[url] [keywords]";
    this.help = "search in a specific website";
    this.mode = false
};
goosh.modules.register("site", "web");

/* =========== *
 * Open Module *
 * =========== */

goosh.module.open = function() {
    this.name = "open";
    this.aliases = new Array("open", "o");
    this.parameters = "[url]";
    this.help = "open url in new window";
    this.helptext = "<span class='info'>examples:</span><br/><i>open 1 3</i>  - open first and third result from last search<br/>";
    this.call = function(B) {
        for (i = 0; i < B.length; i++) {
            var A = B[i];
            if (A.indexOf("http://") == -1 && A.indexOf("https://")) {
                A = "http://" + A
            }
            window.open(A, "_blank", "")
            }
    }
};
goosh.modules.register("open");

/* ========= *
 * Go Module *
 * ========= */

goosh.module.go = function() {
    this.name = "go";
    this.aliases = new Array("go", "g");
    this.parameters = "[url]";
    this.help = "open url";
    this.call = function(B) {
        if (B[0]) {
            var A = B[0];
            if (A.indexOf("http://") == -1 && A.indexOf("https://")) {
                A = "http://" + A
            }
            window.location.href = A
        }
    }
};
goosh.modules.register("go");

/* ============ *
 * Lucky Module *
 * ============ */

goosh.module.lucky = function() {
    this.name = "lucky";
    this.aliases = new Array("lucky", "l");
    this.mode = false;
    this.parameters = "[keywords]";
    this.help = "go directly to first result";
    this.helptext = "<span class='info'>examples:</span><br/><i>lucky foo bar</i>  - goes to first &quot;foo bar&quot; result<br/>";
    this.call = function(A) {
        this.qstart = 0;
        if (A.length > 0) {
            this.query("web", A.join(" "))
            }
    };
    this.render = function(C, B, D, A, E) {
        if (goosh.ajax.iscontext(C)) {
            this.renderResult(C);
            if (B.results[0].unescapedUrl) {
                setTimeout('window.location.href = "' + B.results[0].unescapedUrl + '"', 0)
                }
           }
    }
};
goosh.modules.register("lucky", "web");

/* ================ *
 * Calculate Module *
 * ================ */

goosh.module.calculate = function() {
    this.name = "calculate";
    this.aliases = new Array("calculate", "calc");
    this.help = "evaluate a mathematical expression";
    this.parameters = "[mathematical expression]";
    this.call = function(args) {
        var out = "";
        var exp = args.join(" ");
        var expin = exp;
        if (exp.match(/^[0-9\+\-\/\*\. \^\(\)]+$/)) {
            exp = exp.replace(/([0-9]+)\^([0-9]+)/g, "Math.pow($1,$2)");
            goosh.gui.outln("&nbsp;=> " + expin + " = " + eval(exp))
            } else {
            goosh.gui.error("Sorry! My maths is not that strong:(");
            return false
        }
    }
};
goosh.modules.register("calculate");

/* =============== *
 * Settings Module *
 * =============== */

goosh.module.settings = function() {
    this.name = "settings";
    this.aliases = new Array("settings", "set");
    this.help = "edit settings";
    this.parameters = "[name] [value]";
    this.helptext = "<span class='info'>examples:</span><br/><span style='background-color:#FFFF33'>set lang de</span> - sets language to german.<br/><span style='background-color:#FFFF33'>set lang</span> - displays value of language setting.<br/><i>settings</i>  - displays all settings<br/><i>settings reset</i>  - reset all settings to default values.	";
    this.call = function(B) {
        var A = "";
        if (B[0] && B[1]) {
            if (goosh.set.list[B[0]] && goosh.set.list[B[0]].set(B[1])) {
                if (goosh.set.list[B[0]].get() == goosh.set.list[B[0]].def) {
                    goosh.lib.cookie.del(B[0])
                    } else {
                    goosh.lib.cookie.set(B[0], goosh.set.list[B[0]].get(), 365)
                    }
                B[1] = false
            } else {
                goosh.gui.error("Could not set " + B[0] + " to &quot;" + B[1] + "&quot;");
                return false
            }
        }
        if (B[0] && !B[1]) {
            if (B[0] == "reset") {
                for (key in goosh.set.list) {
                    goosh.set.list[key].set(goosh.set.list[key].def);
                    goosh.lib.cookie.del(key)
                    }
                A += "Settings where set to default values.<br/>"
            } else {
                if (goosh.set.list[B[0]]) {
                    A += B[0] + " is set to &quot;" + goosh.set.list[B[0]].get() + "&quot;.<br/><br/>"
                } else {
                    goosh.gui.error("No setting with that name.")
                    }
            }
        } else {
            A += "<br/><table border='0' class='help' width='80%'><tr>";
            A += "<tr><td class='less'>name</td><td class='less'>value</td><td class='less'>default</td><td class='less'>help</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
            for (key in goosh.set.list) {
                A += "<td";
                A += " class='info'";
                A += ">" + key + "</td>";
                A += "<td>" + goosh.set.list[key].get() + "</td>";
                A += "<td class='less'>" + goosh.set.list[key].def + "</td>";
                A += "<td class='less'>" + goosh.set.list[key].txt + "</td>";
                A += "</tr><tr>"
            }
            A += "</tr></table>"
        }
        goosh.gui.outln(A)
        }
};
goosh.modules.register("settings");

goosh.command = function() {
    var F = goosh.gui.inputfield.value;
    var G = F.split(" ");
    var C = new Array();
    for (i = 0; i < G.length; i++) {
        if (G[i] != "") {
            if (G[0] != "set" && G[0] != "settings") {
                var B = 1;
                while (goosh.config.urls[B]) {
                    if (G[i] == B) {
                        G[i] = goosh.config.urls[B];
                        if (i == 0) {
                            C.push("open")
                            }
                    }
                    B++
                }
            }
            C.push(G[i])
            }
    }
    var E;
    for (key in goosh.modules.list) {
        if (goosh.lib.in_array(goosh.modules.list[key].aliases, C[0])) {
            E = goosh.modules.list[key];
            C[0] = E.name;
            break
        }
    }
    if (C.length == 0 && goosh.config.moreobj && goosh.config.moreobj.hasmore) {
        E = goosh.modules.list.more;
        C[0] = "more"
    }
    var A = C.join(" ");
    if (encodeURIComponent(A) != goosh.lib.get("q") && A != "more" && A != "logout") {
        window.location.hash = "#" + encodeURIComponent(A)
        }
    goosh.gui.out("<div class='input'><span class='less'>" + goosh.gui.prompt + "</span>" + A.replace(/</g, "&lt;") + "</div>");
    if (A != "") {
        goosh.keyboard.hist[goosh.keyboard.hist.length] = A;
        goosh.keyboard.histpos = goosh.keyboard.hist.length
    }
    var D = "";
    if (!E) {
        E = goosh.modules.list[goosh.config.mode]
        } else {
        for (i = 0; i < C.length - 1; i++) {
            C[i] = C[i + 1]
            }
        C.pop()
        }
    if (E.more && C.length > 0) {
        this.config.moreobj = E
    }
    if (C.length == 0 && E.mode) {
        goosh.config.mode = E.name;
        goosh.gui.updateprompt()
        } else {
        E.call(C)
        }
    goosh.gui.scroll();
    goosh.gui.inputfield.value = "";
    goosh.gui.focusinput();
    return false
};
goosh.onload = function(E, D) {
    var A = false;
    try {
        if (parent.goosh != goosh) {
            var B = document.getElementById("body");
            B.innerHTML = "";
            goosh = parent.goosh;
            A = true
        }
    } catch(E) {}
    goosh.gui.init();
    if (!D && (A || document.cookie.indexOf("loggedin") != -1)) {
        goosh.ajax.query("http://goosh.appspot.com/status?callback=goosh.onload");
        return
    } else {
        if (goosh.ajax.iscontext(E)) {
            goosh.config.user = D;
            var F = goosh.gui.el("gooshlogin");
            var C = goosh.gui.el("gooshloginparent");
            if (F && C) {
                goosh.gui.outputel.removeChild(goosh.gui.outputel.lastChild)
                }
        }
    }
    if (D && D != "guest") {
        goosh.lib.cookie.set("loggedin", "1", 365)
        }
    goosh.set.init()
    };
goosh.getquery = function() {
    var A = "";
    if (goosh.lib.get("q")) {
        A = goosh.lib.get("q")
        }
    if (window.location.hash) {
        A = decodeURIComponent(window.location.hash.substr(1))
        }
    A += " ";
    if (A != " " && A.substr(0, 6) != "login " && A.substr(0, 4) != "set " && A.substr(0, 9) != "settings ") {
        goosh.gui.inputfield.value = A.substr(0, A.length)
        } else {
        goosh.gui.inputfield.value = ""
    }
    goosh.gui.updateprompt();
    goosh.gui.showinput();
    goosh.gui.focusinput();
    if (goosh.gui.inputfield.value != "") {
        goosh.command()
        }
};
if (typeof window.addEventListener !== "undefined") {
    window.addEventListener("load", goosh.onload, false)
    } else {
    if (typeof window.attachEvent !== "undefined") {
        window.attachEvent("onload", goosh.onload)
        }
}

/* Browser Detection Module */
var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Unknown Browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown Version";
        this.OS = this.searchString(this.dataOS) || "Unknown OS";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1)
            return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]
    };
BrowserDetect.init();

document.getElementById("client").innerHTML = '#1: Client - ' + BrowserDetect.browser + ' ' + BrowserDetect.version + ' + ' + BrowserDetect.OS;