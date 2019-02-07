/**
 * Created by pitt on 16/9/28.
 */


function urlCallback(k) {
    if(k.type){
        if(qudao){
            if(!k.qudao || k.qudao[qudao]){
                return false
            }
            var x = k.qudao[qudao];
            if(x&&api.appVersion!=x.version){
                ys.confirm('主人，澳门金沙app更新版本啦，点击更新有惊喜哟！',function () {
                    comHead('版本更新','update')
                });
            }
        }else if(api.appVersion!=k.version){
            ys.confirm('主人，澳门金沙app更新版本啦，点击更新有惊喜哟！',function () {
                comHead('版本更新','update')
            });
        }
    }else if($api.getStorage('url_all') && k && k.toString() != $api.getStorage('url_all').toString()){
        $api.setStorage('url_all',k);
        $api.setStorage('url_now',k[0]);
    }
}

function ejlw(s,q){
    ys.ajax('api/home/saveDevice','post',{
        deviceNo: s,
        deviceName: api.systemType,
        channel:q
    },function (res) {
        if(res.resCode !=1 ){
            ejlw(s,q);
        }else {
            $api.setStorage('ejlw025',s);
        }
    })
}

apiready = function () {
    if(!$api.getStorage('ejlw025')){
        var sbh = parseInt(api.deviceId,16).toString(36).toLocaleUpperCase();
        // alert(sbh);
        ejlw(sbh,qudao?qudao:'88yh');
    }
    vCont = new Vue({
        el: '#app',
        data:{
            groupInit:false,
            setTab1:0,
            setTab2:0,
            searkey:[null,null,null,null,null,null,null],
            islogin: ys.getAuth()?true:false,
            menu_1:[
                {n:'首页',i:'home'},
                {n:'优惠',i:'class'},
                {n:'注册',i:'help1'},
                {n:'品牌',i:'brand'},
                {n:'登录',i:'user-b'}
            ],
            menu_2:[
                {n:'首页',i:'home'},
                {n:'优惠',i:'class'},
                {n:'存取款',i:'deposit'},
                {n:'品牌',i:'brand'},
                {n:'我的',i:'user-b'}
            ],
            menu:[
                '真人娱乐',
                '棋牌游戏',
                '彩票游戏',
                '电子游戏',
                '体育专区',
                '捕鱼游戏',
                '优惠活动',
                '澳门金沙酒店',
                '帮助中心',
                '在线客服',
                '个人中心'
            ],
            newMsg:0
        },
        computed:{

        },
        components:{
        },
        methods: {
            togNav:function (i) {
                var that = this;
                switch (i){
                    case 0:
                        that.setTab1=i;
                        api.setFrameAttr({
                            name: 'mine',
                            hidden: true
                        });
                        api.setFrameGroupAttr({
                            name: 'sort',
                            hidden: true
                        });
                        api.openFrame({
                            name: 'home',
                            url: 'home.html',
                            rect: {
                                x: 0,
                                y: headerH*5,
                                h: api.winHeight - headerH*5 - footerH
                            }
                        });
                        api.openFrame({
                            name: 'home_top',
                            url: 'home_top.html',
                            rect: {
                                x: 0,
                                y: headerH,
                                h: headerH*4
                            },
                            bounces:false
                        });
                        break;
                    case 1:
                        that.setTab1=i;
                        that.openGroup(6);
                        break;
                    case 2:
                        if(that.islogin){
                            toZj(0);
                        }else {
                            to_register();
                        }
                        break;
                    case 3:
                        that.setTab1=i;
                        that.openGroup(7);
                        break;
                    case 4:
                        if(that.islogin){
                            that.setTab1=i;
                            api.setFrameAttr({
                                name: 'home',
                                hidden: true
                            });
                            api.setFrameAttr({
                                name: 'home_top',
                                hidden: true
                            });
                            api.setFrameGroupAttr({
                                name: 'sort',
                                hidden: true
                            });
                            api.openFrame({
                                name: 'mine',
                                url: 'mine.html',
                                rect: {
                                    x: 0,
                                    y: 0,
                                    h: api.winHeight - footerH
                                },
                                bounces: false
                            });
                            api.sendEvent({name:'pay_end'});
                        }else {
                            to_login();
                        }
                        break;
                }
            },
            openGroup:function(i){
                var that = this;

                api.setFrameAttr({
                    name: 'home',
                    hidden: true
                });
                api.setFrameAttr({
                    name: 'home_top',
                    hidden: true
                });
                api.setFrameAttr({
                    name: 'mine',
                    hidden: true
                });

                if(this.groupInit){
                    api.setFrameGroupAttr({name:'sort',hidden:false});
                    api.setFrameGroupIndex({name:'sort',index:i});
                }else {
                    api.openFrameGroup({
                        name: 'sort',
                        rect: {
                            x: 0,
                            y: headerH,
                            h: api.winHeight - headerH - footerH
                        },
                        index:i,
                        frames: [
                            {
                                name: 'fl_zr',
                                url: 'fl_zr.html',
                                bounces:true
                            }, {
                                name: 'fl_qp',
                                url: 'fl_qp.html',
                                bounces:true
                            }, {
                                name: 'fl_cp',
                                url: 'fl_cp.html',
                                bounces:true
                            }, {
                                name: 'fl_dz',
                                url: 'fl_dz.html',
                                bounces:true
                            }, {
                                name: 'fl_ty',
                                url: 'fl_ty.html',
                                bounces:true
                            }, {
                                name: 'fl_by',
                                url: 'fl_by.html',
                                bounces:true
                            }, {
                                name: 'fl_yh',
                                url: 'fl_yh.html',
                                bounces:true
                            }, {
                                name: 'fl_brand',
                                url: ys.url.web+'brand/p/',
                                bounces:true
                            }, {
                                name: 'fl_help',
                                url: 'help_index.html',
                                bounces:true
                            }, {
                                name: 'fl_kefu',
                                url: 'kefu.html',
                                bounces:true
                            }
                        ]
                    }, function(ret, err) {
                        vCont.setTab2 = ret.index;
                        vCont.setTab1 = ret.index==6?1:ret.index==7?3:9;

                    });
                    that.groupInit = true;
                }

            },
            getMsg:function () {
                var that=this;
                if(that.islogin){
                    ys.ajax('api/my/countNoReadMessage','get',{},function (data) {
                        if(data.resCode==1){
                            that.newMsg=parseInt(data.resObj.messageCount + data.resObj.problemCount)
                        }
                    })
                }
            }
        },
        mounted: function() {

        },
        destroyed :function(){

        },
        updated :function(){
        }
    });


    api.setScreenOrientation({
        orientation: 'portrait_up'
    });

    $api.fixTabBar($api.byId('footer'));

    if(!$api.getStorage('winHeight1')){
        winH = api.winHeight;
        headerH = $('#set_h_header').height();
        footerH = $('#set_h_footer').height() + api.safeArea.bottom;
        navW = $('#set_h_footer').height()*1.3;
        $api.setStorage('winHeight',{
            winH:winH,
            headerH:headerH,
            footerH:footerH,
            navW:navW
        });
    }


    api.setStatusBarStyle({style: 'light'});



    api.openFrame({
        name: 'home',
        url: 'home.html',
        rect: {
            x: 0,
            y: headerH*5,
            h: api.winHeight - headerH*5 - footerH
        }
    });
    setTimeout(function () {
        api.openFrame({
            name: 'home_top',
            url: 'home_top.html',
            rect: {
                x: 0,
                y: headerH,
                h: headerH*4
            },
            bounces:false
        });

    },1000);


    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.islogin=true;
        WGSW.emit('authorization',{token:$api.getStorage('token')});
        getUserPriza();
    });
    if(vCont.islogin){
        setTimeout(function () {
            getUserPriza();
        },3000)
    }

    //退出登录监听
    api.addEventListener({name:'send_logout'},function(ret,err){
        vCont.islogin=false;
        if(vCont.setTab1==4){
            vCont.togNav(0);//返回首页
        }
        $api.rmStorage("token");
        $api.rmStorage("mine");
        if(ret.value.zd){
            WGSW.emit('logout');
        }
        if(ret.value.login==1){
            setTimeout(function () {
                to_login()
            },350)
        }
    });

    api.addEventListener({name:'home_menu'}, function (ret, err) {
        // ys.toast(vCont.setTab1);
        // ys.toast(ret.value);
        // vCont.setTab1=ret.value==6?1:1;
        vCont.setTab1 = ret.value==7?3:1;
        // vCont.setTab2=ret.value;
        if(ret.value==20) {
            vCont.togNav(0);
        }else if(ret.value==10){
            vCont.togNav(4);
        }else {
            vCont.openGroup(ret.value);
        }
    });
    api.addEventListener({name:'pay_end'}, function (ret, err) {
        vCont.getMsg()
    });
    vCont.getMsg();


    getSelectMenu1();
    //清除电子+优惠下拉列表焦点缓存
    $api.rmStorage('zt_dz');
    $api.rmStorage('zt_yh');
    setTimeout(function () {
        $.ajax(ys.xurl+'app/api/js_online.js?v'+new Date().getTime(),{
            type:  'get',
            cache:  false,
            crossDomain:true,
            dataType: 'jsonp',
            contentType: "application/x-www-form-urlencoded"
        });
    },2000);



    $.ajax(ys.xurl+'app/api/js_'+api.systemType+'.js?v'+new Date().getTime(),{
        type:  'get',
        cache:  false,
        crossDomain:true,
        dataType: 'jsonp',
        contentType: "application/x-www-form-urlencoded"
    });

    api.addEventListener({
        name:'smartupdatefinish'
    }, function(ret, err){
        // ys.toast(ret.value);
        ys.confirm(ret.value[0]&&ret.value[0].extra?ret.value[0].extra:'APP已更新，需要立即重启吗？',function () {
            api.rebootApp();
        },function () {
            ys.toast('祝您使用愉快')
        },'立即重启','稍候再说')
    });

};

