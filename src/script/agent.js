/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            status:1,
            shuziA:null,
            shuziB:null,
            shuziC:null,
            news:null,
            menu:['推广代理佣金','直属会员佣金','团队佣金'],
            items:null,
            newsInterval:null,
            newsActive:0
        },
        mounted: function() {
            this.setVal();
            this.getData();
        },
        methods: {
            getData:function () {
                var that = this;
                ys.ajax('api/agent/agentRebateRanking', "get", {}, function (res) {
                    if (res.resCode == 1) {
                        that.items = res.resObj;
                        that.initNoticeAnimate();
                    }
                });
                ys.ajax('api/my/checkAgent', "get", {}, function (res) {
                    if (res.resCode == 0) {
                        that.status = 0
                    }
                });
            },
            setVal:function () {
                var qk=1111;
                var ts=parseInt((new Date().getTime()-new Date('2018-09-16').getTime())/(24*60*60*1000));
                var arrA=[133,61,75,71,49,104,96];
                var arrB=[65,93,44,54,99,57,80];
                var d = new Date().getDay();
                this.shuziB = 646 + arrB[d];
                this.shuziC = arrA[d];
                for(var i=0;i<ts;i++){
                    qk+=arrA[i%7]
                }
                this.shuziA=qk;
            },
            apply:function () {
                var that = this;
                ys.ajax('api/my/saveAgent',"post",{
                },function(data){
                    if(data.resCode==1){
                        that.status = 1;
                        api.sendEvent({name:'send_login'});
                    }
                    if(data.msg){
                        ys.toast(data.msg)
                    }
                });
            },
            initNoticeAnimate:function(){
                var that = this;
                clearInterval(that.newsInterval);
                var air = parseInt(that.items.length/2);
                if(air<2){
                    return false
                }
                that.newsInterval = setInterval( function() {
                    that.newsActive = that.newsActive+1 < air ? that.newsActive + 1 : 1;
                    $('#topNews').css('transform','translateY(-'+that.newsActive*0.56+'rem)');
                },3500);
            },
        }
    });

    xiala(function () {
        vCont.getData()
    },'#a79f96')

};


// apiready();