$(function () {
    //分类
    if ($('.icon-menu-1')[0]) {
        $(".icon-menu-1").on("click", function () {
            if($(".modal-container").hasClass("active")){
                $(".modal-container").removeClass("active");
                $("body").removeAttr("style");
            }else{
                $("body").css("overflow","hidden");
                $(".modal-container").addClass("active").on("click",function() {
                    $(".modal-container").removeClass("active");
                    $("body").removeAttr("style");
                }).find(".ui-nav").on("click", function (e) {
                    e.stopPropagation();
                });
            }
        });
        //分类滑动
        var myScroll = new iScroll($('.iscroll')[0], { mouseWheel: true });        
    }
    //首页
    if ($(".swiper-container")[0]) {
        //首页滑动
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        //首页tab
        !function () {
            if ($('.ui-tabs')[0]) {
                $(".ui-tabs-nav>div").on("click", function () {
                    $(this).addClass("active").siblings().removeClass('active');
                    var idx = $(".ui-tabs-nav>div").index(this);
                    console.log(idx);
                    $(".ui-tabs-conent>div").removeClass("active").eq(idx).addClass("active");
                })
            }
        }();
        //数据加载
        !function () {
            var html = template('template', { 'list': getData(5, 'grid.html') });
            $("#tab1").append(html);
            html = template('template', { 'list': getData(3, 'grid.html') });
            $("#tab2").append(html);
            html = template('template', { 'list': getData(4, 'grid.html') });
            $("#tab3").append(html);
            $.lazyLad();
        }();
    }
    //scroll
    $(window).on("touchmove scroll", function (event) {
        //列表加载
        if ($(".pro-grid")[0]) {
            var top = $(".pro-grid").offset().top + $(".pro-grid").height();
            var maxtop = $(window).scrollTop() + $(window).height();
            $.lazyLad();
            if (top - 100 < maxtop) {
                var html = template('template', { 'list': getData() });
                $(".pro-grid").append(html);
            }
            //page
            !function () {
                if (!$('#pages')[0]) {
                    $('body').append('<div id="pages" class="animation">58/149</div>');
                }
                if ($(window).scrollTop() > 0) {
                    $("#pages").addClass("active");
                } else {
                    $("#pages").removeClass("active");
                }
            }();
        }
        //Top
        !function () {
            if (!$("#backtop")[0]) {
                $('body').append('<div><a href="#" id="backtop" class="animation"><!--backtop--></a></div>');
                $("#backtop").on("click", function (e) {
                    e.preventDefault();
                    $('body,html').animate({ scrollTop: 0 }, 400); return false;
                });
            }
            if ($(window).scrollTop() > 0) {
                $("#backtop").addClass("active");
            } else {
                $("#backtop").removeClass("active");
            }
        }();

        if($(".ui-hearer")[0]){
            if ($(window).scrollTop() >= $(".ui-hearer").height()) {
                $(".ui-hearer").addClass("active");
            } else {
                $(".ui-hearer").removeClass("active");
            }
        }
    });
    //列表
    if ($(".pro-grid")[0]) {
        var html = template('template', { 'list': getData() });
        $(".pro-grid").append(html);
        $.lazyLad();
    }
});

