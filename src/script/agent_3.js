
/**
 * Created by pitt on 18/7/28.
 */





vCont = new Vue({
    el: '#app',
    data: {
        user:$api.getStorage('mine')?$api.getStorage('mine'):null,
        menu:['客户报表','运营报表','推广报表','周结单']

    },
    mounted: function () {

    },
    methods: {
        getData:function () {
            var that = this;
            ys.ajax('api/my/checkAgent', "get", {}, function (res) {
                if (res.resCode == 1) {
                    that.my = res.resObj
                }
            });
        },
        toAgentChart:function (i) {
            i==0?toAgent(2):toWin('agent_head_b',{t:i})
        }
    }
});

apiready = function () {

    xiala(function () {
        vCont.getData()
    },'#3f3830')

};


