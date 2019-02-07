


apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            messageId: null,
            // messageId: 1035226856510492674,
            messageContent:null
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/my/getMessage','get',{
                    messageId: that.messageId
                },function (data) {
                    if(data.resCode==1){
                        that.messageContent = data.resObj.messageContent
                    }
                })
            }
        },
        mounted: function() {
            // this.getData()
        }
    });

    vCont.messageId = api.pageParam.id;
    vCont.getData();

};
