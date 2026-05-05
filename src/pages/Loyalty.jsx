    import "../App.css";
    import logo from "../assets/logo.png";
    import React, { useState } from "react";
    import { Link } from "react-router-dom";
    import {
        Bell, LogOut, Box, LayoutDashboard, ShoppingBag, PlayCircle,
        BarChart3, Settings, Calendar, Star, ArrowUpRight, ArrowDownRight,
        Search, UserCircle, Archive, Briefcase, Gift, UserCheck, Wallet,
        X,RefreshCw, Plus, Users, ShieldCheck, ArrowRightLeft,User2 ,FileText 
    } from "lucide-react";

    // بيانات إحصائية لإدارة الشركة
    const adminSummaryCards = [
        {
            title: "إجمالي النقاط الموزعة",
            value: "154,200",
            subtitle: "نقطة",
            icon: Star,
            color: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            title: "نقاط تم استبدالها",
            value: "42,600",
            subtitle: "نقطة",
            icon: ArrowRightLeft,
            color: "bg-emerald-50",
            textColor: "text-emerald-700",
        },
        {
            title: "العملاء النشطون",
            value: "1,240",
            subtitle: "عميل",
            icon: Users,
            color: "bg-purple-50",
            textColor: "text-purple-700",
        },
    ];

    // سجل الحركات (مضاف إليه اسم العميل للشركة)
    const transactions = [
        { customer: "أحمد علي", date: "2025-05-25", description: "طلب #1258", amount: "+210", type: "earned" },
        { customer: "سارة محمد", date: "2025-05-20", description: "استبدال يدوياً", amount: "-500", type: "redeemed" },
        { customer: "خالد فهد", date: "2025-05-18", description: "طلب #1205", amount: "+180", type: "earned" },
        { customer: "نورة حسن", date: "2025-05-15", description: "مكافأة تسجيل", amount: "+100", type: "earned" },
    ];

    function MenuItem({ icon, text, active, to }) {
        return (
            <Link
                to={to || "/"}
                className={`p-3.5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all no-underline ${active ? "bg-[#4A7FA7]" : "opacity-50 hover:opacity-100"
                    }`}>
                <span className="text-white">{icon}</span>
                <span className="text-xs font-bold text-white">{text}</span>
            </Link>
        );
    }

    export default function LoyaltyAdmin() {
        const [filter, setFilter] = useState("الكل");
        const [search, setSearch] = useState("");
        const [showManualEntry, setShowManualEntry] = useState(false);

        const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
        const [showNotifications, setShowNotifications] = useState(false);

        const filteredTransactions = transactions.filter((item) => {
            const matchesFilter =
                filter === "الكل" ||
                (filter === "مكتسبة" && item.type === "earned") ||
                (filter === "مستخدمة" && item.type === "redeemed");
            const query = search.trim().toLowerCase();
            return matchesFilter && (query === "" || item.customer.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
        });

        return (
            <div className="w-full min-h-screen bg-[#F8FAFC] flex items-start overflow-y-auto" dir="rtl">
                {/* Sidebar */}
            <div className="sidebar">
            <div className="logo-section">
            <Box size={18} />
                <h2 className="logo-text">نظام إدارة المغاسل</h2>
            </div>
            
            <div className="user-profile">
                <div className="user-avatar">N</div>
                <div className="user-info">
                <span className="user-name">نُهى نبيل</span>
                <span className="user-role">موظف تشغيل</span>
                </div>
            </div>
                    <nav className="flex flex-col gap-1 flex-1">
            <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/control" />
            <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" to="/orders"/>
            <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" />
            <MenuItem icon={<User2 size={18} />} text="العملاء" to="/customers" />
            <MenuItem icon={<FileText size={18} />} text="الفواتير" to="/invoices" />
            <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard"  />
            <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" />
            <MenuItem icon={<Briefcase size={18} />} text="الخدمات والأسعار" to="/services" />
            <MenuItem icon={<Gift size={18} />} text="العروض والخصومات" to="/offers" />
            <MenuItem icon={<BarChart3 size={18} />} text="التقارير" to="/reports" />
            <MenuItem icon={<Wallet size={18} />} text="لوحة المحاسب" to="/accountant" />
            <MenuItem icon={<UserCheck size={18} />} text="لوحة مدير الفرع" to="/branch" />
            <MenuItem icon={<Star size={18} />} text="نقاط الولاء " to="/loyalty" active/>
            <MenuItem icon={<Settings size={18} />} text="الإعدادات" />
                <div className="status-toggle">
                    <RefreshCw size={18} className="status-icon" />
                    <span className="status-text">تغيير الحالة العام</span>
                </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                            <Calendar size={18} className="text-[#4A7FA7]" />
                            <span>الثلاثاء 28 أبريل 2026</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-xl shadow-sm cursor-pointer">
                                    {/* زر الإشعارات التفاعلي */}
                                    <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
                                </div>
                            <div className="p-2 bg-white rounded-xl shadow-sm cursor-pointer text-red-400">
                                {/* زر الخروج التفاعلي */}
                                <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
                                </div>
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tighter">نظام نقاط الولاء</h1>
                            <p className="text-gray-500 text-sm mt-1">قيمة النقاط الخاصة بالشركة</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowManualEntry(!showManualEntry)} className="bg-[#4A7FA7] text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#3f8cae] transition-all flex items-center gap-2">
                                <Plus size={18} /> {showManualEntry ? "العودة للسجل" : "إضافة/خصم يدوي"}
                            </button>
                        </div>
                    </div>

                    {/* Manual Entry Form Section */}
                    {showManualEntry ? (
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-100 mb-8 animate-in fade-in duration-500">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">حدد قيمة النقطة الواحدة التي يحصل عليها العميل عند الاستبدال</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-400 mr-2">النقطة الواحدة</label>
                                    <input type="number" placeholder="0" className="bg-gray-50 border border-gray-100 p-3 rounded-2xl outline-none focus:border-[#4A7FA7]" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-400 mr-2">قيمتها بالريال</label>
                                    <input type="number" placeholder="0" className="bg-gray-50 border border-gray-100 p-3 rounded-2xl outline-none focus:border-[#4A7FA7]" />
                                </div>
                                <div className="flex items-end">
                                    <button className="w-full bg-[#2F5D7C] text-white p-3 rounded-2xl font-bold hover:bg-[#1e3d52] transition-all">
                                        تأكيد العملية
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Admin Stats Cards */}
                            <div className="grid gap-5 xl:grid-cols-3 mb-8">
                                {adminSummaryCards.map((card) => {
                                    const Icon = card.icon;
                                    return (
                                        <div key={card.title} className="bg-white rounded-[2rem] p-6 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className={`inline-flex p-3 rounded-2xl ${card.color}`}>
                                                <Icon size={20} className={card.textColor} />
                                            </div>
                                            <div className="mt-5">
                                                <span className="block text-sm font-bold text-gray-400 mb-1">{card.title}</span>
                                                <div className="flex items-end gap-2">
                                                    <h2 className="text-3xl font-bold text-gray-900">{card.value}</h2>
                                                    <span className="text-xs text-gray-400 mb-1 font-bold">{card.subtitle}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Transaction Table Section */}
                            <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 p-6">
                                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
                                    <div className="relative w-full max-w-sm">
                                        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="text"
                                            placeholder="البحث باسم العميل أو الوصف..."
                                            className="w-full bg-gray-50 border border-gray-100 pr-11 pl-4 py-3 rounded-2xl text-sm outline-none focus:border-[#4A7FA7]/30 transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {['الكل', 'مكتسبة', 'مستخدمة'].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setFilter(item)}
                                                className={`px-6 py-2.5 rounded-xl text-[12px] font-bold transition-all ${filter === item ? "bg-[#4A7FA7] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                    }`}>
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-right border-separate border-spacing-y-3">
                                        <thead>
                                            <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                                <th className="pr-6 pb-2">العميل</th>
                                                <th className="pb-2">التاريخ</th>
                                                <th className="pb-2">الوصف</th>
                                                <th className="pb-2 text-left pl-6">النقاط</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTransactions.map((item, index) => (
                                                <tr key={index} className="bg-white hover:bg-gray-50 transition-all rounded-2xl shadow-sm border border-gray-50">
                                                    <td className="p-4 pr-6 rounded-r-2xl">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                                {item.customer[0]}
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-700">{item.customer}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-xs text-gray-400 font-medium">{item.date}</td>
                                                    <td className="text-sm text-gray-600 font-medium">{item.description}</td>
                                                    <td className="text-left pl-6 rounded-l-2xl">
                                                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-black ${item.type === "earned" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                                                            }`}>
                                                            {item.amount}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
      {/* نافذة تأكيد الخروج */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تأكيد الخروج</h3>
            <p className="text-gray-500 text-sm mb-8 font-medium">هل تريد حقاً الخروج من الحساب؟</p>
            <div className="flex gap-3">
              <button onClick={() => window.location.reload()} className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/20 active:scale-95 transition-all">نعم، خروج</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة الإشعارات */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setShowNotifications(false)} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">الإشعارات</h3>
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Bell size={40} className="mb-4 opacity-20" />
              <p className="text-sm font-bold">لا توجد إشعارات حالية</p>
            </div>
            <button onClick={() => setShowNotifications(false)} className="w-full bg-[#4A7FA7] text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#4A7FA7]/20 active:scale-95 transition-all">إغلاق</button>
          </div>
        </div>
      )}
            </div>
        );
    }