


apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            count: 0,
            page: 1,
            totalPage: 1,
            items: []
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/my/listMyProbelm','get',{
                    page:that.page,
                    limit: 20
                },function (data) {
                    forList(data)
                })
            },
        },
        mounted: function() {
            // this.getData()
        }
    });
    vCont.getData();
    xiala(function () {
        myReload();
    });

    getMore();

    api.addEventListener({name:'msg_num'},function (ret) {
        vCont.getData()
    });

};
