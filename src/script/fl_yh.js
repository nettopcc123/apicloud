/**
 * Created by pitt on 18/7/28.
 */




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            findParam: {
                gameOffertype: 0,
                gameOfferName: '',
                phone: 1,
                limit: 20
            },
            topBanner: [],
            count: 0,
            page: 1,
            totalPage: 1,
            items: []

        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.getData();
        },
        destroyed :function(){

        },
        methods: {
            getData:function(){
                var that = this;
                var par = that.findParam;
                par.page=that.page;
                ys.ajax("api/gamecodetype/getActitiList", "get",par,function(data){
                    forList(data);
                });
            },
            sendUI:function(s,e){
                return s > toDay?'wait': e<toDay?'end':''
            }
        }
    });

    vCont.getData();
    xiala(function () {
        myReload();
    });
    api.addEventListener({name:'sear_evt_yh'}, function (ret, err) {
        // ys.toast();
        if(ret.value.key==1){
            vCont.findParam.gameOfferName = ret.value.val;
        }else if(ret.value.key==2){
            vCont.findParam.gameOffertype = ret.value.val;
        }else {
            vCont.findParam.gameOfferName = null;
            vCont.findParam.gameOffertype = 0;
        }
        myReload();
    });
    getMore();
    getSelectMenu1();
};


// apiready()