/**
 * Created by pitt on 18/7/28.
 */


apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            info:null
        },
        methods: {
            more:function () {
                comHead('公告中心','news');
                setTimeout(function () {
                    api.closeFrame({name:'news_det'});
                },500)
            }
        }
    });
    vCont.info = api.pageParam;
    setTimeout(function () {
        $('.news_pop').removeClass('zoom');
    },100)
};

