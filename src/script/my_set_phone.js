/**
 * Created by pitt on 18/7/28.
 */





apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            changePhone:true,
            passcode:null,
            yzmdjs:null

        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            changeMob:function(){
                this.changePhone=false;
                this.user.userPhone=null;
                $('#ljsjh').focus();
            },
            getCode: function () {
                var that =this;
                if($('#btn_yzm').hasClass('wait')) return false;

                if(that.changePhone){
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/my/sendAuthSms","get",{},function(data){
                        if(data.resCode == 1 ){
                            sendMsgOk()
                        }else{
                            ys.toast(data.msg);
                        }
                    });
                }else if(!ys.regMobile(that.user.userPhone)){
                    ys.animate('#ljsjh','bounceIn');
                    $('#ljsjh').focus();
                }else {
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/user/sendSms","post",{userPhone:that.user.userPhone},function(data){
                        if(data.resCode == 1 ){
                            sendMsgOk()
                        }else{
                            ys.toast(data.msg);
                        }
                    });
                }
            },
            authPhone:function(){
                var that = this;
                if(!ys.regCode(that.passcode)){
                    ys.animate('#ljyzm','bounceIn');
                    $('#ljyzm').focus();
                    return false;
                }
                if(that.changePhone){
                    ys.ajax("api/my/authPhone","post",{
                        code: that.passcode
                    },function(data){
                        if(data.resCode==1){
                            that.sendEnd();
                        }else {
                            ys.toast(data.msg);
                        }
                    });
                }else if(!ys.regMobile(that.user.userPhone)){
                    ys.animate('#ljsjh','bounceIn');
                    $('#ljsjh').focus();
                }else {
                    ys.ajax("api/my/updatePhone","post",{
                        newPhone: that.user.userPhone,
                        loginPwd: $api.getStorage('temppsw'),
                        code: that.passcode
                    },function(data){
                        if(data.resCode==1){
                            that.sendEnd();
                        }else {
                            ys.toast(data.msg);
                        }
                    });
                }
            },
            sendEnd:function () {
                ys.toast('绑定成功');
                api.sendEvent({name:'setting'});
                api.closeWin();
            }
        }
    });
};


