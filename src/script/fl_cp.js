/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            tabSet1: 0,
            tabSet2: 0,
            gifA: 0,
            gifT: null,
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
                ys.ajax("api/gamecodetype/getTicketAndSportsList", "post",{
                    gameType:2,
                    page:that.page
                },function(data){
                    forList(data)
                });
            },
        }
    });

    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();

    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.user = $api.getStorage('mine')?$api.getStorage('mine'):null;
    });

    //退出登录监听
    api.addEventListener({name:'send_logout'},function(ret,err){
        vCont.user = null;
    });
};


