/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            count: 0,
            page: 1,
            totalPage: 1,
            gameCode: null,
            kickback: null,
            statement: null,
            betTime: datePlus(toDay,-2) + ' 00:00:00 - ' + toDay + ' 23:59:59',
            items: [],
            showItem:null,
            betCount:null
        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            getData:function(){
                var that = this;
                var par = {
                    betTime: that.betTime,
                    page:that.page,
                    limit: 20
                };
                if(that.gameCode){
                    par.gameCode = that.gameCode
                }
                if(that.kickback){
                    par.kickback = that.kickback
                }
                if(that.statement){
                    par.statement = that.statement
                }
                ys.ajax("api/my/listMyBetInfo", "get",par,function(data){
                    forList(data);
                });
                ys.ajax("api/my/countMyBet", "get",par,function(data){
                    if(data.resCode==1){
                        // that.betCount = data.resObj;
                        api.sendEvent({name:'tz_zj',extra:data.resObj});
                    }
                });
            }
        }
    });

    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();
    api.addEventListener({name:'sear_evt_tz'}, function (ret, err) {
        // ys.toast(ret.value);
        vCont.gameCode=ret.value.a==0?null:ret.value.a;
        vCont.kickback=ret.value.b==999?null:ret.value.b;
        vCont.statement=ret.value.c==999?null:ret.value.c;
        myReload();
    });
    api.addEventListener({name:'set_nav_time'}, function (ret, err) {
        vCont.betTime = ret.value.time;
        myReload();
    });
};


