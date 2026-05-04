import React, { useState } from 'react';
//import "./Dashboard.css";

import { Plus, Search, Filter, Edit3, Eye, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';

const Customers = () => {
  const { customersData, setCustomersData } = useOutletContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByHighest, setSortByHighest] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const itemsPerPage = 2; // عرض عميلين في كل صفحة لتجربة التصفح

  let processedCustomers = customersData.filter(customer => 
    (customer.name || '').includes(searchQuery) || 
    (customer.phone || '').includes(searchQuery) ||
    (customer.email || '').includes(searchQuery)
  );

  if (sortByHighest) {
    processedCustomers.sort((a, b) => {
      const valA = parseInt((a.totalPurchases || '0').replace(/,/g, '').replace(' ر.س', ''));
      const valB = parseInt((b.totalPurchases || '0').replace(/,/g, '').replace(' ر.س', ''));
      return valB - valA;
    });
  }

  const totalPages = Math.max(1, Math.ceil(processedCustomers.length / itemsPerPage));
  const currentItems = processedCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (id) => {
    if(window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      setCustomersData(customersData.filter(c => c.id !== id));
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h1>العملاء</h1>
        </div>
        <Link to="/add-customer" className="btn-primary">
          <Plus size={18} />
          إضافة عميل جديد
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-input">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="بحث باسم العميل أو رقم الجوال أو البريد الإلكتروني..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="btn-secondary" 
          style={{
            padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: sortByHighest ? '#eff6ff' : 'white',
            borderColor: sortByHighest ? '#2563eb' : '#e2e8f0',
            color: sortByHighest ? '#2563eb' : 'inherit'
          }}
          onClick={() => {
            setSortByHighest(!sortByHighest);
            setCurrentPage(1); // العودة للصفحة الأولى عند التصفية
          }}
          title="ترتيب حسب المشتريات الأعلى"
        >
          <Filter size={18} />
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>اسم العميل</th>
              <th>رقم الجوال</th>
              <th>البريد الإلكتروني</th>
              <th>المدينة</th>
              <th>إجمالي المشتريات</th>
              <th>الحالة</th>
              <th>تاريخ التسجيل</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((customer, index) => (
              <tr key={index}>
                <td style={{color: '#2563eb', fontWeight: '700'}}>{customer.id}</td>
                <td style={{fontWeight: '700'}}>{customer.name}</td>
                <td style={{direction: 'ltr', textAlign: 'right'}}>{customer.phone}</td>
                <td style={{color: '#64748b'}}>{customer.email}</td>
                <td>{customer.city}</td>
                <td>{customer.totalPurchases}</td>
                <td>
                  <span className="status-badge status-active">
                    {customer.status}
                  </span>
                </td>
                <td>{customer.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => navigate('/add-customer', { state: { customerToEdit: customer } })} title="تعديل"><Edit3 size={16} /></button>
                    <button onClick={() => setViewingCustomer(customer)} title="عرض التفاصيل"><Eye size={16} /></button>
                    <button onClick={() => handleDelete(customer.id)} style={{color: '#ef4444'}} title="حذف"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          <ChevronRight size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page} 
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {viewingCustomer && (
        <div className="modal-overlay" onClick={() => setViewingCustomer(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>بطاقة العميل ({viewingCustomer.id})</h2>
              <button className="close-btn" onClick={() => setViewingCustomer(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-row"><span className="detail-label">الاسم:</span><span className="detail-value">{viewingCustomer.name}</span></div>
              <div className="detail-row"><span className="detail-label">رقم الجوال:</span><span className="detail-value" style={{direction: 'ltr', textAlign: 'right'}}>{viewingCustomer.phone}</span></div>
              <div className="detail-row"><span className="detail-label">البريد:</span><span className="detail-value" style={{direction: 'ltr', textAlign: 'right'}}>{viewingCustomer.email}</span></div>
              <div className="detail-row"><span className="detail-label">المدينة:</span><span className="detail-value">{viewingCustomer.city}</span></div>
              <div className="detail-row"><span className="detail-label">إجمالي المشتريات:</span><span className="detail-value" style={{color: '#2563eb'}}>{viewingCustomer.totalPurchases}</span></div>
              <div className="detail-row"><span className="detail-label">تاريخ التسجيل:</span><span className="detail-value">{viewingCustomer.joinDate}</span></div>
              <div className="detail-row"><span className="detail-label">الحالة:</span><span className="detail-value"><span className="status-badge status-active">{viewingCustomer.status}</span></span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
