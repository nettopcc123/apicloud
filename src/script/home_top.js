/**
 * Created by pitt on 18/7/28.
 */

apiready = function () {

    vCont = new Vue({
        el: '#app',
        data:{
            hmObj2:null,
            topBanSwiper:null,
            topBanSwiper_unlock:true,

            topInv:null,
            topTsw:0,
            topTsx:0,
        },
        mounted: function() {
            // this.getData(0);
            // this.getData(9);
        },
        methods: {
            getData:function(){
                var that = this;
                ys.ajax('api/home/getWapBanner', 'get', {}, function (res, err) {
                    if(res.resCode==1) {
                        that.hmObj2= res.resObj;
                        $api.setStorage('hmObj2',res.resObj);

                        that.swpInit(2);
                        if(that.topBanSwiper_unlock){
                            that.swpInit(1);
                        }
                    }
                    // ys.alert(res.resObj.news);

                });
            },

            swpInit:function (t) {
                var that = this;
                setTimeout(function () {

                    switch (t) {
                        case 1:
                            that.topBanSwiper_unlock = false;
                            that.topBanSwiper = new Swiper('#topBanner', {
                                autoplay: {
                                    delay: 4000,
                                    disableOnInteraction: false
                                },
                                pagination: {
                                    el: '#topDot',
                                }

                            });
                            var news = that.hmObj2.news;
                            var oldPop = $api.getStorage('news_pops')?$api.getStorage('news_pops'):[];
                            if(news.length>0){
                                news.forEach(function (it) {
                                    var t = new Date(it.updateTime).getTime();
                                    if(it.isModel==1 && oldPop.indexOf(t)<0 ){
                                        toNews(it,1);
                                        oldPop.push(t);
                                        $api.setStorage('news_pops',oldPop);
                                    }
                                });
                            }
                            break;
                        case 2:
                            clearInterval(that.topInv);
                            var xa1 = $('.notice').width();
                            that.topTsw = $('#topNews').width();
                            that.topInv = setInterval(function () {
                                if(that.topTsx>=that.topTsw){
                                    that.topTsx=(0-xa1)
                                }else {
                                    that.topTsx += 1;
                                }
                                $('#topNews').css('transform','translate3d('+(0-that.topTsx)+'px,0,0)');
                            },30);

                            break;
                    }
                },300);

            },
            disDet:function(tp,url){
                if(tp==1){
                    if(/^http/.test(url)){
                        comHead('link',url,true)
                    }
                }else if(!isEmpty(url)) {
                    comHead('澳门金沙优惠活动','det_yh',{id:url},true)
                }
            }
        }
    });
    vCont.getData();

    //刷新监听
    api.addEventListener({name:'home_xl'},function(ret,err){
        // ys.toast(9999);
        vCont.hmObj2 = $api.getStorage('hmObj2');
        vCont.swpInit(2);
    });

};

// apiready();





