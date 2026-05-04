import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, LogOut, Search, AlertTriangle, MessageCircle, ClipboardList,
  Loader2, PackageCheck, CheckCircle2, Calendar, LayoutDashboard,
  ShoppingBag, Wallet, UserCheck, PlayCircle, FileText, Truck, AlertCircle, BarChart3,
  UserCircle ,Archive ,Briefcase, Gift, Star, Settings, ChevronDown, RefreshCw, Box, X, Trash2
} from "lucide-react";

const initialOrders = [
  { id: 1258, name: "نهى نبيل", service: "غسيل + كي", pieces: "5 قطع", status: "تم الفرز", next: "تم الغسيل" },
  { id: 1257, name: "شهد الكربي", service: "غسيل عادي", pieces: "3 قطع", status: "تم الغسيل", next: "تم الكي" },
  { id: 1256, name: "نسيبة رسام", service: "غسيل + كي", pieces: "12 قطعة", status: "تم الكي", next: "جاهز للتغليف" },
  { id: 1255, name: "هند العديل", service: "كي فقط", pieces: "2 قطع", status: "تم الاستلام", next: "تم الفرز" },
  { id: 1254, name: "منار ماطر", service: "غسيل + كي", pieces: "8 قطع", status: "جاهز للتغليف", next: "جاهز للتسليم" },
  { id: 1253, name: "نورانبيل", service: "غسيل عادي", pieces: "4 قطع", status: "تم الفرز", next: "تم الغسيل" },
];

function MenuItem({ icon, text, active, to }) {
  return (
    <Link to={to || "/"} className={`p-3.5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all no-underline ${active ? "bg-[#4A7FA7]" : "opacity-40 hover:opacity-100"}`}>
      <span className="text-white">{icon}</span>
      <span className="text-xs font-bold text-white">{text}</span>
    </Link>
  );
}

