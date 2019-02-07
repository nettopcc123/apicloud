




apiready = function () {
    vCont = new Vue({
        el: '#app',
        data:{
            titSet:3,
            timeSet:1,
            title:['客户报表','运营报表','推广报表','周结单'],
            start: datePlus(toDay,-2),
            end: toDay,
            key:null,
            totalAmount:null
        },
        computed:{

        },
        components:{

        },
        methods: {
            setDay:function (i) {
                switch (i){
                    case 0:
                        this.start = toDay;
                        break;
                    case 1:
                        this.start = datePlus(toDay,-2);
                        break;
                    case 2:
                        this.start = datePlus(toDay,-6);
                        break;
                    case 3:
                        this.start = datePlus(toDay,-29);
                        break;
                }
                this.end = toDay;
                this.evtSend();
            },
            evtSend:function () {
                api.sendEvent({name:'set_nav_time',extra:{start:this.start, end:this.end}})
            },
            search:function () {
                var key = isEmpty(this.key)?null:this.key;
                api.sendEvent({name:'sme_evt_yh', extra:{key:key}})
            },
            getData4:function () {
                ys.ajax('api/agent/weekReportTotal', "get", {}, function (data) {
                    if(data.resCode==1){
                        vCont.totalAmount = data.resObj.totalAmount
                    }
                });
            }
        },
        mounted: function() {
            if(api.pageParam.t == 3){
                this.getData4()
            }
        }
    });

    //退出登录监听
    api.addEventListener({name:'send_logout'},function(ret,err){
        api.closeWin();
    });
    vCont.titSet = api.pageParam.t;
    api.openFrame({
        name: 'agent_b_'+vCont.titSet,
        url: 'agent_b_'+vCont.titSet+'.html',
        rect: {
            x: 0,
            y: headerH*1.8,
            h: vCont.titSet==0 ? api.winHeight - headerH*2.6 : api.winHeight - headerH*1.8
        }
    });

    api.addEventListener({name:'date_set'},function (ret) {
        var t = dateDiff(toDay,ret.value.t)>0?toDay:ret.value.t;
        if(vCont.timeSet==1){
            vCont.start = t
        }else {
            vCont.end = t
        }
        if(dateDiff(vCont.end,vCont.start)>0){
            var nt = vCont.start;
            vCont.start = vCont.end;
            vCont.end = nt;
        }
        vCont.evtSend();
    });


};
function filter(t) {
    var tmd = 0;
    if(t){
        vCont.timeSet = t;
        $api.setStorage('li_date',vCont.timeSet==1?vCont.start:vCont.end)
    }else {
        tmd = parseInt(vCont.titSet + 10);
    }
    api.openFrame({
        name: 'select',
        url: 'select.html',
        rect: {
            x: 0,
            y: 0
        },
        pageParam: {t: tmd},
        bounces: false
    })
}


// apiready();