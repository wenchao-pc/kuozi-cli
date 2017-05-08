// 模块code
export const moduleCode = {
    // 首页
    home: "M0001",
    // 定投专区
    autoInvest: "M0002",
    // 新手100元
    newPlayer: "M0003",
    // 建投优选
    healthInvest: "M0004"
};
// 文章类型 type
export const article = {
    note: 1,
    history: 2,
    invest: 3,
};
//功能区模块字典
export const moduleDictionary = {
    // 定投专区
    HOME_FIXTRADE: "autoInvestment",
    // 新手100区
    HOME_100: "newPlayer",
    // 建投策略
    HOME_STRATEGY: "healthInvest",
    // 基金排行
    HOME_FUNDRANKING: "fundOrder",
    // 定头排行榜
    FIXTRADE_RANKING: "autoInvestmentOrder",
    // 定投小知识
    FIXTRADE_KNOWLEDGE: "autoInvestmentKnowledge",
    // 基金交易
    TRADE_FUND: "trade",
    // 开户
    TRADE_OPENACCOUNT: "register",
    // 认购/申购
    TRADE_BUY: "apply",
    // 基金赎回
    TRADE_REDEMPTION: "redeem",
    // 我的定投
    TRADE_MYFIX: "myAutoInvestment"
};
//基金收益类型
export const profitTypes = {
    dayinc: "近一日收益",
    weekinc: "近一周收益",
    monthinc: "近一个月收益",
    seasonhinc: "近三个月收益",
    halfyear: "近六个月收益",
    yearinc: "近一年收益",
    thisyearinc: "今年以来收益",
    setupinc: "设立以来收益",
    incomeratio: "七日年化",
    hfincomeratio: "万份收益"
};

//定投状态
export const investState = {
    A: "启用",
    P: "暂停",
    H: "终止"
};

// 功能区样式
export const functionTypes = {
    style_no1: "type1",
    style_no2: "type2"
};
//模块控制
export const moduleCtrl = {
    // banner
    banner: {
        name: "banner",
        describe: "banner",
        show: false,
        method: "getBanner"
    },
    // 功能区
    function: {
        name: "function",
        describe: "功能区",
        show: false,
        method: "getFunction"
    },
    // 推荐基金
    fundRecommend: {
        name: "fundRecommend",
        describe: "推荐基金",
        show: false,
        method: "getFundRecommend"
    },
    // 公告
    announcement: {
        name: "announcement",
        describe: "公告",
        show: false,
        method: "getAnnouncement"
    },
    // 我的自选
    myfund: {
        name: "myfund",
        describe: "我的自选",
        show: false,
        method: "getMyFund"
    },
    //基金池
    fundPool: {
        name: "fundPool",
        describe: "基金池",
        show: false,
        method: "getFundPool"
    },
    //市场回顾
    market: {
        name: "market",
        describe: "市场回顾",
        show: false,
        method: "getMarket"
    },
    //投资建议
    advice: {
        name: "advice",
        describe: "投资建议",
        show: false,
        method: "getAdvice"
    },
    //组合推荐
    group: {
        name: "group",
        describe: "组合推荐",
        show: false,
        method: "getGroup"
    }
};
// 收费方式
export const allShareType = {
    A: "前收费",
    B: "后收费"
};
// 收费周期
export const cycles = [{
    name: "每月",
    cycleunit: 0,
    jyzq: 1
}, {
    name: "每周",
    cycleunit: 1,
    jyzq: 1
}, {
    name: "每两周",
    cycleunit: 1,
    jyzq: 2
}];
// 收费周期为周时 交易日期
export const jyrqs = [{
    name: "周一",
    jyrq: 2
}, {
    name: "周二",
    jyrq: 3
}, {
    name: "周三",
    jyrq: 4
}, {
    name: "周四",
    jyrq: 5
}, {
    name: "周五",
    jyrq: 6
}];

// 风险等级
export const riskLevel = {
    "height": {
        name: "高",
        level: "height"
    },
    "middle-height": {
        name: "中高",
        level: "middle-height"
    },
    "middle": {
        name: "中",
        level: "middle"
    },
    "middle-low": {
        name: "中低",
        level: "middle-low"
    },
    "low": {
        name: "低",
        level: "low"
    }
}
