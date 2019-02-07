/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            step:0,
            pst1:true,
            pst2:true,
            pst3:true,
            tka:{
                atmPassword:null,
                reAtmPassWord:null
            },
            tk:{
                atmPassword:null,
                reAtmPassword:null,
                oldPassword:null
            },
            dl:{
                oldPwd:null,
                newPwd:null,
                rePwd:null
            }

        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            sub:function(){
                var that = this;
                switch (that.step) {
                    case 0:
                        if(!ys.regApwd(that.tka.atmPassword)){
                            ys.animate('#ta1','shake');
                            $('#ta1').focus();
                        }else if(!ys.regApwd(that.tka.reAtmPassWord) || that.tka.atmPassword != that.tka.reAtmPassWord){
                            ys.animate('#ta2','shake');
                            $('#ta2').focus();
                        }else {

                            ys.ajax('api/my/updateMyInfo','post',{
                                atmPassword: md5(that.tka.atmPassword),
                                reAtmPassWord: md5(that.tka.reAtmPassWord)
                            },function (data) {
                                if(data.resCode==1){
                                    ys.toast('设置成功');
                                    api.sendEvent({name:'setting'});
                                    api.closeWin();
                                }
                            },1);
                        }


                        break;
                    case 1:
                        if(!ys.regApwd(that.tk.oldPassword)){
                            ys.animate('#tb1','shake');
                            $('#tb1').focus();
                        }else if(!ys.regApwd(that.tk.atmPassword)){
                            ys.animate('#tb2','shake');
                            $('#tb2').focus();
                        }else if(!ys.regApwd(that.tk.atmPassword) || that.tk.atmPassword != that.tk.reAtmPassword){
                            ys.animate('#tb3','shake');
                            $('#tb3').focus();
                        }else {
                            ys.ajax('api/my/updateAtmPassWord','post',{
                                oldPassword: md5(that.tk.oldPassword),
                                atmPassword: md5(that.tk.atmPassword),
                                reAtmPassword: md5(that.tk.reAtmPassword)
                            },function (data) {
                                if(data.resCode==1){
                                    ys.toast('修改成功');
                                    api.closeWin();
                                }
                                api.sendEvent({name:'setting'});
                            },1);
                        }

                        break;
                    case 2:
                        if(!ys.regPass(that.dl.oldPwd)){
                            ys.animate('#p1','shake');
                            $('#p1').focus();
                        }else if(!ys.regPass(that.dl.newPwd)){
                            ys.animate('#p2','shake');
                            $('#p2').focus();
                        }else if(!ys.regPass(that.dl.rePwd) || that.dl.newPwd != that.dl.rePwd){
                            ys.animate('#p3','shake');
                            $('#p3').focus();
                        }else {
                            ys.ajax('api/my/updatePassword','post',{
                                oldPwd: md5(that.dl.oldPwd),
                                newPwd: md5(that.dl.newPwd),
                                rePwd: md5(that.dl.rePwd)
                            },function (data) {
                                if(data.resCode==1){
                                    ys.toast('修改成功');
                                    api.sendEvent({name:'setting'});
                                    api.sendEvent({name:'send_logout', extra: {
                                            login: 1
                                        }
                                    });
                                    api.closeToWin({name:'root'});
                                }
                            },1);
                        }
                        break;
                }

            }
        }
    });

    vCont.step=api.pageParam.t;
};

