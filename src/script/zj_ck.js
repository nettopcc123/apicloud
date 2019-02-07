
/**
 * Created by pitt on 18/7/28.
 */

var qrcode=null;
var suim=null;
function qrImg(url) {
    if(qrcode){qrcode.clear()};
    $('#qrcode2').html('').fadeIn();
    setTimeout(function () {
        qrcode = new QRCode(document.getElementById("qrcode2"), {
            width : 300,
            height : 300
        });
        qrcode.makeCode(url);
    },300);
    // ys.toast('需要将付款二维授权允许。');
    var FNScanner = api.require('FNScanner');
    FNScanner.encodeImg({
        content: url,
        saveToAlbum: true,
        // saveImg: {
        //     path: 'fs://yh88zfm.png',
        //     w: 200,
        //     h: 200
        // }
    }, function(ret, err) {

        // ys.toast('需要将付款二维授rretr权允许。');
        if (ret.status) {
            // $('#qrcode').attr('src',ret.albumPath).fadeIn();
            // alert(JSON.stringify(ret));
        } else {
            // ys.toast('需要将付款二维r许。');

            // alert(JSON.stringify(err));
            ys.toast('需要将付款二维码保存到您的相册，请授权允许。');
        }

    });
}




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            gameCode:null,
            step:0,
            mrje:[100,300,500,1000,3000,5000],
            orderAmount:null,
            orderName:$api.getStorage('mine')&&$api.getStorage('mine').userRealName?$api.getStorage('mine').userRealName:null,
            payTypeList:$api.getStorage('payTypeList')?$api.getStorage('payTypeList'):null,
            payInfoList:$api.getStorage('payInfoList')?$api.getStorage('payInfoList'):null,
            tab1:0,
            tab2:0,
            tab3:999,
            tab4:999,
            activityList: null,
            couponList: null,
            res_quick:null,
            // res_quick:{
            //     currentTime: '2018-10-05 12:34:34',
            //     orderNo: '3454352364364364',
            //     failTime: '2018-10-09 19:44:34',
            //     accountBank: '银行',
            //     account: '62003454534545444',
            //     accountName: '开户名',
            //     accountAddr: '开户地址',
            //     orderDesc: '附言'
            // },
            res_quick_arr:{
                currentTime: '下单时间',
                orderNo: '订单编号',
                failTime: '订单失效时间',
                accountBank: '银行',
                account: '账号',
                accountName: '开户名',
                accountAddr: '开户地址',
                orderDesc: '附言'
            },
            res_qr_arr:{
                currentTime: '下单时间',
                orderNo: '订单编号',
                failTime: '订单失效时间'
            },
            orderInterval:null,
            res_qr:null,
            showPop:null,
            // res_qr:{"currentTime":1535369258000,"failTime":1535370158000,"orderAmount":100.01,"orderNo":"1034039734395830273","payCode":"DQ","qrCode":"https://qr.alipay.com/bax00855pyrt0okxfnen00b2"},


        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();
            // this.getBanlance();
        },
        destroyed :function(){

        },
        methods: {
            getData:function () {
                var that=this;
                ys.ajax("api/my/listPayType", "get",{},function(data){
                    if(data.resCode==1){
                        that.payTypeList = data.resObj.payTypeList;
                        that.payInfoList = data.resObj.payInfoList;
                        $api.setStorage('payTypeList',data.resObj.payTypeList);
                        $api.setStorage('payInfoList',data.resObj.payInfoList);
                    }else {
                        that.getData();
                    }
                });
            },
            getDis:function () {
                var that=this;
                ys.ajax("api/my/listMyDiscount", "get",{},function(data){
                    if(data.resCode==1){
                        var a=data.resObj.activity;
                        var b=data.resObj.coupon;
                        that.activityList = a.length>0? a:null;
                        that.couponList = b.length>0? b:null;
                    }else {
                        that.getDis()
                    }
                });

            },
            checkDis:function (t,i) {
                // console.log(it);
                var that=this;
                if(t==3){
                    that.tab4=999;
                }else {
                    that.tab3=999;
                }
                this['tab'+t]=i;
                this.popHide();
                // var ts=999;
                // var tt='不选择优惠';
                // if(ind!=999 && that.orderAmount>=it.discounts.minDeposit
                //     && that.orderAmount<=it.discounts.maxAmount
                //     && it.discounts.depositMethod.indexOf(that.payTypeList[that.tab1].payTypeCode)>-1
                // ){
                //     ts = ind;
                //     tt = it.discounts.displayName;
                // }else if(it){
                //     ys.toast('当前的存款方式与金额不符合该优惠条件')
                // }
                // that.tab3 = ts;
                // that.disTxt = tt;
                // $('#pop_ds').slideUp();
            },
            popShow:function(t){
                $('body').addClass('stop');
                $('input').blur();
                // $('.pop_list').hide();
                // $('#pop_'+t).slideDown();
                this.showPop = t;
            },
            popHide:function(){
                $('body').removeClass('stop');
                this.showPop = null;
            },
            nextOne:function () {
                var that=this;
                if(
                    !that.orderAmount
                ){
                    ys.animate('.ckje input','shake');
                    $('.ckje input').focus();
                    ys.toast('请输入金额');
                    return false;
                }

                var par = {
                };
                
                if (that.tab3!=999){
                    var actvSum = that.activityList[that.tab3].minDeposit;
                    if(that.orderAmount < actvSum){

                        ys.toast('您选择的优惠活动要求最低存款'+actvSum+'元');
                        return false;
                    }else {
                        par.discountId=that.activityList[that.tab3].discountId;
                    }
                }
                if (that.tab4!=999){
                    var coupSum = that.couponList[that.tab4].discounts.minDeposit;
                    if(that.orderAmount < coupSum){

                        ys.toast('您选择的优惠券要求最低存款'+coupSum+'元');
                        return false;
                    }else {
                        par.discountId=that.couponList[that.tab4].discountId;

                    }
                }


                if(that.payTypeList[that.tab1].payTypeCode=='QUICK'){
                    if(
                        that.orderAmount < that.payInfoList[that.tab2].minAmount
                    ){
                        ys.animate('.ckje input','shake');
                        $('.ckje input').focus();
                        ys.toast('该存款方式最小限额为'+that.payInfoList[that.tab2].minAmount+'元');
                        return false;
                    }
                    if(
                        !that.orderName
                        || that.orderName.length < 2
                    ){
                        ys.animate('#xm','shake');
                        $('#xm').focus();
                        ys.toast('请输入存款人姓名');
                        return false;
                    }
                }else if(that.orderAmount < that.payTypeList[that.tab1].minAmount){
                    ys.animate('.ckje input','shake');
                    $('.ckje input').focus();
                    ys.toast('该存款方式最小限额为'+that.payTypeList[that.tab1].minAmount+'元');
                    return false;
                }
                
                if(that.payTypeList[that.tab1].payTypeCode=='QUICK'){
                    par.payTypeCode = that.payInfoList[that.tab2].payCode;
                    par.orderAmount = that.orderAmount;
                    par.orderName = that.orderName;
                    ys.ajax("order/saveQuickOrder", "post",par,function(data){
                        if(data.resCode==1){
                            that.res_quick= data.resObj;
                            that.step=1;
                            that.orderAmount=null;
                            that.tab3=999;
                            that.tab4=999;
                            that.countdown('res_quick');
                        }
                    },1);
                }else {
                    par.payTypeCode = that.payTypeList[that.tab1].payTypeCode;
                    par.payAmount = that.orderAmount;
                    par.callBackUrl = ys.url.web;
                    ys.ajax("order/generateOrder", "post",par,function(data){
                        if(data.resCode==1){
                            that.res_qr= data.resObj;
                            that.step=1;
                            that.orderAmount=null;
                            that.tab3=999;
                            that.tab4=999;
                            that.countdown('res_qr');
                            // if(par.payTypeCode.indexOf('QR')>-1&&that.res_qr.qrCode){
                            if(par.payTypeCode.indexOf('QR')>-1){
                                qrImg(that.res_qr.qrCode)
                            }else if(that.res_qr.forwordPay) {
                                openLink(that.res_qr.forwordPay,'请在浏览器中完成支付')
                            }
                        }
                    },1);
                }
            },
            countdown:function (t) {
                var that= this;
                if(that[t]&&that[t].failTime){
                    if(new Date(that[t].failTime).getTime()>new Date().getTime()){
                        suim = setInterval(function () {
                            var m = that[t].failTime;
                            that[t].failTime = 0;
                            that[t].failTime = m;
                            if(that.res_qr&& (new Date().getTime())%5==0){
                                ys.ajax('order/getOrderStatus', "get",{
                                    orderNo: that.res_qr.orderNo,
                                    payCode: that.res_qr.payCode
                                },function(data){
                                    if(data.resCode==1){
                                        // ys.toast('支付成功');
                                        clearInterval(suim);
                                        api.sendEvent({name:'pay_end'});
                                        that.orderAmount=null;
                                        that.step=3;
                                        that.res_qr= null;
                                    }
                                });
                            }

                        },1000)
                    }else {
                        clearInterval(suim)
                    }
                }
            },
            cancelOrder:function () {
                var that= this;
                clearInterval(suim);
                var url = 'api/my/cancelOrder';
                var par = null;
                if(that.payTypeList[that.tab1].payTypeCode=='QUICK'){
                    url = 'order/cancelQuickOrder';
                    par = that.res_quick.orderNo;
                }else {
                    par = that.res_qr.orderNo
                }
                ys.ajax(url, "post",{
                    orderNo: par
                },function(data){
                    if(data.resCode==1){
                        ys.toast('取消订单成功');
                        that.step=0;
                        that.res_quick= null;
                        that.res_qr= null;
                    }
                },1);
            },
            endOrder:function () {
                this.step=0;
                jlHead(2);
                clearInterval(suim);
            },
            endOrder2:function () {
                this.step=3;
            },
        }
    });


    var qianbao = api.pageParam.gameCode;
    if(qianbao=="LOTTERY"){
        qianbao = 'LOTTO'
    }
    vCont.gameCode=qianbao;

    vCont.getData();
    vCont.getDis();
    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.getData();
    });
    // xiala(function () {
    //     vCont.getData();
    // });
    // qrImg(vCont.res_qr.qrCode);
};
// apiready();

var cp_orderNo = new ClipboardJS('#orderNo');
var cp_accountBank = new ClipboardJS('#accountBank');
var cp_account = new ClipboardJS('#account');
var cp_accountName = new ClipboardJS('#accountName');
var cp_accountAddr = new ClipboardJS('#accountAddr');
var cp_orderDesc = new ClipboardJS('#orderDesc');

cp_orderNo.on('success', function(e) {
    ys.toast('订单编号复制成功');
});
cp_accountBank.on('success', function(e) {
    ys.toast('银行复制成功');
});
cp_account.on('success', function(e) {
    ys.toast('账号复制成功');
});
cp_accountName.on('success', function(e) {
    ys.toast('开户名复制成功');
});
cp_accountAddr.on('success', function(e) {
    ys.toast('开户地址复制成功');
});
cp_orderDesc.on('success', function(e) {
    ys.toast('附言复制成功');
});
