
/**
 * Created by pitt on 18/7/28.
 */


vCont = new Vue({
    el: '#app',
    data:{
        tabSet:0,
        tabs:[
            {
                t: '存款',
                i: 'help2'
            },
            {
                t: '取款',
                i: 'help3'
            },
            {
                t: '转账',
                i: 'help4'
            }
        ]
    },
    methods: {
        setTab:function (i) {
            this.tabSet = i;
            api.setFrameGroupIndex({name:'zjz',index:i})
        }
    }
});



apiready = function () {

    $api.fixTabBar($api.byId('footer'));
    vCont.tabSet=api.pageParam.tab;
    api.openFrameGroup({
        name: 'zjz',
        index: vCont.tabSet,
        rect: {
            x: 0,
            y: headerH,
            h: api.winHeight - headerH - footerH
        },
        frames: [
            {
                name: 'zj_ck',
                url: 'zj_ck.html',
                pageParam:{
                    gameCode:api.pageParam.gameCode
                }
            }, {
                name: 'zj_qk',
                url: 'zj_qk.html'
            }, {
                name: 'zj_zz',
                url: 'zj_zz.html',
                pageParam:{
                    gameCode:api.pageParam.gameCode
                }
            }
        ]
    }, function(ret, err) {
        vCont.tabSet = ret.index;
    });
};