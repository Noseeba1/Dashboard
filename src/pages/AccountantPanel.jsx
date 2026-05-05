import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, LogOut, Search, Wallet, FileText, CreditCard, Target, FileSpreadsheet,
  CheckCircle2, CalendarDays, Settings, ChevronDown, LayoutDashboard,
  UserCircle ,Archive ,Briefcase, Gift, Star, RefreshCw, UserCheck, Box, X, BarChart3,  ShoppingBag ,PlayCircle ,User2 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// تسجيل مكتبات الرسوم البيانية
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, ArcElement,
  Title, Tooltip, Legend, Filler
);

// بيانات الرسوم البيانية
const lineChartData = {
  labels: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
  datasets: [
    {
      label: "الإيرادات",
      data: [4200, 6800, 5100, 6900, 5800, 8100, 4300],
      borderColor: "#4A7FA7",
      backgroundColor: "rgba(74, 127, 167, 0.05)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "المصروفات",
      data: [1800, 3900, 2200, 3100, 2800, 4300, 3200],
      borderColor: "#10B981",
      borderDash: [5, 5],
      tension: 0.4,
    },
  ],
};

const doughnutChartData = {
  labels: ["نقدي", "مدى", "تحويل بنكي", "بطاقة ائتمان"],
  datasets: [
    {
      data: [45, 30, 15, 10],
      backgroundColor: ["#10B981", "#4A7FA7", "#F59E0B", "#8B5CF6"],
      borderWidth: 0,
      cutout: "75%",
    },
  ],
};

// مكون MenuItem المستخدم في الـ Sidebar
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

