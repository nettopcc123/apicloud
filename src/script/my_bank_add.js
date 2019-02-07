/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            step: 0,
            card: {
                userRealName: null,
                bankCardNo: null,
                bankName: null,
                province: null,
                city: null,
                bankBranchName: null
            }
        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            getData:function(){
                var that = this;
                getMine(function (res) {
                    that.user=res;
                    if(res.userRealName){
                        that.card.userRealName = res.userRealName
                    }
                });
            },
            checkBank:function () {
                var that = this;
                that.card.bankCardNo=that.card.bankCardNo?that.card.bankCardNo.replace(/\s+/g, ''):null;
                if(!ys.regBank(that.card.bankCardNo)){
                    ys.animate('#yh','shake');
                    $('#yh').focus();
                }else {
                    ys.ajax('api/bank/getBankAddr','post',{
                        bankCardNo: that.card.bankCardNo
                    },function (data) {
                        if(data.resCode==1){
                            that.step=1;
                            that.card.bankName = data.resObj.bankName;
                            that.card.province = data.resObj.province;
                            that.card.city = data.resObj.city;
                        }
                    },1)
                }

            },
            subBank:function () {
                var that = this;
                if(!that.card.bankName||that.card.bankName.length<2){
                    ys.animate('#mc','shake');
                    $('#mc').focus();
                }else if(!that.card.province||that.card.province.length<2){
                    ys.animate('#sf','shake');
                    $('#sf').focus();
                }else if(!that.card.city||that.card.city.length<2){
                    ys.animate('#cs','shake');
                    $('#cs').focus();
                }else if(!that.card.bankBranchName||that.card.bankBranchName.length<2){
                    ys.animate('#zh','shake');
                    $('#zh').focus();
                }else {
                    ys.ajax('api/bank/bindBank','post',that.card,function (data) {
                        if(data.resCode==1){
                            api.sendEvent({name:'new_bank'});
                            api.closeWin();
                        };
                        api.sendEvent({name:'setting'});
                    },1)
                }

            }
        }
    });
    vCont.getData();
};



