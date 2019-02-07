/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            card: $api.getStorage('my_bank_card')?$api.getStorage('my_bank_card'):null,
            // tArr: ['ABC','BCM','BOB','BOC','BOSH','CCB','CEB','CGB','CIB','CITIC','CMB','CMBC','HFB','HXB','ICBC','PSBC','SDB','SPDB']

        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/bank/listMyBank','get',{},function (data) {
                    if(data.resCode==1){
                        that.card = data.resObj;
                        $api.setStorage('my_bank_card',data.resObj);
                    }
                })
            },
            defCard:function (id) {
                ys.ajax('api/bank/updateDefaultBank','post',{bankId:id},function (data) {
                    if(data.resCode==1){
                        ys.toast('设置成功');
                        api.sendEvent({name:'setting'});
                        vCont.getData();
                    }
                },1)
            },
            delCard:function (id) {
                ys.confirm('确定要删除此银行卡吗？',function () {
                    ys.ajax('api/bank/delBank','post',{bankId:id},function (data) {
                        if(data.resCode==1){
                            ys.toast('删除成功');
                            vCont.getData();
                        }
                    },1)
                })
            }
        }
    });

    vCont.getData();
    xiala(function () {
        vCont.getData();
    });
    api.addEventListener({name:'new_bank'},function(){
        vCont.getData();
    });
};


