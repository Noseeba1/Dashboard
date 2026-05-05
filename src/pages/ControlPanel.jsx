import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Reports.css";
import {
  Bell, LogOut, Search, Wallet, FileText, CreditCard, Target, FileSpreadsheet,
  CheckCircle2, CalendarDays, Settings, ChevronDown, LayoutDashboard,
  X,Star, UserCircle, Gift, Briefcase, Archive, ShoppingBag, PlayCircle, Truck, AlertCircle, BarChart3, Box, RefreshCw, UserCheck, Users, Activity, TrendingUp, DollarSign, Clock, User2, Edit, Printer, 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";

// تسجيل مكتبات الرسوم البيانية
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement,
  Title, Tooltip, Legend, Filler
);

// --- خيارات الحركة (Animation) المشتركة ---
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart'
  },
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true, grid: { drawBorder: false, color: '#f0f0f0' } },
    x: { grid: { display: false } }
  }
};

// --- بيانات الرسوم البيانية المحدثة من الصورة ---

// 1. رسم بياني للأرباح (الخط الأخضر في الصورة)
const profitChartData = {
  labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
  datasets: [
    {
      label: "الأرباح",
      data: [40, 62, 52, 75, 68, 85],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#10B981",
      pointRadius: 4
    },
  ],
};

// 2. رسم بياني لإجمالي الطلبات (الخط الأزرق في الصورة)
const totalOrdersData = {
  labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
  datasets: [
    {
      label: "الطلبات",
      data: [50, 78, 65, 88, 82, 95],
      borderColor: "#4A7FA7",
      backgroundColor: "rgba(74, 127, 167, 0.1)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#4A7FA7",
      pointRadius: 4
    },
  ],
};

// 3. توزيع الخدمات (Doughnut)
const doughnutChartData = {
  labels: ["غسيل عادي", "كي", "تنظيف جاف", "أخرى"],
  datasets: [
    {
      data: [45, 25, 15, 15],
      backgroundColor: ["#4A7FA7", "#10B981", "#F59E0B", "#8B5CF6"],
      borderWidth: 5,
      borderColor: "#ffffff",
      hoverOffset: 10
    },
  ],
};

