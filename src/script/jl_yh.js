
/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            count: 0,
            page: 1,
            totalPage: 1,
            disCountName: null,
            activityTime: datePlus(toDay,-2) + ' 00:00:00 - ' + toDay + ' 23:59:59',
            items: [],
            showItem:null
        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            getData:function(){
                var that = this;
                var par = {
                    activityTime: that.activityTime,
                    page:that.page
                };
                if(that.disCountName){
                    par.disCountName = that.disCountName
                }
                ys.ajax("api/my/listMyDisCountRecord", "get",par,function(data){
                    forList(data);
                });
            }
        }
    });
    vCont.getData();
    xiala(function () {
        myReload()
    });
    getMore();
    api.addEventListener({name:'sme_evt_yh'}, function (ret, err) {
        vCont.disCountName=ret.value.key;
        myReload();
    });
    api.addEventListener({name:'set_nav_time'}, function (ret, err) {
        vCont.activityTime = ret.value.time;
        myReload();
    });
};


