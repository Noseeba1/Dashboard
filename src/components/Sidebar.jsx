import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  LayoutDashboard,
  ShoppingBag,
  PlayCircle,
  Archive,
  Briefcase,
  Gift,
  BarChart3,
  Wallet,
  UserCheck,
  Settings,
  RefreshCw,
  FileText,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { to: "/control-panel", text: "لوحة التحكم", icon: <LayoutDashboard size={18} /> },
  { to: "/orders", text: "الطلبات", icon: <ShoppingBag size={18} /> },
  { to: "/customers", text: "العملاء", icon: <UserCheck size={18} /> },
  { to: "/invoices", text: "الفواتير", icon: <FileText size={18} /> },
  { to: "/dashboard", text: "تشغيل الطلبات", icon: <PlayCircle size={18} /> },
  { to: "/inventory", text: "المخزون", icon: <Archive size={18} /> },
  { to: "/services", text: "الخدمات والأسعار", icon: <Briefcase size={18} /> },
  { to: "/offers", text: "العروض والخصومات", icon: <Gift size={18} /> },
  { to: "/reports", text: "التقارير", icon: <BarChart3 size={18} /> },
  { to: "/accountant", text: "لوحة المحاسب", icon: <Wallet size={18} /> },
  { to: "/branch", text: "لوحة مدير الفرع", icon: <UserCheck size={18} /> },
  { to: "/settings", text: "الإعدادات", icon: <Settings size={18} /> },
];

function isActive(pathname, item) {
  if (item.to === "/orders") {
    return pathname === item.to || pathname.toLowerCase().startsWith("/orderdetails");
  }
  if (item.to === "/customers") {
    return pathname === item.to || pathname.startsWith("/add-customer");
  }
  if (item.to === "/invoices") {
    return pathname === item.to || pathname.startsWith("/add-invoice");
  }
  return pathname === item.to;
}

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  return (
    <aside className="sidebar">
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
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`menu-item ${isActive(pathname, item) ? "active" : ""}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.text}</span>
          </Link>
        ))}

        <div className="status-toggle">
          <RefreshCw size={18} className="status-icon" />
          <span className="status-text">تغيير الحالة العام</span>
        </div>
      </nav>
    </aside>
  );
}
