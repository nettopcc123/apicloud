Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var qudao = null,netErrorNum=0;
// var qudao = 'KFHGD6';



//localStorage.clear();
(function(){
    var ysCommon = {
        url:$api.getStorage('url_now')?$api.getStorage('url_now'):
            {
                web:'https://77js.club/',
                ws:'wss://appsw.92yzl.com',
                api:'https://77jsuser.78ymx.com/',
                pay:'https://77jspay.97wwp.com/',
                img:'https://images.82eev.com/',
                kefu:'https://e-133432.chatnow.meiqia.com/dist/standalone.html',
                name:'金沙线路',
                test: false,
                id:1
            }
    };

    // 检查线路与更新的永久地址（jsonp文件在图片服务器上）
    ysCommon.xurl = 'https://images.slaxc.com/';

    // ysCommon.isPc = function(){
    //     // Pitt的Mac模拟环境
    //     return navigator.appVersion=="5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1" ? true:false
    // };


    //通用正则表达式
    ysCommon.regUrl = function (d) {
        return !isEmpty(d) && /^[http||https]+:\/\/+[a-zA-Z0-9||.||:||-]{0,30}\/$/.test(d)
    };
    ysCommon.regImg = function (d) {
        return !isEmpty(d) && /^http/.test(d);
    };
    ysCommon.regCnName = function (d) {
        return !isEmpty(d) && /^[\u0391-\uFFE5a-zA-Z·.。;&\\s]{2,30}$/.test(d);
    };
    ysCommon.regUname = function (d) {
        return !isEmpty(d) && /^[a-zA-Z0-9]{6,12}$/.test(d);
        // return !isEmpty(d) && /^[a-zA-Z]+[a-zA-Z0-9]{5,11}$/.test(d);
    };
    // 上面是他们的用户名验证，下面是我这注册用的验证，比他们的严格一些,但是登录处需要用上面的避免web端注册的用户无法登录
    ysCommon.regName = function (d) {
        return !isEmpty(d) && /^(?![0-9]+$)[0-9a-z]{6,12}$/.test(d);
    };
    ysCommon.regMobile = function (d) {
        return !isEmpty(d) && /^1[0-9]{10}$/.test(d);
    };
    ysCommon.regPass = function (d) {
        return !isEmpty(d) && /^[a-zA-Z0-9||#@*!$^&~%()`|=|+|_]{6,12}$/.test(d);
        // return !isEmpty(d) && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d||#@!$^&~`]{6,}$/.test(d);
    };
    ysCommon.regEmail = function (d) {
        return !isEmpty(d) && /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(d);
    };
    ysCommon.regCode = function (d) {
        return !isEmpty(d) && /^[\d]{4,6}$/.test(d);
    };
    ysCommon.regApwd = function (d) {
        return !isEmpty(d) && /^[\d]{6}$/.test(d);
    };
    ysCommon.regNumb = function (d) {
        return !isEmpty(d) && /^[0-9]+(.[0-9]{1,2})?$/.test(d);
    };
    ysCommon.regBank = function (d) {
        return !isEmpty(d) && /^[\d]{14,21}$/.test(d);
    };
    ysCommon.toast = function(msg,duration){
        if(msg=='ok'||msg=='OK'||msg=='Ok'){return false}
        if(typeof duration == "undefined"){
            duration = 3000;
        }

        if(location.href.indexOf('file')<0){
            console.log(msg);
        }

        api.toast({msg:msg,location: 'middle',global:true,duration:duration});
    };

    ysCommon.alert = function(msg){
        api.alert({msg:msg});
    };
    ysCommon.confirm = function(msg,call,call2,t1,t2){
        api.confirm({
            title: '提示',
            msg: msg,
            buttons: [t1?t1:'确定', t2?t2:'取消']
        }, function(ret, err) {
            if(ret.buttonIndex==1){
                call()
            }else if(call2){
                call2()
            };
        });
    };
    ysCommon.closeWin = function(name,to){
        if(to){
            api.closeToWin({name:name});
        }else{
            api.closeWin({name:name});
        }
    };
    ysCommon.animate = function (o,c) {
        var dx = $(o+':visible').length<1? true:false;
        if(dx){
            $(o).show()
        }
        $(o).addClass('animated').addClass(c);
        setTimeout(function() {
            $(o).removeClass(c).removeClass('animated');
            if(dx){
                $(o).hide();
            }
        }, 1200);
    };
    ysCommon.getAuth=function(){
        return $api.getStorage("token")?$api.getStorage("token"):false;
    };

    ysCommon.gameDet=function(a,c,b,j){
        // console.log('==进入游戏');
        if(ys.getAuth()||a==0){
            api.openWin({
                name:'game_det',
                url:'game_det.html',
                pageParam:{
                    actype:a,gameCode:c?c.toLocaleUpperCase():0,gameType:b,jumpOut:j?j:null
                },
                slidBackEnabled:true
            });
        }else {
            to_login()
            // ys.confirm('需要登录才能继续游戏',function () {
            // })
        }
    };

    /**
     * 公共请求方法 默认get请求
     * @param url
     * @param method
     * @param params
     * @param callBack
     * @param login
     * @returns {boolean}
     */
    ysCommon.loading = false;
    ysCommon.ajax = function(url, method, params, callBack,showloading) {
        if(ys.loading&&showloading){
            return false
        }
        ys.loading=true;
        if(showloading){
            $('body').addClass('loading');
        }
        $('.butterbar').addClass('active');
        var WGSW = $api.getStorage('url_now')?$api.getStorage('url_now').api:ys.url.api;
        if(url.indexOf("order/getOrderStatus") >-1 || url.indexOf("order/saveQuickOrder") >-1 || url.indexOf("order/generateOrder") >-1 || url.indexOf("order/cancelQuickOrder") >-1){
            WGSW = ys.url.pay;
        }

        // if(url.indexOf("user/regist") >-1){
        //     WGSW = 'http://192.168.50.250:8080/'
        // }

        $.ajax(WGSW+''+url,{
            headers: {
                Authorization: $api.getStorage("token")?$api.getStorage("token"):'',
                channel:1
            },
            type:  method,
            cache:  false,
            data:params,
            crossDomain:true,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            timeout: url.indexOf("api/my/listBanlance") >-1 || url.indexOf("api/game/transfer") >-1?120000:30000,
            beforeSend: function(request,urlObj) {
                //如果是资产强刷的查询接口,传refresh;其余接口不传;
                if($api.getStorage("ajax_refrash") && urlObj.url.indexOf("api/my/listBanlance") >-1){
                    request.setRequestHeader("refresh", 1);
                    $api.rmStorage("ajax_refrash");
                }else {
                    request.setRequestHeader("refresh", 0);
                }
            },
            success: function (data, textStatus, jqXHR) {
                ys.loading=false;
                // ys.toast(data);
                // console.log(jqXHR);

                // //不定时返回token 每个接口中都有可能返回;
                if(jqXHR.getResponseHeader('Authorization')){
                    // ys.toast('token已更新');
                    // ys.toast('注意==接口返回新token了！\n==================\n'+ jqXHR.getResponseHeader('Authorization'));
                    $api.setStorage('token',jqXHR.getResponseHeader('Authorization'));
                }

                //判断是否需要登陆
                if (data.resCode == 401 || data.resCode == -1003 || data.resCode == -1009 ) {
                    $api.rmStorage('token');
                    $api.rmStorage('mine');
                    to_login();
                    return;
                }else if(
                    data.resCode!=1 &&
                    data.resCode!=10008 &&
                    data.msg &&
                    data.msg !="" &&
                    url!='api/my/checkAgent' &&
                    url!='api/user/getUserPriza'
                ){
                    ys.toast(data.msg);
                }
                if(data.resCode!=1&&$('#btn_yzm').length>0&&$('#btn_yzm').text()=='正在发送'){
                    $('#btn_yzm').text('发送验证码').removeClass('wait');
                }


                if (typeof callBack === 'function') {
                    callBack(data);
                }
                setTimeout(function () {
                    $('.butterbar').removeClass('active');
                    $('body').removeClass('loading');
                    $('.data_null').removeClass('yc');
                    api.refreshHeaderLoadDone();
                },1000);
                netErrorNum = 0;
            },
            error: function (XMLHttpRequest, textStatus) {
                // ys.toast(XMLHttpRequest);
                ys.loading=false;
                setTimeout(function () {
                    $('.butterbar').removeClass('active');
                    $('body').removeClass('loading');
                    $('.data_null').removeClass('yc');
                    api.refreshHeaderLoadDone();
                },1000);
                if($('#btn_yzm').length>0&&$('#btn_yzm').text()=='正在发送'){
                    $('#btn_yzm').text('发送验证码').removeClass('wait');
                }
                //判断是否需要登陆
                switch (XMLHttpRequest.status){
                    case 401:
                        $api.rmStorage('token');
                        $api.rmStorage('mine');
                        to_login();
                        break;
                    case 500:
                    case 502:
                        ys.toast('ヽ(.◕ฺˇд ˇ◕ฺ;)ﾉ\n网络出现异常，\n如有疑问请咨询在线客服……');
                        // ys.confirm('当前线路看起来不是很顺畅',function () {
                        //     comHead('服务器线路','servers')
                        // },function () {
                        // },'切换线路','就这样先');
                        break;
                    default :
                        if(netErrorNum>5){
                            ys.toast('ヽ(.◕ฺˇд ˇ◕ฺ;)ﾉ\n网络好像有点故障，请刷新重试……');
                        }
                        netErrorNum += 1;
                        break;
                }

            }
        })


    };


    window.ys = window.ysCommon = ysCommon;
    window.ajaxRequest = ysCommon.ajax;
})();

function gameDet(i,t,e,j){

    if(i==9){
        ys.gameDet(0,t,e,j)
    }else if(ys.getAuth() || t=='PT' || i == 0){
        ys.gameDet(1,t,e,j)
    }else {
        ys.gameDet(0,t,e,j)
        // ys.confirm('此游戏支持免费试玩，请选择',function () {
        //     ys.gameDet(1,t,e,j)
        // },function () {
        // },'进入游戏','免费试玩')
    }

}

//给原生的Date添加一个方法，传递的参数是格式
Date.prototype.Format = function (fmt) { //author: meizz
    var obj = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var key in obj)
        if (new RegExp("(" + key + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[key]) : (("00" + obj[key]).substr(("" + obj[key]).length)));
    return fmt; //返回值是格式化好之后的时间
};

