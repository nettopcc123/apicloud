/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            banlance: $api.getStorage("listBanlance")?$api.getStorage("listBanlance"):null,
            banlance_center: 0,

            lastGame:null,



            topXnv:null,
            topXsw:0,
            topXsx:0,

            titArr:{
                live:'真人专区',
                electronic:'电子游戏',
                chess:'棋牌游戏',
                lottery:'彩票专区',
                fish:'捕鱼游戏',
                sports:'体育专区'
            },
            tsArr:[
                'live',
                'chess',
                'lottery',
                'electronic',
                'sports',
                'fish',
            ],

            hmObj1:$api.getStorage('hmObj1')?$api.getStorage('hmObj1'):null,
            hmObj2:$api.getStorage('hmObj2')?$api.getStorage('hmObj2'):null,
            topBanSwiper:null,
            topBanSwiper_unlock:true,

        },
        mounted: function() {
            // this.getData(0);
            // this.getData(9);
        },
        methods: {
            getData:function(t){
                var that = this;
                ys.ajax('api/home/getWapHome', 'get', {}, function (res, err) {
                    if(res.resCode==1) {
                        that.hmObj1= res.resObj;
                        $api.setStorage('hmObj1',res.resObj);

                    }

                });
                ys.ajax('api/home/getWapBanner', 'get', {}, function (res, err) {
                    if(res.resCode==1) {
                        that.hmObj2= res.resObj;
                        $api.setStorage('hmObj2',res.resObj);
                        that.swpInit();
                        if(t){
                            api.sendEvent({name:'home_xl'});
                        }
                    }

                });
                that.getUserInfo();
            },
            getUserInfo:function(){
                var that = this;
                if(that.user){
                    ys.ajax("api/my/listBanlance","get",{},function(res){
                        if(res.resCode==1){
                            that.banlance=res.resObj;
                            $api.setStorage("listBanlance",that.banlance);
                            that.myBan();

                        }
                    });
                    ys.ajax("api/home/getRecentGame","get",{},function(res){
                        if(res.resCode==1){
                            that.lastGame=res.resObj;
                        }
                    });
                }
            },

            myBan:function () {
                var that = this;
                if(that.banlance){
                    that.banlance.forEach(function (it) {
                        if (it.gameKey=='center'){
                            that.banlance_center=it.gameBanlance;
                        }
                    })
                }
            },
            stime:function(){
                var t = ['晚上','早上','上午','下午','晚上'];
                var x = new Date().getHours();
                return t[parseInt((x+4)/6)];

            },
            swpInit:function (i) {
                var that = this;
                setTimeout(function () {

                    clearInterval(that.topXnv);
                    var xa2 = $('.up_box').height();
                    that.topXsw = $('#topWins').height();
                    that.topXnv = setInterval(function () {
                        if(that.topXsx>=that.topXsw){
                            that.topXsx=(0-xa2)
                        }else {
                            that.topXsx += 1;
                        }
                        $('#topWins').css('transform','translate3d(0,'+(0-that.topXsx)+'px,0)');
                    },50);
                },300);



            },
            disDet:function(tp,url){
                if(tp==1){
                    if(/^http/.test(url)){
                        comHead('link',url,true)
                    }
                }else if(!isEmpty(url)) {
                    comHead('澳门金沙优惠活动','det_yh',{id:url},true)
                }
            },
            allMenu:function (t) {
                api.sendEvent({name:'home_menu',extra:this.tsArr.indexOf(t)});
            }
        }
    });

    vCont.getData();

    xiala(function () {
        $api.setStorage("ajax_refrash",1);
        vCont.getData(1);
    });

    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){

        vCont.user = $api.getStorage('mine')?$api.getStorage('mine'):null;
        $api.setStorage("ajax_refrash",1);
        vCont.getUserInfo();
    });

    //退出登录监听
    api.addEventListener({name:'send_logout'},function(ret,err){
        vCont.user = null;
    });

};

// apiready();





