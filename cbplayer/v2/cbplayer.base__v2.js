/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var isLoadjwplayer = false;
var CBPlayer = CBPlayer || (function() {
    var _args = {}; // private
    return {
        init: function(Args) {
            _args = Args;
            link_source = videoType(_args.file) =='youtube' ? '//content.jwplatform.com/libraries/5QOesuLn.js' : '//content.jwplatform.com/libraries/lqsWlr4Z.js';
        },
        get_player: function() {
            if (!isLoadjwplayer){
                jQuery.ajax({
                    /*url: '//content.jwplatform.com/libraries/V6NfEzT7.js',
                    url: '//content.jwplatform.com/libraries/VD8tlfTf.js',
                    url: '//content.jwplatform.com/libraries/lqsWlr4Z.js',
                    url: '//content.jwplatform.com/libraries/5QOesuLn.js',*/
                    url: link_source,
                    cache: true,async:false,
                    success : function() {
                    isLoadjwplayer = true;
                    _CBPlayer(_args);
                    }
                })              
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    isLoadjwplayer = true;
                    console.log("complete");
                });
            }else{
                _CBPlayer(_args);
            }
        }
    };
}());
function _CBPlayer(_args){
    if(typeof configs != 'undefined')
        base_url = configs.base_url ? configs.base_url : window.location.origin;
    else
        base_url = window.location.origin;
    var logo = base_url + "/media/general/logo/logo.png";
    var scrollFixedView = _args.scrollFixedView ? _args.scrollFixedView : false;
    var scrollPlay = !_args.scrollPlay ? _args.scrollPlay : true;
    var nextOnepage = _args.nextOnepage ? _args.nextOnepage : false;
    var player_params = _args;
    player_params.file = get_link_video(_args.file);
    if(!player_params.aspectratio){        
        player_params.height = _args.height ? _args.height : '405px';
        player_params.width = _args.width ? _args.width : '720px';
    }else{
        player_params.width = '100%';
    }
    player_params.autostart = _args.autostart ? _args.autostart : false;
    player_params.stretching = _args.stretching ? _args.stretching : "bestfit";
    player_params.abouttext = _args.abouttext ? _args.abouttext : "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABp0lEQVR42t2USy8DURTHKyzExoZIrEnaqB1ha6F7fAJh6wvYSmx8AKSpika1ERLahBAiNp5hoaQSIbpAvNp7Ozp3Xo5zr2nj0WamVITFPzM5OfObc//nnOtwkLHnH5H5AiXX74NTpkoGRpiLhGAoswe90tr3wcPSvng20TAwXQPDMIR88snXwGWoafkUdEOH0cwRJDU5B+W60tIip2hwM1bIAQmVQC2ZhDY6B1RnIsZ/NiBtirxyMg6NJAg1mGMLPPi0LSCedDQXc5IZeNQyMGHaUE18EGUXuVN00AVr8KFyK5Kd2LC38TrihwqsspJ4Iabeieqz4C3l2hpMTU/r6dSnZH78XXbzznOugBy3Bp+pSZHsRq/zeecmYXhAW7JQ1dDARUPW4BH5QHzQJS0V7Dj3nGoMJF3BBvvtNY9PAQen0JIGGiwI53ktdNb+uPEGBVhcwGPKPXSmI3krXmUJWGTnxW9eBD/icAW3bge73i9tQJ+0DivsEpimgoZxr3z8tbuCL8PHCcjKk+ck9i+h1OsytNN56JGWoRvVit5W4Sz/gfv434NfAC4uL7CTBQEaAAAAAElFTkSuQmCC' alt='cungbiet.com' style='width: 21px !important;height: 100%;max-height: 100%;margin: -0.5em auto -0.5em -0.5em;display:inline;'> CB Player 2.0";
    player_params.aboutlink = _args.aboutlink ? _args.aboutlink : "https://cungbiet.com";
    player_params.controlLogo = _args.controlLogo ? _args.controlLogo : false;
    /*
    player_params.ga = {
        idstring: "title",
        trackingobject: "pageTracker"
    };
    */
    player_params.primary = _args.primary ? _args.primary : 'flash';
    _args.element = _args.element ? _args.element : 'cb-player';
    var _player = jwplayer(_args.element).setup(player_params).on('ready', function() {
        if(player_params.controlLogo){
            logo = _args.player_logo ? _args.player_logo : logo;
            var myLogo = document.createElement('div');
            myLogo.setAttribute('style', "color: red; width: 80px; height: 30px; background-image: url('" + logo + "');background-repeat: no-repeat;background-size: 100%;background-position: center;");
            myLogo.setAttribute('class', 'jw-icon jw-icon-inline jw-button-color jw-reset jw-icon-logo');
            myLogo.setAttribute('onclick', 'window.open("//phunuvietnam.vn", "_blank");');
            document.getElementById(_args.element).getElementsByClassName('jw-controlbar-right-group')[0].appendChild(myLogo);
        }
        var hidePowerjw = document.createElement('style');
        hidePowerjw.type = "text/css"; cssCode = '.jwplayer .jw-rightclick ul li:last-child{border-bottom: none;display: none;}';
        if (hidePowerjw.styleSheet) {
            hidePowerjw.styleSheet.cssText = cssCode;
        } else {
            hidePowerjw.appendChild(document.createTextNode(cssCode));
        }
        document.getElementsByTagName("head")[0].appendChild(hidePowerjw);
        if(scrollFixedView){
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(".jwplayer.fix-video{position:fixed;top:50px;left:10px;width:300px !important;z-index:10;border-radius:4px;}"));
            document.head.appendChild(style);

            var _element = jQuery('#'+_args.element),
                topVideo = _element.offset().top+_element.outerHeight();
            jQuery(document).scroll(function(e){
                var scrollTop = jQuery(document).scrollTop();    
                if(scrollTop > topVideo){
                    _element.addClass('fix-video');
                } else {
                    _element.removeClass('fix-video');
                }
            });
        }     
    });
    _player.on('playlistItem', function(){
        if (nextOnepage) {
            document.title = _player.getPlaylistItem().title;
            history.pushState({}, _player.getPlaylistItem().title, _player.getPlaylistItem().mediaid);
            //var i=0;
        }else{
            if(_player.getPlaylistItem().mediaid!=_args.mediaid){
                window.location=_player.getPlaylistItem().mediaid;
            }
        }
    });
    _player.on("error", function () {
        swal({
            title: "Ancok Error!",
            text: "Please wait, we are switching to another server!",
            timer: 3000
        })
    });
    _player.on("error", function () {
        jQuery('#'+_args.element).html("<div class=\"ancok-iframe\"> <iframe src=\""+_args.file+"\" width=\"100%\" height=\"100%\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" class=\"ancok-box\"></iframe></div>")
    });
    _player.on("adBlock", function () {
        //alert("Hello Users, please disable your ad blocker, thanks");
        _player.load({
            file: "https://dl.dropboxusercontent.com/s/f4y89embdxq56dg/adblock_Ancok.mp4",
            image: "https://dl.dropboxusercontent.com/s/z9fmp0xto0x5xym/adblock_Ancok.jpg",
            nextOnepage: 0
        })
    });
    if(scrollPlay){
        var _element = jQuery('#'+_args.element),
            topVideo = _element.offset().top+_element.outerHeight();
            bottomVideo = _element.offset().top-_element.outerHeight();
        jQuery(document).scroll(function(e){
            if(isScrolledIntoView(_element)){
                if(_player.getState() != 'playing')
                    _player.play(true);
            }
            else{
                if(_player.getState() == 'playing')
                    _player.pause(true);
            }
        });
    }
    
    
    
    /*console.log(player_params);
    if(!_args.isHover) {
        setTimeout(
            function(){
                jwplayer().play();
            }, 1500
        );
    }*/
}
/* function isScrolledIntoView(elem){
    var $elem = elem;
    var $window = jQuery(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
} */
function isScrolledIntoView(elem)
{
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}
function get_link_video(url) {
    if(url || url!=null){
        switch(videoType(url)) {
            case 'youtube':
                var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
                    videoId = url.match(regExp);
                if (videoId && videoId[1].length === 11) {
                    return 'https://youtu.be/'+videoId[1];
                }
                break;
            case 'vimeo':
                return null;
                break;
            case 'dailymotion':
                return null;
                break;
            default:
                return url;
        }
    }
}
function videoType($url) {
    if ($url.indexOf('youtube') >= 0 || $url.indexOf('youtu.be') >= 0) {
        return 'youtube';
    } else if ($url.indexOf('vimeo') >= 0) {
        return 'vimeo';
    } else if ($url.indexOf('dailymotion') >= 0 || $url.indexOf('dai.ly') >= 0) {
        return 'dailymotion';
    } else{
        return 'unknown';
    }
}
