



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
                ys.ajax('api/my/listMyMessage','get',{
                    page:that.page,
                    limit: 20
                },function (data) {
                    forList(data)
                })
            },
            toDet:function (id,ind) {
                comHead('站内信详情','m_det',{id:id});
                this.items[ind].read = true;
            }
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

};