export default function Dashboard() {
  const [filter, setFilter] = useState("الكل");
  const [orders, setOrders] = useState(initialOrders);
  const [notes, setNotes] = useState([
    { id: "1258", text: "قميص يحتاج عناية إضافية بالياقة" },
    { id: "1255", text: "فستان حرير - غسيل بارد فقط" }
  ]);
  const [alerts, setAlerts] = useState([
    { text: "تأخير في الطلب #1259", status: "urgent" }
  ]);

  // States النوافذ
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  
  // States التعديلات الأخيرة (الخروج والإشعارات)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [tempText, setTempText] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const statuses = ["تم الاستلام", "تم الفرز", "تم الغسيل", "تم الكي", "جاهز للتغليف", "جاهز للتسليم"];
  const filterOptions = ["الكل", ...statuses];

  const filteredOrders = filter === "الكل" ? orders : orders.filter(o => o.status === filter);

  const handleStatusChange = (orderId, selectedValue) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: selectedValue, next: selectedValue };
      }
      return o;
    }));
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const deleteAlert = (index) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  const handleUpdate = (type) => {
    if (!tempText) return;
    if (type === "note") {
      setNotes([{ id: selectedOrderId || "عام", text: tempText }, ...notes]);
      setShowNoteModal(false);
    } else {
      setAlerts([{ text: tempText, status: "urgent" }, ...alerts]);
      setShowAlertModal(false);
    }
    setTempText("");
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex items-start overflow-y-auto font-sans" dir="rtl">
      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#2F5D7C] text-white flex flex-col p-5 shadow-xl shrink-0 min-h-screen sticky top-0">
          <div className="flex items-center justify-center gap-2 mb-10 text-white/50">
            <Box size={18} />
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase">نظام إدارة المغاسل</h2>
          </div>
          <div className="mb-8 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-[#4A7FA7] rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/10">N</div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold">نُهى نبيل</span>
              <span className="text-[10px] text-white/40">موظف تشغيل</span>
            </div>
          </div>
          <nav className="flex flex-col gap-1 flex-1 text-right">
          <MenuItem icon={<LayoutDashboard size={18} />} text="لوحة التحكم" to="/" />
          <MenuItem icon={<ShoppingBag size={18} />} text="الطلبات" />
          <MenuItem icon={<UserCircle size={18} />} text="الموظفين" to="/employees" />
          <MenuItem icon={<PlayCircle size={18} />} text="تشغيل الطلبات" to="/dashboard" active/>
          <MenuItem icon={<Archive size={18} />} text="المخزون" to="/inventory" />
          <MenuItem icon={<Briefcase size={18} />} text="الخدمات والأسعار" to="/services" />
          <MenuItem icon={<Gift size={18} />} text="العروض والخصومات" to="/offers" />
          <MenuItem icon={<BarChart3 size={18} />} text="التقارير" to="/reports"  />
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

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
              <Calendar size={18} className="text-[#4A7FA7]" />
              <span>الثلاثاء، 28 أبريل 2026</span>
            </div>
            <div className="flex items-center gap-5">
               {/* زر الإشعارات التفاعلي */}
               <Bell size={24} className="text-gray-300 cursor-pointer hover:text-[#4A7FA7] transition-colors" onClick={() => setShowNotifications(true)} />
               {/* زر الخروج التفاعلي */}
               <LogOut size={24} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowLogoutConfirm(true)} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tighter text-right">لوحة تشغيل الطلبات</h1>

          <div className="grid grid-cols-4 gap-6 mb-8 text-right">
            <Card title="مكتملة اليوم" value="6" icon={<CheckCircle2 />} color="text-green-500" />
            <Card title="جاهزة للتغليف" value="8" icon={<PackageCheck />} color="text-purple-400" />
            <Card title="قيد التنفيذ" value="18" icon={<Loader2 className="animate-spin-slow" />} color="text-orange-400" />
            <Card title="إجمالي الطلبات" value={orders.length} icon={<ClipboardList />} color="text-[#4A7FA7]" />
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-3 flex flex-col gap-4">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
                <div className="p-7 border-b border-gray-50 flex flex-col gap-6">
                    <div className="flex gap-2 bg-gray-50/80 p-1 rounded-2xl w-fit">
                        {filterOptions.map((s, i) => (
                            <button key={i} onClick={() => setFilter(s)} className={`px-5 py-2 rounded-xl text-[11px] font-bold transition-all ${filter === s ? "bg-[#4A7FA7] text-white shadow-md" : "text-gray-400"}`}>
                            {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 overflow-x-auto text-right">
                    <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">
                            <th className="pr-6 pb-2">الطلب</th>
                            <th className="pb-2">العميل</th>
                            <th className="pb-2 text-[#4A7FA7]">الخدمة والقطع</th>
                            <th className="pb-2 text-center">المرحلة الحالية</th>
                            <th className="pb-2 text-center">المرحلة التالية</th>
                            <th className="text-center pb-2">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((o) => (
                        <tr key={o.id} className="bg-white hover:bg-gray-50/80 transition-all rounded-3xl shadow-sm border border-gray-100">
                            <td className="p-5 pr-6 rounded-r-3xl">
                                <span className="block font-bold text-gray-700 text-sm">#{o.id}</span>
                                <span className="text-[9px] text-gray-300 font-bold">رقم الفاتورة</span>
                            </td>
                            <td>
                                <span className="block text-gray-600 text-sm font-bold">{o.name}</span>
                                <span className="text-[9px] text-gray-300 font-bold">عميل مسجل</span>
                            </td>
                            <td>
                                <span className="block text-gray-400 text-xs font-medium">{o.service}</span>
                                <span className="text-[10px] text-gray-400 font-bold">{o.pieces}</span>
                            </td>
                            <td className="text-center">
                                <div className="bg-[#4A7FA7]/10 text-[#4A7FA7] px-3 py-1.5 rounded-xl text-[10px] font-black inline-block min-w-[100px]">{o.status}</div>
                            </td>
                            <td className="text-center">
                                <select 
                                  value={o.next} 
                                  onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                  className="bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl text-[10px] text-gray-500 font-bold outline-none cursor-pointer focus:border-[#4A7FA7]"
                                >
                                  {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                                </select>
                            </td>
                            <td className="rounded-l-3xl">
                                <div className="flex justify-center items-center gap-3">
                                    <MessageCircle size={18} className="text-blue-400 opacity-70 cursor-pointer hover:opacity-100" onClick={() => { setSelectedOrderId(o.id); setShowNoteModal(true); }} />
                                    <AlertTriangle size={18} className="text-orange-400 opacity-70 cursor-pointer hover:opacity-100" onClick={() => { setSelectedOrderId(o.id); setShowAlertModal(true); }} />
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-6 text-right">
              <SideBox title="ملاحظات اليوم" onShowAll={() => setShowAllNotes(true)}>
                {notes.slice(0, 3).map((n, i) => <NoteItem key={i} id={n.id} text={n.text} onDelete={() => deleteNote(i)} />)}
              </SideBox>
              <SideBox title="تنبيهات ومشاكل" onShowAll={() => setShowAllAlerts(true)}>
                {alerts.slice(0, 3).map((a, i) => <AlertItem key={i} text={a.text} status={a.status} onDelete={() => deleteAlert(i)} />)}
              </SideBox>
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

      {/* Modals الأصلية */}
      {(showNoteModal || showAlertModal) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative text-right">
            <button onClick={() => { setShowNoteModal(false); setShowAlertModal(false); }} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">{showNoteModal ? "إضافة ملاحظة للطلب" : "تبليغ عن مشكلة"}</h3>
            <div className="mb-4 text-xs font-bold text-[#4A7FA7]">رقم الطلب: #{selectedOrderId}</div>
            <textarea className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs outline-none focus:border-[#4A7FA7] min-h-[120px] mb-6" placeholder="اكتب هنا..." value={tempText} onChange={(e) => setTempText(e.target.value)} />
            <button onClick={() => handleUpdate(showNoteModal ? "note" : "alert")} className="w-full bg-[#4A7FA7] text-white py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">تحديث البيانات</button>
          </div>
        </div>
      )}

      {(showAllNotes || showAllAlerts) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4 text-right">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative max-h-[80vh] flex flex-col">
            <button onClick={() => { setShowAllNotes(false); setShowAllAlerts(false); }} className="absolute left-6 top-6 text-gray-400 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">{showAllNotes ? "كافة الملاحظات" : "كافة التنبيهات"}</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              {showAllNotes ? notes.map((n, i) => <NoteItem key={i} id={n.id} text={n.text} onDelete={() => deleteNote(i)} />) 
                            : alerts.map((a, i) => <AlertItem key={i} text={a.text} status={a.status} onDelete={() => deleteAlert(i)} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Components
function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col items-center text-center">
      <div className={`mb-3 p-3 bg-gray-50 rounded-2xl ${color}`}>{icon}</div>
      <h4 className="text-gray-400 text-[10px] font-bold mb-1 tracking-wider uppercase">{title}</h4>
      <span className={`text-4xl font-black ${color} tracking-tighter`}>{value}</span>
    </div>
  );
}

function SideBox({ title, children, onShowAll }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-[11px]">{title}</h3>
        <span onClick={onShowAll} className="text-[10px] font-bold text-[#4A7FA7] cursor-pointer hover:underline">عرض الكل</span>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function NoteItem({ id, text, onDelete }) {
  return (
    <div className="relative group text-[10px] text-gray-500 bg-gray-50/80 p-4 rounded-[1.5rem] border-r-4 border-[#4A7FA7]">
      <button onClick={onDelete} className="absolute left-2 top-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12}/></button>
      <span className="font-bold text-gray-800 block mb-1">#{id}</span>
      {text}
    </div>
  );
}

function AlertItem({ text, status, onDelete }) {
  const color = status === "urgent" ? "border-red-400 bg-red-50 text-red-600" : "border-orange-400 bg-orange-50 text-orange-600";
  return (
    <div className={`relative group flex items-center gap-3 p-4 rounded-[1.5rem] border-r-4 shadow-sm ${color}`}>
      <button onClick={onDelete} className="absolute left-2 top-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={12}/></button>
      <AlertTriangle size={14} className="shrink-0" />
      <span className="text-[10px] font-medium leading-relaxed">{text}</span>
    </div>
  );
}