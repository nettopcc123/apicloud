/**
 * Created by pitt on 18/7/28.
 */





apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            cont:null,
            res: helps_db
        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            // this.filterData(4,2);
        },
        destroyed :function(){

        },
        methods: {
            filterData: function (c,a) {
                this.cont=this.res.items[c].child[a];
            },
            toDet:function (i) {
                var fd = this.res.hot;
                comHead('问题详情','help_det',{c:fd[i][0],a:fd[i][1]});
            },
            mdRun:function (s) {
                s=s.replace(/(img\/help)/g, ys.url.img +'/m/help');
                return s? marked(s):''
            }

        }
    });

    // ys.toast(api.pageParam.c+'-'+api.pageParam.a);
    vCont.filterData(api.pageParam.c,api.pageParam.a);
    xiala(function () {
        vCont.filterData(api.pageParam.c,api.pageParam.a);
    });
};


