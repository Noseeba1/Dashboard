import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Dashboard.css";
import "../App.css";

import {
  Bell, LogOut, Search, AlertTriangle, MessageCircle, ClipboardList,
  Loader2, PackageCheck, CheckCircle2, Calendar, LayoutDashboard,
  ShoppingBag, PlayCircle, FileText, Truck, AlertCircle, BarChart3,
  Settings, ChevronDown, RefreshCw, Box, ChevronRight, Wallet, UserCheck, ChevronLeft,
  X,Star,UserCircle ,Archive, Briefcase, Gift, Edit, Trash2, Plus
} from "lucide-react";

const inventoryData = [
  { id: 301, name: "مسحوق غسيل", type: "مواد غسيل", qty: "150 كجم", min: "50 كجم", status: "متوفر" },
  { id: 302, name: "معطر ملابس", type: "مواد غسيل", qty: "20 لتر", min: "30 لتر", status: "منخفض" },
  { id: 303, name: "أكياس تغليف كبيرة", type: "مواد تغليف", qty: "0", min: "1000", status: "نافد" },
  { id: 304, name: "علاقات ملابس", type: "أخرى", qty: "5000", min: "1000", status: "متوفر" },
  { id: 305, name: "أكياس تغليف صغيرة", type: "مواد تغليف", qty: "450", min: "500", status: "منخفض" },
  { id: 306, name: "صابون سائل", type: "مواد غسيل", qty: "80 لتر", min: "40 لتر", status: "متوفر" },
];

function MenuItem({ icon, text, active, to }) {
  return (
    <Link 
      to={to || "/"} 
      className={`p-3.5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all no-underline ${
        active ? "bg-[#4A7FA7]" : "opacity-40 hover:opacity-100"
      }`}
    >
      <span className="text-white">{icon}</span>
      <span className="text-xs font-bold text-white">{text}</span>
    </Link>
  );
}

