


apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            quizId: 1037510340339712001,
            appendContent:null,
            count: 0,
            page: 1,
            totalPage: 1,
            items: [],
            // items: [{
            //     "answerContent":"请详细的说明您需要咨询的问题，\n\n  以便我们更好的为您服务，谢谢～",
            //     "answerTIme":"2018-07-07 07:22:47",
            //     "appendContent":"测试难题",
            //     "read":true
            // },
            //     {
            //         "appendContent":"哈哈哈哈哈哈",
            //         "appendTIme":"2018-07-07 08:57:30",
            //         "read":true
            //     }
            // ]
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/my/getProbelmDetail','get',{
                    quizId: that.quizId
                },function (data) {
                    forList(data);
                    $("html,body").animate({ scrollTop:1000000 }, 500);
                })
            },
            sub:function(){
                var that = this;
                if(!that.appendContent || that.appendContent.trim()==''){
                    ys.animate('textarea','shake');
                    $('textarea').focus();
                    return false;
                }
                ys.ajax('api/my/appendProbelm','post',{
                    quizId: that.quizId,
                    appendContent: that.appendContent
                },function (data) {
                    if(data.resCode==1){
                        that.appendContent=null;
                        that.getData();
                    }
                })
            },
        },
        mounted: function() {
            // this.getData()
        }
    });

    vCont.quizId = api.pageParam.id;
    vCont.getData();

    // xiala(function () {
    //     myReload();
    // });


};

function inputUp(t) {
    if(t==1){
        $('.fix_inp').removeClass('fx')
    }else {
        $('.fix_inp').addClass('fx');
        if(vCont.appendContent && vCont.appendContent.trim()!=''){
            vCont.sub();
        }
    }
    // setTimeout(function() {
    //     document.body.scrollTop = document.body.scrollHeight
    // }, 250);
}

