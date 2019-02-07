/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            user: $api.getStorage('mine')?$api.getStorage('mine'):null,
            title:null,
            items:null,
            res: helps_db,
            c:0
        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.filterData(5);
        },
        destroyed :function(){

        },
        methods: {
            filterData: function (i) {
                var that = this;
                that.items= this.res.items[i];
                that.title= that.items.name;
                if(i==5&&ys.getAuth()){
                    that.vipLeve = ys.getAuth().vipLeve;
                }
            },
            toDet:function (a) {
                comHead('问题详情','help_det',{c:this.c,a:a});
            },
            mdRun:function (s) {
                return s? marked(s):''
            }

        }
    });
    vCont.c=api.pageParam.c;
    vCont.filterData(vCont.c);
    xiala(function () {
        vCont.filterData(vCont.c);
    });
};


