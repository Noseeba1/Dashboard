import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "../pages/Customer.css";

const Layout = () => {
  // نقلنا بيانات العملاء هنا (الأب) لكي نتمكن من مشاركتها مع جميع الصفحات (الأبناء)
  const [customersData, setCustomersData] = useState(() => {
    const saved = localStorage.getItem('laundryCustomers_v2');
    if (saved) return JSON.parse(saved);
    return [
    { id: '#1015', name: 'فندق قصر الشرق', phone: '0511223344', email: 'info@qasr.com', city: 'الرياض', totalPurchases: '5,000 ر.س', status: 'نشط', joinDate: '2025-05-10' },
    { id: '#1014', name: 'أحمد عبدالله (عميل فردي)', phone: '0522334455', email: '-', city: 'جدة', totalPurchases: '1,200 ر.س', status: 'نشط', joinDate: '2025-05-08' },
    { id: '#1013', name: 'مستشفى النور', phone: '0533445566', email: 'quick@solutions.com', city: 'الدمام', totalPurchases: '12,500 ر.س', status: 'نشط', joinDate: '2025-05-05' },
    { id: '#1012', name: 'صالة أفراح المملكة', phone: '0544556677', email: 'falcon@group.com', city: 'الرياض', totalPurchases: '8,900 ر.س', status: 'نشط', joinDate: '2025-05-03' },
    { id: '#1011', name: 'خالد فهد (عميل فردي)', phone: '0555667788', email: 'amana@trust.com', city: 'مكة', totalPurchases: '4,300 ر.س', status: 'نشط', joinDate: '2025-05-02' },
    { id: '#1010', name: 'فندق ريتز كارلتون', phone: '0544556677', email: 'tech@hitech.com', city: 'الرياض', totalPurchases: '15,000 ر.س', status: 'نشط', joinDate: '2025-05-01' },
    { id: '#1009', name: 'سالم الشمري (عميل فردي)', phone: '0599887766', email: 'info@horizon.com', city: 'مكة', totalPurchases: '8,200 ر.س', status: 'نشط', joinDate: '2025-04-28' },
    { id: '#1008', name: 'مجمع الواحة السكني', phone: '0566778899', email: 'contact@pioneers.com', city: 'الخبر', totalPurchases: '55,400 ر.س', status: 'نشط', joinDate: '2025-04-20' },
    { id: '#1007', name: 'فاطمة الدوسري (عميل فردي)', phone: '0500112233', email: 'happy@est.com', city: 'المدينة', totalPurchases: '3,150 ر.س', status: 'نشط', joinDate: '2025-04-15' },
    { id: '#1006', name: 'مطعم كابانا', phone: '0533445511', email: 'achieve@company.com', city: 'الرياض', totalPurchases: '21,000 ر.س', status: 'نشط', joinDate: '2025-04-10' },
    { id: '#1005', name: 'فندق ماريوت', phone: '0555123456', email: 'info@alnour.com', city: 'الرياض', totalPurchases: '45,250 ر.س', status: 'نشط', joinDate: '2025-01-15' },
    { id: '#1004', name: 'نادي اللياقة البدنية', phone: '0533445566', email: 'contact@binaa.com', city: 'جدة', totalPurchases: '32,100 ر.س', status: 'نشط', joinDate: '2025-02-20' },
    { id: '#1003', name: 'محمد السالم (عميل فردي)', phone: '0506677889', email: 'info@almustaqbal.com', city: 'الدمام', totalPurchases: '18,750 ر.س', status: 'نشط', joinDate: '2025-03-10' },
    { id: '#1002', name: 'شقق العقيق الفندقية', phone: '0558899000', email: 'info@altysr.com', city: 'الرياض', totalPurchases: '12,300 ر.س', status: 'نشط', joinDate: '2025-03-22' },
    { id: '#1001', name: 'صالون الأناقة النسائي', phone: '0532211445', email: 'info@precision.com', city: 'جدة', totalPurchases: '28,900 ر.س', status: 'نشط', joinDate: '2025-04-05' },
    ];
  });

  const [invoicesData, setInvoicesData] = useState(() => {
    const saved = localStorage.getItem('laundryInvoices_v2');
    if (saved) return JSON.parse(saved);
    return [
    { id: '#1010', customer: 'فندق ريتز كارلتون', date: '2025-05-28', dueDate: '2025-06-28', total: '15,000 ر.س', paid: '15,000 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'بطاقة ائتمان', statusCode: 'paid' },
    { id: '#1009', customer: 'سالم الشمري (عميل فردي)', date: '2025-05-27', dueDate: '2025-06-27', total: '8,200 ر.س', paid: '4,000 ر.س', remaining: '4,200 ر.س', status: 'جزئية', method: 'تحويل بنكي', statusCode: 'partial' },
    { id: '#1008', customer: 'مجمع الواحة السكني', date: '2025-05-26', dueDate: '2025-06-26', total: '55,400 ر.س', paid: '0 ر.س', remaining: '55,400 ر.س', status: 'غير مدفوعة', method: '-', statusCode: 'unpaid' },
    { id: '#1007', customer: 'فاطمة الدوسري (عميل فردي)', date: '2025-05-25', dueDate: '2025-06-25', total: '3,150 ر.س', paid: '3,150 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'نقداً', statusCode: 'paid' },
    { id: '#1006', customer: 'مطعم كابانا', date: '2025-05-25', dueDate: '2025-06-25', total: '21,000 ر.س', paid: '21,000 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'تحويل بنكي', statusCode: 'paid' },
    { id: '#1005', customer: 'فندق ماريوت', date: '2025-05-25', dueDate: '2025-06-25', total: '8,450 ر.س', paid: '8,450 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'تحويل بنكي', statusCode: 'paid' },
    { id: '#1004', customer: 'نادي اللياقة البدنية', date: '2025-05-20', dueDate: '2025-06-20', total: '12,600 ر.س', paid: '6,300 ر.س', remaining: '6,300 ر.س', status: 'جزئية', method: '-', statusCode: 'partial' },
    { id: '#1003', customer: 'محمد السالم (عميل فردي)', date: '2025-05-18', dueDate: '2025-06-18', total: '5,750 ر.س', paid: '0 ر.س', remaining: '5,750 ر.س', status: 'غير مدفوعة', method: '-', statusCode: 'unpaid' },
    { id: '#1002', customer: 'شقق العقيق الفندقية', date: '2025-05-15', dueDate: '2025-06-15', total: '3,200 ر.س', paid: '3,200 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'تحويل بنكي', statusCode: 'paid' },
    { id: '#1001', customer: 'صالون الأناقة النسائي', date: '2025-05-10', dueDate: '2025-06-10', total: '9,100 ر.س', paid: '9,100 ر.س', remaining: '0 ر.س', status: 'مدفوعة', method: 'تحويل بنكي', statusCode: 'paid' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('laundryCustomers_v2', JSON.stringify(customersData));
  }, [customersData]);

  useEffect(() => {
    localStorage.setItem('laundryInvoices_v2', JSON.stringify(invoicesData));
  }, [invoicesData]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main>
          {/* هنا نرسل البيانات (customersData) ودالة التعديل (setCustomersData) إلى الصفحات الداخلية */}
          <Outlet context={{ customersData, setCustomersData, invoicesData, setInvoicesData }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;