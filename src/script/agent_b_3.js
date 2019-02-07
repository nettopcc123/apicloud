
/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user:$api.getStorage('mine')?$api.getStorage('mine'):null,
            items:[],
            beginTime: datePlus(toDay,-2),
            endTime: toDay,
            limit:20,
            page: 1,
            totalPage: 0,
            staName:{
                PROCESSING:"待风控审核",
                AUDITED:"待入账",
                SUCCESS:"已入账",
                 CANCEL:"入账无效",
                FAIL:"审核不通过"
            }
        },
        mounted: function() {

        },
        methods: {
            getData:function () {
                var that = this;
                ys.ajax('api/agent/weekReport', "get", {
                    page:that.page,
                    limit:that.limit
                }, function (data) {
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
// apiready();

