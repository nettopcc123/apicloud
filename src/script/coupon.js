



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            count: 0,
            type: 0,
            page: 1,
            totalPage: 1,
            items: [],
            item_set:null,
            // item_set:{
            //     "discountId": "1019217545854586881",
            //     "discounts": {
            //         "amount": 0,
            //         "conditions": 1,
            //         "depositMethod": "网银支付,微信扫码,微信支付,支付宝扫码,支付宝支付,QQ扫码,QQ支付,京东支付,京东扫码,银联扫码,银联H5,快速入款,",
            //         "discountName": "新开户优惠券",
            //         "displayName": "50% 满20元可参加，25倍流水要求",
            //         "drawing": 25,
            //         "endTime": "2020-08-31 00:00:00",
            //         "minDeposit": 20,
            //         "startTime": "2018-08-08 12:00:00"
            //     },
            //     "useState": 0
            // }
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
                ys.ajax("api/my/listMyHomeDiscount", "get",{
                    state:that.type,
                    page:that.page,
                    limit: 20
                },function(data){
                    forList(data);
                });
            },
            yhqType:function (it) {
                if(it.useState==2){
                    return 'overdue'
                }else if(it.useState==1){
                    return 'used'
                }else if(it.discounts&&dateDiff(toDay,it.discounts.endTime)<3){
                    return 'expiring'
                }


            },
            toUse:function () {
                var that = this;
                toZj(0);
                $api.setStorage('yhqid',that.item_set.discountId);
                that.item_set = null;
            }
        }
    });

    vCont.type = api.pageParam.type;
    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();
};

// apiready();