// apiready();


function toSear(){
    api.sendEvent({name:vCont.setTab2==3?"sear_evt_dz":"sear_evt_yh",extra:{
            key:1,
            val:vCont.searkey[vCont.setTab2]
        }
    });
}
function clearSear(){
    $('input').val('');
    vCont.searkey[vCont.setTab2] = null;
    api.sendEvent({name:vCont.setTab2==3?"sear_evt_dz":"sear_evt_yh",extra:{
            key:3
        }
    });
    $api.rmStorage(vCont.setTab2==3?'zt_dz':'zt_yh');
}

function toSelect(d){
    if(d){
        api.openFrame({
            name: 'select',
            url: 'select.html',
            rect: {
                x: 0,
                y: 0
            },
            pageParam:{t:d},
            bounces: false
        })
    }
}


var WGSW = io.connect(ys.url.ws),KICKUSER_STA = false;
WGSW.on('connect',function(){
    //连接成功
    // ys.toast("WS连接成功..imm ...");
    WGSW.emit('authorization',{token:$api.getStorage('token')});
    // WGSW.on('message',function(data){
    //     ys.toast("收到message消息。。。");
    //     ys.toast(data);
    // });
    // WGSW.on('emit',function(data){
    //     ys.toast("收到emit消息。。。");
    //     ys.toast(data);
    // });
    // WGSW.on('hello',function(data){
    //     ys.toast("收到hello消息。。。");
    //     ys.toast(data);
    // });
    WGSW.on('KICKUSER',function(data){
        if(!KICKUSER_STA){
            KICKUSER_STA = true;
            ys.confirm(data.content,function () {
                to_login();
            });
            setTimeout(function () {
                KICKUSER_STA = false
            },3e5)
        }
        api.sendEvent({name:'send_logout'});
    });
    WGSW.on('TOKENUPDATE',function(data){
        // ys.toast("收到TOKENUPDATE消息。。。");
        // ys.toast(data);
        $api.setStorage('token',data.content)
    });
    WGSW.on('CAPITALIN',function(data){
        // ys.toast("收到CAPITALIN消息。。。");
        // ys.toast(data);
        if(data.content){
            ys.toast(data.content);
        }
    });
});
WGSW.on('disconnect',function(data){
    // ys.toast("WS连接断开..imm.");
});