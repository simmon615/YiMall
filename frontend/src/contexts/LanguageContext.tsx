
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'km' | 'zh';

// Dictionary
const translations = {
  en: {
    // Common
    app_name: "YiMall",
    home: "Home",
    profile: "Profile",
    cart: "Cart",
    loading: "Loading...",
    currency: "$",
    
    // Home
    search_placeholder: "Search items...",
    location: "Phnom Penh",
    banner_text: "Start Your Business in Cambodia",
    recommendation: "Recommendation",
    
    // Quick Access
    qa_topup: "Top-up",
    qa_points: "Points",
    qa_profile: "Profile",
    qa_support: "Support",
    
    // Profile
    id: "ID",
    points_label: "Points",
    shop_wallet: "Shop Wallet",
    cash_balance: "Cash Balance",
    btn_topup: "+ Top Up",
    btn_withdraw: "Withdraw",
    btn_withdraw_desc: "Exchange to Cash",
    menu_orders: "Order History",
    menu_team: "My Team",
    menu_settings: "Settings",
    btn_logout: "Sign Out",

    // Settings & Support
    settings_title: "Settings",
    language_label: "Language",
    about_us: "About Us",
    version: "Version",
    support_title: "Support Center",
    contact_support: "Contact Support (Telegram)",
    faq: "FAQ",

    // Team
    team_title: "My Team",
    total_members: "Total Members",
    commission_pts: "Commission (Pts)",
    today_gain: "today",
    invite_friends: "Invite Friends",
    invite_desc: "Earn up to 50% commission",
    btn_link: "Link",
    tab_members: "Team Members",
    tab_commissions: "Commissions",
    joined: "Joined",
    sales: "Sales",
    invited_by: "Invited by",
    level: "Level",
    from: "from",

    // Orders
    orders_title: "My Orders",
    tab_all: "All",
    tab_pending: "Pending",
    tab_shipping: "Shipping",
    tab_completed: "Completed",
    no_orders: "No orders found",
    btn_confirm_received: "Confirm Received",
    total: "Total",

    // Cart
    cart_title: "My Cart",
    cart_empty_title: "Your cart is empty",
    cart_empty_desc: "Looks like you haven't added anything to your cart yet.",
    btn_start_shopping: "Start Shopping",
    subtotal: "Subtotal",
    btn_checkout: "Checkout",
    gets_points: "Gets",
    pts: "Points",

    // Checkout
    checkout_title: "Checkout",
    order_summary: "Order Summary",
    shipping_fee: "Shipping",
    payment_method: "Payment Method",
    wallet_recharge: "Recharge Wallet",
    wallet_shopping: "Shopping Wallet",
    balance: "Balance",
    insufficient_balance: "Insufficient Balance",
    mixed_payment_error: "* Mixed payment is not supported",
    btn_pay: "Pay",
    pay_success: "Payment Successful!",

    // Interceptor
    interceptor_title: "Invitation Required",
    interceptor_desc: "YiMall is a private community. You need an invitation to join.",
    input_placeholder: "Referrer ID / Phone Number",
    btn_join: "Join Now",
    security_text: "YiMall Cambodia Security System",
    error_referrer: "Please enter a valid Referrer ID",
  },
  km: {
    // Common
    app_name: "YiMall",
    home: "ទំព័រដើម",
    profile: "ប្រវត្តិរូប",
    cart: "កន្ត្រក",
    loading: "កំពុងដំណើរការ...",
    currency: "$",
    
    // Home
    search_placeholder: "ស្វែងរកទំនិញ...",
    location: "ភ្នំពេញ",
    banner_text: "ចាប់ផ្តើមអាជីវកម្មរបស់អ្នកនៅកម្ពុជា",
    recommendation: "ការណែនាំ",
    
    // Quick Access
    qa_topup: "បញ្ចូលលុយ",
    qa_points: "ពិន្ទុ",
    qa_profile: "ប្រវត្តិរូប",
    qa_support: "ជំនួយ",
    
    // Profile
    id: "អត្តសញ្ញាណ",
    points_label: "ពិន្ទុ",
    shop_wallet: "កាបូបទំនិញ",
    cash_balance: "សមតុល្យសាច់ប្រាក់",
    btn_topup: "+ បញ្ចូល",
    btn_withdraw: "ដកប្រាក់",
    btn_withdraw_desc: "ប្តូរទៅជាសាច់ប្រាក់",
    menu_orders: "ប្រវត្តិការបញ្ជាទិញ",
    menu_team: "ក្រុមរបស់ខ្ញុំ",
    menu_settings: "ការកំណត់",
    btn_logout: "ចាកចេញ",

    // Settings & Support
    settings_title: "ការកំណត់",
    language_label: "ភាសា",
    about_us: "អំពីយើង",
    version: "ជំនាន់",
    support_title: "មជ្ឈមណ្ឌលជំនួយ",
    contact_support: "ទាក់ទងជំនួយ (Telegram)",
    faq: "សំណួរដែលសួរញឹកញាប់",

    // Team
    team_title: "ក្រុមរបស់ខ្ញុំ",
    total_members: "សមាជិកសរុប",
    commission_pts: "កម្រៃជើងសារ (ពិន្ទុ)",
    today_gain: "ថ្ងៃនេះ",
    invite_friends: "អញ្ជើញមិត្តភក្តិ",
    invite_desc: "ទទួលបានកម្រៃជើងសាររហូតដល់ 50%",
    btn_link: "តំណភ្ជាប់",
    tab_members: "សមាជិកក្រុម",
    tab_commissions: "កម្រៃជើងសារ",
    joined: "ចូលរួម",
    sales: "ការលក់",
    invited_by: "អញ្ជើញដោយ",
    level: "កម្រិត",
    from: "ពី",

    // Orders
    orders_title: "ការបញ្ជាទិញ",
    tab_all: "ទាំងអស់",
    tab_pending: "រង់ចាំ",
    tab_shipping: "ដឹកជញ្ជូន",
    tab_completed: "បានបញ្ចប់",
    no_orders: "រកមិនឃើញការបញ្ជាទិញទេ",
    btn_confirm_received: "បញ្ជាក់ការទទួល",
    total: "សរុប",

    // Cart
    cart_title: "កន្ត្រករបស់ខ្ញុំ",
    cart_empty_title: "កន្ត្រកទទេ",
    cart_empty_desc: "អ្នកមិនទាន់បានបន្ថែមអ្វីចូលក្នុងកន្ត្រកទេ",
    btn_start_shopping: "ចាប់ផ្តើមទិញទំនិញ",
    subtotal: "សរុបបឋម",
    btn_checkout: "ទូទាត់ប្រាក់",
    gets_points: "ទទួលបាន",
    pts: "ពិន្ទុ",

    // Checkout
    checkout_title: "ទូទាត់ប្រាក់",
    order_summary: "សង្ខេបការបញ្ជាទិញ",
    shipping_fee: "ដឹកជញ្ជូន",
    payment_method: "វិធីសាស្រ្តទូទាត់",
    wallet_recharge: "កាបូបបញ្ចូលលុយ",
    wallet_shopping: "កាបូបទំនិញ",
    balance: "សមតុល្យ",
    insufficient_balance: "សមតុល្យមិនគ្រប់គ្រាន់",
    mixed_payment_error: "* មិនគាំទ្រការទូទាត់ចម្រុះទេ",
    btn_pay: "បង់ប្រាក់",
    pay_success: "ការទូទាត់ជោគជ័យ!",

    // Interceptor
    interceptor_title: "ត្រូវការការអញ្ជើញ",
    interceptor_desc: "YiMall គឺជាសហគមន៍ឯកជន។ អ្នកត្រូវការការអញ្ជើញដើម្បីចូលរួម។",
    input_placeholder: "លេខសម្គាល់អ្នកណែនាំ / លេខទូរស័ព្ទ",
    btn_join: "ចូលរួមឥឡូវនេះ",
    security_text: "ប្រព័ន្ធសុវត្ថិភាព YiMall កម្ពុជា",
    error_referrer: "សូមបញ្ចូលលេខសម្គាល់អ្នកណែនាំឱ្យបានត្រឹមត្រូវ",
  },
  zh: {
    // Common
    app_name: "YiMall",
    home: "首页",
    profile: "我的",
    cart: "购物车",
    loading: "加载中...",
    currency: "$",
    
    // Home
    search_placeholder: "搜索商品...",
    location: "金边",
    banner_text: "在柬埔寨开启您的生意",
    recommendation: "为您推荐",
    
    // Quick Access
    qa_topup: "充值",
    qa_points: "积分",
    qa_profile: "个人中心",
    qa_support: "客服",
    
    // Profile
    id: "ID",
    points_label: "积分",
    shop_wallet: "购物金",
    cash_balance: "现金余额",
    btn_topup: "+ 充值",
    btn_withdraw: "提现",
    btn_withdraw_desc: "积分兑换现金",
    menu_orders: "订单历史",
    menu_team: "我的团队",
    menu_settings: "设置",
    btn_logout: "退出登录",

    // Settings & Support
    settings_title: "设置",
    language_label: "语言",
    about_us: "关于我们",
    version: "版本",
    support_title: "帮助中心",
    contact_support: "联系客服 (Telegram)",
    faq: "常见问题",

    // Team
    team_title: "我的团队",
    total_members: "团队总人数",
    commission_pts: "累计佣金 (分)",
    today_gain: "今日新增",
    invite_friends: "邀请好友",
    invite_desc: "赚取高达 50% 佣金奖励",
    btn_link: "复制链接",
    tab_members: "团队成员",
    tab_commissions: "佣金明细",
    joined: "加入时间",
    sales: "业绩",
    invited_by: "邀请人",
    level: "级",
    from: "来自",

    // Orders
    orders_title: "我的订单",
    tab_all: "全部",
    tab_pending: "待发货",
    tab_shipping: "运输中",
    tab_completed: "已完成",
    no_orders: "暂无订单",
    btn_confirm_received: "确认收货",
    total: "总计",

    // Cart
    cart_title: "购物车",
    cart_empty_title: "购物车为空",
    cart_empty_desc: "快去挑选心仪的商品吧",
    btn_start_shopping: "去逛逛",
    subtotal: "小计",
    btn_checkout: "去结算",
    gets_points: "获得",
    pts: "积分",

    // Checkout
    checkout_title: "确认订单",
    order_summary: "订单摘要",
    shipping_fee: "运费",
    payment_method: "支付方式",
    wallet_recharge: "充值余额",
    wallet_shopping: "购物金",
    balance: "余额",
    insufficient_balance: "余额不足",
    mixed_payment_error: "* 不支持组合支付 (单账户全额扣款)",
    btn_pay: "立即支付",
    pay_success: "支付成功！",

    // Interceptor
    interceptor_title: "需要邀请",
    interceptor_desc: "YiMall 是私域会员制商城，您需要邀请码才能加入。",
    input_placeholder: "输入推荐人ID / 手机号",
    btn_join: "立即加入",
    security_text: "YiMall 柬埔寨安全系统",
    error_referrer: "请输入有效的推荐人ID",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'km',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('yimall_lang') as Language) || 'km';
  });

  useEffect(() => {
    localStorage.setItem('yimall_lang', language);
    // Optional: Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
