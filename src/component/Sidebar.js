
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import Logo from '../assets/prudent logo.jpeg'

function Sidebar() {
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith('/settings');
  const isCompaniesPage = location.pathname.startsWith('/companies');
  const isBranchPage = location.pathname.startsWith('/branches');
  const isPlantPage = location.pathname.startsWith('/plants');
  const isStorePage = location.pathname.startsWith('/stores');
  const isAccountPage = location.pathname.startsWith('/accounts');
  const isTaxationPage = location.pathname.startsWith('/taxation');
  const isInventoryPage = location.pathname.startsWith('/inventory');
  const isStockGroupPage = location.pathname.startsWith('/stockgroup');
  const isStockCategoryPage = location.pathname.startsWith('/stockcategory');
  const isUnitPage = location.pathname.startsWith('/unit');
  const isBrandPage = location.pathname.startsWith('/brand');
  const isItemMasterCondition = location.pathname.startsWith('/ItemMasterCondition');
  const isStockItem = location.pathname.startsWith('/stockitem');
  const isFeatures = location.pathname.startsWith('/features');
  const isStore = location.pathname.startsWith('/store');
  const isRoles = location.pathname.startsWith('/roles');
  const isUsers = location.pathname.startsWith('/Users');
  const isGroup = location.pathname.startsWith('/group');
  const isVoucherType = location.pathname.startsWith('/voucher-type');
  const isCostCentre = location.pathname.startsWith('/cost-centre');
  const isModeTerm = location.pathname.startsWith('/mode-term');
  const isTermOfDelivery = location.pathname.startsWith('/term-of-delivery');
  const isSalesMan = location.pathname.startsWith('/sales-man');
  const isTransporter = location.pathname.startsWith('/transporter');
  const isCourier = location.pathname.startsWith('/courier');
  const isFinancialYear = location.pathname.startsWith('/financial-year');
  const isDepreciationMethod = location.pathname.startsWith('/depreciation-method');
  const isAssetClassification = location.pathname.startsWith('/asset-classification');
  const isAssetGroup = location.pathname.startsWith('/asset-group');
  const isAssetCategory = location.pathname.startsWith('/asset-category');
  const isDepartment = location.pathname.startsWith('/department');
  const isDivision = location.pathname.startsWith('/division');
  const isCustodians = location.pathname.startsWith('/custodians');
  const isLocations = location.pathname.startsWith('/locations');
  const isInsuranceType = location.pathname.startsWith('/insurance-type');
  const isServiceType = location.pathname.startsWith('/service-type');
  const isFaLedger = location.pathname.startsWith('/fa-ledger');
  const isSales = location.pathname.startsWith('/Sales');
  const isCustomer = location.pathname.startsWith('/Customer');
  const isPurchasePage = location.pathname.startsWith('/Purchase-Page');
  const isVendor = location.pathname.startsWith('/Vendor');

  // Tabs for normal pages
  const menuItems = [
    // { icon: '📊', label: 'Dashboard' },
    { icon: '💳', label: 'Purchase Enquiry', path: '/PurchaseEnquiry' },
    { icon: '🧾', label: 'Reports' },
    { icon: '📦', label: 'Warehouse Transaction', path: '/WarehouseTransaction' },
    { icon: "🔍", label: "Quality Control", path: "/QualityControl" },
    { icon: '🛒', label: 'Indent', path: '/Indent-Management' },
    // { icon: '🛒', label: 'Sales' },
    // { icon: '👥', label: 'Users' },
    { icon: '⚙️', label: 'Settings' },
  ];

  // Tabs for settings page only
  const settingsMenu = [
    { icon: '🧾', label: 'Account', path: '/accounts' },
    { icon: '📦', label: 'Inventory', path: '/inventory' },
    { icon: '🛒', label: 'Sale', path: '/Sales' },
    { icon: '💳', label: 'Purchase', path: '/Purchase' },
    { icon: '🛠️', label: 'Job Work' },
    { icon: '🏭', label: 'Production' },
    { icon: '👥', label: 'HRMS' },
  ];

  const displayMenu = isVendor || isPurchasePage || isCustomer || isSales || isFaLedger || isServiceType || isInsuranceType || isLocations || isCustodians || isDivision || isDepartment || isAssetCategory || isAssetGroup || isAssetClassification || isDepreciationMethod || isFinancialYear || isCourier || isTransporter || isSalesMan || isTermOfDelivery || isModeTerm || isCostCentre || isVoucherType || isGroup || isSettingsPage || isCompaniesPage || isBranchPage || isPlantPage || isStorePage || isAccountPage || isTaxationPage || isInventoryPage || isStockGroupPage || isStockCategoryPage || isUnitPage || isBrandPage || isItemMasterCondition || isStockItem || isFeatures || isStore || isRoles || isUsers ? settingsMenu : menuItems;

  return (
    <div className={`sidebar ${isSettingsPage ? 'settings-sidebar' : ''}`}>
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img src={Logo} alt="Logo" width={180} />
        </Link>
      </div>
      {displayMenu.map((item, index) => (
        <Link to={item.path} className="sidebar-item" key={index}>
          <span className="sidebar-icon">{item.icon}</span>
          <span className="sidebar-label">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
