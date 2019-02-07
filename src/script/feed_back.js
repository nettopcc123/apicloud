



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            quizContent: null,
            menuInd: 0,
            menu: null
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/my/listProblemType','get',{},function (data) {
                    if(data.resCode==1){
                        that.menu = data.resObj
                    }
                })
            },
            sub:function(){
                var that = this;
                if(!that.quizContent || that.quizContent.length < 1){
                    ys.animate('textarea','shake');
                    $('textarea').focus();
                    return false;
                }
                ys.ajax('api/my/saveProbelm','post',{
                    quizTypeId: that.menu?that.menu[that.menuInd].quizTypeId:null,
                    quizContent: that.quizContent
                },function (data) {
                    if(data.resCode==1){
                        that.quizContent=null;
                        ys.toast('感谢您的反馈，我们客服将尽快给您答复。');
                        api.sendEvent({name:'msg_num'});
                        setTimeout(function () {
                            api.closeWin()
                        },2000)
                    }
                })
            },
            setMenu:function (ind) {
                this.menuInd=ind;
                $('.feed_menu').removeClass('show');
            }
        },
        mounted: function() {

        }
    });

    vCont.getData()
};
