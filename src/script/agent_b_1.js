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
            page: 1,
            totalPage: 0,
        },
        mounted: function() {

        },
        methods: {
            getData:function () {
                ys.ajax('api/agent/dboReport', "get", {
                    limit:20,
                    page:1,
                    beginTime: this.beginTime,
                    endTime: this.endTime,
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

    api.addEventListener({name:'set_nav_time'}, function (ret, err) {
        // ys.toast(ret.value);
        vCont.beginTime = ret.value.start;
        vCont.endTime = ret.value.end;
        myReload();
    });

};
// apiready();

