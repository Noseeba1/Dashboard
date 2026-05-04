import React from "react";
import { Link } from "react-router-dom";
import "./Reports.css";
import {
  Bell, LogOut, Search, Wallet, FileText, CreditCard, Target, FileSpreadsheet,
  CheckCircle2, CalendarDays, Settings, ChevronDown, LayoutDashboard,
  Star,UserCircle ,Gift,Briefcase,Archive,ShoppingBag, PlayCircle, Truck, AlertCircle, BarChart3, Box, RefreshCw, UserCheck, Users, Activity, TrendingUp
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

// بيانات الرسوم البيانية
const lineChartData = {
  labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
  datasets: [
    {
      label: "الطلبات المكتملة",
      data: [120, 150, 180, 140, 160, 210, 250],
      borderColor: "#4A7FA7",
      backgroundColor: "rgba(74, 127, 167, 0.05)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "الطلبات الملغاة",
      data: [10, 15, 8, 12, 5, 20, 18],
      borderColor: "#EF4444",
      borderDash: [5, 5],
      tension: 0.4,
    },
  ],
};

const doughnutChartData = {
  labels: ["غسيل وكي", "كي فقط", "غسيل جاف", "تنظيف سجاد"],
  datasets: [
    {
      data: [50, 25, 15, 10],
      backgroundColor: ["#10B981", "#4A7FA7", "#F59E0B", "#8B5CF6"],
      borderWidth: 0,
      cutout: "75%",
    },
  ],
};

const barChartData = {
  labels: ["فرع الرياض", "فرع جدة", "فرع الدمام", "فرع مكة"],
  datasets: [
    {
      label: "أداء الفروع",
      data: [85, 70, 60, 90],
      backgroundColor: "#4A7FA7",
      borderRadius: 4,
    },
  ],
};

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

export default function Reports() {
  return (
    <div className="reports-panel">
       <div className="sidebar">
        <div className="logo-section">
          <Box size={18} />
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة المغاسل</h2>
        </div>
        
        <div className="user-profile">
          <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10 text-white">N</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">نُهى نبيل</span>
            <span className="text-[10px] text-white/40 font-medium tracking-tight">موظف تشغيل</span>
          </div>
        </div>

        <nav className="navigation">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/" />
          <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" />
          <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" />
          <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard" />
          <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" />
          <MenuItem icon={<Briefcase size={18} />} text="الخدمات والأسعار" to="/services" />
          <MenuItem icon={<Gift size={18} />} text="العروض والخصومات" to="/offers" />
          <MenuItem icon={<BarChart3 size={18} />} text="التقارير" to="/reports" active />
          <MenuItem icon={<Wallet size={18} />} text="لوحة المحاسب" to="/accountant" />
          <MenuItem icon={<UserCheck size={18} />} text="لوحة مدير الفرع" to="/branch" />
          <MenuItem icon={<Star size={18} />} text="نقاط الولاء " to="/loyalty" />
          <MenuItem icon={<Settings size={18} />} text="الإعدادات" />
          <div className="mt-6 mb-4 bg-[#4A7FA7]/20 rounded-2xl border border-white/5 p-3.5 flex items-center gap-4 hover:bg-[#4A7FA7]/40 transition-all cursor-pointer">
              <RefreshCw size={18} className="text-white/70" />
              <span className="text-xs font-bold text-white">تغيير الحالة العام</span>
          </div>
        </nav>
      </div>

      <div className="main-content">
        <div className="header-small">
          <div className="date-info">
            <CalendarDays size={18} className="text-[#4A7FA7] opacity-70" />
            <span className="tracking-tight">الأحد، 25 مايو 2025</span>
          </div>
          <div className="header-actions">
             <Bell size={24} className="text-gray-300 cursor-pointer" />
             <LogOut size={24} className="text-gray-300 cursor-pointer" />
          </div>
        </div>

        <div className="header-with-actions">
            <h1 className="main-title">التقارير</h1>
          <div className="header-actions">
                <button className="export-button">
                    <FileSpreadsheet size={16} /> تصدير Excel
                </button>
                <button className="print-button" onClick={() => window.print()}>
                    <FileText size={16} /> طباعة التقرير
                </button>
            </div>
        </div>

<div id="report-section">

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-5 gap-6 mb-8 text-right">
          <StatCard title="إجمالي الطلبات" value="1,280" icon={<ShoppingBag />} color="text-[#4A7FA7]" percentage="10" />
          <StatCard title="العملاء الجدد" value="320" icon={<Users />} color="text-green-500" percentage="8" />
          <StatCard title="الطلبات المكتملة" value="1,150" icon={<CheckCircle2 />} color="text-purple-500" percentage="12" />
          <StatCard title="معدل الأداء" value="94%" icon={<Activity />} color="text-orange-400" percentage="5" />
          <StatCard title="نمو الإيرادات" value="+15%" icon={<TrendingUp />} color="text-green-500" percentage="15" />
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8 items-start text-right">
          <ChartBox title="توزيع الخدمات الأكثر طلباً">
            <div className="flex items-center gap-6 mt-4">
              <div className="w-32 h-32"><Doughnut data={doughnutChartData} options={{plugins: {legend: {display: false}}}} /></div>
              <div className="space-y-1.5 flex-1">
                {doughnutChartData.labels.map((l, i) => <LegendItem key={l} label={l} value={doughnutChartData.datasets[0].data[i]} color={doughnutChartData.datasets[0].backgroundColor[i]} />)}
              </div>
            </div>
          </ChartBox>

          <TableBox title="أفضل العملاء" headers={["العميل", "عدد الطلبات", "إجمالي الدفع", "التقييم"]}>
            {topClientsData.map(client => <ClientRow key={client.id} data={client} />)}
          </TableBox>

          <ChartBox title="معدل الطلبات اليومية" filterText="آخر 7 أيام">
            <div className="h-60 mt-4"><Line data={lineChartData} options={{responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}}} /></div>
          </ChartBox>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8 items-start text-right">
          <TableBox title="تقرير أداء الموظفين" headers={["الموظف", "القسم", "المهام المنجزة", "التقييم"]}>
            {employeesData.map(emp => <EmployeeRow key={emp.id} data={emp} />)}
          </TableBox>

          <TableBox title="أحدث التقييمات والشكاوى">
            <div className="space-y-4 pt-2">
                <ReviewItem title="خدمة ممتازة وسريعة" type="positive" date="25 مايو 2025" />
                <ReviewItem title="تأخير في تسليم الطلب" type="negative" date="24 مايو 2025" />
                <ReviewItem title="تغليف رائع واهتمام بالتفاصيل" type="positive" date="22 مايو 2025" />
            </div>
          </TableBox>

          <ChartBox title="مقارنة أداء الفروع">
             <div className="h-60 mt-4"><Bar data={barChartData} options={{responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}}} /></div>
          </ChartBox>
        </div>
      </div>
    </div>
</div>
  );
}

