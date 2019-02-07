/**
 * Created by pitt on 18/7/28.
 */
$('body').addClass('tm');

//下拉列表焦点缓存在index.js清除
var xz = {
    dat_dz_1:[
        {id: 0, value: '全部游戏'},
        {id: 1, value: '热门游戏'},
        {id: 2, value: '奖金池游戏'},
        {id: 3, value: '最新游戏'},
        {id: 4, value: '我的收藏'}
    ],
    dat_dz_2: $api.getStorage('menu_dz')?$api.getStorage('menu_dz'):
        [{id: 0, value: '全部'}],
    dat_dz_3:[],

    dat_yh:   $api.getStorage('menu_yh')?$api.getStorage('menu_yh'):
        [{id: '0', value: '全部优惠'}],

    dat_tz_1: $api.getStorage('menu_tz')?$api.getStorage('menu_tz'):
        [{id: 0, value: '全部平台'}],
    dat_tz_2:[
        {id: 999, value: '全部'},
        {id: 1, value: '返水'},
        {id: 0, value: '不返水'}
    ],
    dat_tz_3:[
        {id: 999, value: '全部状态'},
        {id: 1, value: '已结算'},
        {id: 0, value: '未结算'}
        ],


    xzObj:null
};



var now = new Date();
var nowYear = now.getFullYear();

function getYMD(d,t) {
    var e = new Date(d);
    return t==0?e.getFullYear():t==1?e.getMonth()+1:e.getDate()
}
function formatYear (nowYear) {
    var arr = [];
    for (var i = 2018; i <= nowYear; i++) {
        arr.push({
            id: i,
            value: i + '年'
        });
    }
    return arr;
}
function formatMonth () {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
        arr.push({
            id: i + '',
            value: i + '月'
        });
    }
    return arr;
}
function formatDate (count) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
        arr.push({
            id: i + '',
            value: i + '日'
        });
    }
    return arr;
}
var yearData = function(callback) {
    callback(formatYear(nowYear))
}
var monthData = function (year, callback) {
    callback(formatMonth());
};
var dateData = function (year, month, callback) {
    if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(31));
    }
    else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(30));
    }
    else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
            callback(formatDate(29));
        }
        else {
            callback(formatDate(28));
        }
    }
    else {
        throw new Error('month is illegal');
    }

};


var getMenuDz3= function(a,b,callback){
    ys.ajax("api/gameslot/getGameType", "get",parseInt(b)==0?{}:{
        gameCode:xz.dat_dz_2[b].value
    },function(data,err){
        xz.dat_dz_3=[];
        if(data.resObj){
            data.resObj.forEach(function (x,ind) {
                xz.dat_dz_3.push(
                    {
                        id:x.gameTypeId,
                        value:x.gameTypeName,
                        parentId:b,
                    }
                )
            })
        }else {
            xz.dat_dz_3.push(
                {
                    id:0,
                    value:'全部',
                    parentId:'0',
                }
            )
        }
        callback(xz.dat_dz_3);
    });
};

var getMenuZj1= function(callback){
    var arr=[{id:999,value:'全部'}],obj=$api.getStorage('menu_zj');
    obj.forEach(function (x,ind) {
        arr.push(
            {
                id:ind,
                value:x.assetName,
            }
        )
    });
    callback(arr);
};
var getMenuZj2= function(a,callback){
    var arr=[{id:999,value:'全部'}],obj=$api.getStorage('menu_zj');
    if(a==999){
        var narr1 = [];
        var narr2 = [];
        obj.forEach(function (x) {
            x.assetStateList.forEach(function (sx) {
                narr1.push(sx.assetStateCode);
                narr2.push(sx.assetStateName);
            });
        });
        narr1 = $.unique(narr1);
        narr2 = $.unique(narr2);
        narr1.forEach(function (x,i) {
            arr.push({id:x,value:narr2[i]})
        })

    }else {
        obj[a].assetStateList.forEach(function (x,ind) {
            arr.push(
                {
                    id:x.assetStateCode,
                    value:x.assetStateName,
                }
            )
        })

    }
    callback(arr);
};


/**
 * 0 时间
 * 3 电子游戏
 * 6 优惠活动
 * 10+0 投注记录
 * 10+2 资金记录
 * @param t
 */

