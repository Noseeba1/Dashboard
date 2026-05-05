import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Settings, CalendarDays } from 'lucide-react';

const Topbar = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('ar-EG', options));
  }, []);

  return (
    <div className="topbar">
      
      {/* 📅 التاريخ (يمين) */}
      <div
        className="topbar-left"
        style={{ cursor: 'pointer', transition: 'color 0.2s' }}
        onClick={() => alert('سيتم فتح التقويم')}
        onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
        onMouseLeave={e => e.currentTarget.style.color = ''}
      >
        <CalendarDays size={18} />
        <span>{currentDate}</span>
      </div>

      {/* 🔔 الأيقونات (يسار) */}
      <div className="topbar-actions">
        <button onClick={() => alert('لا توجد إشعارات جديدة حالياً')} title="الإشعارات">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <button onClick={() => alert('صندوق الرسائل قيد التطوير')} title="الرسائل">
          <MessageSquare size={20} />
        </button>

        <button onClick={() => alert('شاشة الإعدادات قيد التطوير')} title="الإعدادات">
          <Settings size={20} />
        </button>
      </div>

    </div>
  );
};

export default Topbar;