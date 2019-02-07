/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            menu:['登录注册','存款流程','取款流程','转账流程','账户安全','会员制度','银行卡相关','其它问题'],
            hot_qa:[],
            res: helps_db
        },
        computed:{

        },
        components:{

        },
        mounted: function() {
            this.filterData();
        },
        destroyed :function(){

        },
        methods: {
            filterData: function () {
                var that = this;
                var fd = that.res.hot;
                for(var i=0;i<fd.length;i++){
                    that.hot_qa.push(that.res.items[fd[i][0]].child[fd[i][1]])
                }
            },
            toChild:function (n,i) {
                comHead(n,'help_child',{c:i});
            },
            toDet:function (i) {
                var fd = this.res.hot;
                comHead('问题详情','help_det',{c:fd[i][0],a:fd[i][1]});
            }
        }
    });

    xiala(function () {
        vCont.filterData();
    });
};


