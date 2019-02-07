/**
 * Created by pitt on 18/7/28.
 */


apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            topBanner: [],
            labArr: ['','','','热门','最新',''],
            titleArr: ['全部游戏','热门游戏','奖金池游戏','最新游戏','我的收藏'],
            titleSet: 0,
            gameTypeName: '',
            gamePlatfromType: null,
            category: null,
            favArr:[],
            count: 0,
            page: 1,
            totalPage: 1,
            items: []

        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();
        },
        destroyed :function(){

        },
        methods: {
            getData:function(){
                var that = this;
                if(that.page>that.totalPage){
                    // ys.toast('没有更多了');
                    return false
                }

                var par={
                    limit: 40,
                    page: that.page
                };
                if(that.gameTypeName){
                    par.gameTypeName = that.gameTypeName
                };
                if(that.gamePlatfromType){
                    par.gamePlatfromType = that.gamePlatfromType
                };
                if(that.category){
                    par.category = that.category
                };
                switch (Number(that.titleSet)){
                    case 1:
                        par.gameLable=3;
                        break;
                    case 2:
                        par.jackpot = 1;
                        break;
                    case 3:
                        par.gameLable=4;
                        break;
                    case 4:
                        par.isMyCollection=true;
                        if(!ys.getAuth()){
                            to_login();
                            return false
                        }
                        break;
                }
                ys.ajax("api/gameslot/getAllGameSlot", "post",par,function(data){
                    // ys.toast(par);
                    forList(data);
                });
            },
            setFav:function (ind,t,c,n) {
                //  收藏
                if(!ys.getAuth()){
                    to_login();
                    return false
                }
                var that = this;
                ys.ajax("api/gameslot/addCollection", "post",{
                    platfromType:t,
                    gameCode:c
                },function(data){
                    if(data.resCode==1){
                        if(n){
                            that.items[ind].collection=false;
                            ys.animate('#heart'+ind,'zoomOutDown');
                        }else {
                            that.items[ind].collection=true;
                            ys.animate('#heart'+ind,'zoomIn');
                        }
                    }
                });
            }
        }
    });


    vCont.getData();
    xiala(function () {
        myReload()
    });

    api.addEventListener({name:'sear_evt_dz'}, function (ret, err) {
        // ys.toast(ret.value);
        if(ret.value.key==1){
            vCont.gameTypeName = ret.value.val;
        }else if(ret.value.key==2) {
            vCont.titleSet = ret.value.titleSet;
            vCont.gamePlatfromType = ret.value.gamePlatfromType=='全部'?null:ret.value.gamePlatfromType;
            vCont.category = ret.value.category;
        }else {
            vCont.gameTypeName = null;
            vCont.titleSet = 0;
            vCont.gamePlatfromType = null;
            vCont.category = 0;
        }
        myReload();
    });
    getMore();
    getSelectMenu1();


    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.user = $api.getStorage('mine')?$api.getStorage('mine'):null;
    });

    //退出登录监听
    api.addEventListener({name:'send_logout'},function(ret,err){
        vCont.user = null;
    });
};


