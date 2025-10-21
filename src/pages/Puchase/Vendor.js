import React, { useState } from 'react'
import { Tab, Tabs, Modal, Button } from 'react-bootstrap'
import '../Sales/Customer.css'

export default function Vendor() {
    const [formData, setFormData] = useState({
        // Basic Information
        language: '',
        description: '',
        name: '',
        notes: '',

        // Basic Details
        under: 'Consumer',
        isSisterCompany: 'No',
        maintainBalances: 'No',
        defaultCreditPeriod: '',
        checkCreditDays: 'No',
        alertBeforeCreditDays: '',
        creditLimit: '',
        balanceAlert: '',
        inventoryAffected: 'No',
        costCenters: 'No',
        activateInterest: 'No',

        // Statutory Details
        tdsDeductible: 'No',
        slsmDetail: 'Not Applicable',
        alterReceiver: 'No',
        positionIndex: '',

        // Mailing Details
        mailingName: '',
        address: '',
        state: '',
        district: '',
        city: '',
        country: '',
        pincode: '',
        distance: '',
        primaryMobile: '+91 - 8336979510',
        multipleMobile: 'No',
        whatsappNumber: 'No',
        contactDetails: 'No',
        companyInfo: 'No',
        multipleMailing: 'No',

        // Banking Details
        bankDetails: 'No',

        // Tax Registration Details
        cinNo: '',
        aadhaarNo: '',
        registrationType: 'Unknown',
        commonParty: 'No',
        gstDetails: 'No',
        docReconciliation: 'No',
        msmeRegistration: 'No',

        // Contact Details
        contactName: '',
        phoneNo: '',
        faxNo: '',
        email: '',
        ccTo: '',
        website: '',
        birthday: '',
        anniversary: '',
        designation: '',
        department: '',
        addlContactDetails: 'No'
    })

    const [showContactModal, setShowContactModal] = useState(false)

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // If multiple mobile is set to Yes, open the modal
        if (field === 'multipleMobile' && value === 'Yes') {
            setShowContactModal(true)
        }
    }

    const handleCloseModal = () => {
        setShowContactModal(false)
        // Reset multiple mobile to No if modal is closed without saving
        setFormData(prev => ({
            ...prev,
            multipleMobile: 'No'
        }))
    }

    const handleSaveContactDetails = () => {
        // Save contact details logic here
        setShowContactModal(false)
    }

    return (
        <>
            <div className="settings-content customer-page">
                <div className="heading">Vendor</div>

                {/* Basic Information Section */}
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Language</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.language}
                                            onChange={(e) => handleInputChange('language', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Description</label>
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Name</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Notes</label>
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="card mt-4">
                    <div className="card-body p-0">
                        <Tabs
                            defaultActiveKey="basic"
                            id="customer-tabs"
                            className="custom-tabs my-tabs"
                        >
                            {/* Basic Details Tab */}
                            <Tab eventKey="basic" title="Basic Details">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Under</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.under}
                                                        onChange={(e) => handleInputChange('under', e.target.value)}
                                                    >
                                                        <option value="Consumer">Consumer</option>
                                                        <option value="Cash In Hand">Cash In Hand</option>
                                                        <option value="Supplier">Supplier</option>
                                                        <option value="Bank">Bank</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Is Sister Company</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.isSisterCompany}
                                                        onChange={(e) => handleInputChange('isSisterCompany', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Maintain balances bill by bill</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.maintainBalances}
                                                        onChange={(e) => handleInputChange('maintainBalances', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Default credit period</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.defaultCreditPeriod}
                                                        onChange={(e) => handleInputChange('defaultCreditPeriod', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Check for credit days during voucher entry</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.checkCreditDays}
                                                        onChange={(e) => handleInputChange('checkCreditDays', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Alert Before Credit Days</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.alertBeforeCreditDays}
                                                        onChange={(e) => handleInputChange('alertBeforeCreditDays', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Specify credit limit</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.creditLimit}
                                                        onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Balance Alert After</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.balanceAlert}
                                                        onChange={(e) => handleInputChange('balanceAlert', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Inventory values are affected</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.inventoryAffected}
                                                        onChange={(e) => handleInputChange('inventoryAffected', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Cost centres are applicable</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.costCenters}
                                                        onChange={(e) => handleInputChange('costCenters', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Activate interest calculation</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.activateInterest}
                                                        onChange={(e) => handleInputChange('activateInterest', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Mailing Details Tab */}
                            <Tab eventKey="mailing" title="Mailing Details">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.mailingName}
                                                        onChange={(e) => handleInputChange('mailingName', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Address</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        value={formData.address}
                                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">State</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.state}
                                                        onChange={(e) => handleInputChange('state', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">District</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.district}
                                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">City/Town</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.city}
                                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Country</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.country}
                                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Pincode</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.pincode}
                                                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Distance In KM</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.distance}
                                                        onChange={(e) => handleInputChange('distance', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Primary Mobile No.</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.primaryMobile}
                                                        onChange={(e) => handleInputChange('primaryMobile', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Provide Multiple Mobile No.</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-select"
                                                        
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Default WhatsApp No.</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-select"
                                                        value={formData.whatsappNumber}
                                                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Provide Contact Details</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-select"
                                                        value={formData.multipleMobile}
                                                        onChange={(e) => handleInputChange('multipleMobile', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Provide Company Info</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-select"
                                                        value={formData.companyInfo}
                                                        onChange={(e) => handleInputChange('companyInfo', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">Set/Alter multiple mailing details</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <select
                                                        className="form-select"
                                                        value={formData.multipleMailing}
                                                        onChange={(e) => handleInputChange('multipleMailing', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Statutory Details Tab */}
                            <Tab eventKey="statutory" title="Statutory Details">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Is TDS Deductible</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.tdsDeductible}
                                                        onChange={(e) => handleInputChange('tdsDeductible', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Set Or Alter SLSM Detail</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.slsmDetail}
                                                        onChange={(e) => handleInputChange('slsmDetail', e.target.value)}
                                                    >
                                                        <option value="Not Applicable">Not Applicable</option>
                                                        <option value="Select At Voucher">Select At Voucher</option>
                                                        <option value="Set SLSM">Set SLSM</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Set/Alter Receiver</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.alterReceiver}
                                                        onChange={(e) => handleInputChange('alterReceiver', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Position Index In Reports</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.positionIndex}
                                                        onChange={(e) => handleInputChange('positionIndex', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Banking Details Tab */}
                            <Tab eventKey="banking" title="Banking Details">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Provide bank details</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.bankDetails}
                                                        onChange={(e) => handleInputChange('bankDetails', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                            {/* Tax Registration Details Tab */}
                            <Tab eventKey="tax" title="Tax Registration Details">
                                <div className="p-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">CIN No.</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.cinNo}
                                                        onChange={(e) => handleInputChange('cinNo', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Aadhaar No.</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.aadhaarNo}
                                                        onChange={(e) => handleInputChange('aadhaarNo', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Registration Type</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.registrationType}
                                                        onChange={(e) => handleInputChange('registrationType', e.target.value)}
                                                    >
                                                        <option value="Unknown">Unknown</option>
                                                        <option value="Composition">Composition</option>
                                                        <option value="Regular">Regular</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Use Ledger As common party</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.commonParty}
                                                        onChange={(e) => handleInputChange('commonParty', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Set/Alter GST details</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.gstDetails}
                                                        onChange={(e) => handleInputChange('gstDetails', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">In Doc No. for reconciliation</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.docReconciliation}
                                                        onChange={(e) => handleInputChange('docReconciliation', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Set/Alter MSME Registration Details</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-select"
                                                        value={formData.msmeRegistration}
                                                        onChange={(e) => handleInputChange('msmeRegistration', e.target.value)}
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="row mt-4">
                    <div className="col-12 text-end d-flex justify-content-end">
                        <button className="btn btn-primary me-2">Save Vendor</button>
                        <button className="btn btn-secondary me-2">Cancel</button>
                        <button className="btn btn-outline-secondary">Reset</button>
                    </div>
                </div>
            </div>

            {/* Contact Details Modal */}
            <Modal show={showContactModal} onHide={handleCloseModal} size="sm" centered className="contact-modal">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="contact-modal-title">
                        Contact Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom p-0">
                    <div className="contact-form-container">
                        <div className="contact-form-row">
                            <div className="contact-form-label">Contact name :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.contactName}
                                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Primary Mobile No. :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.primaryMobile}
                                    onChange={(e) => handleInputChange('primaryMobile', e.target.value)}
                                    placeholder="+91 - 8336979510"
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Phone no. :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.phoneNo}
                                    onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Primary Mobile No. :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.primaryMobile}
                                    onChange={(e) => handleInputChange('primaryMobile', e.target.value)}
                                    placeholder="+91 - 8336979510"
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Fax no. :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.faxNo}
                                    onChange={(e) => handleInputChange('faxNo', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">E-mail :</div>
                            <div className="contact-form-input">
                                <input
                                    type="email"
                                    className="form-control contact-input"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">CC to (if any) :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.ccTo}
                                    onChange={(e) => handleInputChange('ccTo', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Website :</div>
                            <div className="contact-form-input">
                                <input
                                    type="url"
                                    className="form-control contact-input"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Birthday :</div>
                            <div className="contact-form-input">
                                <input
                                    type="date"
                                    className="form-control contact-input"
                                    value={formData.birthday}
                                    onChange={(e) => handleInputChange('birthday', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Anniversary :</div>
                            <div className="contact-form-input">
                                <input
                                    type="date"
                                    className="form-control contact-input"
                                    value={formData.anniversary}
                                    onChange={(e) => handleInputChange('anniversary', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Designation :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.designation}
                                    onChange={(e) => handleInputChange('designation', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Department :</div>
                            <div className="contact-form-input">
                                <input
                                    type="text"
                                    className="form-control contact-input"
                                    value={formData.department}
                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-form-label">Addl. Contact Details :</div>
                            <div className="contact-form-input">
                                <select
                                    className="form-select contact-input"
                                    value={formData.addlContactDetails}
                                    onChange={(e) => handleInputChange('addlContactDetails', e.target.value)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseModal} className="contact-modal-btn">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveContactDetails} className="contact-modal-btn">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}