var toDay = dateFormat(new Date().getTime(),1);
/**
 * 日期相差天数
 * @param x 前一天
 * @param y 后一天
 */
function dateDiff(x,y) {
    var xc = new Date(x).getTime();
    var xd = new Date(y).getTime();
    var xs = (xd - xc)/86400000;
    return xs;
}
function ifToday(x) {
    return dateFormat(x,1) ==toDay ?true:false;
}
// console.log(dateDiff('2016-08-12','2016-08-30'));
//日期加减
function datePlus(dd,dadd){
    var a = new Date(dd).getTime();
    var b = a + (dadd * 24 * 60 * 60 * 1000);
    return (new Date(b)).Format("yyyy-MM-dd");
}
//格式化时间
function dateFormat(dd,type){
    if(isEmpty(dd)) return false;
    dd=dd.toString();
    // console.log(dd);
    // console.log(dd.indexOf('-'));
    if(dd.indexOf(':')<0&&dd.indexOf('-')<1) dd=parseInt(dd);
    if(type==1){
        return (new Date(dd).Format("yyyy-MM-dd"));
    }else {
        return (new Date(dd).Format("yyyy-MM-dd HH:mm:ss"));
    }
}
function dateFm(dd){
    if(isEmpty(dd)) return false;
    var d = parseInt((new Date(dd).getTime() - new Date().getTime())/1000);
    if(d<=0){
        return '已过期'
    }else {
        if(d<=60){
            return d+'秒'
        }else if(d<3600){
            return parseInt(d/60)+'分'+d%60+'秒'
        }else {
            return parseInt(d/3600)+'小时'+parseInt((d%3600)/60)+'分'+d%60+'秒'
        }
    }

}
//日期补0
function bu0(x) {
    return x<10?'0'+x:x;
}