export default function Inventory() {
    const [filter, setFilter] = useState("الكل");
    const [search, setSearch] = useState("");

    const [showInventoryModal, setShowInventoryModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
    
    const categories = ["الكل", "مواد غسيل", "مواد تغليف", "أخرى"];
    const filteredInventory = inventoryData.filter((item) => {
    const matchesCategory = filter === "الكل" || item.type === filter;

    // التأكد من مطابقة نص البحث
    const query = search.trim().toLowerCase();
    const matchesSearch = 
    item.name.toLowerCase().includes(query) || 
    item.id.toString().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard-panel">
      <div className="dashboard-wrapper">
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

          <nav className="navigation">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/" />
          <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" />
          <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" />
          <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard"  />
          <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" active/>
          <MenuItem icon={<Briefcase size={18} />} text="الخدمات والأسعار" to="/services" />
          <MenuItem icon={<Gift size={18} />} text="العروض والخصومات" to="/offers" />
          <MenuItem icon={<BarChart3 size={18} />} text="التقارير" to="/reports" />
          <MenuItem icon={<Wallet size={18} />} text="لوحة المحاسب" to="/accountant" />
          <MenuItem icon={<UserCheck size={18} />} text="لوحة مدير الفرع" to="/branch" />
          <MenuItem icon={<Star size={18} />} text="نقاط الولاء " to="/loyalty" />
          <MenuItem icon={<Settings size={18} />} text="الإعدادات" />
            <div className="status-toggle">
                <RefreshCw size={18} className="status-icon" />
                <span className="status-text">تغيير الحالة العام</span>
            </div>
          </nav>
        </div>

        <div className="main-content">
          <div className="header-small">
            <div className="date-info">
              <Calendar size={18} className="date-icon" />
              <span className="date-text">الثلاثاء، 28 أبريل 2026</span>
            </div>
            <div className="header-actions">
               {/* زر الإشعارات التفاعلي */}
               <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
               {/* زر الخروج التفاعلي */}
               <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
            </div>
          </div>

          <h1 className="main-title">إدارة المخزون</h1>

          <div className="stats-grid">
            <Card title="متوفر" value="15" icon={<CheckCircle2 />} color="text-green-500" />
            <Card title="منخفض" value="4" icon={<AlertTriangle />} color="text-orange-400" />
            <Card title="نافد" value="2" icon={<AlertCircle />} color="text-red-500" />
            <Card title="إجمالي الأصناف" value="21" icon={<Archive />} color="text-[#4A7FA7]" />
          </div>

          <div className="w-full">
            <div className="orders-section">
              <div className="orders-card">
                <div className="orders-header">
                    <div className="filter-tabs">
                        {categories.map((c, i) => (
                            <button key={i} onClick={() => setFilter(c)} className={`filter-tab ${filter === c ? 'active' : ''}`}>
                            {c}
                            </button>
                        ))}
                    </div>
                    <div className="filters-row">
{/*                         <div className="filter-dropdowns">
                            <FilterDropdown text="الأحدث" />
                            <FilterDropdown text="كل الحالات" />
                        </div>
 */}

                        <div className="search-container">
                            <Search size={16} className="search-icon" />
                            <input type="text" placeholder="بحث عن صنف..." className="search-input" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                          <button
                            onClick={() => {
                              setSelectedItem(null); // إضافة
                              setShowInventoryModal(true);
                            }}
                            className="bg-[#4A7FA7] text-white px-5 py-3.5 rounded-xl text-[12px] font-bold shadow-md hover:bg-[#3f8cae] transition-all flex items-center gap-2 w-fit"
                          >
                            <Plus size={16} strokeWidth={3} /> 
                            <span>إضافة صنف جديد</span>
                          </button>
                    </div>
                </div>

                <div className="orders-table-container">
                    <div className="grid grid-cols-6 gap-4 px-6 pb-4 text-[11px] font-bold text-[#9CA3AF] uppercase border-b border-[#F9FAFB] mb-4 w-full">
                        <div className="text-right">رقم الصنف</div>
                        <div className="text-right">اسم المادة</div>
                        <div className="text-center">الكمية المتوفرة</div>
                        <div className="text-center">الحد الأدنى</div>
                        <div className="text-center">حالة المخزون</div>
                        <div className="text-left">الإجراء</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {filteredInventory.map((o) => (
                        <div key={o.id} className="grid grid-cols-6 gap-4 items-center p-5 bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F4F6] hover:bg-[#F8FAFC] transition-colors w-full">
                            <div className="flex flex-col text-right">
                                <span className="font-bold text-[#374151] text-[13px]">#{o.id}</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="font-bold text-[#4B5563] text-[13px]">{o.name}</span>
                                <span className="text-[9px] text-[#D1D5DB] mt-0.5">{o.type}</span>
                            </div>
                            <div className="flex flex-col text-center">
                                <span className="text-[#6B7280] text-[12px] font-semibold">{o.qty}</span>
                            </div>
                            <div className="flex flex-col text-center">
                                <span className="text-[#9CA3AF] text-[12px] font-semibold">{o.min}</span>
                            </div>
                            <div className="flex justify-center">
                                <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black text-center min-w-[80px] ${
                                    o.status === "متوفر" ? "bg-green-100 text-green-600" :
                                    o.status === "منخفض" ? "bg-orange-100 text-orange-500" :
                                    "bg-red-100 text-red-500"
                                }`}>
                                    {o.status}
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-3">
                                <button className="bg-[#4A7FA7] text-white px-5 py-2 rounded-xl text-[10px] font-bold hover:bg-[#3A6F97] transition-colors shadow-sm flex items-center gap-2"
                                  onClick={() => {
                                      setSelectedItem(o); // تمرير البيانات
                                      setShowInventoryModal(true);
                                    }}
                                  >                                    <Edit size={14} /> تعديل
                                </button>

                              <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl hover:bg-red-100 transition">
                                <Trash2 size={16} />
                              </button>        
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            {showInventoryModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
                
                <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
                  
                  {/* إغلاق */}
                  <button
                    onClick={() => setShowInventoryModal(false)}
                    className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>

                  {/* عنوان */}
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {selectedItem ? "تعديل الصنف" : "إضافة صنف جديد"}
                  </h3>

                  {/* الحقول */}
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="اسم المادة"
                      defaultValue={selectedItem?.name || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />

                    <input
                      type="text"
                      placeholder="النوع"
                      defaultValue={selectedItem?.type || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />

                    <input
                      type="text"
                      placeholder="الكمية"
                      defaultValue={selectedItem?.qty || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />

                    <input
                      type="text"
                      placeholder="الحد الأدنى"
                      defaultValue={selectedItem?.min || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />
                  </div>

                  {/* زر */}
                  <button className="w-full mt-6 bg-[#4A7FA7] text-white py-3 rounded-2xl font-bold text-sm">
                    {selectedItem ? "حفظ التعديلات" : "إضافة الصنف"}
                  </button>
                </div>
              </div>
            )} 
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

// Components
function FilterDropdown({ text }) {
    return (
      <div className="bg-gray-50 px-4 py-2.5 rounded-xl text-[10px] text-gray-400 font-bold flex items-center gap-2 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
        <span>{text}</span>
        <ChevronDown size={14} />
      </div>
    );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-container">
        {React.cloneElement(icon, { className: color, size: 24 })}
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
