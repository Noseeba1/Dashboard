import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./DashboardOrder";
import AccountantPanel from "./pages/AccountantPanel";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import ServicesAndPrices from "./pages/ServicesAndPrices";
import OffersAndDiscounts from "./pages/OffersAndDiscounts";
import Branch from "./pages/BranchManagerPanel.jsx"; 
//import Customers from "./pages/Customers.jsx"; // استيراد صفحة العملاء
import Employee from "./pages/Employees.jsx";
import Loyalty from "./pages/Loyalty.jsx"; // استيراد صفحة نقاط الولاء

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/accountant", element: <AccountantPanel /> },
  { path: "/reports", element: <Reports /> },
  { path: "/inventory", element: <Inventory /> },
  { path: "/services", element: <ServicesAndPrices /> },
  { path: "/offers", element: <OffersAndDiscounts /> },
  { path: "/branch", element: <Branch /> },
  //{ path: "/customers", element: <Customers /> },
  { path: "/employees", element: <Employee /> },
  { path: "/loyalty", element: <Loyalty /> },
  { path: "*", element: <LandingPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;