export default function AccountantPanel() {
  // التعديل المطلوب: حالات النوافذ المنبثقة
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex" dir="rtl">
       <div className="w-64 bg-[#2F5D7C] text-white flex flex-col p-5 shadow-xl shrink-0 min-h-screen sticky top-0">
        <div className="flex items-center justify-center gap-2 mb-10 text-white/50">
          <Box size={18} />
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة المغاسل</h2>
        </div>
        
        <div className="mb-8 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
          <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10 text-white">N</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">نُهى نبيل</span>
            <span className="text-[10px] text-white/40 font-medium tracking-tight">موظف تشغيل</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1 text-right">
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
          <MenuItem icon={<Wallet size={18} />} text="لوحة المحاسب" to="/accountant" active/>
          <MenuItem icon={<UserCheck size={18} />} text="لوحة مدير الفرع" to="/branch" />
          <MenuItem icon={<Star size={18} />} text="نقاط الولاء " to="/loyalty" />
          <MenuItem icon={<Settings size={18} />} text="الإعدادات" />
          <div className="mt-6 mb-4 bg-[#4A7FA7]/20 rounded-2xl border border-white/5 p-3.5 flex items-center gap-4 hover:bg-[#4A7FA7]/40 transition-all cursor-pointer">
              <RefreshCw size={18} className="text-white/70" />
              <span className="text-xs font-bold text-white">تغيير الحالة العام</span>
          </div>
        </nav>
      </div>

      {/* 2. المحتوى الرئيسي للمحاسب */}
      <div className="flex-1 p-8 flex flex-col">
        {/* الهيدر العلوي الصغير */}
        <div className="flex justify-between items-center mb-1 shrink-0">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
            <CalendarDays size={18} className="text-[#4A7FA7] opacity-70" />
            <span className="tracking-tight">الأحد، 25 مايو 2025</span>
          </div>
          <div className="flex items-center gap-5">
             {/* جعل زر الإشعارات تفاعلي */}
             <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
             {/* جعل زر الخروج تفاعلي */}
             <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tighter text-right">لوحة المحاسب</h1>

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-5 gap-6 mb-8 text-right">
          <StatCard title="إجمالي الدفعات" value="280" icon={<CheckCircle2 />} color="text-green-500" percentage="10" />
          <StatCard title="عدد الفواتير" value="320" icon={<FileSpreadsheet />} color="text-[#4A7FA7]" percentage="8" />
          <StatCard title="المستحقات" value="7,250" icon={<Target />} color="text-orange-400" percentage="-5" currency="ريال سعودي" />
          <StatCard title="إجمالي المدفوعات" value="78,200" icon={<CreditCard />} color="text-green-500" percentage="12" currency="ريال سعودي" />
          <StatCard title="إجمالي الإيرادات" value="85,450" icon={<Wallet />} color="text-purple-500" percentage="15" currency="ريال سعودي" />
        </div>

        {/* القسم الأوسط */}
        <div className="grid grid-cols-3 gap-8 mb-8 items-start text-right">
          {/* اليمين: توزيع طرق الدفع */}
          <ChartBox title="توزيع طرق الدفع">
            <div className="flex items-center gap-6 mt-4">
              <div className="w-32 h-32"><Doughnut data={doughnutChartData} options={{plugins: {legend: {display: false}}}} /></div>
              <div className="space-y-1.5 flex-1">
                {doughnutChartData.labels.map((l, i) => <LegendItem key={l} label={l} value={doughnutChartData.datasets[0].data[i]} color={doughnutChartData.datasets[0].backgroundColor[i]} />)}
              </div>
            </div>
          </ChartBox>

          {/* الوسط: جدول الفواتير */}
          <TableBox title="الفواتير الأخيرة" headers={["رقم الفاتورة", "العميل", "التاريخ", "الإجمالي", "حالة الدفع"]}>
            {invoicesData.map(inv => <InvoiceRow key={inv.invoiceId} data={inv} />)}
          </TableBox>

          {/* اليسار: الأداء المالي */}
          <ChartBox title="الأداء المالي (إيرادات ومصروفات)" filterText="آخر 7 أيام">
            <div className="h-60 mt-4"><Line data={lineChartData} options={{responsive: true, plugins: {legend: {display: false}}}} /></div>
          </ChartBox>
        </div>

        {/* القسم السفلي */}
        <div className="grid grid-cols-3 gap-8 items-start text-right">
          {/* اليمين: تقرير الأرباح والخسائر */}
          <TableBox title="تقرير الأرباح والخسائر" filterText="آخر 30 يوم">
            <div className="space-y-4 mt-2 px-3">
                <ProfitLossItem title="إجمالي الإيرادات" value="85,450" color="text-gray-600" />
                <ProfitLossItem title="إجمالي المصروفات" value="45,230" color="text-gray-600" />
                <div className="h-px bg-gray-100 my-4"></div>
                <ProfitLossItem title="صافي الربح" value="40,220" color="text-green-500" isProfit />
            </div>
          </TableBox>

          {/* الوسط: الدفعات الأخيرة */}
          <TableBox title="الدفعات الأخيرة" headers={["رقم الدفعة", "العميل", "التاريخ", "المبلغ", "طريقة الدفع"]}>
            {paymentsData.map(p => <PaymentRow key={p.paymentId} data={p} />)}
          </TableBox>

          {/* اليسار: التسويات والمراجعات */}
          <TableBox title="التسويات والمراجعات">
            <div className="space-y-4 pt-2 text-right">
                <ReconciliationItem title="تسوية صندوق 25 مايو" status="done" amount="4,850" date="25 مايو 2025 - تم التسوية" />
                <ReconciliationItem title="مراجعة فواتير الأسبوع الفائت" status="done" amount="12,450" date="20 مايو 2025 - تم المراجعة" />
                <ReconciliationItem title="تسوية التحويلات البنكية" status="waiting" amount="6,250" date="28 مايو 2025 - قيد المراجعة" />
            </div>
          </TableBox>
        </div>
      </div>

      {/* التعديل المطلوب: نافذة تأكيد الخروج */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تأكيد الخروج</h3>
            <p className="text-gray-500 text-sm mb-8 font-medium">هل تريد حقاً الخروج من حساب المحاسب؟</p>
            <div className="flex gap-3">
              <button onClick={() => window.location.reload()} className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/20 active:scale-95 transition-all">نعم، خروج</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* التعديل المطلوب: نافذة الإشعارات */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 text-right">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setShowNotifications(false)} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">الإشعارات</h3>
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <Bell size={40} className="mb-4 opacity-20" />
              <p className="text-sm font-bold">لا توجد إشعارات حالية</p>
            </div>
            <button onClick={() => setShowNotifications(false)} className="w-full bg-[#4A7FA7] text-white py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
}

