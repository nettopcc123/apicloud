//控制页面字体
if(window.localStorage.expSizee) {
    $('html').css('font-size', window.localStorage.expSize);
    //console.log(window.localStorage.expSize);
}
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc    = function () {
            var clientWidth = docEl.clientWidth;
            if (clientWidth>=750) {
                clientWidth = 750;
            };
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            window.localStorage.expSize = docEl.style.fontSize
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//统一窗口尺寸变量,在登录后 赋值(66,129,80,280|54,127,94,329)
var winH,headerH,footerH,navW;
if($api.getStorage('winHeight')){
    var s= $api.getStorage('winHeight');
    winH = s.winH;
    headerH = s.headerH;
    navW = s.headerH*1.4;
    footerH = s.footerH;
    // $('html').addClass(s.type)
}



//打开共通head页面
function comHead(tit,page,par,boun){
    var param={};
    param.tit=tit;
    param.page=page;
    param.data=par;
    param.bounces=boun;

    api.openWin({
        name: 'win_'+page,
        url: 'com_head.html',
        pageParam:param,
        bgColor: page=='sign_pass'?'#333333':'rgba(0,0,0,0)',
        slidBackEnabled:true
    });
}
//打开记录共通head页面
function jlHead(t){
    api.openWin({
        name: 'win_jl_'+t,
        url: 'jl_head.html',
        pageParam:{t:t},
        slidBackEnabled:true
    });
}


/**
 * 富文本链接处理
 */
function linkInit(){
    setTimeout(function(){
        $('a').each(function(){
            var link = $(this).attr('href'),title=$(this).attr('title');
            if(isEmpty(title)) title ='外部链接';
            if(isURL(link)){
                $(this).attr('onclick','comHead("'+title+'","'+link+'",{link:true})');
            }
            $(this).removeAttr('href');
        })
    },300)
}

function isURL(str){
    var checkfiles=new RegExp("((^http)|(^https)|(^ftp)):\/\/(\\w)+\.(\\w)+");
    if(checkfiles.test(str)){
        console.log("是链接");
        return true
    }else{
        console.log("不是链接");
        return false
    }
}

/**
 * 打开页面
 * @param page 要打开的页面
 * @param prm 参数
 * @param isBack 是否可以返回,默认可以返回
 * @returns {boolean}
 */
function toWin(page,prm,isBoun,isBack){

    if (isEmpty(page)) {
        api.alert({msg: 'No page!'});
        return false;
    } else {
        if(typeof isBack == "undefined"){
            isBack = true;
        }
        api.openWin({
            name: page,
            url: page+'.html',
            slidBackEnabled:isBack,
            bounces:isBoun,
            pageParam: prm
            //,animation:{
            //    type:"ripple"
            //    //duration:800
            //}
        });
    }
}

function toAgent(t){
    api.openWin({
        name: 'com_agent'+t,
        url: 'agent_head.html',
        pageParam: {t:t}
    });
}

/**
 * 打开页面
 * @param page 要打开的页面
 * @param prm 参数
 * @param isBack 是否可以返回,默认可以返回
 * @returns {boolean}
 */
function toFrame(page,prm){
    api.openFrame({
        name: page,
        url: page+'.html',
        rect: {
            x: 0,
            y: 0
        },
        pageParam: prm,
        bounces: false
    });
}


//要命字符检测
function fuckWord(t) {
    return unescape(escape(t).replace(/%u2028/g,'').replace(/%u2029/g,'')).replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/\"/g,'&quot;').replace(/\'/g,'&#39;')
}
function unfuckWord(t) {
    return t.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
}

function editClan(i) {
    toWin('edit_clan_head',{id:i?i:false})
}
