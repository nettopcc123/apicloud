
/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {


    vCont = new Vue({
        el: '#app',
        data:{
            step: 0,
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            setBank: null,
            atm: null,
            myBan: 0,
            orderAmount: null,
            atmPassword: null,
            showTips:false,
            disabledBtn:false,
        },
        mounted: function() {
            // this.getData();
            // this.getBank();
            // this.getAtm();
        },
        methods: {
            getData:function () {
                var that=this;
                getMine(function (res) {
                    that.user=res;
                });
                ys.ajax("api/my/getBalance", "get",{},function(data){
                    if(data.resCode==1){
                        that.myBan = data.resObj.balance
                    }
                });
            },
            getBank:function () {
                var that=this;
                ys.ajax('api/bank/listMyBank', 'get',{},function (data) {
                    var zs = 0,xs =0;
                    if(data.resCode==1){
                        data.resObj.forEach(function (it,ind) {
                            zs+=1;
                            if(it.default){
                                that.setBank=it
                            }else {
                                xs+=1;
                            }
                        });
                        if(zs==xs && data.resObj.length>0){
                            that.setBank = data.resObj[0];
                            ys.toast('正在设置默认银行卡');
                            ys.ajax('api/bank/updateDefaultBank','post',{bankId:data.resObj[0].bankId},function (res) {
                                if(res.resCode==1){
                                    ys.toast('默认银行卡设置成功');
                                    // api.sendEvent({name:'setting'});
                                    // vCont.getData();
                                }
                            },1)
                        }
                    }
                })
            },
            getAtm:function () {
                var that = this;
                ys.ajax('api/my/getAtmConfig','get',{},function (data) {
                    if(data.resCode==1){
                        that.atm=data.resObj;
                    }
                })
            },
            xAll:function(){
                this.orderAmount = this.myBan > this.atm.atmMaxAmount ? this.atm.atmMaxAmount : this.myBan
            },
            sub:function () {
                var that = this;
                if(!ys.regNumb(that.orderAmount) || that.orderAmount > that.myBan || that.orderAmount < that.atm.atmMinAmount || that.orderAmount > that.atm.atmMaxAmount){
                    ys.animate('#je','shake');
                    $('#je').focus();
                    return false
                }

                if(!ys.regApwd(that.atmPassword)){
                    ys.animate('#mm','shake');
                    $('#mm').focus();
                    return false
                }

                ys.ajax('api/my/saveAtmOrder','post',{
                    bankId: that.setBank.bankId,
                    orderAmount: that.orderAmount,
                    atmPassword: md5(that.atmPassword)
                },function (data) {
                    if(data.resCode==1){
                        // ys.toast('提款申请提交成功');
                        that.step = 1;
                    }
                },1)
            },

            toset:function () {
                var u=this.user;
                // ys.alert(u);

                if(!u.phoneAuth){
                    comHead('绑定手机号','my_set_phone')
                }else if(!u.userRealName){
                    comHead('设置真实姓名','my_set_inp',{t:1})
                }else if(!u.bindBank){
                    comHead('新增银行卡','my_bank_add')
                }else if(!u.atmPassword){
                    comHead('提款密码设置','my_set_pwd',{t:0})
                }
            },
            goCenter:function () {
                api.sendEvent({name:'home_menu',extra:11});
                setTimeout(function () {
                    api.closeWin();
                },200);
            },
            transferAll:function(){
                var that = this;
                if(this.disabledBtn){
                    return false;
                }
                this.disabledBtn = true;
                ys.ajax('api/game/transferAllToWallet','get',{},function (res) {
                    if(res.resCode==1){
                        that.myBan = res.resObj.balance
                    }else {
                        ys.toast(res.msg?res.msg:'回收失败了。。。');
                    }
                    that.disabledBtn = false;
                })
            },
        }
    });

    vCont.getData();
    vCont.getBank();
    vCont.getAtm();

    api.addEventListener({name:'setting'},function(ret,err){
        vCont.getData();
        vCont.getBank();
    });
    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.getData();
        vCont.getBank();
        vCont.getAtm();
    });
    xiala(function () {
        vCont.getData();
        vCont.getBank();
    });
};

// apiready();