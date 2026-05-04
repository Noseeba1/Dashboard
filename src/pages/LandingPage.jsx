import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="login-card">
          <div className="login-content">
            <img src={logo} alt="شعار نقاء" className="login-logo" />
            <p className="login-subtitle">مرحباً بك في نظام إدارة المغاسل الخاص بك</p>
            <h1 className="login-title">برنامج إدارة المغاسل</h1>

            <div className="login-form">
              <div className="form-group">
                <label className="form-label">اسم المستخدم</label>
                <input
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">كلمة المرور</label>
                <input
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  className="form-input"
                />
              </div>

              <Link
                to="/dashboard"
                className="login-button"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-section">
          <img src={hero} alt="غسالة" className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-text-container">
              <h2 className="hero-title">خدمة احترافية<br />للغسيل والكي</h2>
              <p className="hero-description">
                      تجربة دخول سلسة وواجهة عربية أنيقة لإدارة مغسلتك بكفاءة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