// المكونات الفرعية (نفس كودك الفخم بدون تغيير)
function StatCard({ title, value, icon, color, percentage, currency }) {
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
        {filterText && <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl text-[10px] text-gray-400 font-bold border border-gray-100"><span>{filterText}</span><ChevronDown size={14} /></div>}
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
          <div className="bg-gray-50/50 grid grid-cols-5 px-6 py-2.5 text-center text-gray-400 text-[9px] font-bold border-b border-gray-50">
              {headers.map(h => <div key={h}>{h}</div>)}
          </div>
      )}
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function InvoiceRow({ data }) {
    return (
        <div className="grid grid-cols-5 items-center text-center p-3 rounded-xl hover:bg-gray-50/30 font-sans text-xs">
            <div className="font-bold text-gray-700">#{data.invoiceId}</div>
            <div className="text-gray-500">{data.client}</div>
            <div className="text-gray-400 text-[10px]">{data.date}</div>
            <div className="text-gray-700 font-bold">{data.amount} ريال</div>
            <div><span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black border border-green-100">مدفوعة</span></div>
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

function ReconciliationItem({ title, status, amount, date }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50/20">
            <CheckCircle2 size={18} className="text-green-500" />
            <div className="flex-1 text-right">
                <span className="block text-gray-700 text-[11px] font-bold">{title}</span>
                <span className="block text-[10px] text-green-600 font-medium">{date}</span>
            </div>
            <span className="font-black text-gray-800 text-sm">{amount} <span className="text-[10px] text-gray-400 font-bold">ريال</span></span>
        </div>
    );
}

function PaymentRow({ data }) {
    return (
        <div className="grid grid-cols-5 items-center text-center p-3 rounded-xl hover:bg-gray-50/30 text-xs">
            <div className="font-bold text-gray-700">#{data.paymentId}</div>
            <div className="text-gray-500">{data.client}</div>
            <div className="text-gray-400 text-[10px]">{data.date}</div>
            <div className="text-gray-700 font-bold">{data.amount} ريال</div>
            <div><span className="bg-blue-50 text-[#4A7FA7] px-3.5 py-1 rounded-full text-[9px] font-black border border-blue-100">{data.method}</span></div>
        </div>
    );
}

function ProfitLossItem({ title, value, color, isProfit }) {
    return (
        <div className="flex justify-between items-center text-right">
            <span className={`${color} text-xs ${isProfit ? 'font-bold' : 'font-medium'}`}>{title}</span>
            <span className={`${color} text-xl ${isProfit ? 'font-black' : 'font-bold'} tracking-tighter`}>{value} <span className="text-[10px] text-gray-400 font-bold">ريال</span></span>
        </div>
    );
}

// البيانات التجريبية
const invoicesData = [
    { invoiceId: 'INV-1258', client: 'نهى نبيل', date: '2025-05-25', amount: '210', status: 'paid' },
    { invoiceId: 'INV-1257', client: 'شهد الكربي', date: '2025-05-25', amount: '160', status: 'paid' },
    { invoiceId: 'INV-1256', client: 'نسيبة رسام', date: '2025-05-24', amount: '320', status: 'partial' },
    { invoiceId: 'INV-1255', client: 'هند العديل', date: '2025-05-24', amount: '120', status: 'unpaid' }
 ];

const paymentsData = [
    { paymentId: 'PAY-00280', client: 'نهى نبيل', date: '2025-05-25', amount: '210', method: 'مدى' },
    { paymentId: 'PAY-00279', client: 'شهد الكربي', date: '2025-05-25', amount: '160', method: 'تحويل بنكي' },
    { paymentId: 'PAY-00278', client: 'نسيبة رسام', date: '2025-05-24', amount: '320', method: 'نقدي' },
    { paymentId: 'PAY-00277', client: 'هند العديل', date: '2025-05-24', amount: '120', method: 'بطاقة ائتمان' }
];