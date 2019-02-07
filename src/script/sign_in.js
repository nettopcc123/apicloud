/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            title:['账号密码登录','手机短信登录'],
            setTab:0,
            userName: $api.getStorage('save_pass')?$api.getStorage('save_pass').u:null,
            passWord: $api.getStorage('save_pass')?$api.getStorage('save_pass').p:null,
            save_pass: $api.getStorage('save_pass')?true:false,
            // captcha:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAiAMgDASIA AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3 ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3 uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0EU4U 0U4UAPFOFNFOFADhTxTRThQA4U8U0U4UAOFPFNFc74q1LW9OS3/sexa6MokDbULbGABXPpn5h9cU AdMKeK4Twz43u7nVLjRvENj9hvoX2h9w2P8AIX4/4CpOen513YoAcKcK5vVvGOm6VcNau+bkEKqs dqnI3DLdFyA2M4ztOM4p2geN9E8RyrDp9yZJvLEjJtOVHydfT/WAfUH0NAHSinCopZo7eCSaVgsc almY9gOTXD+IPiWmmTzxafpN1erbM4uLgIRFFsJ3gn1wrfXHvQB6AKcK5/wbr0vibw5bas8SxrcL lQPX+Ifgcj8KTxL430Hwj9nGr3bRNOTsRIy5wMZOB25FAHSCnCsfQfE2jeJbczaRqMF0q/eVG+ZP 95eo/GtkUAOFOFNFOFADxThTRThQA4UUoooA4QU8U0U4UAOFPFNFOFADhTxTRThQA4U8UwU8UAOF c34o8a2PhqLyypnvHx5cK8bstt6/WukFYWv+C9F8Susmo25eVPuOrEFen+FAHD+FdI1PxRr48Taw sUSJGI40ds5Qscgjpko238K9J1+//s3RLi4B2sFwpKkgH3x0+p4ziuV0z4brpGpRzWurXb2oxmCa QspHcY6ehz7V29zard2xgkYgHHIoA8a0A6e9teC9eRrsTealtIsf7njJKpkn5VAAJyqjGOeK3/hZ ZabHLPLaQqULFo5Hb5lYbgFUHBICswJrO1jS1k1S50+10OaWDd5c85sBEMdWkMyAfgir711nw60K TR7BwUVEP3SIiC4J9W5/DAoA7gqGBDAEHqDXnHxUt9eXQJm04WkGjxjzb4A7ZJPmBwPr3+td/fWz XllLAkrQuw+WReqkHI/UV51cfD7xXrFybfWfE/m6aSQ0UaYLqcHHt0oA634f3yX/AIOspI7RLPaG RrdPuxnOcD864/xx4mu5fHtp4ZsdD0u8uNgdJb9e5GcKe3HWvT7OzgsbZYLeMIg7DufU+9YvibwP o/iry5L1JYruI5iurdykiH2P+NAHlHhRdRs/jwIbqyttOnkgYzwWcmYm+Xr/APWr38V5ppHwqbQf G9p4gstXknREKTx3YLOwI6hv8RXpYoAcKeKaKcKAHCniminCgBwopRRQBwgp4oooAcKeKKKAHCnC iigB4pwoooAeKcKKKAHinCiigBygDoBTxRRQA4U8UUUAOFPFFFADhTxRRQA4U8UUUAOFPFFFADhR RRQB/9k=",
            captcha: null,
            passcode: null,
            loginToken: null,
            userPhone: null,
            smsCode: null,

        },
        computed:{

        },
        components:{

        },
        mounted: function() {


        },
        destroyed :function(){

        },
        methods: {
            checkName:function () {
                var that = this;
                if(!ys.regUname(that.userName)&&!ys.regMobile(that.userName)){
                    ys.animate('#iu','shake');
                }else {
                    that.checkCapt(1);
                }
            },
            checkCapt:function (t) {
                var that = this;
                ys.ajax("api/user/checkUserNameCaptcha", "get",{
                    userName:that.userName
                },function(data){
                    if(data.resCode==1){
                        that.captcha = null;
                        // if(t){that.signIn();}
                    }else {
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
                if($('#btn_yzm').hasClass('wait')) return false;

                if(!ys.regMobile(that.userPhone)){
                    ys.animate('#ph','shake');
                    $('#ph').focus();
                    ys.toast('手机号不正确');
                }else {
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/user/sendLoginSms", "post",{
                        userPhone:that.userPhone
                    },function(data){
                        if(data.resCode==1){
                            $('#cd').focus();
                            sendMsgOk();
                        }
                    });
                }
            },
            signIn:function () {
                var that = this;
                that.save_pass ? $api.setStorage('save_pass',{u:that.userName,p:that.passWord}):$api.rmStorage('save_pass');
                if(that.setTab == 0){
                    if(!ys.regUname(that.userName)&&!ys.regMobile(that.userName)){
                        ys.animate('#iu','shake');
                        $('#iu').focus();
                    }else if(!ys.regPass(that.passWord)){
                        ys.animate('#ip','shake');
                        $('#ip').focus();
                    }else if(that.captcha&&!that.loginToken){
                        ys.animate('#yz','shake');
                        $('#yz').focus();
                    }else {
                        var par = {
                            userName:that.userName,
                            passWord:md5(that.passWord)
                        };
                        $api.setStorage('temppsw',par.passWord);
                        if(that.captcha){
                            par.passcode = that.passcode;
                            par.loginToken = that.loginToken;
                        }
                        ys.ajax("api/user/login", "post",par,function(data){
                            if(data.resCode==1){
                                $api.setStorage('token',data.resObj.token);
                                $api.setStorage('mine',data.resObj);
                                api.sendEvent({name:'send_login'});
                                api.closeWin({name:'win_sign_in'});
                            }else {
                                that.checkCapt()
                            }
                        },1);
                    }
                }else {
                    if(!ys.regMobile(that.userPhone)){
                        ys.animate('#ph','shake');
                        $('#ph').focus();
                        ys.toast('手机号不正确');
                    }else if(!ys.regCode(that.smsCode)){
                        ys.animate('#ip','shake');
                        $('#ip').focus();
                    }else {
                        ys.ajax("api/user/phoneLogin", "post",{
                            userPhone:that.userPhone,
                            smsCode:that.smsCode
                        },function(data){
                            if(data.resCode==1){
                                $api.setStorage('token',data.resObj.token);
                                $api.setStorage('mine',data.resObj);
                                api.sendEvent({name:'send_login'});
                                api.closeWin({name:'win_sign_in'});
                            }
                        },1);
                    }
                }

            },
            delPwd:function (t) {
                $api.rmStorage('save_pass');
                this.userName=null;
                this.passWord=null;
                this.save_pass=false;
                t==1?to_register():toWin('sign_pass');
            }
        }
    });

    if($api.getStorage('save_pass')){
        vCont.checkCapt();
    }else {
        $('#iu').focus();
    }
};
// apiready();
