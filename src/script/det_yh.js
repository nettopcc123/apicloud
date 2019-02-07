/**
 * Created by pitt on 18/7/28.
 */
var wg = false;
function to_login() {
    if(ys.getAuth()){
        comHead('在线客服','kefu')
    }else {
        comHead('用户注册','sign_up')
    }
}




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            det_id:0

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
            getData:function(){
                var that = this;
                if(that.det_id==0){
                    ys.toast('活动不存在');
                    return false;
                }
                ys.ajax("api/gamecodetype/getOfferUrl", "get",{
                    id:that.det_id
                },function(data,err){
                    // console.log(data);
                    setTimeout(function () {
                        $('.discount_det').fadeIn();
                    },1500);
                    if(data.resObj){
                        $('.discount_det').html(data.resObj);
                    }else {
                        $('.discount_det').html('<div class="error">'+data.msg+'</div>');
                    }
                });
            },
        }
    });
    // ys.toast(api.pageParam.id);
    vCont.det_id=parseInt(api.pageParam.id);
    vCont.getData();
    xiala(function () {
        vCont.getData();
    });
};


