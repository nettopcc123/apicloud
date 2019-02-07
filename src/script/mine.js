/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            banlance: $api.getStorage("listBanlance")?$api.getStorage("listBanlance"):null,
            integral: '--',
            myBan1:0,
            myBan2:0,
            items:[
                {
                    tit:'资金流转',
                    con:['存款','取款','转账']
                },
                {
                    tit:'交易记录',
                    con:['投注记录','优惠记录','资金记录']
                },
                {
                    tit:'其它',
                    con:['优惠券','高级代理人','帮助中心']
                }
            ],
            newMsg:0,

        },
        mounted: function() {
            // this.getData();
            this.myBan();
        },
        destroyed :function(){

        },
        methods: {
            getData:function(){
                var that = this;
                getMine(function (res) {
                    that.user=res
                });
                ys.ajax("api/my/getBalance", "get",{},function(data){
                    if(data.resCode==1){
                        that.integral = data.resObj.integral
                    }
                });
                ys.ajax("api/my/listBanlance","get",{},function(data){
                    if(data.resCode==1){
                        that.banlance=data.resObj;
                        that.banlance.sort(sortBy('gameBanlance',2));
                        $api.setStorage("listBanlance",that.banlance);
                        that.myBan();
                    }
                    ys.ajax('api/my/countNoReadMessage','get',{},function (data) {
                        if(data.resCode==1){
                            that.newMsg=parseInt(data.resObj.messageCount + data.resObj.problemCount)
                        }
                    });
                });
            },
            myBan:function () {
                var that = this;
                if(that.banlance){
                    that.myBan2=0;
                    that.banlance.forEach(function (it) {
                        that.myBan2+=it.gameBanlance;
                        if (it.gameKey=='center'){
                            that.myBan1=it.gameBanlance;
                        }
                    })
                }
            },
            menuTo:function (ind,imd) {
                var mr = ['优惠券','高级代理人','帮助中心'];
                var ur = ['coupon','agent','help_index'];
                var mx = ['投注记录','优惠记录','资金变更记录'];
                var ux = ['tz','yh','zj'];
                switch (ind){
                    case 0:
                        toZj(imd);
                        break;
                    case 1:
                        jlHead(imd);
                        break;
                    case 2:
                        switch (imd){
                            case 0:
                                toWin('coupon_head');
                                break;
                            case 1:
                                !this.user.isProxy||this.user.isProxy!=1?comHead('高级代理人','agent'):toAgent(1);
                                break;
                            case 2:
                                comHead('帮助中心','help_index');
                                break;
                        }
                        break;
                }
            },

        }
    });
    vCont.getData();
    api.addEventListener({name:'pay_end'}, function (ret, err) {
        $api.setStorage("ajax_refrash",1);
        vCont.getData();
    });

    //资金总览里强刷后，更新个人中心
    api.addEventListener({name:'pay_zjzl'}, function (ret, err) {
        vCont.banlance = $api.getStorage("listBanlance");
        vCont.myBan();
    });

    api.addEventListener({name:'send_login'},function (ret) {
        vCont.getData();
    });
    api.addEventListener({name:'msg_num'},function (ret) {
        vCont.getData();
    });

    getSelectMenu2();
    //清除记录下拉列表焦点缓存
    $api.rmStorage('zt_tz');
    $api.rmStorage('zt_zj');


    // xiala(function () {
    //     $api.setStorage("ajax_refrash",1);
    //     vCont.getData();
    // });
};
// apiready();