//日期分割
function dateSplit(d,t) {
    if(!d){
        return false
    }else {
        d = /^(\d+)-(\d{1,2})-(\d{1,2})/.test(d)?d:dateFormat(d,1);
        return t==2? d.substring(11,16) : t==1? d.substring(5,10) : d.substring(0,7)
    }
}


//判断是否为空
function isEmpty(data) {
    if (isEmpty1(data) || isEmpty2(data)) {
        return true;
    }
    return false;
}

function isEmpty1(data) {
    if (data == 'undefined' || data == undefined || data == null || data == "" || data == 'NULL' || data == false || data == 'false') {
        return true;
    }
    return false;
}

function isEmpty2(v) {
    switch (typeof v) {
        case 'undefined' :
            return true;
        case 'string' :
            if ($api.trim(v).length == 0)
                return true;
            break;
        case 'boolean' :
            if (!v)
                return true;
            break;
        case 'number' :
            if (0 === v)
                return true;
            break;
        case 'object' :
            if (null === v)
                return true;
            if (undefined !== v.length && v.length == 0)
                return true;
            for (var k in v) {
                return false;
            }
            return true;
            break;
    }
    return false;
}


function to_login() {
    // ys.toast('需要登录');
    // comHead('用户登录','sign_in');
    api.openWin({
        name:'win_sign_in',
        url:'sign_in.html'
    });
    api.sendEvent({name:'send_logout'});
}



