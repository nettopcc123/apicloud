


apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            titSet:0,
            title:['未使用','已使用','已过期'],
            num:[null,null,null],
        },
        methods: {
            getData:function(){
                var that = this;
                // ys.ajax('api/my/countNoReadMessage','get',{},function (data) {
                //     if(data.resCode==1){
                //         that.num[1]=data.resObj.messageCount;
                //         that.num[2]=data.resObj.problemCount;
                //     }
                // })
            },
            togNav:function (i) {
                this.titSet=i;
                api.setFrameGroupIndex({
                    name: 'couponGroup',
                    index: i
                });
            },
        },
        mounted: function() {
        }
    });

    vCont.getData();
    api.openFrameGroup({
        name: 'couponGroup',
        scrollEnabled: true,
        rect: {
            x: 0,
            y: headerH*1.8
        },
        preload: 0,
        index: 0,
        frames: [{
            "name": "coupon1",
            "url": "coupon.html",
            "bounces": true,
            pageParam: {type:0}
        },{
            "name": "coupon2",
            "url": "coupon.html",
            "bounces": true,
            pageParam: {type:1}
        },{
            "name": "coupon3",
            "url": "coupon.html",
            "bounces": true,
            pageParam: {type:2}
        }]
    }, function (ret, err) {
        vCont.titSet = ret.index;
    });

    api.addEventListener({name:'msg_num'},function (ret) {
        vCont.getData()
    });

};