
/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {

    vCont = new Vue({
        el: '#app',
        data: {
            user:$api.getStorage('mine')?$api.getStorage('mine'):null,
            my:null,
            url:null,
            dbu:null
        },
        mounted: function () {
            this.getData();
        },
        methods: {
            getData:function () {
                var that = this;
                ys.ajax('api/my/checkAgent', "get", {}, function (res) {
                    if (res.resCode == 1) {
                        that.my = res.resObj
                    }
                });
                ys.ajax('api/agent/myPromotion', "get", {}, function (res) {
                    if (res.resCode == 1) {
                        that.dbu = res.resObj
                    }
                });
            }
        }
    });
    xiala(function () {
        vCont.getData()
    },'#0f0f12');
    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.getData()
    });

};