function StatCard({ title, value, icon, color, percentage }) {
  const isPositive = Number(percentage) > 0;
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-5">
      <div className={`${color.replace("text-", "bg-")} bg-opacity-10 p-3.5 rounded-3xl ${color}`}>{React.cloneElement(icon, { size: 22 })}</div>
      <div className="flex-1">
        <h4 className="text-gray-400 text-[11px] font-bold mb-0.5 uppercase">{title}</h4>
        <span className="text-3xl font-black text-gray-800 tracking-tighter">{value}</span>
        <div className={`flex items-center gap-1.5 mt-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{isPositive ? '+' : ''}{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

function ChartBox({ title, filterText, children }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 h-full border-l-4 border-l-[#4A7FA7]/10">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-gray-800 text-[11px]">{title}</h3>
        {filterText && <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl text-[10px] text-gray-400 font-bold border border-gray-100 cursor-pointer"><span>{filterText}</span><ChevronDown size={14} /></div>}
      </div>
      {children}
    </div>
  );
}

function TableBox({ title, headers, children }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 h-full">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-800 text-[11px]">{title}</h3>
        <span className="text-[10px] font-bold text-[#4A7FA7] cursor-pointer">عرض الكل</span>
      </div>
      {headers && (
          <div className="bg-gray-50/50 grid grid-cols-4 px-6 py-2.5 text-center text-gray-400 text-[9px] font-bold border-b border-gray-50">
              {headers.map(h => <div key={h}>{h}</div>)}
          </div>
      )}
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function ClientRow({ data }) {
    return (
        <div className="table-row">
            <div className="row-id">{data.name}</div>
            <div className="row-text">{data.ordersCount}</div>
            <div className="row-amount">{data.totalPaid} ريال</div>
            <div className="rating-stars">⭐ {data.rating}</div>
        </div>
    );
}

function EmployeeRow({ data }) {
    return (
        <div className="table-row">
            <div className="row-id">{data.name}</div>
            <div className="row-text">{data.department}</div>
            <div className="row-amount">{data.tasksCompleted}</div>
            <div className="rating-stars">⭐ {data.rating}</div>
        </div>
    );
}

function LegendItem({ label, value, color }) {
    return (
        <div className="flex justify-between items-center text-xs px-2 py-1.5 rounded-xl">
            <div className="flex items-center gap-2.5">
                <div style={{ backgroundColor: color }} className="w-2.5 h-2.5 rounded-full"></div>
                <span className="text-gray-600 font-medium">{label}</span>
            </div>
            <span className="font-bold text-gray-800">{value}%</span>
        </div>
    );
}

function ReviewItem({ title, type, date }) {
    const isPositive = type === "positive";
    return (
        <div className="review-item">
            {isPositive ? <CheckCircle2 size={18} className="review-icon" /> : <AlertCircle size={18} className="text-red-500" />}
            <div className="review-content">
                <span className="review-title">{title}</span>
                <span className={`review-date ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{date}</span>
            </div>
        </div>
    );
}

const topClientsData = [
    { id: 1, name: 'سارة محمد', ordersCount: '45', totalPaid: '4,500', rating: '4.9' },
    { id: 2, name: 'أحمد عبدالله', ordersCount: '38', totalPaid: '3,800', rating: '4.8' },
    { id: 3, name: 'نورة السالم', ordersCount: '32', totalPaid: '3,100', rating: '5.0' },
    { id: 4, name: 'خالد الفهد', ordersCount: '28', totalPaid: '2,850', rating: '4.7' }
];

const employeesData = [
    { id: 1, name: 'فهد العتيبي', department: 'الغسيل', tasksCompleted: '450', rating: '4.8' },
    { id: 2, name: 'منى الدوسري', department: 'الكي', tasksCompleted: '380', rating: '4.9' },
    { id: 3, name: 'عمر باسل', department: 'التغليف', tasksCompleted: '420', rating: '4.7' },
    { id: 4, name: 'شهد القحطاني', department: 'الفرز', tasksCompleted: '310', rating: '4.6' }
];
