import "../App.css";
import "./Inventory.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  LogOut,
  Search,
  Box,
  LayoutDashboard,
  ShoppingBag,
  PlayCircle,
  FileText,
  Truck,
  AlertCircle,
  BarChart3,
  Settings,
  Calendar,
  Edit3,
  Eye,
  Trash2,
  UserCircle,
  Archive ,
  Briefcase ,
  Gift ,
  UserCheck,
  RefreshCw,
  Wallet,
  Edit,
  Star ,
  Plus,
  X
} from "lucide-react";

const employeesData = [
  { id: "E001", name: "أحمد محمد", job: "مدير", phone: "0555123456", status: "نشط" },
  { id: "E002", name: "فاطمة خالد", job: "استقبال", phone: "0555466789", status: "نشط" },
  { id: "E003", name: "عبد الله ياسر", job: "سائق", phone: "0555987654", status: "نشط" },
  { id: "E004", name: "خالد سعيد", job: "كاشير", phone: "0555123400", status: "نشط" },
  { id: "E005", name: "نورة خالد", job: "تنظيف", phone: "0555667788", status: "نشط" },
];

function MenuItem({ icon, text, active, to }) {
  return (
    <Link
      to={to || "/"}
      className={`p-3.5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all no-underline ${
        active ? "bg-[#4A7FA7]" : "opacity-40 hover:opacity-100"
      }`}>
      <span className="text-white">{icon}</span>
      <span className="text-xs font-bold text-white">{text}</span>
    </Link>
  );
}

export default function Dashboard() {
  const [filter, setFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const statuses = ["الكل", "نشط", "غير نشط", "إجازة"];

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredEmployees = employeesData.filter((employee) => {
    const matchesFilter = filter === "الكل" || employee.status === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      employee.id.toLowerCase().includes(query) ||
      employee.name.toLowerCase().includes(query) ||
      employee.job.toLowerCase().includes(query) ||
      employee.phone.toLowerCase().includes(query);

    return matchesFilter && (query === "" || matchesSearch);
  });

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex items-start overflow-y-auto" dir="rtl">
      <div className="flex w-full min-h-screen bg-[#F8FAFC] font-sans text-right">
        <div className="w-64 bg-[#2F5D7C] text-white flex flex-col p-5 shadow-xl shrink-0 min-h-screen sticky top-0">
          <div className="flex items-center justify-center gap-2 mb-10 text-white/50">
            <Box size={18} />
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة الموظفين</h2>
          </div>

          <div className="mb-8 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10 text-white">M</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">منار ماطر</span>
              <span className="text-[10px] text-white/40 font-medium tracking-tight">مدير الموارد البشرية</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/" />
          <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" />
          <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" active/>
          <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard"  />
          <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" />
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

        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0 gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
              <Calendar size={18} className="text-[#4A7FA7] opacity-70" />
              <span className="tracking-tight">الثلاثاء 28 أبريل 2026</span>
            </div>
            <div className="flex items-center gap-5">
               {/* زر الإشعارات التفاعلي */}
               <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
               {/* زر الخروج التفاعلي */}
               <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tighter text-right">الموظفون</h1>

            </div>
                    <button
                      onClick={() => {
                        setSelectedEmployee(null); // إضافة
                        setShowEmployeeModal(true);
                      }}
                      className="bg-[#4A7FA7] text-white px-5 py-3.5 rounded-xl text-[12px] font-bold shadow-md hover:bg-[#3f8cae] transition-all flex items-center gap-2 w-fit"
                    >
                      <Plus size={16} strokeWidth={3} /> 
                      <span>إضافة موظف جديد</span>
                    </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {statuses.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold transition ${filter === status ? "bg-[#4A7FA7] text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="بحث عن اسم أو هاتف أو رقم الموظف..."
                  className="w-full bg-gray-50 border border-gray-100 pr-11 pl-4 py-3 rounded-3xl text-sm outline-none focus:border-[#4A7FA7]/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[900px] text-right border-separate border-spacing-y-4">
              <thead>
                <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                  <th className="pr-6 pb-4">رقم الموظف</th>
                  <th className="pb-4">الاسم</th>
                  <th className="pb-4">الوظيفة</th>
                  <th className="pb-4">الهاتف</th>
                  <th className="pb-4">الحالة</th>
                  <th className="text-center pb-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="bg-white hover:bg-gray-50 transition-all rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                    <td className="p-5 pr-6 rounded-r-3xl">
                      <span className="block font-bold text-gray-700 text-sm">#{employee.id}</span>
                      <span className="text-[9px] text-gray-300">رقم الموظف</span>
                    </td>
                    <td className="text-sm font-bold text-gray-700">{employee.name}</td>
                    <td className="text-sm text-gray-600">{employee.job}</td>
                    <td className="text-sm text-gray-600">{employee.phone}</td>
                    <td>
                      <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[10px] font-black ${getStatusClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="rounded-l-3xl pr-4 py-5">
                      <div className="flex justify-center items-center gap-3">
                                <button className="bg-[#4A7FA7] text-white px-5 py-2 rounded-xl text-[10px] font-bold hover:bg-[#3A6F97] transition-colors shadow-sm flex items-center gap-2"
                                    onClick={() => {
                                        setSelectedEmployee(employee); // تمرير البيانات
                                        setShowEmployeeModal(true);
                                      }}
                                    >      
                              <Edit size={14} /> تعديل
                                </button>
                                <button className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition" title="حذف">
                                  <Trash2 size={16} />
                                </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
            {showEmployeeModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
                
                <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
                  
                  {/* إغلاق */}
                  <button
                    onClick={() => setShowEmployeeModal(false)}
                    className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>

                  {/* عنوان */}
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {selectedEmployee ? "تعديل الموظف" : "إضافة موظف جديد"}
                  </h3>

                  {/* الحقول */}
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="اسم الموظف"
                      defaultValue={selectedEmployee?.name || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />

                    <input
                      type="text"
                      placeholder="الوظيفة"
                      defaultValue={selectedEmployee?.job || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />

                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      defaultValue={selectedEmployee?.phone || ""}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                    />
                  </div>

                  {/* زر */}
                  <button className="w-full mt-6 bg-[#4A7FA7] text-white py-3 rounded-2xl font-bold text-sm">
                    {selectedEmployee ? "حفظ التعديلات" : "إضافة الموظف"}
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

function getStatusClass(status) {
  switch (status) {
    case "نشط":
      return "bg-emerald-50 text-emerald-600";
    case "غير نشط":
      return "bg-red-50 text-red-600";
    case "إجازة":
      return "bg-yellow-50 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}