function to_register() {
    api.openWin({
        name:'win_sign_up',
        url:'sign_up.html',
        bgColor:'#333333'
    });
    // comHead('用户注册','sign_up')
}



function rUpload(t) {
    if(ys.regImg(t)){
        return t
    }else {
        return ys.url.img+t
    }
}

function rbg(url) {
    if (url) return 'background-image:url(' + rUpload(url) + ')';
}
function yhmsiuria(t) {
    t=t?t.toLocaleLowerCase().replace('_qr',''):'';
    if(t.indexOf('wx')>=0){
        t='wechat'
    }
    return t;
    // return 'background-image:url(../image/yh_' + t + '.png)';
}


function xiala(callback,t){
    api.setCustomRefreshHeaderInfo({
        bgColor: t?t:'#fffffe',
        image: {
            pull:[
                'widget://image/loop3.png'
            ],
            load: [
                'widget://image/jizai01.png',
                'widget://image/jizai02.png',
                'widget://image/jizai03.png',
                'widget://image/jizai04.png',
                'widget://image/jizai05.png',
                'widget://image/jizai06.png',
                'widget://image/jizai07.png',
                'widget://image/jizai08.png'
            ]
        }
    }, function(ret, err) {
        callback(ret,err);
        setTimeout(function () {
            api.refreshHeaderLoadDone();
        },5000)
        //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
    });

}


function getMore() {
    //滚动到底部
    api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0          //设置距离底部多少距离时触发，默认值为0，数字类型sdf
        }
    }, function (ret, err) {
        if(!ys.loading&&vCont.page<vCont.totalPage){
            vCont.page+=1;
            vCont.getData();
        }
        if(vCont.page>=vCont.totalPage&&vCont.items&&vCont.items.length>0){
            $('body').addClass('loaded');
            if($('body').height()<($(window).height()-100)){
                $('body').addClass('fix');
            }
        }
    });
}

function myReload() {
    vCont.page=1;
    vCont.totalPage=1;
    $('body').removeClass('loaded').removeClass('fix');
    vCont.getData();
}

function forList(data) {
    if(data.resCode==1){
        vCont.count = vCont.count?data.count:0;
        vCont.totalPage = data.totalPage?data.totalPage:0;
        if(vCont.page<2){
            vCont.items = data.resObj;
        }else {
            data.resObj.forEach(function (x) {
                vCont.items.push(x)
            })
        }
    }
}

//对象排序
var sortBy = function(name,type,minor){
    var x=-1,y=1;
    if(type==2) {x=1,y=-1};
    return function(o,p){
        var a,b;
        if(o && p && typeof o === 'object' && typeof p ==='object'){
            a = o[name];
            b = p[name];
            if(a === b){
                return typeof minor === 'function' ? minor(o,p):0;
            }
            if(typeof a === typeof b){
                return a <b ? x:y;
            }
            return typeof a < typeof b ? x:y;
        }else{
            console.log("Sort error");
        }
    }
};
function getUserPriza() {
    var un = $api.getStorage('mine')?$api.getStorage('mine').userName:'unxx';
    if(!$api.getStorage('priza')||$api.getStorage('priza')!=un){
        ys.ajax("api/user/getUserPriza", "get",{},function(data){
            if(data.resCode==1&&data.resObj.prizaState==0){
                toFrame('reward',data.resObj)
            }else {return false}
        });
    }
}

function toNews(obj,t) {
    var par = obj;
    par.tp=t?true:false;
    toFrame('news_det',par)
}

function toZj(i,p) {
    toWin('zj',{
        tab:i,
        gameCode:p?p:null
    });
}