export default function Reports() {

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <div className="reports-panel">
      {/* Sidebar - كما هو في كودك الأصلي */}
      <div className="sidebar">
        <div className="logo-section">
          <Box size={18} />
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة المغاسل</h2>
        </div>
          <div className="mb-8 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10 text-white">M</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">منار ماطر</span>
              <span className="text-[10px] text-white/40 font-medium tracking-tight">مدير الموارد البشرية</span>
            </div>
          </div>
        <nav className="navigation">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/control" active/>
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
            <CalendarDays size={18} className="text-[#4A7FA7]" />
            <span className="font-bold text-gray-500">الثلاثاء، 28 أبريل 2026</span>
          </div>
          <div className="header-actions">
              <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
              <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tighter text-right">لوحة التحكم</h1>

        {/* كروت الإحصائيات - الصف الأول والثاني كما في الصورة */}
        <div className="grid grid-cols-4 gap-4 mb-6 text-right">
          <StatCard title="طلبات اليوم" value="125" icon={<ShoppingBag />} color="bg-blue-100 text-blue-600" />
          <StatCard title="طلبات جديدة" value="28" icon={<FileText />} color="bg-green-100 text-green-600" />
          <StatCard title="قيد التنفيذ" value="30" icon={<CheckCircle2 />} color="bg-blue-50 text-blue-500" />
          <StatCard title="طلبات متأخرة" value="5" icon={<Clock />} color="bg-red-100 text-red-500" />
          
          <StatCard title="الخدمات المقدمة" value="2,350" icon={<Star />} color="bg-yellow-100 text-yellow-600" />
          <StatCard title="إجمالي العملاء" value="1,248" icon={<Users />} color="bg-purple-100 text-purple-600" />
          <StatCard title="عدد الموظفين" value="18" icon={<UserCircle />} color="bg-indigo-100 text-indigo-600" />
          <StatCard title="إجمالي الإيرادات" value="8,450" icon={<DollarSign />} color="bg-orange-100 text-orange-600" />
        </div>

        {/* الرسوم البيانية المركزية */}
        <div className="grid grid-cols-3 gap-6 mb-8 text-right">
          <ChartBox title="أكثر الخدمات طلباً">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 mt-4">
                <Doughnut data={doughnutChartData} options={{...chartOptions, cutout: '70%'}} />
              </div>
              <div className="w-full mt-4 space-y-1">
                {doughnutChartData.labels.map((l, i) => (
                  <div key={l} className="flex justify-between text-[10px] font-bold text-gray-500">
                    <span>%{doughnutChartData.datasets[0].data[i]} {l}</span>
                    <div style={{backgroundColor: doughnutChartData.datasets[0].backgroundColor[i]}} className="w-2 h-2 rounded-full mt-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </ChartBox>

          <ChartBox title="الأرباح">
  <div className="h-64 mt-4 chart-animate delay-1">              <Line data={profitChartData} options={chartOptions} />
            </div>
          </ChartBox>

          <ChartBox title="إجمالي الطلبات">
            <div className="h-64 mt-4 chart-animate delay-2">
              <Line data={totalOrdersData} options={chartOptions} />
            </div>
          </ChartBox>
        </div>

        {/* القسم السفلي: أفضل العملاء، آخر الطلبات، التنبيهات */}
        <div className="grid grid-cols-3 gap-6 text-right">
          <TableBox title="أفضل العملاء">
            <div className="space-y-3">
              <ClientRankItem name="شهد الكربي" count="27" />
              <ClientRankItem name="سارة محمد" count="25" />
              <ClientRankItem name="أحمد علي" count="18" />
            </div>
          </TableBox>

          <TableBox title="آخر الطلبات">
            <div className="overflow-hidden">
               <table className="w-full text-sm">
                  <thead className="text-gray-400 text-[10px] border-b">
                    <tr>
                      <th className="pb-2">الحالة</th>
                      <th className="pb-2">العميل</th>
                      <th className="pb-2">رقم الطلب</th>
                    </tr>
                  </thead>
                  <tbody className="text-center font-bold text-gray-700">
                    <tr className="border-b">
                      <td className="py-3 text-green-500 text-xs">مكتمل</td>
                      <td>أحمد محمد</td>
                      <td>#1258</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-orange-400 text-xs">قيد التنفيذ</td>
                      <td>سعود علي</td>
                      <td>#1257</td>
                    </tr>
                  </tbody>
               </table>
               <button className="w-full mt-4 bg-[#4A7FA7] text-white py-2 rounded-xl text-xs font-bold">عرض جميع الطلبات</button>
            </div>
          </TableBox>

          <TableBox title="التنبيهات">
            <div className="space-y-3">
              <AlertItem text="هناك 5 طلبات متأخرة" icon={<AlertCircle size={16}/>} />
              <AlertItem text="يوجد طلب جديد بحاجة للمراجعة" icon={<Box size={16}/>} />
              <AlertItem text="طلب رقم #1255 قيد التوصيل" icon={<Truck size={16}/>} />
            </div>
          </TableBox>
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

// --- مكونات مساعدة للتصميم ---

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-row-reverse items-center justify-between">
      <div className={`${color} p-3 rounded-2xl`}>{icon}</div>
      <div>
        <h4 className="text-gray-400 text-[10px] font-bold mb-1">{title}</h4>
        <span className="text-2xl font-black text-gray-800">{value}</span>
      </div>
    </div>
  );
}

function ClientRankItem({ name, count }) {
  return (
    <div className="flex items-center justify-between bg-yellow-50/50 p-3 rounded-2xl border border-yellow-100">
      <Star size={14} className="text-yellow-500 fill-yellow-500" />
      <span className="text-xs font-bold text-gray-700">{name} ({count} طلب)</span>
    </div>
  );
}

function AlertItem({ text, icon }) {
  return (
    <div className="flex items-center justify-between bg-red-50 p-3 rounded-2xl border border-red-100 text-red-700">
      {icon}
      <span className="text-[11px] font-bold">{text}</span>
    </div>
  );
}

function MenuItem({ icon, text, active, to }) {
  return (
    <Link to={to || "#"} className={`p-3.5 rounded-2xl flex items-center gap-4 transition-all no-underline ${active ? "bg-[#4A7FA7]" : "opacity-40 hover:opacity-100"}`}>
      <span className="text-white">{icon}</span>
      <span className="text-xs font-bold text-white">{text}</span>
    </Link>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
      <h3 className="font-black text-gray-800 text-xs mb-2">{title}</h3>
      {children}
    </div>
  );
}

function TableBox({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
      <h3 className="font-black text-gray-800 text-xs mb-4">{title}</h3>
      {children}
    </div>
  );
}