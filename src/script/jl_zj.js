/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {


    vCont = new Vue({
        el: '#app',
        data:{
            count: 0,
            page: 1,
            totalPage: 0,
            assetCode: null,
            assetStateCode: null,
            capitalTime: datePlus(toDay,-2) + ' 00:00:00 - ' + toDay + ' 23:59:59',
            items: [],
            showItemDet:null,
            cancelBtnSta:false,
            showItemSta:false
        },
        mounted: function() {
            this.getData();
        },
        methods: {
            getData:function(){
                var that = this;
                var par = {
                    capitalTime: that.capitalTime,
                    limit: 20,
                    page:that.page
                };
                if(that.assetCode){
                    par.assetCode = that.assetCode
                }
                if(that.assetStateCode){
                    par.assetStateCode = that.assetStateCode
                }
                ys.ajax("api/my/listMyCapital", "get",par,function(data){

                    forList(data);
                });
            },
            cancelOrder:function (it) {
                var that= this;
                // 防止同时触发详情弹出
                that.cancelBtnSta = true;
                setTimeout(function(){
                    that.cancelBtnSta = false;
                },300);
                ys.confirm('确定取消该订单吗？',function () {
                    var url = it.recordName.indexOf('快速入款')>-1?'order/cancelQuickOrder':'api/my/cancelOrder';

                    ys.ajax(url, "post",{
                        orderNo: it.billNo
                    },function(data){
                        if(data.resCode==1){
                            setTimeout(function () {
                                myReload();
                            },1000);
                            ys.toast('取消订单成功，正在刷新列表');
                        }
                    },1);
                });

            },
            toDet:function(it){
                if(!this.cancelBtnSta){
                    this.showItemSta = true;
                    this.showItemDet = it;
                    var cp_orderNo = new ClipboardJS('#ddh_cp');
                    cp_orderNo.on('success', function(e) {
                        // console.log(e);
                        ys.toast('已复制：'+e.text);
                    });
                }
            },
        }
    });


    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();
    api.addEventListener({name:'sear_evt_zj'}, function (ret, err) {
        // ys.toast(ret.value);
        var vx = $api.getStorage('menu_zj');
        vCont.assetCode=ret.value.a==999?null:vx[ret.value.a].assetCode;
        vCont.assetStateCode=ret.value.b==999?null:ret.value.b;
        myReload();
    });
    api.addEventListener({name:'set_nav_time'}, function (ret, err) {
        vCont.capitalTime = ret.value.time;
        // ys.toast(ret.value.time);
        myReload();
    });
};


// apiready();
