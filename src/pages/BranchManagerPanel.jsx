import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Bell, LogOut, Search, Wallet, FileText, CreditCard, Target, FileSpreadsheet,
  CheckCircle2, CalendarDays, Settings, ChevronDown, LayoutDashboard,
  ShoppingBag, PlayCircle, Truck, AlertCircle, BarChart3, Box, RefreshCw, 
  X,Star ,UserCircle ,Archive,Briefcase ,Gift ,UserCheck, Users, TrendingUp, Clock, CheckCircle,User2 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, ArcElement
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const barData = {
  labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء"],
  datasets: [
    {
      label: "الطلبات الجديدة",
      data: [45, 55, 40, 60, 50],
      backgroundColor: "#4A7FA7",
      borderRadius: 8,
    },
    {
      label: "الطلبات المنجزة",
      data: [20, 15, 25, 10, 20],
      backgroundColor: "#10B981",
      borderRadius: 8,
    }
  ],
};

function MenuItem({ icon, text, active, to }) {
  return (
    <Link to={to || "/"} className={`p-3.5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all no-underline ${active ? "bg-[#4A7FA7]" : "opacity-40 hover:opacity-100"}`}>
      <span className="text-white">{icon}</span>
      <span className="text-xs font-bold text-white">{text}</span>
    </Link>
  );
}

