/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            step:1,
            userRealName:null,
            userWechat:null,
            userQQ:null

        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            sub:function(){
                var that = this;
                var t = $('input').val();
                t=t?t.replace(/\s+/g, ''):null;
                if(!t||t.length<2){
                    ys.animate('input','shake');
                    $('input').focus();
                    return false;
                }
                var par={};
                switch (that.step) {
                    case 1:
                        par={userRealName: that.userRealName.replace(/\s+/g, '')};
                        break;
                    case 2:
                        par={userWechat: that.userWechat.replace(/\s+/g, '')};
                        break;
                    case 3:
                        par={userQQ: that.userQQ.replace(/\s+/g, '')};
                        break;
                }
                if(that.step==1){
                    ys.confirm('姓名仅可设置一次且需与提款银行卡开户人一致，\n确定提交吗？',function () {
                        ys.ajax('api/my/updateMyInfo','post',par,function (data) {
                            if(data.resCode==1){
                                ys.toast('设置成功');
                                api.closeWin();
                            }
                        },1);
                        api.sendEvent({name:'setting'});
                    });
                }else {
                    ys.ajax('api/my/updateMyInfo','post',par,function (data) {
                        if(data.resCode==1){
                            ys.toast('设置成功');
                            api.sendEvent({name:'setting'});
                            api.closeWin();
                        }
                    },1)
                }
            }
        }
    });

    vCont.step=api.pageParam.t;
    vCont.userWechat=api.pageParam.w?api.pageParam.w:null;
    vCont.userQQ=api.pageParam.q?api.pageParam.q:null;
};


