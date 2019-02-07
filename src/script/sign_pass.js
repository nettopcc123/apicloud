


apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            step:0,
            userName:null,
            newPwd:null,
            rePwd:null,
            code:null,
            resetPasswordToken:null,
            tmtm:60,
            yzmdjs:null
        },
        methods: {
            checkName:function () {
                var that = this;
                if(!ys.regUname(that.userName)){
                    ys.animate('#iu','shake');
                    ys.toast('用户名不正确');
                }else {
                    that.getCode();
                }
            },
            getCode:function(){
                var that = this;
                if($('#btn_yzm').hasClass('wait')) return false;

                if(!ys.regUname(that.userName)){
                    ys.animate('#iu','shake');
                    $('#iu').focus();
                    ys.toast('用户名不正确');
                }else {
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/user/chackSendSms", "post",{
                        userName:that.userName
                    },function(data){
                        if(data.resCode==1){
                            $('#ic').focus();
                            ys.toast('验证码已发送到'+data.resObj.userPhone);
                            sendMsgOk();
                        }
                    });
                }
            },
            nextOne:function () {
                var that = this;
                if(!ys.regUname(that.userName)){
                    ys.animate('#iu','shake');
                    $('#iu').focus();
                    ys.toast('用户名不正确');
                }else if(!that.code){
                    ys.animate('#ic','shake');
                    $('#ic').focus();
                    ys.toast('验证码格式不正确');
                }else {
                    ys.ajax("api/user/checkSmsCode", "post",{
                        userName:that.userName,
                        code:that.code
                    },function(data){
                        if(data.resCode==1){
                            ys.toast('验证成功，请设置新密码');
                            that.resetPasswordToken=data.resObj.resetPasswordToken;
                            that.step=1;
                        }
                    },1);
                }
            },
            nextTwo:function () {
                var that = this;

                if(!ys.regPass(that.newPwd)){
                    ys.animate('#ip','shake');
                    $('#ip').focus();
                }else if(!ys.regPass(that.rePwd) || that.rePwd!=that.newPwd){
                    ys.animate('#ib','shake');
                    $('#ib').focus();
                }else {
                    ys.ajax("api/user/resetPassword", "post",{
                        userName: that.userName,
                        resetPasswordToken: that.resetPasswordToken,
                        newPwd: md5(that.newPwd),
                        rePwd: md5(that.rePwd)
                    },function(data){
                        if(data.resCode==1){
                            ys.toast('修改成功，请重新登录。');
                            api.closeWin();
                        }
                    },1);
                }
            }
        }
    });

};