//js去除空格函数
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); };
String.prototype.ltrim = function () { return this.replace(/(^\s*)/g, ""); };
String.prototype.rtrim = function () { return this.replace(/(\s*$)/g, ""); };
/*jquery extended*/
(function ($) {
    $.extend({
        closeBox: function (o, x, fn) {
            $('#' + o).fadeOut(500, function () {
                if (fn && typeof (fn) === "function") { fn(); }
                $("body").css("overflow", "visible");
            });
            if ($('#v_overlay')[0]) { $('#v_overlay').fadeOut(650, function () { $(this).remove(); }); }
        },
        openBox: function (o, x, fn) {
            $.init(o, x, fn); $('#' + o).fadeIn(500, function () {
                if (fn && typeof (fn) === "function") { fn(); }
            });
        },
        openBoxAgin: function (o, x, fn) {
            $.init(o, x, fn);
            $("#" + o).show();
        },
        init: function (o, x, fn) {
            var w = $(window).width(), h = $(window).height();
            var bw = $("#" + o).outerWidth(), bh = $("#" + o).outerHeight();
            var _top = ((h / 2 - bh / 2) - 20);
            var boxCss = { "left": ((w / 2 - bw / 2) + "px"), "top": ((_top > 0 ? _top : 0) + "px"), "z-index": "99", "position": "fixed" };
            $("#" + o).css(boxCss);
            $("body").css("overflow", "hidden");
            try {
                if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                    $("#" + o).css("position", "absolute"); location.href = location.href.search(/\?/) > 0 ? location.href.substring(0, location.href.indexOf('#')) : location.href + "#";
                }
                if ((window.innerHeight - 40) <= $("#" + o).height()) {
                    $("#" + o).css({ "position": "absolute", "top": (40 + window.scrollY) });
                }
            } catch (e) { }
            if (x != undefined && $("body").find("#v_overlay").html() == null) {
                var boxBg = "<div id=\"v_overlay\" style=\"position:absolute;background-color:#000;filter:alpha(opacity=50);opacity:0.5;width:100%;left:0;top:0;z-index:98;border:none;display:none\"></div>";
                $(boxBg).click(function () { $.closeBox(o, x); }).height($(document).height()).appendTo("body").fadeIn();
            }
            $(window).resize(function () {
                if ($("#" + o).css("display") == "block") {
                    $('#v_overlay').remove(); $.init(o, x);
                }
            });
        },
        alert: function (options) {
            var parmater = { text: "", timeOut: 2000, redirectUrl: "", fn: null };
            parmater = $.extend(parmater, options);
            if (!$('.ui-alert')[0]) {
                $("body").append('<div class="ui-alert"><div class="ui-alert-text"><div class="text"></div></div></div>');
            }
            $(".ui-alert").fadeIn().find('div.text').text(parmater.text);
            $(".ui-alert").find('.ui-alert-text').css('margin-left', '-' + ($(".ui-alert").find('.ui-alert-text').outerWidth() / 2) + 'px');
            var _t = setTimeout(function () {
                $(".ui-alert").fadeOut(function () {
                    if (parmater.redirectUrl != "") {
                        parmater.fu == null ? "" : parmater.fn();
                        location.href = parmater.redirectUrl;
                    }
                });
            }, parmater.timeOut);
            $(".ui-alert").click(function () {
                clearTimeout(_t);
                $(".ui-alert").fadeOut(function () {
                    if (parmater.redirectUrl != "") {
                        parmater.fu == null ? "" : parmater.fn();
                        location.href = parmater.redirectUrl;
                    }
                });
            });
        },
        //Loading lock screen
        loading: function (bool, idx) {
            if (bool) {
                if (!$(".ui-popup-screen")[0]) {
                    $("body").append("<div class='ui-popup-screen'></div>");
                }
                $(".ui-popup-screen").append("<div class='loginding'></div>").show().css({ "z-index": (idx != undefined ? idx : 30), "background-color": "rgba(0, 0, 0, 0.3)" });
            } else {
                $(".ui-popup-screen").remove();
            }
        },
        //init page lock screen
        initPage: function (bool) {
            if (!$(".ui-popup-screen")[0]) {
                $("body").append("<div class='ui-popup-screen'></div>");
                $(".ui-popup-screen").addClass("initpage").show().css({ "z-index": 30, "background-color": "#FFF" });
            } else {
                $(".ui-popup-screen").remove();
            }
        },
        //windown scroll back self 
        scroll: function (self) {
            var type = typeof (self);
            var _this = type == "object" ? self : $("#" + self);
            if (_this == undefined && _this == null) return;
            $('body,html').animate({ scrollTop: $(_this).offset().top }, 600);
        },
        //lazyLad loading images
        lazyLad: function () {
            var e = this;
            var j = $(window).height();
            var h = $("img[imgsrc]");
            var g = $(window).scrollTop();
            for (var d = 0, c = h.size() ; d < c; d++) {
                currentObj = $(h[d]);
                var f = currentObj.offset().top - j - 200;
                if (parseInt(g) >= parseInt(f)) {
                    currentObj.attr("src", currentObj.attr("imgsrc"));
                    currentObj.removeAttr("imgsrc")
                }
            }
        },
        //lock screen 
        modal: function (bool, index) {
            if (bool) {
                if (!$(".ui-popup-screen")[0]) {
                    $("body").append("<div class='ui-popup-screen'></div>");
                }
                if (index != undefined) {
                    $(".ui-popup-screen").show().css("z-index", index);
                }
            } else {
                $(".ui-popup-screen").remove();
            }
        }
    });
})(window.jQuery || window.$);
/*时间倒计时*/
(function () {
    eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('$.11.U=A(e){A u(e){d t=v.w(e/n),r=v.w((e-t*n)/X),i=v.w((e-t*n-r*c*k*k)/10),s=v.w((e-t*n-r*c*k*k-i*c*k)/c);D{5:("0"+r).z(-2),7:("0"+i).z(-2),6:("0"+s).z(-2),f:t}}j(l.E("I"))D l;l.E("I",!0);d t={H:C B,J:"m",F:"Z",4:{5:":",7:":",6:""},y:"",x:!1},n=R,r=$.S({},t,e),i=l;r.a=r.a.Q(/\\-/g,"/");r.a=N(r.a)?r.a:O(r.a);d s=C B(r.a)-C B(r.H),o=A(){j(s<0){r.9.b(i,r.x?{5:"h",7:"h",6:"h",f:0}:"h"+r.4.5+"h"+r.4.7+"h");W(i.K)}p{d e=u(s);j(r.x)r.9.b(i,e);p j(r.y=="m"){s>=n*2?r.9.b(i,\'<3 8="G">\'+e.f+\'</3><3 8="m">\'+r.F+\'</3><3 8="L">\'+e.5+r.4.5+e.7+r.4.7+e.6+r.4.6+"</3>"):(s>=n?r.9.b(i,\'<3 8="G">\'+e.f+\'</3><3 8="m">\'+r.J+\'</3><3 8="L">\'+e.5+r.4.5+e.7+r.4.7+e.6+r.4.6+"</3>"):r.9.b(i,\'<3 8="6">\'+e.5+r.4.5+e.7+r.4.7+e.6+r.4.6+"</3>"))}p j(r.y=="P"){d t=e.5;s>=n&&(t=q(e.f*M)+q(e.5));r.9.b(i,\'<3 8="5">\'+t+\'</3><3 8="V">\'+r.4.5+e.7+\'</3><3 8="Y">\'+r.4.7+e.6+r.4.6+"</3>")}p{d t=e.5;s>=n&&(t=q(e.f*M)+q(e.5));r.9.b(i,\'<3 8="6">\'+t+r.4.5+e.7+r.4.7+e.6+r.4.6+"</3>")}}s-=c};i.K=T(o,c);o();D l};', 62, 64, '|||span|unitWord|hours|seconds|minutes|class|callback|targetTime|call|1e3|var||dates||00||if|60|this|day|||else|Number|||||Math|floor|callbackOnlyDatas|type|slice|function|Date|new|return|data|days_label|day_count|beginTime|handled|day_label|interval|day_seconds|24|isNaN|parseInt|diffNoDay|replace|864e5|extend|setInterval|genTimer|miniutes|clearInterval|36e5|senconds|days|6e4|fn'.split('|'), 0, {}));
})(jQuery);

/*数据*/
function getData(length,href){
    length = !length ? 10 : length;
    var data = [];
    href = !href ? "#" : href;
    for (var i = 0; i < length; i++) {
        //parseInt(Math.random() * (max - min + 1) + min, 10);
        var rd = parseInt(Math.random() * (6 - 1 + 1) + 1, 10);
        var price = parseInt(Math.random() * (60 - 10 + 1) + 10, 10);
        var discount = parseInt(Math.random() * (95 - 50 + 1) + 50, 10);
        data.push({ Title: "Pure Color Chiffon Women's Blouse", Href: href, Price: price + ".99", Discount: discount, Src: "images/product/" + rd + "_m.jpg" });
    };
    return data;
}

 (function () {
    //if(location.pathname.search("account")>-1) return;
    var stat = document.createElement("script"); stat.type = "text/javascript"; stat.async = true;
    stat.src = "/report?beforeurl=" + escape(document.referrer) + "&n=" + Math.random();
    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(stat, s);
})();