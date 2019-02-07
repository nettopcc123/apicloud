
/**
 * Created by pitt on 18/7/28.
 */



apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            gameCode:null,
            gameCode2:null,
            setBan:0,
            amount:null,
            banlance: $api.getStorage("listBanlance")?$api.getStorage("listBanlance"):null,
            tab1:999,
            tab2:999,
            mrje:[50,100,500,1000]
        },
        computed:{

        },
        components:{
        },
        mounted: function() {
            // this.getData();
            // this.getBanlance();

        },
        destroyed :function(){

        },
        methods: {
            getBanlance:function(t){
                var that = this;
                if(t){
                    $api.setStorage("ajax_refrash",1);
                }
                ys.ajax("api/my/listBanlance","get",{},function(data){
                    if(data.resCode==1){
                        that.banlance=data.resObj;
                        that.banlance.sort(sortBy('gameBanlance',2));
                        $api.setStorage("listBanlance",that.banlance);
                        that.checkCode();
                    }
                });
            },
            showPop:function(t){
                if(t=='zr'&&this.gameCode){
                    ys.toast('不可以选择');
                }else {
                    $('input').blur();
                    $('.pop_list').hide();
                    $('#pop_'+t).slideDown();
                }
            },
            setTab1:function (it,ind) {
                var that = this;
                if(it.gameBanlance>0&&it.gameKey!=that.gameCode&&ind!=that.tab2){
                    that.tab1=ind;
                }
                $('.pop_list').slideUp();
            },
            setTab2:function (it,ind) {
                var that = this;
                if(!that.gameCode&&ind!=that.tab1){
                    that.tab2=ind;
                }
                $('.pop_list').slideUp();
            },
            checkCode:function () {
                var that = this;
                if(that.gameCode||that.gameCode2){
                    that.banlance.forEach(function (it,ind) {
                        // console.log(ind);
                        if(it.gameKey==that.gameCode||it.gameKey==that.gameCode2){
                            that.tab2=ind;
                        }
                    })
                }
            },
            setBanTxt1:function(){
                var that = this;
                if(that.tab1!=999){
                    var it = that.banlance[that.tab1];
                    return it.gamePlatformName +' '+it.gameBanlance+'元';
                }else {
                    return '请选择';
                }
            },
            setBanTxt2:function(){
                var that = this;
                if(that.tab2!=999){
                    var it = that.banlance[that.tab2];
                    return it.gamePlatformName +' '+it.gameBanlance+'元';
                }else {
                    return '请选择';
                }
            },
            amountAll:function(){
                var that = this;
                if(that.tab1!=999&&that.tab2!=999){
                    var pitt = that.banlance[that.tab1];
                    var msiuria = pitt.gameKey;
                    if(
                        msiuria == 'center' ||
                        msiuria == 'BBIN' ||
                        msiuria != 'center' && that.banlance[that.tab2].gameKey != 'center'
                    ){
                        that.amount = parseInt(pitt.gameBanlance)
                    }else {
                        that.amount = pitt.gameBanlance
                    }
                }else if(that.tab1!=999){
                    that.amount = that.banlance[that.tab1].gameBanlance
                }else {
                    ys.toast('请选择转出平台');
                }
            },
            // 平台转账
            transfer:function () {
                var that = this;
                if(that.banlance.length<1){
                    ys.toast('转账金额不能少于1元');
                    return false;
                }
                if(that.tab1==999){
                    ys.toast('请选择转出平台');
                    return false;
                }
                if(that.tab2==999){
                    ys.toast('请选择转入平台');
                    return false;
                }
                if(!that.amount||that.amount<1||that.banlance[that.tab1].gameBanlance<that.amount){
                    ys.animate('#amount','shake');
                    $('#amount').focus();
                    return false;
                }
                var pitt = that.banlance[that.tab1];
                var msiuria = pitt.gameKey;
                if(
                    msiuria == 'center' ||
                    msiuria == 'BBIN' ||
                    msiuria != 'center' && that.banlance[that.tab2].gameKey != 'center'
                ) {
                    that.amount = parseInt(that.amount)
                }
                ys.ajax("api/game/transfer", "post",{
                    transForm: that.banlance[that.tab1].gameKey,
                    transTo: that.banlance[that.tab2].gameKey,
                    amount: that.amount
                },function(data){
                    if(data.resCode==1){
                        ys.toast('转账成功');
                        api.closeWin({name:'win_zj_zl'});
                        api.sendEvent({name:'pay_end'});
                        that.tab1=999;
                        that.gameCode2=that.banlance[that.tab2].gameKey;
                        // that.tab2=999;
                        that.amount = null;
                        that.getBanlance(1);
                    }else {
                        ys.toast(data.msg?data.msg:'转账未成功，请重试')
                    }
                },1);

            },
        }
    });

    var qianbao = api.pageParam.gameCode;
    if(qianbao=="LOTTERY"){
        qianbao = 'LOTTO'
    }
    vCont.gameCode=qianbao;
    vCont.getBanlance();
    vCont.checkCode();
    //登录监听
    api.addEventListener({name:'send_login'},function(ret,err){
        vCont.getBanlance();
        vCont.checkCode();
    });
    // xiala(function () {
    //     vCont.getBanlance();
    //     vCont.checkCode();
    // });

};