$(function(){if($(".waSlideMenu-menu a").click(function(){$(this).parent().hasClass("collapsible")||$(this).parent().hasClass("waSlideMenu-back")||(window.location.href=$(this).attr("href"))}),$(".slidemenu").on("afterLoadDone.waSlideMenu",function(){$("img").retina()}),$.fn.lazyLoad){var e=$(".lazy-paging");if(!e.length)return;var t=e.find("li.selected");if("1"!=t.children("a").text())return;e.hide();var a=$(window),i=parseInt(e.data("times"),10),n=e.data("linkText")||"Load more";a.lazyLoad("stop");t.next().length&&a.lazyLoad({container:"#js-photo-thumb",load:function(){a.lazyLoad("sleep");var e=$(".lazy-paging").hide(),t=e.parent().find(".loading").parent(),r=e.find("li.selected"),o=r.next(),l=o.find("a").attr("href");if(!l)return t.hide(),$(".lazyloading-load-more").hide(),void a.lazyLoad("stop");var s=$("#js-photo-thumb");t.length||(t=$('<div><i class="icon16 loading"></i>Loading...</div>').insertBefore(e)),t.show(),$.get(l,function(r){var o=$("<div></div>").html(r);$.Retina&&o.find("#js-photo-thumb img").retina(),s.append(o.find("#js-photo-thumb").children());var l=o.find(".lazy-paging").hide();e.replaceWith(l),e=l,i-=1;var d=e.find("li.selected"),c=d.next();c.length&&c.find("a").attr("href")?!isNaN(i)&&i<=0?(a.lazyLoad("sleep"),$(".lazyloading-load-more").length||$('<a href="#" class="lazyloading-load-more">'+n+"</a>").insertAfter(e).click(function(){return t.show(),i=1,a.lazyLoad("wake"),a.lazyLoad("force"),!1})):a.lazyLoad("wake"):($(".lazyloading-load-more").hide(),a.lazyLoad("stop")),t.hide(),o.remove(),s.trigger("append_photo_list")})}})}});