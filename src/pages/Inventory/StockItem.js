import React, { useState } from "react";
import "../Settings/Companies.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Tabs, Tab, Box } from "@mui/material";
// ...existing code...
const StockItem = () => {
  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    parentName: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
  });

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // Sample companies data
  const companiesData = [
    {
      id: 1,
      name: "AccuZip Solutions Pvt. Ltd.",
      parentName: "",
      address: "",
      phone: "07967219000",
      mobile: "",
      email: "hr@sal.edu.in",
      website: "www.sal.edu.in",
    },
    {
      id: 2,
      name: "Demo Ankit",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "Ankit@gmail.com",
      website: "",
    },
  ];

  // Filter companies based on search criteria
  const filteredCompanies = companiesData.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      company.parentName
        .toLowerCase()
        .includes(searchFilters.parentName.toLowerCase()) &&
      company.address
        .toLowerCase()
        .includes(searchFilters.address.toLowerCase()) &&
      company.phone.toLowerCase().includes(searchFilters.phone.toLowerCase()) &&
      company.mobile
        .toLowerCase()
        .includes(searchFilters.mobile.toLowerCase()) &&
      company.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      company.website
        .toLowerCase()
        .includes(searchFilters.website.toLowerCase())
    );
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [maintainBatches, setMaintainBatches] = useState("No");
  const [assemblyStepsDialog, setAssemblyStepsDialog] = useState(false);
  const [assemblySteps, setAssemblySteps] = useState([
    { id: 1, process: "Assembling", subProcess: "", cycleTimeMinutes: "0" },
  ]);
  const [bomDialogOpen, setBomDialogOpen] = useState(false);
  const [bomName, setBomName] = useState("");
  // Basic tab - Stock Name for referencing in BOM config
  const [stockName, setStockName] = useState("");

  // Advanced Features state
  const [advancedFeatures, setAdvancedFeatures] = useState({
    setAlterImageForStockItem: false,
    setAlterPackingInfo: false,
    setAlterInwardLocation: false,
    setAlterLocationWiseROL: false,
    setAlterPartyWiseItemCode: false,
    setAlterVoucherTypeWiseItem: false,
    setAlterQCSpecification: false,
    otherInfo: false,
  });

  // Other Info dialog state
  const [otherInfoDialogOpen, setOtherInfoDialogOpen] = useState(false);
  const [otherInfo, setOtherInfo] = useState({
    zohoItemName: "",
    departmentItemName: "",
    accountingLedger: "",
    type: "",
    subType: "",
    rawMaterialOf: "",
  });

  // Vendor Info dialog state
  const [vendorInfoDialogOpen, setVendorInfoDialogOpen] = useState(false);
  const [vendorItems, setVendorItems] = useState([
    {
      id: 1,
      slNo: 1,
      vendorName: "",
      avgDeliveryDay: 0,
      rate: 0,
      validTillQuotedRate: 0,
      lastQuotedRate: 0,
      currentQuotedRate: 0,
      lastPurRate: 0,
      lastPurQty: 0,
      lastPurRej: 0,
    },
    {
      id: 2,
      slNo: 2,
      vendorName: "",
      avgDeliveryDay: 0,
      rate: 0,
      validTillQuotedRate: 0,
      lastQuotedRate: 0,
      currentQuotedRate: 0,
      lastPurRate: 0,
      lastPurQty: 0,
      lastPurRej: 0,
    },
  ]);

  // Packing Info dialog state
  const [packingInfoDialogOpen, setPackingInfoDialogOpen] = useState(false);
  const [packingInfo, setPackingInfo] = useState({
    primaryPackagingInput: "",
    primaryPackaging: "BOX",
    primaryPackagingInput2: "",
    primaryNos: "NOS",
    primaryPackingEnabled: "No",
    masterPackagingInput: "",
    masterPackaging: "BOX",
    masterPackagingInput2: "",
    masterNos: "NOS",
    masterPackingEnabled: "No",
    length: "",
    width: "",
    height: "",
    cubicFeet: "",
    netWeight: "",
    grossWeight: "",
  });
  const [packingItems, setPackingItems] = useState([
    {
      id: 1,
      slNo: 1,
      itemName: "",
      qty: "",
      rate: "",
      amount: "",
    },
  ]);

  // Primary Packing Info dialog state
  const [primaryPackingInfoDialogOpen, setPrimaryPackingInfoDialogOpen] =
    useState(false);
  const [primaryPackingInfo, setPrimaryPackingInfo] = useState({
    length: "",
    width: "",
    height: "",
    cubicFeet: "",
    netWeight: "",
    grossWeight: "",
  });
  const [primaryPackingItems, setPrimaryPackingItems] = useState([
    {
      id: 1,
      slNo: 1,
      itemName: "",
      qty: "",
      rate: "",
      amount: "",
    },
  ]);

  // Master Packing Info dialog state
  const [masterPackingInfoDialogOpen, setMasterPackingInfoDialogOpen] =
    useState(false);
  const [masterPackingInfo, setMasterPackingInfo] = useState({
    length: "",
    width: "",
    height: "",
    cubicFeet: "",
    netWeight: "",
    grossWeight: "",
  });
  const [masterPackingItems, setMasterPackingItems] = useState([
    {
      id: 1,
      slNo: 1,
      itemName: "",
      qty: "",
      rate: "",
      amount: "",
    },
  ]);

  // Image Configuration dialog state
  const [imageConfigDialogOpen, setImageConfigDialogOpen] = useState(false);
  const [imageConfig, setImageConfig] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // BOM configuration dialog (after entering BOM name)
  const [bomConfigOpen, setBomConfigOpen] = useState(false);
  const [bomConfig, setBomConfig] = useState({
    unitToProduce: 0,
    wastageDetails: "No",
    additionalExpense: "No",
    unitOfManufacture: "",
  });
  const [bomItems, setBomItems] = useState([
    {
      id: 1,
      process: "",
      item: "",
      godown: "",
      subType: "",
      quantity: "",
      wastageDetails: "No",
      budgetRate: "",
      vendorName: "",
    },
  ]);

  // Wastage details dialog
  const [wastageDialogOpen, setWastageDialogOpen] = useState(false);
  const [wastageInfo, setWastageInfo] = useState({
    unitToProduce: 0,
  });

  // Inward Location dialog
  const [inwardLocationDialogOpen, setInwardLocationDialogOpen] =
    useState(false);
  const [inwardLocationData, setInwardLocationData] = useState([
    {
      id: 1,
      mainLocation: "",
      storeLocation: "",
      rack: "",
      shelf: "",
    },
  ]);

  // Location Wise ROL dialog state
  const [locationWiseROLDialogOpen, setLocationWiseROLDialogOpen] =
    useState(false);
  const [locationWiseROLData, setLocationWiseROLData] = useState([
    {
      id: 1,
      location: "",
      reorderLevel: "",
      unit: "",
    },
  ]);

  // Party Wise Item Code dialog
  const [partyWiseDialogOpen, setPartyWiseDialogOpen] = useState(false);
  const [partyWiseRows, setPartyWiseRows] = useState([
    {
      id: 1,
      partyName: "",
      partyNo: "",
      alias: "",
      printName: "",
    },
  ]);

  // QC Specification dialog
  const [qcSpecificationDialogOpen, setQCSpecificationDialogOpen] =
    useState(false);
  const [qcSpecificationRows, setQCSpecificationRows] = useState([
    {
      id: 1,
      slNo: 1,
      specification: "",
      standard: "",
    },
  ]);
  const [copyQCParametersFrom, setCopyQCParametersFrom] =
    useState("Not Applicable");
  const [setPartyWiseSpecification, setSetPartyWiseSpecification] =
    useState("No");

  // Party Wise Specification dialog
  const [
    partyWiseSpecificationDialogOpen,
    setPartyWiseSpecificationDialogOpen,
  ] = useState(false);
  const [partyWiseSpecificationRows, setPartyWiseSpecificationRows] = useState([
    {
      id: 1,
      slNo: 1,
      partyName: "Party 1",
      setAlterSpecification: "No",
    },
  ]);

  // Per-party QC Testing Parameter dialog state
  const [partySpecDialogOpen, setPartySpecDialogOpen] = useState(false);
  const [activePartySpecRowId, setActivePartySpecRowId] = useState(null);
  // Map of partyRowId -> { copyFrom: string, rows: Array<{id, slNo, specification, standard}> }
  const [partySpecData, setPartySpecData] = useState({});

  const [wastageItems, setWastageItems] = useState([
    {
      id: 1,
      slNo: 1,
      description: "Wastage",
      percentage: "",
      value: "",
      balance: "1.00",
    },
  ]);

  const addWastageItem = () => {
    setWastageItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        description: "",
        percentage: "",
        value: "",
        balance: "",
      },
    ]);
  };

  const updateWastageItem = (id, field, value) => {
    setWastageItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteWastageItem = (id) => {
    setWastageItems((rows) => rows.filter((r) => r.id !== id));
  };

  // Additional expense dialog
  const [additionalExpenseDialogOpen, setAdditionalExpenseDialogOpen] =
    useState(false);
  const [additionalExpenseItems, setAdditionalExpenseItems] = useState([
    {
      id: 1,
      slNo: 1,
      description: "Samples",
      expenseType: "Samples",
      unit: "",
      uom: "",
      rate: "",
      amount: "",
    },
  ]);

  const addAdditionalExpenseItem = () => {
    setAdditionalExpenseItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        description: "",
        expenseType: "",
        unit: "",
        uom: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  const updateAdditionalExpenseItem = (id, field, value) => {
    setAdditionalExpenseItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteAdditionalExpenseItem = (id) => {
    setAdditionalExpenseItems((rows) => rows.filter((r) => r.id !== id));
  };

  const addBomItem = () => {
    setBomItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        process: "",
        item: "",
        godown: "",
        subType: "",
        quantity: "",
        wastageDetails: "No",
        budgetRate: "",
        vendorName: "",
      },
    ]);
  };

  const updateBomItem = (id, field, value) => {
    setBomItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteBomItem = (id) => {
    setBomItems((rows) => rows.filter((r) => r.id !== id));
  };

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle advanced features toggle
  const handleAdvancedFeatureToggle = (feature) => {
    setAdvancedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  // Handle set button click for advanced features
  const handleAdvancedFeatureSet = (feature) => {
    // Add your logic here for what happens when "Set" is clicked
    console.log(`Setting configuration for ${feature}`);

    if (feature === "setAlterImageForStockItem") {
      setImageConfigDialogOpen(true);
    }
    if (feature === "setAlterPackingInfo") {
      setPackingInfoDialogOpen(true);
    }
    if (feature === "otherInfo") {
      setOtherInfoDialogOpen(true);
    }
    if (feature === "setAlterVoucherTypeWiseItem") {
      setVendorInfoDialogOpen(true);
    }
    if (feature === "setAlterInwardLocation") {
      setInwardLocationDialogOpen(true);
    }
    if (feature === "setAlterLocationWiseROL") {
      setLocationWiseROLDialogOpen(true);
    }
    if (feature === "setAlterPartyWiseItemCode") {
      setPartyWiseDialogOpen(true);
    }
    if (feature === "setAlterQCSpecification") {
      setQCSpecificationDialogOpen(true);
    }
    // You can open dialogs or perform specific actions based on other features
  };

  // Handle Other Info field change
  const handleOtherInfoChange = (field, value) => {
    setOtherInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle vendor item changes
  const updateVendorItem = (id, field, value) => {
    setVendorItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add new vendor row
  const addVendorItem = () => {
    const newId = vendorItems.length
      ? Math.max(...vendorItems.map((item) => item.id)) + 1
      : 1;
    const newSlNo = vendorItems.length + 1;
    const newItem = {
      id: newId,
      slNo: newSlNo,
      vendorName: "",
      avgDeliveryDay: 0,
      rate: 0,
      validTillQuotedRate: 0,
      lastQuotedRate: 0,
      currentQuotedRate: 0,
      lastPurRate: 0,
      lastPurQty: 0,
      lastPurRej: 0,
    };
    setVendorItems([...vendorItems, newItem]);
  };

  // Delete vendor row
  const deleteVendorItem = (id) => {
    if (vendorItems.length > 1) {
      setVendorItems((items) => items.filter((item) => item.id !== id));
    }
  };

  // Handle inward location item changes
  const updateInwardLocationItem = (id, field, value) => {
    setInwardLocationData((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add new inward location row
  const addInwardLocationItem = () => {
    const newId = inwardLocationData.length
      ? Math.max(...inwardLocationData.map((item) => item.id)) + 1
      : 1;
    const newItem = {
      id: newId,
      mainLocation: "",
      storeLocation: "",
      rack: "",
      shelf: "",
    };
    setInwardLocationData([...inwardLocationData, newItem]);
  };

  // Delete inward location row
  const deleteInwardLocationItem = (id) => {
    if (inwardLocationData.length > 1) {
      setInwardLocationData((items) => items.filter((item) => item.id !== id));
    }
  };

  // Party Wise rows handlers
  const updatePartyWiseRow = (id, field, value) => {
    setPartyWiseRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addPartyWiseRow = () => {
    setPartyWiseRows((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        partyName: "",
        partyNo: "",
        alias: "",
        printName: "",
      },
    ]);
  };

  const deletePartyWiseRow = (id) => {
    setPartyWiseRows((prev) =>
      prev.length > 1 ? prev.filter((r) => r.id !== id) : prev
    );
  };

  // QC Specification rows handlers
  const updateQCSpecificationRow = (id, field, value) => {
    setQCSpecificationRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addQCSpecificationRow = () => {
    setQCSpecificationRows((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        specification: "",
        standard: "",
      },
    ]);
  };

  const deleteQCSpecificationRow = (id) => {
    setQCSpecificationRows((prev) =>
      prev.length > 1 ? prev.filter((r) => r.id !== id) : prev
    );
  };

  // Party Wise Specification rows handlers
  const updatePartyWiseSpecificationRow = (id, field, value) => {
    setPartyWiseSpecificationRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const addPartyWiseSpecificationRow = () => {
    setPartyWiseSpecificationRows((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        partyName: `Party ${prev.length + 1}`,
        setAlterSpecification: "No",
      },
    ]);
  };

  const deletePartyWiseSpecificationRow = (id) => {
    setPartyWiseSpecificationRows((prev) =>
      prev.length > 1 ? prev.filter((r) => r.id !== id) : prev
    );
  };

  // Helpers for per-party spec data
  const ensurePartySpec = (prev, rowId) =>
    prev[rowId] || {
      copyFrom: "Not Applicable",
      rows: [{ id: 1, slNo: 1, specification: "", standard: "" }],
    };

  const openPartySpecDialog = (rowId) => {
    setPartySpecData((prev) => ({
      ...prev,
      [rowId]: ensurePartySpec(prev, rowId),
    }));
    setActivePartySpecRowId(rowId);
    setPartySpecDialogOpen(true);
  };

  const updatePartySpecCopyFrom = (rowId, value) => {
    setPartySpecData((prev) => {
      const data = ensurePartySpec(prev, rowId);
      return { ...prev, [rowId]: { ...data, copyFrom: value } };
    });
  };

  const addPartySpecRow = (rowId) => {
    setPartySpecData((prev) => {
      const data = ensurePartySpec(prev, rowId);
      const newId = data.rows.length
        ? Math.max(...data.rows.map((r) => r.id)) + 1
        : 1;
      const newRows = [
        ...data.rows,
        {
          id: newId,
          slNo: data.rows.length + 1,
          specification: "",
          standard: "",
        },
      ];
      return { ...prev, [rowId]: { ...data, rows: newRows } };
    });
  };

  const updatePartySpecRow = (rowId, id, field, value) => {
    setPartySpecData((prev) => {
      const data = ensurePartySpec(prev, rowId);
      const newRows = data.rows.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      );
      return { ...prev, [rowId]: { ...data, rows: newRows } };
    });
  };

  const deletePartySpecRow = (rowId, id) => {
    setPartySpecData((prev) => {
      const data = ensurePartySpec(prev, rowId);
      if (data.rows.length <= 1) return prev;
      const newRows = data.rows
        .filter((r) => r.id !== id)
        .map((r, idx) => ({ ...r, slNo: idx + 1 }));
      return { ...prev, [rowId]: { ...data, rows: newRows } };
    });
  };

  // Handle Location Wise ROL item changes
  const updateLocationWiseROLItem = (id, field, value) => {
    setLocationWiseROLData((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add new Location Wise ROL row
  const addLocationWiseROLItem = () => {
    const newId = locationWiseROLData.length
      ? Math.max(...locationWiseROLData.map((item) => item.id)) + 1
      : 1;
    const newItem = {
      id: newId,
      location: "",
      reorderLevel: "",
      minLevel: "",
      maxLevel: "",
      safetyStock: "",
    };
    setLocationWiseROLData((items) => [...items, newItem]);
  };

  // Delete Location Wise ROL row
  const deleteLocationWiseROLItem = (id) => {
    if (locationWiseROLData.length > 1) {
      setLocationWiseROLData((items) => items.filter((item) => item.id !== id));
    }
  };

  // Handle packing info changes
  const handlePackingInfoChange = (field, value) => {
    setPackingInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle packing item changes
  const updatePackingItem = (id, field, value) => {
    setPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add new packing item row
  const addPackingItem = () => {
    const newId = Math.max(...packingItems.map((item) => item.id)) + 1;
    const newSlNo = packingItems.length + 1;
    setPackingItems((prev) => [
      ...prev,
      {
        id: newId,
        slNo: newSlNo,
        itemName: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  // Delete packing item row
  const deletePackingItem = (id) => {
    if (packingItems.length > 1) {
      setPackingItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle primary packing info changes
  const handlePrimaryPackingInfoChange = (field, value) => {
    setPrimaryPackingInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle master packing info changes
  const handleMasterPackingInfoChange = (field, value) => {
    setMasterPackingInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle primary packing item changes
  const updatePrimaryPackingItem = (id, field, value) => {
    setPrimaryPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Handle master packing item changes
  const updateMasterPackingItem = (id, field, value) => {
    setMasterPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Add new primary packing item row
  const addPrimaryPackingItem = () => {
    const newId = Math.max(...primaryPackingItems.map((item) => item.id)) + 1;
    const newSlNo = primaryPackingItems.length + 1;
    setPrimaryPackingItems((prev) => [
      ...prev,
      {
        id: newId,
        slNo: newSlNo,
        itemName: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  // Add new master packing item row
  const addMasterPackingItem = () => {
    const newId = Math.max(...masterPackingItems.map((item) => item.id)) + 1;
    const newSlNo = masterPackingItems.length + 1;
    setMasterPackingItems((prev) => [
      ...prev,
      {
        id: newId,
        slNo: newSlNo,
        itemName: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  // Delete primary packing item row
  const deletePrimaryPackingItem = (id) => {
    if (primaryPackingItems.length > 1) {
      setPrimaryPackingItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Delete master packing item row
  const deleteMasterPackingItem = (id) => {
    if (masterPackingItems.length > 1) {
      setMasterPackingItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle image file selection
  const handleImageFileChange = (imageKey, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageConfig((prev) => ({
          ...prev,
          [imageKey]: {
            file: file,
            preview: e.target.result,
            name: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = (imageKey) => {
    setImageConfig((prev) => ({
      ...prev,
      [imageKey]: null,
    }));
  };

  const handleAssemblyStepsChange = (value) => {
    if (value === "Yes") {
      setAssemblyStepsDialog(true);
    }
  };

  const addAssemblyStep = () => {
    const newStep = {
      id: assemblySteps.length + 1,
      process: "",
      subProcess: "",
      cycleTimeMinutes: "0",
    };
    setAssemblySteps([...assemblySteps, newStep]);
  };

  const updateAssemblyStep = (id, field, value) => {
    setAssemblySteps(
      assemblySteps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const deleteAssemblyStep = (id) => {
    setAssemblySteps(assemblySteps.filter((step) => step.id !== id));
  };

  // Prevent form submit default and close dialog on Add
  const handleDialogAdd = (e) => {
    e.preventDefault();
    // Add logic here if needed
    closeDialog();
  };
  return (
    <>
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Stock Item</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="stock item tabs"
            >
              <Tab label="Basic Details" />
              <Tab label="Additional Details" />
              <Tab label="Advanced Features" />
            </Tabs>
          </Box>

          {/* Basic Details Tab */}
          {activeTab === 0 && (
            <Box sx={{ pt: 2 }}>
              <form
                className="company-form"
                style={{ maxHeight: "500px" }}
                onSubmit={handleDialogAdd}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="mt-3 row">
                      <div className="col-4 my-auto">
                        <label htmlFor="MasterID" className="form-label">
                          Master ID
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="MasterID"
                        />
                      </div>
                      <div className="col-4 my-auto">
                        <label htmlFor="AlterID" className="form-label">
                          Alter ID
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="AlterID"
                        />
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="GroupName" className="form-label">
                          Group Name
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="GroupName" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="StockName" className="form-label">
                          Name
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="StockName"
                          value={stockName}
                          onChange={(e) => setStockName(e.target.value)}
                        />
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="Under" className="form-label">
                          Under
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="Under" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="Units" className="form-label">
                          Units
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="Units" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="AlternateUnits" className="form-label">
                          Alternate Units
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="AlternateUnits"
                          className="form-select w-100"
                        >
                          <option>Primary</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}

          {/* Advanced Features Tab */}
          {activeTab === 2 && (
            <Box sx={{ pt: 2 }}>
              <form className="company-form" style={{ maxHeight: "500px" }}>
                <div className="row">
                  <div className="col-12">
                    <div className="mt-3 row">
                      {/* Set/Alter Image for Stock Item */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Image for Stock Item
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterImageForStockItem}
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterImageForStockItem"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterImageForStockItem
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterImageForStockItem && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet(
                                "setAlterImageForStockItem"
                              )
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter Packing Info */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Packing Info
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterPackingInfo}
                            onChange={() =>
                              handleAdvancedFeatureToggle("setAlterPackingInfo")
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterPackingInfo
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterPackingInfo && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet("setAlterPackingInfo")
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter Inward Location */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Inward Location
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterInwardLocation}
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterInwardLocation"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterInwardLocation
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterInwardLocation && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet("setAlterInwardLocation")
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter Location Wise ROL */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Location Wise ROL
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterLocationWiseROL}
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterLocationWiseROL"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterLocationWiseROL
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterLocationWiseROL && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet(
                                "setAlterLocationWiseROL"
                              )
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter Party Wise Item Code */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Party Wise Item Code
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterPartyWiseItemCode}
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterPartyWiseItemCode"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterPartyWiseItemCode
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterPartyWiseItemCode && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet(
                                "setAlterPartyWiseItemCode"
                              )
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter Voucher Type Wise Item */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter Approved Vender for Item
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              advancedFeatures.setAlterVoucherTypeWiseItem
                            }
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterVoucherTypeWiseItem"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterVoucherTypeWiseItem
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterVoucherTypeWiseItem && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet(
                                "setAlterVoucherTypeWiseItem"
                              )
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Set/Alter QC Specification */}
                      <div className="col-4 my-auto">
                        <label className="form-label">
                          Set/Alter QC Specification
                        </label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.setAlterQCSpecification}
                            onChange={() =>
                              handleAdvancedFeatureToggle(
                                "setAlterQCSpecification"
                              )
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.setAlterQCSpecification
                              ? "Yes"
                              : "No"}
                          </label>
                        </div>
                        {advancedFeatures.setAlterQCSpecification && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet(
                                "setAlterQCSpecification"
                              )
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Other Info */}
                      <div className="col-4 my-auto">
                        <label className="form-label">Other Info</label>
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={advancedFeatures.otherInfo}
                            onChange={() =>
                              handleAdvancedFeatureToggle("otherInfo")
                            }
                          />
                          <label className="form-check-label">
                            {advancedFeatures.otherInfo ? "Yes" : "No"}
                          </label>
                        </div>
                        {advancedFeatures.otherInfo && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleAdvancedFeatureSet("otherInfo")
                            }
                          >
                            Set
                          </button>
                        )}
                      </div>

                      {/* Other Info Dialog */}
                      <Dialog
                        open={otherInfoDialogOpen}
                        onClose={() => setOtherInfoDialogOpen(false)}
                        maxWidth="sm"
                        fullWidth
                      >
                        <DialogTitle>OTHER INFO</DialogTitle>
                        <DialogContent>
                          <div className="container-fluid">
                            <div className="row g-2 align-items-center">
                              {/* <div className="col-4 text-end">
                                Zoho Item Name
                              </div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  style={{ backgroundColor: "#f5d982" }}
                                  value={otherInfo.zohoItemName}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "zohoItemName",
                                      e.target.value
                                    )
                                  }
                                />
                              </div> */}
                              <div className="col-4 text-end">
                                Department Item Name
                              </div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={otherInfo.departmentItemName}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "departmentItemName",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-4 text-end">
                                Accounting ledger
                              </div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={otherInfo.accountingLedger}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "accountingLedger",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-4 text-end">Type</div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={otherInfo.type}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "type",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-4 text-end">Sub Type</div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={otherInfo.subType}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "subType",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-4 text-end">
                                Raw Material Of
                              </div>
                              <div className="col-8">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={otherInfo.rawMaterialOf}
                                  onChange={(e) =>
                                    handleOtherInfoChange(
                                      "rawMaterialOf",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOtherInfoDialogOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setOtherInfoDialogOpen(false)}
                          >
                            Save
                          </button>
                        </DialogActions>
                      </Dialog>

                      {/* Vendor Info Dialog */}
                      <Dialog
                        open={vendorInfoDialogOpen}
                        onClose={() => setVendorInfoDialogOpen(false)}
                        maxWidth="xl"
                        fullWidth
                      >
                        <DialogTitle>VENDOR INFO</DialogTitle>
                        <DialogContent>
                          <div className="container-fluid">
                            <div className="table-responsive mt-3">
                              <table className="table table-bordered table-sm">
                                <thead style={{ backgroundColor: "#b8c5d6" }}>
                                  <tr>
                                    <th style={{ width: "5%" }}>Sl No</th>
                                    <th style={{ width: "20%" }}>
                                      Vendor Name
                                    </th>
                                    <th style={{ width: "10%" }}>
                                      Avg Delivery Day
                                    </th>
                                    <th style={{ width: "8%" }}>Rate</th>
                                    <th style={{ width: "10%" }}>
                                      Valid Till Quoted Rate
                                    </th>
                                    <th style={{ width: "10%" }}>
                                      Last Quoted Rate
                                    </th>
                                    <th style={{ width: "10%" }}>
                                      Current Quoted Rate
                                    </th>
                                    <th style={{ width: "9%" }}>
                                      Last Pur Rate
                                    </th>
                                    <th style={{ width: "9%" }}>
                                      Last Pur Qty
                                    </th>
                                    <th style={{ width: "9%" }}>
                                      Last Pur Rej
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {vendorItems.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.slNo}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          value={item.vendorName}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "vendorName",
                                              e.target.value
                                            )
                                          }
                                          // style={{
                                          //   backgroundColor: item.slNo === 1 ? "#f5d982" : "white"
                                          // }}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.avgDeliveryDay}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "avgDeliveryDay",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.rate}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "rate",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.validTillQuotedRate}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "validTillQuotedRate",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.lastQuotedRate}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "lastQuotedRate",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.currentQuotedRate}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "currentQuotedRate",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.lastPurRate}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "lastPurRate",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.lastPurQty}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "lastPurQty",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.lastPurRej}
                                          onChange={(e) =>
                                            updateVendorItem(
                                              item.id,
                                              "lastPurRej",
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm me-2"
                                onClick={addVendorItem}
                              >
                                Add Row
                              </button>
                              {vendorItems.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    deleteVendorItem(
                                      vendorItems[vendorItems.length - 1].id
                                    )
                                  }
                                >
                                  Delete Last Row
                                </button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setVendorInfoDialogOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setVendorInfoDialogOpen(false)}
                          >
                            Save
                          </button>
                        </DialogActions>
                      </Dialog>

                      {/* Packing Info Dialog */}
                      <Dialog
                        open={packingInfoDialogOpen}
                        onClose={() => setPackingInfoDialogOpen(false)}
                        maxWidth="xl"
                        fullWidth
                      >
                        <DialogTitle
                          style={{
                            backgroundColor: "#b8c5d6",
                            textAlign: "center",
                            color: "black",
                          }}
                        >
                          PACKING INFO
                        </DialogTitle>
                        <DialogContent>
                          <div className="container-fluid">
                            {/* Packing Configuration Section */}
                            <div className="row g-2 mt-3">
                              <div className="col-2 text-start">
                                <strong>Primary Packaging</strong>
                              </div>
                              <div className="col-1">:</div>
                              <div className="col-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={packingInfo.primaryPackagingInput}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "primaryPackagingInput",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <select
                                  className="form-select form-select-sm"
                                  value={packingInfo.primaryPackaging}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "primaryPackaging",
                                      e.target.value
                                    )
                                  }
                                  // style={{ backgroundColor: "#f5d982" }}
                                >
                                  <option value="BOX">BOX</option>
                                  <option value="BAG">BAG</option>
                                  <option value="BOTTLE">BOTTLE</option>
                                  <option value="PACKET">PACKET</option>
                                  <option value="CONTAINER">CONTAINER</option>
                                </select>
                              </div>
                              <div className="col-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={packingInfo.primaryPackagingInput2}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "primaryPackagingInput2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <select
                                  className="form-select form-select-sm"
                                  value={packingInfo.primaryNos}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "primaryNos",
                                      e.target.value
                                    )
                                  }
                                  // style={{ backgroundColor: "#f5d982" }}
                                >
                                  <option value="NOS">NOS</option>
                                  <option value="KG">KG</option>
                                  <option value="LITER">LITER</option>
                                  <option value="METER">METER</option>
                                </select>
                              </div>
                              <div className="col-2 text-start">
                                <strong>Primary Packing:</strong>
                              </div>
                              <div className="col-2 d-flex align-items-center">
                                <div className="form-check form-switch me-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      packingInfo.primaryPackingEnabled ===
                                      "Yes"
                                    }
                                    onChange={() =>
                                      handlePackingInfoChange(
                                        "primaryPackingEnabled",
                                        packingInfo.primaryPackingEnabled ===
                                          "Yes"
                                          ? "No"
                                          : "Yes"
                                      )
                                    }
                                  />
                                  <label className="form-check-label">
                                    {packingInfo.primaryPackingEnabled === "Yes"
                                      ? "Yes"
                                      : "No"}
                                  </label>
                                </div>
                                {packingInfo.primaryPackingEnabled ===
                                  "Yes" && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    style={{ marginLeft: "8px" }}
                                    onClick={() => {
                                      setPrimaryPackingInfoDialogOpen(true);
                                    }}
                                  >
                                    Set
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="row g-2 mt-2">
                              <div className="col-2 text-start">
                                <strong>Master Packaging</strong>
                              </div>
                              <div className="col-1">:</div>
                              <div className="col-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={packingInfo.masterPackagingInput}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "masterPackagingInput",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <select
                                  className="form-select form-select-sm"
                                  value={packingInfo.masterPackaging}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "masterPackaging",
                                      e.target.value
                                    )
                                  }
                                  // style={{ backgroundColor: "#f5d982" }}
                                >
                                  <option value="BOX">BOX</option>
                                  <option value="BAG">BAG</option>
                                  <option value="BOTTLE">BOTTLE</option>
                                  <option value="PACKET">PACKET</option>
                                  <option value="CONTAINER">CONTAINER</option>
                                </select>
                              </div>
                              <div className="col-1">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={packingInfo.masterPackagingInput2}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "masterPackagingInput2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <select
                                  className="form-select form-select-sm"
                                  value={packingInfo.masterNos}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "masterNos",
                                      e.target.value
                                    )
                                  }
                                  // style={{ backgroundColor: "#f5d982" }}
                                >
                                  <option value="NOS">NOS</option>
                                  <option value="KG">KG</option>
                                  <option value="LITER">LITER</option>
                                  <option value="METER">METER</option>
                                </select>
                              </div>
                              <div className="col-2 text-start">
                                <strong>Master Packing:</strong>
                              </div>
                              <div className="col-2 d-flex align-items-center">
                                <div className="form-check form-switch me-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={
                                      packingInfo.masterPackingEnabled === "Yes"
                                    }
                                    onChange={() =>
                                      handlePackingInfoChange(
                                        "masterPackingEnabled",
                                        packingInfo.masterPackingEnabled ===
                                          "Yes"
                                          ? "No"
                                          : "Yes"
                                      )
                                    }
                                  />
                                  <label className="form-check-label">
                                    {packingInfo.masterPackingEnabled === "Yes"
                                      ? "Yes"
                                      : "No"}
                                  </label>
                                </div>
                                {packingInfo.masterPackingEnabled === "Yes" && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    style={{ marginLeft: "8px" }}
                                    onClick={() => {
                                      setMasterPackingInfoDialogOpen(true);
                                    }}
                                  >
                                    Set
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Dimensions Section */}
                            <div className="row g-2 mt-3">
                              <div className="col-1 text-center">
                                <strong>Length</strong>
                              </div>
                              <div className="col-1 text-center">
                                <strong>Width</strong>
                              </div>
                              <div className="col-1 text-center">
                                <strong>Height</strong>
                              </div>
                              <div className="col-2 text-center">
                                <strong>Cubic Feet</strong>
                              </div>
                              <div className="col-2 text-center">
                                <strong>Net Weight</strong>
                              </div>
                              <div className="col-2 text-center">
                                <strong>Gross Weight</strong>
                              </div>
                            </div>

                            <div className="row g-2 mt-1">
                              <div className="col-1">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.length}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "length",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.width}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "width",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.height}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "height",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.cubicFeet}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "cubicFeet",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.netWeight}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "netWeight",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={packingInfo.grossWeight}
                                  onChange={(e) =>
                                    handlePackingInfoChange(
                                      "grossWeight",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            {/* Table Section */}
                            <div className="table-responsive mt-4">
                              <table className="table table-bordered table-sm">
                                <thead style={{ backgroundColor: "#b8c5d6" }}>
                                  <tr>
                                    <th style={{ width: "10%" }}>Sl No</th>
                                    <th style={{ width: "40%" }}>Item Name</th>
                                    <th style={{ width: "15%" }}>Qty</th>
                                    <th style={{ width: "15%" }}>Rate</th>
                                    <th style={{ width: "20%" }}>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {packingItems.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.slNo}</td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control form-control-sm"
                                          value={item.itemName}
                                          onChange={(e) =>
                                            updatePackingItem(
                                              item.id,
                                              "itemName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.qty}
                                          onChange={(e) =>
                                            updatePackingItem(
                                              item.id,
                                              "qty",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.rate}
                                          onChange={(e) =>
                                            updatePackingItem(
                                              item.id,
                                              "rate",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control form-control-sm"
                                          value={item.amount}
                                          onChange={(e) =>
                                            updatePackingItem(
                                              item.id,
                                              "amount",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm me-2"
                                onClick={addPackingItem}
                              >
                                Add Row
                              </button>
                              {packingItems.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    deletePackingItem(
                                      packingItems[packingItems.length - 1].id
                                    )
                                  }
                                >
                                  Delete Last Row
                                </button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setPackingInfoDialogOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setPackingInfoDialogOpen(false)}
                          >
                            Save
                          </button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}

          {/* Primary Packing Info Dialog */}
          <Dialog
            open={primaryPackingInfoDialogOpen}
            onClose={() => setPrimaryPackingInfoDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>PRIMARY PACKING INFO</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                {/* Dimensions Table */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="mb-3">Dimensions</h6>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Length (cm)</th>
                          <th>Width (cm)</th>
                          <th>Height (cm)</th>
                          <th>Cubic Feet</th>
                          <th>Net Weight (kg)</th>
                          <th>Gross Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.length}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "length",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.width}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "width",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.height}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "height",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.cubicFeet}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "cubicFeet",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.netWeight}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "netWeight",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={primaryPackingInfo.grossWeight}
                              onChange={(e) =>
                                handlePrimaryPackingInfoChange(
                                  "grossWeight",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Item Details Table */}
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Item Details</h6>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addPrimaryPackingItem}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "8%" }}>Sl No</th>
                          <th style={{ width: "40%" }}>Item Name</th>
                          <th style={{ width: "15%" }}>Qty</th>
                          <th style={{ width: "15%" }}>Rate</th>
                          <th style={{ width: "15%" }}>Amount</th>
                          <th style={{ width: "7%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {primaryPackingItems.map((item) => (
                          <tr key={item.id}>
                            <td className="text-center">{item.slNo}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.itemName}
                                onChange={(e) =>
                                  updatePrimaryPackingItem(
                                    item.id,
                                    "itemName",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter item name"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.qty}
                                onChange={(e) =>
                                  updatePrimaryPackingItem(
                                    item.id,
                                    "qty",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.rate}
                                onChange={(e) =>
                                  updatePrimaryPackingItem(
                                    item.id,
                                    "rate",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.amount}
                                onChange={(e) =>
                                  updatePrimaryPackingItem(
                                    item.id,
                                    "amount",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deletePrimaryPackingItem(item.id)
                                }
                                disabled={primaryPackingItems.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPrimaryPackingInfoDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPrimaryPackingInfoDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Per-Party QC Testing Parameter Dialog */}
          <Dialog
            open={partySpecDialogOpen}
            onClose={() => setPartySpecDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>Specification</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                {/* Copy QC Parameters From */}
                <div className="row mb-3">
                  <div className="col-8 d-flex align-items-center">
                    <label
                      className="form-label me-3 mb-0"
                      style={{ minWidth: "220px" }}
                    >
                      Copy QC Parameters From :
                    </label>
                    <select
                      className="form-control"
                      value={
                        partySpecData[activePartySpecRowId]?.copyFrom ||
                        "Not Applicable"
                      }
                      onChange={(e) =>
                        activePartySpecRowId &&
                        updatePartySpecCopyFrom(
                          activePartySpecRowId,
                          e.target.value
                        )
                      }
                      style={{ maxWidth: "320px" }}
                    >
                      <option value="Not Applicable">Not Applicable</option>
                      <option value="Create">Create</option>
                      <option value="Item 1">Item 1</option>
                      <option value="Item 2">Item 2</option>
                    </select>
                  </div>
                </div>

                {/* Party-specific QC table */}
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-end align-items-center mb-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          activePartySpecRowId &&
                          addPartySpecRow(activePartySpecRowId)
                        }
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered table-sm">
                      <thead>
                        <tr>
                          <th style={{ width: "12%" }}>Sl. No</th>
                          <th style={{ width: "43%" }}>Specification</th>
                          <th style={{ width: "35%" }}>Standard</th>
                          <th style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(
                          partySpecData[activePartySpecRowId]?.rows || [
                            { id: 1, slNo: 1, specification: "", standard: "" },
                          ]
                        ).map((r) => (
                          <tr key={r.id}>
                            <td className="text-center">{r.slNo}</td>
                            <td>
                              <select
                                className="form-control form-control-sm"
                                value={r.specification}
                                onChange={(e) =>
                                  activePartySpecRowId &&
                                  updatePartySpecRow(
                                    activePartySpecRowId,
                                    r.id,
                                    "specification",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select Specification</option>
                                <option value="Create">Create</option>
                                <option value="Not Applicable">
                                  Not Applicable
                                </option>
                                <option value="Weight">Weight</option>
                                <option value="Dimension">Dimension</option>
                                <option value="Color">Color</option>
                                <option value="Quality">Quality</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={r.standard}
                                onChange={(e) =>
                                  activePartySpecRowId &&
                                  updatePartySpecRow(
                                    activePartySpecRowId,
                                    r.id,
                                    "standard",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter standard"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  activePartySpecRowId &&
                                  deletePartySpecRow(activePartySpecRowId, r.id)
                                }
                                disabled={
                                  (partySpecData[activePartySpecRowId]?.rows
                                    ?.length || 1) === 1
                                }
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPartySpecDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPartySpecDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>
          {/* Master Packing Info Dialog */}
          <Dialog
            open={masterPackingInfoDialogOpen}
            onClose={() => setMasterPackingInfoDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>MASTER PACKING INFO</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                {/* Dimensions Table */}
                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="mb-3">Dimensions</h6>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Length (cm)</th>
                          <th>Width (cm)</th>
                          <th>Height (cm)</th>
                          <th>Cubic Feet</th>
                          <th>Net Weight (kg)</th>
                          <th>Gross Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.length}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "length",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.width}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "width",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.height}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "height",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.cubicFeet}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "cubicFeet",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.netWeight}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "netWeight",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={masterPackingInfo.grossWeight}
                              onChange={(e) =>
                                handleMasterPackingInfoChange(
                                  "grossWeight",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Item Details Table */}
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Item Details</h6>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addMasterPackingItem}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "8%" }}>Sl No</th>
                          <th style={{ width: "40%" }}>Item Name</th>
                          <th style={{ width: "15%" }}>Qty</th>
                          <th style={{ width: "15%" }}>Rate</th>
                          <th style={{ width: "15%" }}>Amount</th>
                          <th style={{ width: "7%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {masterPackingItems.map((item) => (
                          <tr key={item.id}>
                            <td className="text-center">{item.slNo}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.itemName}
                                onChange={(e) =>
                                  updateMasterPackingItem(
                                    item.id,
                                    "itemName",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter item name"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.qty}
                                onChange={(e) =>
                                  updateMasterPackingItem(
                                    item.id,
                                    "qty",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.rate}
                                onChange={(e) =>
                                  updateMasterPackingItem(
                                    item.id,
                                    "rate",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={item.amount}
                                onChange={(e) =>
                                  updateMasterPackingItem(
                                    item.id,
                                    "amount",
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteMasterPackingItem(item.id)}
                                disabled={masterPackingItems.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setMasterPackingInfoDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setMasterPackingInfoDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Inward Location Dialog */}
          <Dialog
            open={inwardLocationDialogOpen}
            onClose={() => setInwardLocationDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>Set/Alter Inward Location</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Location Details</h6>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addInwardLocationItem}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "8%" }}>Sr No.</th>
                          <th style={{ width: "29%" }}>Main Location</th>
                          <th style={{ width: "29%" }}>Store Location</th>
                          <th style={{ width: "17%" }}>Rack</th>
                          <th style={{ width: "17%" }}>Shelf</th>
                          <th style={{ width: "6%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inwardLocationData.map((item, idx) => (
                          <tr key={item.id}>
                            <td className="text-center">{idx + 1}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.mainLocation}
                                onChange={(e) =>
                                  updateInwardLocationItem(
                                    item.id,
                                    "mainLocation",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter main location"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.storeLocation}
                                onChange={(e) =>
                                  updateInwardLocationItem(
                                    item.id,
                                    "storeLocation",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter store location"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.rack}
                                onChange={(e) =>
                                  updateInwardLocationItem(
                                    item.id,
                                    "rack",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter rack"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={item.shelf}
                                onChange={(e) =>
                                  updateInwardLocationItem(
                                    item.id,
                                    "shelf",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter shelf"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteInwardLocationItem(item.id)
                                }
                                disabled={inwardLocationData.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setInwardLocationDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setInwardLocationDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Location Wise ROL Dialog */}
          <Dialog
            open={locationWiseROLDialogOpen}
            onClose={() => setLocationWiseROLDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Set/Alter Location Wise ROL</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Location Wise ROL</h6>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addLocationWiseROLItem}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10%" }}>Sr No.</th>
                          <th style={{ width: "45%" }}>Location Name</th>
                          <th style={{ width: "20%" }}>ROL</th>
                          <th style={{ width: "20%" }}>Unit</th>
                          <th style={{ width: "5%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locationWiseROLData.map((row, idx) => (
                          <tr key={row.id}>
                            <td className="text-center">{idx + 1}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.location}
                                onChange={(e) =>
                                  updateLocationWiseROLItem(
                                    row.id,
                                    "location",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter location name"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={row.reorderLevel}
                                onChange={(e) =>
                                  updateLocationWiseROLItem(
                                    row.id,
                                    "reorderLevel",
                                    e.target.value
                                  )
                                }
                                placeholder="0"
                                step="0.01"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.unit || ""}
                                onChange={(e) =>
                                  updateLocationWiseROLItem(
                                    row.id,
                                    "unit",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter unit (e.g., NOS, KG)"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteLocationWiseROLItem(row.id)
                                }
                                disabled={locationWiseROLData.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setLocationWiseROLDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setLocationWiseROLDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Party Wise Item Code Dialog */}
          <Dialog
            open={partyWiseDialogOpen}
            onClose={() => setPartyWiseDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Set/Alter Party Wise Item Code</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Party Mapping</h6>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addPartyWiseRow}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "30%" }}>Party Name</th>
                          <th style={{ width: "20%" }}>Party no.</th>
                          <th style={{ width: "20%" }}>Alias</th>
                          <th style={{ width: "25%" }}>Print Name</th>
                          <th style={{ width: "5%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partyWiseRows.map((row) => (
                          <tr key={row.id}>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.partyName}
                                onChange={(e) =>
                                  updatePartyWiseRow(
                                    row.id,
                                    "partyName",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter party name"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.partyNo}
                                onChange={(e) =>
                                  updatePartyWiseRow(
                                    row.id,
                                    "partyNo",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter party no."
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.alias}
                                onChange={(e) =>
                                  updatePartyWiseRow(
                                    row.id,
                                    "alias",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter alias"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.printName}
                                onChange={(e) =>
                                  updatePartyWiseRow(
                                    row.id,
                                    "printName",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter print name"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => deletePartyWiseRow(row.id)}
                                disabled={partyWiseRows.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPartyWiseDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPartyWiseDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* QC Specification Dialog */}
          <Dialog
            open={qcSpecificationDialogOpen}
            onClose={() => setQCSpecificationDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>QC TESTING PARAMETER</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                {/* Copy QC Parameters From Section */}
                <div className="row mb-3">
                  <div className="col-8 d-flex align-items-center">
                    <label
                      className="form-label me-3 mb-0"
                      style={{ minWidth: "200px" }}
                    >
                      Copy QC Parameters From
                    </label>
                    <select
                      className="form-control"
                      value={copyQCParametersFrom}
                      onChange={(e) => setCopyQCParametersFrom(e.target.value)}
                      // style={{ backgroundColor: "#f5d982" }}
                    >
                      <option value="Not Applicable">Not Applicable</option>
                      <option value="Create">Create</option>
                      <option value="Item 1">Item 1</option>
                      <option value="Item 2">Item 2</option>
                    </select>
                  </div>
                </div>

                {/* QC Parameters Table */}
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-end align-items-center mb-3">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addQCSpecificationRow}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10%" }}>Sl. No</th>
                          <th style={{ width: "40%" }}>Specification</th>
                          <th style={{ width: "40%" }}>Standard</th>
                          <th style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qcSpecificationRows.map((row) => (
                          <tr key={row.id}>
                            <td className="text-center">{row.slNo}</td>
                            <td>
                              <select
                                className="form-control form-control-sm"
                                value={row.specification}
                                onChange={(e) =>
                                  updateQCSpecificationRow(
                                    row.id,
                                    "specification",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select Specification</option>
                                <option value="Create">Create</option>
                                <option value="Not Applicable">
                                  Not Applicable
                                </option>
                                <option value="Weight">Weight</option>
                                <option value="Dimension">Dimension</option>
                                <option value="Color">Color</option>
                                <option value="Quality">Quality</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.standard}
                                onChange={(e) =>
                                  updateQCSpecificationRow(
                                    row.id,
                                    "standard",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter standard"
                              />
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteQCSpecificationRow(row.id)}
                                disabled={qcSpecificationRows.length === 1}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Set Party Wise Specification Section */}
                <div className="row mt-3">
                  <div className="col-8 d-flex align-items-center">
                    <label
                      className="form-label me-3 mb-0"
                      style={{ minWidth: "200px" }}
                    >
                      Set Party Wise Specification
                    </label>
                    <span className="me-2">:</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={setPartyWiseSpecification === "Yes"}
                        onChange={(e) =>
                          setSetPartyWiseSpecification(
                            e.target.checked ? "Yes" : "No"
                          )
                        }
                      />
                      <label className="form-check-label">
                        {setPartyWiseSpecification === "Yes" ? "Yes" : "No"}
                      </label>
                      {setPartyWiseSpecification === "Yes" && (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm ms-3"
                          onClick={() =>
                            setPartyWiseSpecificationDialogOpen(true)
                          }
                        >
                          Set
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setQCSpecificationDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setQCSpecificationDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Party Wise Specification Dialog */}
          <Dialog
            open={partyWiseSpecificationDialogOpen}
            onClose={() => setPartyWiseSpecificationDialogOpen(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>Specification</DialogTitle>
            <DialogContent>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addPartyWiseSpecificationRow}
                      >
                        Add Row
                      </button>
                    </div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10%" }}>Sl. No</th>
                          <th style={{ width: "35%" }}>Party Name</th>
                          <th style={{ width: "45%" }}>
                            Set/Alter Specification
                          </th>
                          <th style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partyWiseSpecificationRows.map((row) => (
                          <tr key={row.id}>
                            <td className="text-center">{row.slNo}</td>
                            <td>
                              <select
                                className="form-control form-control-sm"
                                value={row.partyName}
                                onChange={(e) =>
                                  updatePartyWiseSpecificationRow(
                                    row.id,
                                    "partyName",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="Party 1">Party 1</option>
                                <option value="Party 2">Party 2</option>
                                <option value="Party 3">Party 3</option>
                                <option value="Customer A">Customer A</option>
                                <option value="Customer B">Customer B</option>
                                <option value="Vendor X">Vendor X</option>
                                <option value="Vendor Y">Vendor Y</option>
                              </select>
                            </td>
                            <td className="d-flex align-items-center">
                              <div className="form-check form-switch me-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={row.setAlterSpecification === "Yes"}
                                  onChange={(e) =>
                                    updatePartyWiseSpecificationRow(
                                      row.id,
                                      "setAlterSpecification",
                                      e.target.checked ? "Yes" : "No"
                                    )
                                  }
                                />
                                <label className="form-check-label">
                                  {row.setAlterSpecification === "Yes"
                                    ? "Yes"
                                    : "No"}
                                </label>
                              </div>
                              {row.setAlterSpecification === "Yes" && (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => openPartySpecDialog(row.id)}
                                >
                                  Set
                                </button>
                              )}
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deletePartyWiseSpecificationRow(row.id)
                                }
                                disabled={
                                  partyWiseSpecificationRows.length === 1
                                }
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPartyWiseSpecificationDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPartyWiseSpecificationDialogOpen(false)}
              >
                Save
              </button>
            </DialogActions>
          </Dialog>

          {/* Additional Details Tab */}
          {activeTab === 1 && (
            <Box sx={{ pt: 2 }}>
              <form className="company-form" style={{ maxHeight: "500px" }}>
                <div className="row">
                  <div className="col-12">
                    <div className="mt-3 row">
                      <div className="col-4 my-auto">
                        <label htmlFor="MaintainBatches" className="form-label">
                          Maintain in batches
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="MaintainBatches"
                          className="form-select w-100"
                          value={maintainBatches}
                          onChange={(e) => setMaintainBatches(e.target.value)}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      {maintainBatches === "Yes" && (
                        <>
                          <div
                            className="col-4 my-auto"
                            style={{ paddingLeft: "30px" }}
                          >
                            <label
                              htmlFor="TrackDateManufacturing"
                              className="form-label"
                            >
                              Track date of manufacturing
                            </label>
                          </div>
                          <div className="col-8">
                            <select
                              id="TrackDateManufacturing"
                              className="form-select w-100"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>

                          <div
                            className="col-4 my-auto"
                            style={{ paddingLeft: "30px" }}
                          >
                            <label
                              htmlFor="UseExpiryDates"
                              className="form-label"
                            >
                              Use expiry dates
                            </label>
                          </div>
                          <div className="col-8">
                            <select
                              id="UseExpiryDates"
                              className="form-select w-100"
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="col-4 my-auto">
                        <label
                          htmlFor="AlterComponentsBOM"
                          className="form-label"
                        >
                          Alter Components (BOM)
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="AlterComponentsBOM"
                          className="form-select w-100"
                          onChange={(e) => {
                            if (e.target.value === "Yes")
                              setBomDialogOpen(true);
                          }}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label
                          htmlFor="SetAlterAssemblySteps"
                          className="form-label"
                        >
                          Set/Alter Assembly Steps
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="SetAlterAssemblySteps"
                          className="form-select w-100"
                          onChange={(e) =>
                            handleAssemblyStepsChange(e.target.value)
                          }
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeDialog}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="">
            Add
          </button>
        </DialogActions>
      </Dialog>

      {/* Image Configuration Dialog */}
      <Dialog
        open={imageConfigDialogOpen}
        onClose={() => setImageConfigDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>IMAGE CONFIGURATION</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row g-3">
              {/* Image 1 */}
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-2">
                    <label className="form-label">Image 1</label>
                  </div>
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange("image1", e)}
                        // style={{
                        //   backgroundColor: "#f5d982",
                        //   border: "1px solid #ccc",
                        // }}
                      />
                      {imageConfig.image1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeImage("image1")}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {imageConfig.image1 && (
                      <div className="mt-2">
                        <img
                          src={imageConfig.image1.preview}
                          alt="Preview 1"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            objectFit: "cover",
                          }}
                          className="border rounded"
                        />
                        <small className="text-muted ms-2">
                          {imageConfig.image1.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>

              {/* Image 2 */}
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-2">
                    <label className="form-label">Image 2</label>
                  </div>
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange("image2", e)}
                      />
                      {imageConfig.image2 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeImage("image2")}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {imageConfig.image2 && (
                      <div className="mt-2">
                        <img
                          src={imageConfig.image2.preview}
                          alt="Preview 2"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            objectFit: "cover",
                          }}
                          className="border rounded"
                        />
                        <small className="text-muted ms-2">
                          {imageConfig.image2.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>

              {/* Image 3 */}
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-2">
                    <label className="form-label">Image 3</label>
                  </div>
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange("image3", e)}
                      />
                      {imageConfig.image3 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeImage("image3")}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {imageConfig.image3 && (
                      <div className="mt-2">
                        <img
                          src={imageConfig.image3.preview}
                          alt="Preview 3"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            objectFit: "cover",
                          }}
                          className="border rounded"
                        />
                        <small className="text-muted ms-2">
                          {imageConfig.image3.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>

              {/* Image 4 */}
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-2">
                    <label className="form-label">Image 4</label>
                  </div>
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange("image4", e)}
                      />
                      {imageConfig.image4 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeImage("image4")}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {imageConfig.image4 && (
                      <div className="mt-2">
                        <img
                          src={imageConfig.image4.preview}
                          alt="Preview 4"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            objectFit: "cover",
                          }}
                          className="border rounded"
                        />
                        <small className="text-muted ms-2">
                          {imageConfig.image4.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setImageConfigDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setImageConfigDialogOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Assembly Steps Dialog */}
      <Dialog
        open={assemblyStepsDialog}
        onClose={() => setAssemblyStepsDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Assembly Steps</DialogTitle>
        <DialogContent>
          <div className="table-responsive mt-3">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#b8c5d6" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Process</th>
                  <th>Sub Process</th>
                  <th>Cycle Time in Minutes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assemblySteps.map((step, index) => (
                  <tr key={step.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={step.process}
                        onChange={(e) =>
                          updateAssemblyStep(step.id, "process", e.target.value)
                        }
                        style={{
                          backgroundColor: step.id === 1 ? "#f5d982" : "white",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={step.subProcess}
                        onChange={(e) =>
                          updateAssemblyStep(
                            step.id,
                            "subProcess",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={step.cycleTimeMinutes}
                        onChange={(e) =>
                          updateAssemblyStep(
                            step.id,
                            "cycleTimeMinutes",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAssemblyStep(step.id)}
                        disabled={assemblySteps.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addAssemblyStep}
            >
              Add Row
            </button>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAssemblyStepsDialog(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAssemblyStepsDialog(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* BOM Dialog */}
      <Dialog
        open={bomDialogOpen}
        onClose={() => setBomDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>BOM Details</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <label htmlFor="bomName" className="form-label">
              Name of BOM
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="bomName"
              value={bomName}
              onChange={(e) => setBomName(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setBomDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setBomDialogOpen(false);
              setBomConfigOpen(true);
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* BOM Configuration Dialog (Components of, table, etc.) */}
      <Dialog
        open={bomConfigOpen}
        onClose={() => setBomConfigOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Bill of Materials</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row g-2 align-items-center">
              <div className="col-3 text-end">BoM Name</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={bomName}
                  readOnly
                />
              </div>

              <div className="col-3 text-end">Components of</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={stockName}
                  placeholder=""
                  readOnly
                />
              </div>

              <div className="col-3 text-end">Unit to produce</div>
              <div className="col-3">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={bomConfig.unitToProduce}
                  onChange={(e) =>
                    setBomConfig((c) => ({
                      ...c,
                      unitToProduce: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="col-6">NOS</div>

              <div className="col-3 text-end">Wastage Details</div>
              <div className="col-3">
                <select
                  className="form-select form-select-sm"
                  value={bomConfig.wastageDetails}
                  onChange={(e) => {
                    setBomConfig((c) => ({
                      ...c,
                      wastageDetails: e.target.value,
                    }));
                    if (e.target.value === "Yes") {
                      setWastageDialogOpen(true);
                    }
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="col-3 text-end">Additional Expense</div>
              <div className="col-3">
                <select
                  className="form-select form-select-sm"
                  value={bomConfig.additionalExpense}
                  onChange={(e) => {
                    setBomConfig((c) => ({
                      ...c,
                      additionalExpense: e.target.value,
                    }));
                    if (e.target.value === "Yes") {
                      setAdditionalExpenseDialogOpen(true);
                    }
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="col-3 text-end">Unit of manufacture</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={bomConfig.unitOfManufacture}
                  onChange={(e) =>
                    setBomConfig((c) => ({
                      ...c,
                      unitOfManufacture: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th>Process</th>
                    <th>Item</th>
                    <th>Godown</th>
                    <th>Sub Type</th>
                    <th>Quantity</th>
                    <th>Wastage Details</th>
                    <th>Budget Rate</th>
                    <th>Vendor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bomItems.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.process}
                          onChange={(e) =>
                            updateBomItem(row.id, "process", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.item}
                          onChange={(e) =>
                            updateBomItem(row.id, "item", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.godown}
                          onChange={(e) =>
                            updateBomItem(row.id, "godown", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.subType}
                          onChange={(e) =>
                            updateBomItem(row.id, "subType", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.quantity}
                          onChange={(e) =>
                            updateBomItem(row.id, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={row.wastageDetails}
                          onChange={(e) =>
                            updateBomItem(
                              row.id,
                              "wastageDetails",
                              e.target.value
                            )
                          }
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.budgetRate}
                          onChange={(e) =>
                            updateBomItem(row.id, "budgetRate", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.vendorName}
                          onChange={(e) =>
                            updateBomItem(row.id, "vendorName", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteBomItem(row.id)}
                          disabled={bomItems.length === 1}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addBomItem}
              >
                Add Row
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setBomConfigOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setBomConfigOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Wastage Details Dialog */}
      <Dialog
        open={wastageDialogOpen}
        onClose={() => setWastageDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>WASTAGE INFO</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row g-2 align-items-center mb-3">
              <div className="col-4 text-end">Unit to produce</div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={wastageInfo.unitToProduce}
                  onChange={(e) =>
                    setWastageInfo((c) => ({
                      ...c,
                      unitToProduce: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="col-6">NOS</div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th style={{ width: "10%" }}>Sl No</th>
                    <th style={{ width: "30%" }}>Description</th>
                    <th style={{ width: "20%" }}>Percentage</th>
                    <th style={{ width: "20%" }}>Value</th>
                    <th style={{ width: "20%" }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {wastageItems.map((row) => (
                    <tr key={row.id}>
                      <td>{row.slNo}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.description}
                          onChange={(e) =>
                            updateWastageItem(
                              row.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.percentage}
                          onChange={(e) =>
                            updateWastageItem(
                              row.id,
                              "percentage",
                              e.target.value
                            )
                          }
                          style={{ backgroundColor: "#f5d982" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.value}
                          onChange={(e) =>
                            updateWastageItem(row.id, "value", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.balance}
                          onChange={(e) =>
                            updateWastageItem(row.id, "balance", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={addWastageItem}
              >
                Add Row
              </button>
              {wastageItems.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() =>
                    deleteWastageItem(wastageItems[wastageItems.length - 1].id)
                  }
                >
                  Delete Row
                </button>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setWastageDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setWastageDialogOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Additional Expense Dialog */}
      <Dialog
        open={additionalExpenseDialogOpen}
        onClose={() => setAdditionalExpenseDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>ADDITIONAL EXPENSE</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th style={{ width: "10%" }}>Sl No</th>
                    <th style={{ width: "20%" }}>Description</th>
                    <th style={{ width: "20%" }}>Expence Type</th>
                    <th style={{ width: "15%" }}>Unit</th>
                    <th style={{ width: "10%" }}>UOM</th>
                    <th style={{ width: "15%" }}>Rate</th>
                    <th style={{ width: "10%" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalExpenseItems.map((row) => (
                    <tr key={row.id}>
                      <td>{row.slNo}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.description}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.expenseType}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "expenseType",
                              e.target.value
                            )
                          }
                          style={{ backgroundColor: "#f5d982" }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.unit}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "unit",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.uom}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "uom",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.rate}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "rate",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.amount}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "amount",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={addAdditionalExpenseItem}
              >
                Add Row
              </button>
              {additionalExpenseItems.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() =>
                    deleteAdditionalExpenseItem(
                      additionalExpenseItems[additionalExpenseItems.length - 1]
                        .id
                    )
                  }
                >
                  Delete Row
                </button>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAdditionalExpenseDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAdditionalExpenseDialogOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      <div className="companies-page">
        <div className="companies-header">
          <h2>Stock Item</h2>
          <button onClick={openDialog} className="btn btn-primary new-btn">
            Add Stock Item
          </button>
        </div>
        <div className="pagination-container">
          <div className="entries-info">
            <select className="entries-select">
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries per page</span>
          </div>
          <div className="pagination-info">
            Showing 1 to {filteredCompanies.length} of{" "}
            {filteredCompanies.length} entries
            {filteredCompanies.length !== companiesData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {companiesData.length} total entries)
              </span>
            )}
          </div>
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">›</button>
            <button className="page-btn">»</button>
          </div>
        </div>
        <div className="companies-table-container">
          <table className="companies-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Under</th>
              </tr>
              <tr className="search-row">
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search name..."
                    value={searchFilters.name}
                    onChange={(e) => handleSearchChange("name", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search parent..."
                    value={searchFilters.parentName}
                    onChange={(e) =>
                      handleSearchChange("parentName", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.parentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StockItem;