export default function BranchManagerPanel() {

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex" dir="rtl">
      
      <div className="w-64 bg-[#2F5D7C] text-white flex flex-col p-5 shadow-xl shrink-0 min-h-screen sticky top-0 self-start">
        <div className="flex items-center justify-center gap-2 mb-10 text-white/50">
          <Box size={18} />
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة المغاسل</h2>
        </div>
        
        <div className="mb-8 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
          <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10 text-white">N</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">نُهى نبيل</span>
            <span className="text-[10px] text-white/40 font-medium tracking-tight">مدير الفرع</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/control" />
          <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" to="/orders"/>
          <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" />
          <MenuItem icon={<User2 size={18} />} text="العملاء" to="/customers" />
          <MenuItem icon={<FileText size={18} />} text="الفواتير" to="/invoices" />
          <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard" />
          <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" />
          <MenuItem icon={<Briefcase size={18} />} text="الخدمات والأسعار" to="/services" />
          <MenuItem icon={<Gift size={18} />} text="العروض والخصومات" to="/offers" />
          <MenuItem icon={<BarChart3 size={18} />} text="التقارير" to="/reports"  />
          <MenuItem icon={<Wallet size={18} />} text="لوحة المحاسب" to="/accountant" />
          <MenuItem icon={<UserCheck size={18} />} text="لوحة مدير الفرع" to="/branch" active/>
          <MenuItem icon={<Star size={18} />} text="نقاط الولاء " to="/loyalty" />
          <MenuItem icon={<Settings size={18} />} text="الإعدادات" />
          <div className="status-toggle">
              <RefreshCw size={18} className="status-icon" />
              <span className="status-text">تغيير الحالة العام</span>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8 flex flex-col text-right">
        
        <div className="header-small">
          <div className="date-info">
            <CalendarDays size={18} className="date-icon" />
            <span className="date-text">الأحد، 25 مايو 2025</span>
          </div>
          <div className="header-actions">
               {/* زر الإشعارات التفاعلي */}
               <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
               {/* زر الخروج التفاعلي */}
               <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
          </div>
        </div>

        <h1 className="main-title">لوحة مدير الفرع</h1>

        {/* كروت الإحصائيات - ترتيب الصورة بالضبط */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          <StatCard title="إجمالي إيرادات اليوم" value="1,250" subValue="+12% عن أمس" icon={<Wallet />} color="text-[#4A7FA7]" />
          <StatCard title="طلبات بانتظار الغسيل" value="10" subValue="-2 عن أمس" icon={<Clock />} color="text-orange-400" />
          <StatCard title="الطلبات بالتنفيذ" value="65" subValue="+5 عن أمس" icon={<RefreshCw />} color="text-purple-400" />
          <StatCard title="طلبات بانتظار الكي" value="30" subValue="+3 عن أمس" icon={<TrendingUp />} color="text-blue-400" />
          <StatCard title="الطلبات المتأخرة" value="05" subValue="عاجل" icon={<AlertCircle />} color="text-red-500" />
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center justify-center">
             <div className="text-[10px] font-bold text-gray-400 mb-1">تقييم أداء اليوم</div>
             <div className="text-2xl font-black text-green-500">92%</div>
             <div className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">ممتاز</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* أداء الموظفين اليوم */}
          <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
             <h3 className="font-bold text-gray-800 text-sm mb-6">أداء الموظفين اليوم</h3>
             <div className="grid grid-cols-4 text-[8px] text-gray-400 font-bold mb-4 px-2 uppercase">
                <span>الموظف</span>
                <span className="text-center">الطلبات المنجزة</span>
                <span className="text-center">الدقة</span>
                <span className="text-left">التقييم</span>
             </div>
             <div className="space-y-5">
                <EmployeeRow name="محمد علي" tasks="12" efficiency="98%" rating="ممتاز" />
                <EmployeeRow name="أحمد السبيعي" tasks="10" efficiency="95%" rating="جيد جداً" />
                <EmployeeRow name="سارة محمود" tasks="15" efficiency="100%" rating="مثالي" />
                <EmployeeRow name="خالد العتيبي" tasks="8" efficiency="88%" rating="جيد" />
             </div>
          </div>

          {/* الطلبات الأخيرة */}
          <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
             <h3 className="font-bold text-gray-800 text-sm mb-6">الطلبات الأخيرة</h3>
             <div className="grid grid-cols-5 text-[7px] text-gray-400 font-bold mb-4 uppercase text-center">
                <span>الطلب</span>
                <span>العميل</span>
                <span>الحالة</span>
                <span>الوقت</span>
                <span>الموظف المسؤول</span>
             </div>
             <div className="space-y-4">
                <OrderRow id="#1258" customer="علي" status="تنفيذ" time="ساعة" staff="محمد" />
                <OrderRow id="#1257" customer="نورة" status="مكتمل" time="3 ساعات" staff="أحمد" />
                <OrderRow id="#1256" customer="سعد" status="جاهز للتسليم" time="30 دقيقة" staff="سارة" />
                <OrderRow id="#1255" customer="ريم" status="قيد الغسيل" time="جاهز" staff="خالد" />
             </div>
          </div>

          {/* إحصائيات الفرع (المخطط) */}
          <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
             <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 cursor-pointer">
                    <span className="text-[8px] font-bold text-gray-500">آخر 7 أيام</span>
                    <ChevronDown size={10} />
                </div>
             </div>
             <div className="flex gap-3 mb-4">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#4A7FA7]"></div><span className="text-[8px] text-gray-400 font-bold">الطلبات الجديدة</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div><span className="text-[8px] text-gray-400 font-bold">الطلبات المنجزة</span></div>
             </div>
             <div className="h-44">
                <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 border-r-4 border-r-orange-400">
                <h3 className="font-bold text-gray-800 text-sm mb-4">الموافقات المطلوبة</h3>
                <div className="space-y-4">
                    <ApprovalItem title="خصم للعميل #1250" date="منذ 10 دقائق" />
                    <ApprovalItem title="صيانة غسالة رقم 3" date="منذ ساعة" />
                </div>
            </div>

            <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
                <h3 className="font-bold text-gray-800 text-sm mb-4">التنبيهات والإشعارات</h3>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-2xl text-red-600">
                    <AlertCircle size={18} />
                    <div className="text-[10px] font-bold">تأخير في تسليم 5 طلبات عن الموعد!</div>
                </div>
            </div>

            <div className="col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-sm">احصائيات الفرع</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 cursor-pointer">
                        <span className="text-[8px] font-bold text-gray-500">آخر 30 يوم</span>
                        <ChevronDown size={10} />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">الإيرادات:</span><span className="font-bold">45,000 ريال</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">المصروفات:</span><span className="font-bold text-red-400">12,000 ريال</span></div>
                    <div className="h-px bg-gray-50"></div>
                    <div className="flex justify-between text-xs p-2 bg-green-50 rounded-xl"><span className="text-green-600 font-bold">الأرباح:</span><span className="font-black text-green-600">33,000 ريال</span></div>
                </div>
            </div>
        </div>

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

function StatCard({ title, value, subValue, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center text-center">
      <div className={`p-2 bg-gray-50 rounded-2xl ${color} mb-2`}>{React.cloneElement(icon, { size: 18 })}</div>
      <div className="text-[8px] font-bold text-gray-400 uppercase mb-1">{title}</div>
      <div className="text-xl font-black text-gray-800 tracking-tighter">{value}</div>
      <div className="text-[7px] text-gray-400 font-bold mt-1">{subValue}</div>
    </div>
  );
}

function EmployeeRow({ name, tasks, efficiency, rating }) {
    return (
        <div className="grid grid-cols-4 items-center text-[9px] p-1 border-b border-gray-50 pb-2">
            <span className="font-bold text-gray-700">{name}</span>
            <span className="text-center font-bold text-gray-400">{tasks}</span>
            <span className="text-center font-black text-green-500">{efficiency}</span>
            <span className="text-left font-bold text-blue-400">{rating}</span>
        </div>
    );
}

function OrderRow({ id, customer, status, time, staff }) {
    return (
        <div className="grid grid-cols-5 items-center text-[8px] p-2 bg-gray-50/50 rounded-xl mb-1 text-center">
            <span className="font-black text-[#4A7FA7]">{id}</span>
            <span className="text-gray-600">{customer}</span>
            <span className="text-gray-400">{status}</span>
            <span className="text-gray-300">{time}</span>
            <span className="font-bold text-gray-500">{staff}</span>
        </div>
    );
}

function ApprovalItem({ title, date }) {
    return (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl">
            <div>
                <div className="text-[10px] font-bold text-gray-700">{title}</div>
                <div className="text-[8px] text-gray-400">{date}</div>
            </div>
            <div className="flex gap-2">
                <button className="w-5 h-5 bg-green-500 text-white rounded-lg flex items-center justify-center text-[10px]">✓</button>
                <button className="w-5 h-5 bg-red-400 text-white rounded-lg flex items-center justify-center text-[10px]">×</button>
            </div>
        </div>
    );
}