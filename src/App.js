import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/login/Login";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import DashboardCard from "./pages/Dashboard/DashboardCard1";
import Company from "./pages/Settings/Company/Company";
import Settings from "./pages/Settings/Settings";
import Companies from "./pages/Settings/Companies";
import Branches from "./pages/Settings/Branches";
import Plants from "./pages/Settings/Plants";
import Store from "./pages/Settings/Store";
import Roles1 from "./pages/Settings/RoleAndUsers/Roles1";
import Users1 from "./pages/Settings/RoleAndUsers/Users1";
import GroupLedger from "./pages/Group Ledger/GroupLedger";
import Taxation from "./pages/Settings/Taxation";
import Inventory from "./pages/Inventory/Inventory";
import StockGroup from "./pages/Inventory/StockGroup";
import StockCategory from "./pages/Inventory/StockCategory";
import Unit from "./pages/Inventory/Unit";
import Brand from "./pages/Inventory/Brand";
import ItemMasterCondition from "./pages/Settings/ItemMasterCondition";
import Features from "./pages/Settings/Features";
import StockItem from "./pages/Inventory/StockItem";
import SalesEnquiry from "./pages/Settings/SalesEnquiry";
import SalesQuotation from "./pages/Settings/SalesQuotation";
import PurchaseEnquiry from "./pages/Settings/PurchaseEnquiry";
import AccountsLedger from "./pages/Accounts/AccountsLedger";
import Accounts from "./pages/Accounts/Accounts";
import Group from "./pages/Accounts/Group";
import VoucherType from "./pages/Accounts/VoucherType";
import CostCentre from "./pages/Accounts/CostCentre";
import ModeTerms from "./pages/Accounts/ModeTerms";
import TermOfDelivery from "./pages/Accounts/TermOfDelivery";
import SalesMan from "./pages/Accounts/SalesMan";
import Transporter from "./pages/Accounts/Transporter";
import Courier from "./pages/Accounts/Courier";
import FinancialYear from "./pages/Accounts/FinancialYear";
import DepreciationMethod from "./pages/Accounts/DepreciationMethod";
import AssetClassification from "./pages/Accounts/AssetClassification";
import AssetGroup from "./pages/Accounts/AssetGroup";
import AssetCategory from "./pages/Accounts/AssetCategory";
import Department from "./pages/Accounts/Department";
import Division from "./pages/Accounts/Division";
import Custodians from "./pages/Accounts/Custodians";
import Locations from "./pages/Accounts/Locations";
import InsuranceType from "./pages/Accounts/InsuranceType";
import ServiceType from "./pages/Accounts/ServiceType";
import FaLedger from "./pages/Accounts/FaLedger";
import Sales from "./pages/Sales/Sales";
import Customer from "./pages/Sales/Customer";
import Purchase from "./pages/Puchase/Purchase";
import Vendor from "./pages/Puchase/Vendor";

// Main layout component that includes Sidebar and Header
const AppLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <Outlet /> {/* This is where child routes will render */}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardCard />} />
          <Route path="/company" element={<Company />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/store" element={<Store />} />
          <Route path="/roles" element={<Roles1 />} />
          <Route path="/users" element={<Users1 />} />

          <Route path="/accounts" element={<Accounts />} />
          <Route path="/group" element={<Group />} />
          <Route path="/accounts-ledger" element={<AccountsLedger />} />
          <Route path="/voucher-type" element={<VoucherType />} />
          <Route path="/cost-centre" element={<CostCentre />} />
          <Route path="/mode-terms" element={<ModeTerms />} />
          <Route path="/term-of-delivery" element={<TermOfDelivery />} />
          <Route path="/sales-man" element={<SalesMan />} />
          <Route path="/transporter" element={<Transporter />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/financial-year" element={<FinancialYear />} />
          <Route path="/depreciation-method" element={<DepreciationMethod />} />
          <Route path="/asset-classification" element={<AssetClassification />} />
          <Route path="/asset-group" element={<AssetGroup />} />
          <Route path="/asset-category" element={<AssetCategory />} />
          <Route path="/department" element={<Department />} />
          <Route path="/division" element={<Division />} />
          <Route path="/custodians" element={<Custodians />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/insurance-type" element={<InsuranceType />} />
          <Route path="/service-type" element={<ServiceType />} />
          <Route path="/fa-ledger" element={<FaLedger />} />

          <Route path="/groupledger" element={<GroupLedger />} />
          <Route path="/taxation" element={<Taxation />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/stockgroup" element={<StockGroup />} />
          <Route path="/stockcategory" element={<StockCategory />} />
          <Route path="/stockitem" element={<StockItem />} />
          <Route path="/unit" element={<Unit />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/features" element={<Features />} />
          <Route path="/ItemMasterCondition" element={<ItemMasterCondition />} />
          <Route path="/salesEnquiry" element={<SalesEnquiry />} />
          <Route path="/SalesQuotation" element={<SalesQuotation />} />
          <Route path="/PurchaseEnquiry" element={<PurchaseEnquiry />} />
          <Route path="/Sales" element={<Sales />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Purchase" element={<Purchase />} />
          <Route path="/Vendor" element={<Vendor />} />

          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
