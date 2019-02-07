/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user:$api.getStorage('mine')?$api.getStorage('mine'):null,
            my:null,
            items:[],
            page:1,
            limit:20,
            totalPage:0
        },
        mounted: function() {
            this.getData();
        },
        methods: {
            getData:function () {
                var that = this;
                ys.ajax('api/agent/recommendTotal', "get", {}, function (res) {
                    if (res.resCode == 1) {
                        that.my = res.resObj
                    }
                });
                ys.ajax('api/agent/recommendRecord', "get", {
                    page:that.page,
                    limit:that.limit
                }, function (data) {
                    forList(data);
                });
            },

        }
    });

    xiala(function () {
        myReload()
    },'#3f3830');
    getMore();


};
// apiready();

