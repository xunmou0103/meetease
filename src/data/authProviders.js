/** 演示用第三方登录方式（模拟 OAuth，无真实跳转） */
export const loginProviders = [
  {
    id: 'meituan',
    name: '美团',
    color: '#f5a623',
    desc: '美团统一账号登录',
  },
  {
    id: 'wechat',
    name: '微信',
    color: '#07c160',
    desc: '使用微信扫码或授权登录',
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    color: '#0089ff',
    desc: '钉钉企业/个人账号',
  },
  {
    id: 'feishu',
    name: '飞书',
    color: '#3370ff',
    desc: '飞书企业账号',
  },
  {
    id: 'phone',
    name: '手机号',
    color: '#2563eb',
    desc: '验证码快捷登录',
  },
];

/** 各渠道模拟用户资料（演示） */
export const providerMockProfiles = {
  meituan: {
    providerUserId: 'mt_u_zhangsan',
    displayName: '张三',
    email: 'zhangsan@meituan.com',
    avatar: null,
  },
  wechat: {
    providerUserId: 'wx_u_zhangsan',
    displayName: '张三',
    email: 'zhangsan@demo.meetease.com',
    avatar: null,
  },
  dingtalk: {
    providerUserId: 'dd_u_lisi',
    displayName: '李四',
    email: 'lisi@demo.meetease.com',
    avatar: null,
  },
  feishu: {
    providerUserId: 'fs_u_wangwu',
    displayName: '王五',
    email: 'wangwu@demo.meetease.com',
    avatar: null,
  },
  phone: {
    providerUserId: 'phone_13800001234',
    displayName: '手机用户',
    email: 'mobile@demo.meetease.com',
    avatar: null,
  },
};
