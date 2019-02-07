/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            phone: null,
            msg: '每个电话号码每天只能使用3次电话回拨',
            step: 0
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
            sub:function(){
                var that = this;
                if(!ys.regMobile(that.phone)){
                    ys.animate('input','shake');
                    $('input').focus();
                    return false;
                }
                ys.ajax('api/home/phoneCallback','post',{
                    phone:that.phone
                },function (data) {
                    that.msg = data.msg;
                    that.step = data.resCode;
                })
            },

        }
    });


};


