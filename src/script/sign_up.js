/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {



    vCont = new Vue({
        el: '#app',
        data:{
            title:['手机注册','快速注册'],
            setTab:0,
            userName:null,
            passWord:null,
            userPhone:null,
            code:null,
            check:true,
            yzmdjs:null,
            parent:null,
            passcode:null,
            captcha: null,
            loginToken: null,

        },
        mounted: function() {
            // $('#iu').focus();
            this.getConfig();
        },
        methods: {
            getConfig:function(){
                var that = this;
                ys.ajax("api/config/listSysConfig", "get",{},function(data){
                    if(data && data.resCode==1 && parseInt(data.resObj.registCodeEnable)==1){
                        that.getCapt()
                    }
                });
            },
            getCapt:function () {
                var that = this;
                ys.ajax("api/user/getCaptcha", "get",{},function(data){
                    if(data.resCode==1){
                        that.captcha=data.resObj.captcha;
                        that.loginToken=data.resObj.loginToken;
                        $('#yz').focus();
                    }else {
                        that.getCapt();
                    }
                });
            },
            getCode:function(){
                var that = this;
                if($('#btn_yzm').hasClass('wait')){
                    return false;
                }
                if(!ys.regMobile(that.userPhone)){
                    ys.animate('#it','shake');
                    $('#it').focus();
                }else {
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/user/sendSms", "post",{
                        userPhone:that.userPhone
                    },function(data){
                        if(data.resCode==1){
                            sendMsgOk()
                        }
                    });
                }
            },
            signUp:function () {
                var that = this;
                that.userName=that.userName?that.userName.replace(/\s/g,"").toLocaleLowerCase():null;

                if(!ys.regName(that.userName)){
                    ys.animate('#iu','shake');
                    $('#iu').focus();
                    ys.toast('用户名限制为6-12位小写字母，可包含数字');
                }else if(!ys.regPass(that.passWord)){
                    ys.animate('#ip','shake');
                    $('#ip').focus();
                    ys.toast("密码限制6-12位，不允许空格等特殊字符");
                }else if(!ys.regMobile(that.userPhone)){
                    ys.animate('#it','shake');
                    $('#it').focus();
                    ys.toast("手机号格式不正确");
                }else if(!ys.regCode(that.code)&&that.setTab==0){
                    that.getCode();
                    ys.animate('#ic','shake');
                    $('#ic').focus();
                    ys.toast("短信验证码格式不正确");
                }else if(!that.passcode && that.captcha){
                    ys.toast("请输入图形验证码")
                }else if(!that.check){
                    ys.toast("您必须届满合法博彩年龄，且同意各项开户条约")

                }else {
                    var par = {
                        userName:that.userName,
                        passWord:md5(that.passWord),
                        userPhone:that.userPhone,
                        regitstType:that.setTab==0?2:1,
                        // parent:that.parent,
                        registUrl: api.systemType,
                        deviceNo: parseInt(api.deviceId,16).toString(36).toLocaleUpperCase()

                        // registUrl: api.systemType+'_'+api.deviceId
                    };
                    $api.setStorage('temppsw',par.passWord);
                    if(that.setTab==0){
                        par.code=that.code
                    }
                    if(that.captcha){
                        par.passcode=that.passcode;
                        par.loginToken=that.loginToken;
                    }
                    ys.ajax("api/user/regist", "post",par,function(data){
                        if(data.resCode==1){
                            $api.setStorage('token',data.resObj.token);
                            $api.setStorage("mine",data.resObj);

                            $api.rmStorage('priza');
                            $api.rmStorage("listBanlance");
                            $api.rmStorage("my_bank_card");

                            api.sendEvent({name:'send_login'});
                            api.closeWin({name:'win_sign_in'});
                            api.closeWin({name:'win_sign_up'});
                        }
                    },1);
                }
            }
        }
    });

};
// apiready();
