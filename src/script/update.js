/**
 * Created by pitt on 18/7/28.
 */

function urlCallback(k) {
    $('.butterbar').removeClass('active');

    if(qudao){
        var x = k.qudao[qudao];
        if(x&&api.appVersion!=x.version){
            vCont.item=x;
        }
    }else{
        vCont.item=k;
    }
}

apiready = function () {


    vCont = new Vue({
        el: '#app',
        data:{
            type:0,
            system:['ios','android'],
            hz:['ipa','apk'],
            version:'00.00.32',
            item:null
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
                $('.butterbar').addClass('active');
                $.ajax(ys.xurl+'app/api/js_'+that.system[that.type]+'.js?v'+new Date().getTime(),{
                    type:  'get',
                    cache:  false,
                    crossDomain:true,
                    dataType: 'jsonp',
                    contentType: "application/x-www-form-urlencoded",
                    success:function (data) {
                        ys.toast('已经更新')
                    }
                })

            },
            down:function () {
                $('.butterbar').addClass('active');
                location.href=this.item.url
            },
            mdRun:function (s) {
                return s? marked(s):''
            }
        }
    });



    vCont.type = api.systemType=='ios'?0:1;
    vCont.version = api.appVersion;
    vCont.getData();
    xiala(function () {
        vCont.getData();
    });
};