function xzInit(t) {

    xz.xzObj=null;
    switch (parseInt(t)){
        case 0:
            var day = $api.getStorage('li_date');
            xz.xzObj = new IosSelect(
                3,
                [yearData, monthData, dateData],
                {
                    title: '选择日期',
                    itemHeight: 35,
                    relation: [1, 1, 0, 0],
                    oneLevelId: getYMD(day,0),
                    twoLevelId: getYMD(day,1),
                    threeLevelId: getYMD(day,2),
                    showLoading:true,
                    callback: function (aa, bb, cc) {
                        api.sendEvent({name:"date_set",extra:{
                                t:aa.id+'-'+bu0(bb.id)+'-'+bu0(cc.id)
                            }
                        });
                        closeMe();
                    }
                });
            break;
        case 3:
            xz.xzObj = new IosSelect(
                3,
                [xz.dat_dz_1, xz.dat_dz_2, getMenuDz3],
                {
                    title: '游戏筛选',
                    itemHeight: 35,
                    oneLevelId: $api.getStorage('zt_dz')?$api.getStorage('zt_dz').a:null,
                    twoLevelId: $api.getStorage('zt_dz')?$api.getStorage('zt_dz').b:null,
                    threeLevelId: $api.getStorage('zt_dz')?$api.getStorage('zt_dz').c:null,
                    showLoading:true,
                    callback: function (aa, bb, cc) {
                        $api.setStorage('zt_dz',{a:aa.id,b:bb.id,c:cc.id});
                        api.sendEvent({name:"sear_evt_dz",extra:{
                                key:2,
                                titleSet:aa.id,
                                gamePlatfromType:bb.value,
                                category:cc.id,
                            }
                        });
                        closeMe();
                    }
                });
            break;
        case 6:
            xz.xzObj = new IosSelect(
                1,
                [xz.dat_yh],
                {
                    title: '优惠筛选',
                    itemHeight: 35,
                    oneLevelId: $api.getStorage('zt_yh')?$api.getStorage('zt_yh'):null,
                    callback: function (dd) {
                        $api.setStorage('zt_yh',dd.id);
                        api.sendEvent({name:"sear_evt_yh",extra:{
                                key:2,
                                val:dd.id
                            }
                        });
                        closeMe();
                    }
                });
            break;
        case 10:

            xz.xzObj = new IosSelect(
                3,
                [xz.dat_tz_1, xz.dat_tz_2, xz.dat_tz_3],
                {
                    title: '投注记录筛选',
                    itemHeight: 35,
                    oneLevelId: $api.getStorage('zt_tz')?$api.getStorage('zt_tz').a:null,
                    twoLevelId: $api.getStorage('zt_tz')?$api.getStorage('zt_tz').b:null,
                    threeLevelId: $api.getStorage('zt_tz')?$api.getStorage('zt_tz').c:null,
                    callback: function (aa, bb, cc) {
                        $api.setStorage('zt_tz',{a:aa.id,b:bb.id,c:cc.id});
                        api.sendEvent({name:"sear_evt_tz",extra:{
                                a:aa.id,
                                b:bb.id,
                                c:cc.id,
                            }
                        });
                        closeMe();
                    }
                });
            break;

        case 12:
            xz.xzObj = new IosSelect(
                2,
                [getMenuZj1, getMenuZj2],
                {
                    title: '资金记录筛选',
                    itemHeight: 35,
                    oneLevelId: $api.getStorage('zt_zj')?$api.getStorage('zt_zj').a:null,
                    twoLevelId: $api.getStorage('zt_zj')?$api.getStorage('zt_zj').b:null,
                    callback: function (aa, bb) {
                        $api.setStorage('zt_zj',{a:aa.id,b:bb.id});
                        api.sendEvent({name:"sear_evt_zj",extra:{
                                a:aa.id,
                                b:bb.id
                            }
                        });
                        closeMe();
                    }
                });
            break;
    }

    setTimeout(function () {
        $('body').addClass('show');
    },200);
}
function closeMe(){
    api.closeFrame();
}

// xzInit(5);

apiready = function () {
    xzInit(api.pageParam.t);
};

