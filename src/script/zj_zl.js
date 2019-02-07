
/**
 * Created by pitt on 18/7/28.
 */


apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            myBan2:0,
            banlance: $api.getStorage("listBanlance")?$api.getStorage("listBanlance"):null
        },
        computed:{
        },
        components:{
        },
        mounted: function() {
            // this.getData();
            this.myBan();
            // this.getBanlance();
        },
        destroyed :function(){

        },
        methods: {
            getBanlance:function(){
                var that = this;
                $api.setStorage("ajax_refrash",1);
                ys.ajax("api/my/listBanlance","get",{},function(data){
                    if(data.resCode==1){
                        that.banlance=data.resObj;
                        that.banlance.sort(sortBy('gameBanlance',2));
                        $api.setStorage("listBanlance",that.banlance);
                        that.myBan();

                    }
                });
            },
            myBan:function () {
                var that = this;
                that.myBan2=0;
                that.banlance.forEach(function (it) {
                    that.myBan2+=it.gameBanlance;
                })
            }
        }
    });

    vCont.getBanlance();
    xiala(function () {
        vCont.getBanlance();
    });
};