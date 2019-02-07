/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            step:1,
            info:{
                // prizaName:"现金500元",
                // prizaState:0,
                // prizaTime:"2018-08-15 17:46:02",
                // prizaTypeName: "虚拟奖品",
                // userId: "1029665509643264001"
            },
            yzmdjs:null,
            passcode:null,
            uphone:true,
            changePhone:true,
            user:{
                userPhone:null
            },
            end_msg:null

        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();
            setTimeout(function () {
                $('.reward-box').removeClass('zoom');
            },200);
            if(this.step==1){
                setTimeout(function () {
                    $('#redux').eraser({
                        size: 20,
                        progressFunction: function(p) {
                            // console.log(p);
                            if(p>.35){
                                $('#redux').fadeOut(600);
                                vCont.step=2;
                                ys.animate('.zjl','bounceOut');
                                $api.setStorage('reward',2);
                            }
                        }
                    });
                },800)
            }
        },
        destroyed :function(){

        },
        methods: {
            getData:function () {
                var that = this;
                getMine(function (res) {
                    that.user=res
                });
            },

            getCode: function () {
                var that =this;
                if($('#btn_yzm').hasClass('wait')) return false;
                if(that.changePhone){
                    $('#btn_yzm').text('正在发送').addClass('wait');
                    ys.ajax("api/my/sendAuthSms", "get",{},function(data,err){
                        if(data.resCode==1){
                            sendMsgOk()
                        }else {
                            ys.toast(data.msg);
                            that.uphone=false; //手机号已经被其它账号绑定
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

            //领取奖品, 判断是否是手机认证用户;
            getGrantReward:function(){
                if(this.user && this.user.phoneAuth){
                    this.grantReward();
                }else{
                    this.step=3
                }
            },
            //领取奖品
            subReward:function () {
                // ys.toast(999000);
                if(!ys.regMobile(this.user.userPhone)&&!this.changePhone){
                    ys.animate('.reward-pop .btns','shake');
                    ys.animate('#ljsjh','bounceIn');
                    $('#ljsjh').focus();
                }else if(!ys.regCode(this.passcode)){
                    ys.animate('.reward-pop .btns','shake');
                    ys.animate('#ljyzm','bounceIn');
                    $('#ljyzm').focus();
                }else {
                    //认证手机号码
                    this.authPhone();
                }
            },
            //认证手机号码
            authPhone:function(){
                var that = this;

                if(that.changePhone){
                    ys.ajax("api/my/authPhone","post",{
                        code: that.passcode
                    },function(data){
                        if(data.resCode==1){
                            that.getData();
                            that.grantReward();
                        }else {
                            ys.toast(data.msg);
                        }
                    });
                }else{
                    ys.ajax("api/my/updatePhone", "post",{
                        newPhone: that.user.userPhone,
                        loginPwd: $api.getStorage('temppsw'),
                        code: that.passcode
                    },function(data){
                        if(data.resCode==1){
                            that.getData();
                            that.grantReward();
                        }else {
                            ys.toast(data.msg);
                        }
                    });
                }
            },
            grantReward:function(){
                var that = this;

                ys.ajax("api/user/grantReward","get",{},function(data){
                    if(data.resCode == 1){
                        that.end_msg = data.msg;
                        that.step = 4;
                        $api.setStorage('priza',$api.getStorage('mine').userName);
                    }else {
                        ys.toast(data.msg)
                    }
                });

            },
            endReward:function () {
                // api.setFrameAttr({
                //     name: 'home_top',
                //     hidden: false
                // });
                api.closeFrame();
            }
        }
    });

    vCont.info = api.pageParam;
    vCont.getData();
};

