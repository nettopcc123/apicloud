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
                ys.ajax("api/home/getNews", "get",{
                    page:that.page,
                    limit: 20
                },function(data){
                    forList(data);
                });
            },
        }
    });
    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();


};