function getMine(call) {
    ys.ajax("api/my/getMyInfoDetail", "get",{},function(data){
        if(data.resCode==1){
            $api.setStorage('mine',data.resObj);
            call(data.resObj);
        }
    });
}
function saveImg() {
    api.saveMediaToAlbum({
        path: 'fs://amyh'+new Date().getTime()+'.png'
    }, function(ret, err) {
        if (ret && ret.status) {
            alert('保存成功');
        } else {
            alert('保存失败');
        }
    });
}

function getSelectMenu1(){
    if(!$api.getStorage('gsmDate1') || dateDiff($api.getStorage('gsmDate1'),new Date().getTime())>2){
        ys.ajax("api/gameslot/getGamecCode", "get",{},function(data){
            var arr=[];
            if(data.resCode==1){
                data.resObj.forEach(function (x,ind) {
                    arr.push(
                        {
                            id:ind,
                            value:x
                        }
                    )
                });
                $api.setStorage('menu_dz',arr);
            }
        });
        ys.ajax("api/gamecodetype/getOfferType","get",{},function(data) {
            var arr=[];
            if(data.resCode==1){
                data.resObj.forEach(function (x) {
                    arr.push(
                        {
                            id:x.gameOfferTypeId,
                            value:x.gameOfferTypeName,
                        }
                    )
                });
                $api.setStorage('menu_yh',arr);
                $api.setStorage('gsmDate1',new Date().getTime());
            }
        });
    }
};
function getSelectMenu2(){
    if(!$api.getStorage('gsmDate2') || dateDiff($api.getStorage('gsmDate2'),new Date().getTime())>1){
        ys.ajax("api/my/listBetPlatForm","get",{},function(data) {
            var arr=[{id:0,value:'全部'}];
            if(data.resCode==1){
                data.resObj.forEach(function (x) {
                    arr.push(
                        {
                            id:x.gamePlatformKey,
                            value:x.gamePlatformName,
                        }
                    )
                });
                $api.setStorage('menu_tz',arr);
            }
        });
        ys.ajax("api/my/listAssetType", "get",{},function(data){
            if(data.resCode==1){
                $api.setStorage('menu_zj',data.resObj);
                $api.setStorage('gsmDate2',new Date().getTime());
            }
        });
    }
};

function rotateSr(t) {
    // ys.toast(api.safeArea.bottom);
    if(t==1){
        api.setScreenOrientation({
            orientation: 'landscape_left'
        });
        api.setFrameAttr({
            name:'game_det_x',
            rect: {
                x: api.safeArea.bottom,
                y: 0,
                marginRight: api.safeArea.bottom,
                marginBottom: 0
            }
        });
        vCont.screen=2;
    }else {
        api.setScreenOrientation({
            orientation: 'portrait_up'
        });
        api.setFrameAttr({
            name:'game_det_x',
            rect: {
                x: 0,
                y: headerH,
                marginRight: 0,
                marginBottom:api.safeArea.bottom
            }
        });
        api.sendEvent({name:'keyback'});
        api.closeFrame({name:'game_det_menu'});
    }
}

$(function () {
    setTimeout(function () {
        $('#app').addClass('msiuria');
        FastClick.attach(document.body);
    },120);
    setTimeout(function () {
        $('.data_null').removeClass('yc');
    },2000);
});

function sendMsgOk(){
    clearInterval(vCont.yzmdjs);
    $('#btn_yzm').text('验证码已发送');
    var tmtm = 60;
    vCont.yzmdjs = setInterval(function () {
        tmtm -= 1;
        if(tmtm>0){
            $('#btn_yzm').text(tmtm+'秒后可再次发送')
        }else {
            $('#btn_yzm').text('获取短信验证码').removeClass('wait');
            clearInterval(vCont.yzmdjs);
        }
    },1000)
};

function openLink(url,msg) {
    if(msg){
        ys.alert(msg);
    }
    api.openApp({
        androidPkg : 'android.intent.action.VIEW',
        mimeType : 'text/html',
        iosUrl : url,
        uri : url
    }, function(ret, err) {
        // var msg = JSON.stringify(ret);
        // api.alert({
        //     title : 'openApp',
        //     msg : msg,
        //     buttons : ['确定']
        // });
    });
}

function openLeftNav(t) {
    api.openFrame({
        name: 'left_nav',
        url: 'left_nav.html',
        bgColor:'rgba(0,0,0,0)',
        rect: {
            marginBottom:api.safeArea.bottom
        },
        pageParam: {
            id: t?t:null
        }
    });
}