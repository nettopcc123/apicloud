
/**
 * Created by pitt on 18/7/28.
 */


apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            screen:1,
            par:{
                actype: 1,
                gameCode: 'AG',
                gameType: '0',
                jumpOut: 2
            },
            gameBanlance: 0,
            reloadBanlance: null, //轮询定时器
            banlance: $api.getStorage("listBanlance")?$api.getStorage("listBanlance"):null,
            loading:false,
            otherLink:null
        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();
            // this.getBanlance();

        },
        destroyed :function(){

        },
        methods: {
            getData:function(){
                var that = this;
                // var par = that.par;
                // delete par['jumpOut'];
                ys.ajax("api/game/loginGame","post",{
                    actype: that.par.actype,
                    gameCode: that.par.gameCode,
                    gameType: that.par.gameType
                }, function (data) {
                    if (data.resCode==1) {
                        if (/^http/.test(data.resObj)) {
                            // ys.toast(ys.url.api);
                            // ys.toast(api.systemType+'-'+that.par.jumpOut);
                            if(
                                api.systemType=='android' && that.par.jumpOut && that.par.jumpOut.indexOf('2')>-1 ||
                                api.systemType=='ios' && that.par.jumpOut && that.par.jumpOut.indexOf('3')>-1
                            ){
                                that.otherLink = data.resObj;
                                openLink(data.resObj);

                            }else {

                                api.openFrame({
                                    name: 'game_det_x',
                                    url: data.resObj,
                                    rect: {
                                        x: 0,
                                        y: headerH,
                                        marginRight: 0,
                                        marginBottom:api.safeArea.bottom
                                    },
                                    bounces: false
                                });
                            }
                        } else {
                            ys.toast('游戏地址出错：'+data.resObj)
                        }
                    } else {
                        ys.alert(data.msg ? data.msg : '进入游戏失败，请返回重试')
                    }
                });
                if(that.par.actype==1){
                    that.stReload();
                }
            },
            getBanlance:function(tp){
                var that = this;
                if(that.loading){
                    setTimeout(function () {
                        that.loading=false;
                    },2000);
                    return false;
                }
                if(that.par.actype==1&&ys.getAuth()){
                    that.loading=true;
                    if(tp){
                        $api.setStorage("ajax_refrash",1);
                    }
                    ys.ajax("api/game/getBalance", "post",{
                        gameCode: that.par.gameCode
                    },function(data){
                        that.loading=false;
                        if(data.resCode==1){
                            that.gameBanlance=data.resObj.gameBanlance;
                        }
                    });
                }
            },
            transAcType:function () {
                var that = this;
                if(ys.getAuth()){
                    that.transReload();
                }else {
                    to_login();
                }
            },
            transReload:function(){
                var that = this;
                that.par.actype=1;
                api.closeFrame({name:'game_det_x'});
                that.getData();
                setTimeout(function () {
                    that.getBanlance(1);
                },3000);
            },
            gameReload:function () {
                $('.icon-loop').addClass('loops');
                api.closeFrame({name:'game_det_x'});
                this.getData();
                // api.openFrame({name:'game_det_x',reload:true});
                setTimeout(function () {
                    $('.icon-loop').removeClass('loops');
                },3000);
            },
            stReload:function () {
                var that = this;

                that.reloadBanlance = setInterval(function () {
                    // that.getBanlance();// 轮询不能取第三方接口，太频繁游戏会报错。
                    ys.ajax("api/my/listBanlance","get",{},function(data){
                        if(data.resCode==1){
                            that.banlance=data.resObj;
                            $api.setStorage("listBanlance",that.banlance);
                            that.setBanlance();
                        }
                    });

                },10000);

            },
            setBanlance:function () {
                var that = this;
                if(that.banlance){
                    var qianbao = that.par.gameCode;
                    if(qianbao=="LOTTERY"){
                        qianbao = 'LOTTO'
                    }
                    that.banlance.forEach(function (it) {
                        if(it.gameKey==qianbao){
                            that.gameBanlance=it.gameBanlance;
                        }
                    })
                }
            }
        },
        destroyed:function () {
            clearInterval(this.reloadBanlance);
        }
    });
    // ys.alert($api.getStorage("listBanlance"));

    // ys.alert(api.pageParam);

    vCont.par=api.pageParam;
    vCont.getData();
    vCont.setBanlance();

    if(vCont.par.gameCode=='DS' || vCont.par.gameCode=='LMG' || vCont.par.gameCode=='LOTTO' || vCont.par.gameCode=='LOTTERY'){
        setTimeout(function () {
            $('.icon-loop').removeClass('loops');
        },3000);
    }else {
        vCont.getBanlance();
    }



    api.addEventListener({name: 'keyback'}, function(ret, err) {
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
        vCont.screen=1;
        // ys.toast('旋转回来');
    });

    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.user = $api.getStorage('mine')?$api.getStorage('mine'):null;
        vCont.transReload();
    });
};
function tranSrc() {
    rotateSr(1);
    api.openFrame({
        name: 'game_det_menu',
        url: 'game_det_menu.html',
        rect: {
            x: 0,
            y: 0,
            w: headerH,
            h: headerH
        }
    });
}