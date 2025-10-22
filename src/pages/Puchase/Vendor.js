import React, { useState } from 'react';
import { Tab, Tabs, Modal, Button } from 'react-bootstrap';
import '../Sales/Customer.css';

export default function Vendor() {
    const [formData, setFormData] = useState({
        // Basic Information
        language: '',
        description: '',
        name: '',
        notes: '',

        // Company Info Modal Fields
        customerVendorType: '',
        referredBy: '',
        associatedDealer: '',
        businessEntityType: '',
        natureOfBusiness: '',
        businessActivity: '',
        businessHourFrom: '',
        businessHourTo: '',
        transporter: 'No',
        courier: 'No',

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
    });

    const [showContactModal, setShowContactModal] = useState(false);
    const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [showAddlContactModal, setShowAddlContactModal] = useState(false);
    const [showMailingModal, setShowMailingModal] = useState(false);

    // State for additional contact details table
    const [addlContacts, setAddlContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        contactPerson: '',
        designation: '',
        department: '',
        mobile: '',
        email: '',
        birthday: '',
        anniversary: ''
    });

    // State for mailing addresses
    const [mailingAddresses, setMailingAddresses] = useState([{ id: 1, addressType: '' }]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // If multiple mobile is set to Yes, open the contact modal
        if (field === 'multipleMobile' && value === 'Yes') {
            setShowContactModal(true);
        }

        // If company info is set to Yes, open the company info modal
        if (field === 'companyInfo' && value === 'Yes') {
            setShowCompanyInfoModal(true);
        }

        // If additional contact details is set to Yes, open the additional contact modal
        if (field === 'addlContactDetails' && value === 'Yes') {
            setShowAddlContactModal(true);
        }

        // If multiple mailing details is set to Yes, open the mailing modal
        if (field === 'multipleMailing' && value === 'Yes') {
            setShowMailingModal(true);
        }
    };

    const handleNewContactChange = (field, value) => {
        setNewContact(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressTypeChange = (id, value) => {
        setMailingAddresses(prev => 
            prev.map(address => 
                address.id === id ? { ...address, addressType: value } : address
            )
        );
    };

    const handleAddContact = () => {
        if (newContact.contactPerson.trim() === '') {
            alert('Please enter Contact Person name');
            return;
        }

        const contactToAdd = {
            ...newContact,
            id: Date.now() + Math.random()
        };

        setAddlContacts(prev => [...prev, contactToAdd]);
        setNewContact({
            contactPerson: '',
            designation: '',
            department: '',
            mobile: '',
            email: '',
            birthday: '',
            anniversary: ''
        });
    };

    const handleAddAddressRow = () => {
        const newId = Math.max(...mailingAddresses.map(addr => addr.id), 0) + 1;
        setMailingAddresses(prev => [...prev, { id: newId, addressType: '' }]);
    };

    const handleDeleteContact = (id) => {
        setAddlContacts(prev => prev.filter(contact => contact.id !== id));
    };

    const handleDeleteAddress = (id) => {
        if (mailingAddresses.length > 1) {
            setMailingAddresses(prev => prev.filter(address => address.id !== id));
        } else {
            alert('At least one address row is required');
        }
    };

    const handleCloseAddlContactModal = () => {
        setShowAddlContactModal(false);
        // Reset additional contact details to No if modal is closed without saving
        setFormData(prev => ({
            ...prev,
            addlContactDetails: 'No'
        }));
    };

    const handleCloseMailingModal = () => {
        setShowMailingModal(false);
        // Reset multiple mailing to No if modal is closed without saving
        setFormData(prev => ({
            ...prev,
            multipleMailing: 'No'
        }));
    };

    const handleSaveAddlContacts = () => {
        // Save additional contacts logic here
        setShowAddlContactModal(false);
    };

    const handleSaveMailingAddresses = () => {
        // Validate that all address types are filled
        const emptyAddresses = mailingAddresses.filter(addr => !addr.addressType.trim());
        if (emptyAddresses.length > 0) {
            alert('Please fill all address types');
            return;
        }
        
        // Save mailing addresses logic here
        console.log('Mailing addresses:', mailingAddresses);
        setShowMailingModal(false);
    };

    const handleCloseContactModal = () => {
        setShowContactModal(false);
        // Reset multiple mobile to No if modal is closed without saving
        setFormData(prev => ({
            ...prev,
            multipleMobile: 'No'
        }));
    };

    const handleCloseCompanyInfoModal = () => {
        setShowCompanyInfoModal(false);
        // Reset company info to No if modal is closed without saving
        setFormData(prev => ({
            ...prev,
            companyInfo: 'No'
        }));
    };

    const handleSaveContactDetails = () => {
        // Save contact details logic here
        setShowContactModal(false);
    };

    const handleSaveCompanyInfo = () => {
        // Save company info logic here
        setShowCompanyInfoModal(false);
    };

    const handleAddCustomer = () => {
        setShowAddCustomerModal(true);
    };

    const handleCloseAddCustomerModal = () => {
        setShowAddCustomerModal(false);
    };

    const handleSaveCustomer = () => {
        // Save customer logic here
        console.log('Customer data:', formData);
        console.log('Additional Contacts:', addlContacts);
        console.log('Mailing Addresses:', mailingAddresses);
        setShowAddCustomerModal(false);
        // Reset form or show success message
    };

    const handleResetForm = () => {
        setFormData({
            language: '',
            description: '',
            name: '',
            notes: '',
            customerVendorType: '',
            referredBy: '',
            associatedDealer: '',
            businessEntityType: '',
            natureOfBusiness: '',
            businessActivity: '',
            businessHourFrom: '',
            businessHourTo: '',
            transporter: 'No',
            courier: 'No',
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
            tdsDeductible: 'No',
            slsmDetail: 'Not Applicable',
            alterReceiver: 'No',
            positionIndex: '',
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
            bankDetails: 'No',
            cinNo: '',
            aadhaarNo: '',
            registrationType: 'Unknown',
            commonParty: 'No',
            gstDetails: 'No',
            docReconciliation: 'No',
            msmeRegistration: 'No',
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
        });
        setAddlContacts([]);
        setMailingAddresses([{ id: 1, addressType: '' }]);
    };

    return (
        <>
            <div className="settings-content customer-page">
                <div className='d-flex justify-content-between pb-2' style={{ borderBottom: '1px solid #ccc' }}>
                    <div className="heading my-auto" style={{ border: 'none' }}>Vendor</div>
                    <div>
                        <button className="btn btn-primary" onClick={handleAddCustomer}>Add Vendor</button>
                    </div>
                </div>

                {/* Customer List/Table would go here */}
                <div className="card mt-4">
                    <div className="card-body">
                        <p>Vendor list will be displayed here...</p>
                    </div>
                </div>
            </div>

            {/* Add Customer Modal */}
            <Modal show={showAddCustomerModal} onHide={handleCloseAddCustomerModal} size="xl" centered className="add-customer-modal">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="add-customer-modal-title">
                        Add New Vendor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom p-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="px-3">
                        {/* Basic Information Section */}
                        <div className="card">
                            <div className="card-header">
                                <h6 className="mb-0">Basic Information</h6>
                            </div>
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
                                                </div>
                                                <div className="col-md-6">

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
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseAddCustomerModal} className="me-2">
                        Cancel
                    </Button>
                    <Button variant="outline-secondary" onClick={handleResetForm} className="me-2">
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleSaveCustomer}>
                        Save Customer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Contact Details Modal */}
            <Modal show={showContactModal} onHide={handleCloseContactModal} size="sm" centered className="contact-modal">
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
                    <Button variant="secondary" onClick={handleCloseContactModal} className="contact-modal-btn">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveContactDetails} className="contact-modal-btn">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Additional Contact Details Modal */}
            <Modal show={showAddlContactModal} onHide={handleCloseAddlContactModal} size="xl" centered className="addl-contact-modal">
                <Modal.Header closeButton className="modal-header-custom mb-0">
                    <Modal.Title className="addl-contact-modal-title">
                        Additional Contact Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom p-0 mt-0" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="addl-contact-form-container">
                        {/* Contacts Table */}
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="text-center">Contact Person</th>
                                                <th className="text-center">Designation</th>
                                                <th className="text-center">Department</th>
                                                <th className="text-center">Mobile</th>
                                                <th className="text-center">E-mail</th>
                                                <th className="text-center">Birthday</th>
                                                <th className="text-center">Anniversary</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Input Row */}
                                            <tr className="bg-light">
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="Enter name"
                                                        value={newContact.contactPerson}
                                                        onChange={(e) => handleNewContactChange('contactPerson', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="Designation"
                                                        value={newContact.designation}
                                                        onChange={(e) => handleNewContactChange('designation', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="Department"
                                                        value={newContact.department}
                                                        onChange={(e) => handleNewContactChange('department', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        placeholder="Mobile"
                                                        value={newContact.mobile}
                                                        onChange={(e) => handleNewContactChange('mobile', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-sm"
                                                        placeholder="Email"
                                                        value={newContact.email}
                                                        onChange={(e) => handleNewContactChange('email', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        className="form-control form-control-sm"
                                                        value={newContact.birthday}
                                                        onChange={(e) => handleNewContactChange('birthday', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        className="form-control form-control-sm"
                                                        value={newContact.anniversary}
                                                        onChange={(e) => handleNewContactChange('anniversary', e.target.value)}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={handleAddContact}
                                                        className="px-3"
                                                    >
                                                        Add
                                                    </Button>
                                                </td>
                                            </tr>
                                            
                                            {/* Existing Contacts */}
                                            {addlContacts.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center text-muted py-4">
                                                        <i className="fas fa-users me-2"></i>
                                                        No contacts added yet. Use the form above to add contacts.
                                                    </td>
                                                </tr>
                                            ) : (
                                                addlContacts.map((contact) => (
                                                    <tr key={contact.id} className="contact-row">
                                                        <td className="align-middle">{contact.contactPerson}</td>
                                                        <td className="align-middle">{contact.designation}</td>
                                                        <td className="align-middle">{contact.department}</td>
                                                        <td className="align-middle">{contact.mobile}</td>
                                                        <td className="align-middle">{contact.email}</td>
                                                        <td className="align-middle">
                                                            {contact.birthday ? new Date(contact.birthday).toLocaleDateString() : '-'}
                                                        </td>
                                                        <td className="align-middle">
                                                            {contact.anniversary ? new Date(contact.anniversary).toLocaleDateString() : '-'}
                                                        </td>
                                                        <td className="text-center align-middle">
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteContact(contact.id)}
                                                                title="Delete contact"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseAddlContactModal} className="me-2">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveAddlContacts}>
                        Save Contacts
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Multiple Mailing Details Modal */}
            <Modal show={showMailingModal} onHide={handleCloseMailingModal} size="lg" centered className="mailing-modal">
                <Modal.Header closeButton className="modal-header-custom mb-0">
                    <Modal.Title className="mailing-modal-title">
                        Address Types for: {formData.name || 'Customer'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom p-0 mt-0">
                    <div className="mailing-form-container">
                        {/* Address List */}
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="text-center">Sl No.</th>
                                                <th className="text-center">Address Type</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mailingAddresses.map((address, index) => (
                                                <tr key={address.id}>
                                                    <td className="text-center align-middle">{index + 1}</td>
                                                    <td className="align-middle">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            placeholder="Address Type (e.g., Home, Office, Billing)"
                                                            value={address.addressType}
                                                            onChange={(e) => handleAddressTypeChange(address.id, e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteAddress(address.id)}
                                                                title="Delete address"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                            {index === mailingAddresses.length - 1 && (
                                                                <Button
                                                                    variant="primary"
                                                                    size="sm"
                                                                    onClick={handleAddAddressRow}
                                                                    title="Add new row"
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseMailingModal} className="me-2">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveMailingAddresses}>
                        Save Addresses
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Company Info Modal */}
            <Modal show={showCompanyInfoModal} onHide={handleCloseCompanyInfoModal} size="md" centered className="company-info-modal">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="company-modal-title">
                        Company Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom p-0">
                    <div className="company-form-container">
                        <div className="company-form-row">
                            <div className="company-form-label">Customer/Vendor Type</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.customerVendorType}
                                    onChange={(e) => handleInputChange('customerVendorType', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Referred By</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.referredBy}
                                    onChange={(e) => handleInputChange('referredBy', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Associated Dealer</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.associatedDealer}
                                    onChange={(e) => handleInputChange('associatedDealer', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Type of Business Entity</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.businessEntityType}
                                    onChange={(e) => handleInputChange('businessEntityType', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Nature of Business</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.natureOfBusiness}
                                    onChange={(e) => handleInputChange('natureOfBusiness', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Business Activity</div>
                            <div className="company-form-input">
                                <input
                                    type="text"
                                    className="form-control company-input"
                                    value={formData.businessActivity}
                                    onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Business Hour From - To</div>
                            <div className="company-form-input d-flex align-items-center">
                                <input
                                    type="time"
                                    className="form-control company-input me-2"
                                    value={formData.businessHourFrom}
                                    onChange={(e) => handleInputChange('businessHourFrom', e.target.value)}
                                />
                                <span className="me-2">-</span>
                                <input
                                    type="time"
                                    className="form-control company-input"
                                    value={formData.businessHourTo}
                                    onChange={(e) => handleInputChange('businessHourTo', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Transporter</div>
                            <div className="company-form-input">
                                <select
                                    className="form-select company-input"
                                    value={formData.transporter}
                                    onChange={(e) => handleInputChange('transporter', e.target.value)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>

                        <div className="company-form-row">
                            <div className="company-form-label">Courier</div>
                            <div className="company-form-input">
                                <select
                                    className="form-select company-input"
                                    value={formData.courier}
                                    onChange={(e) => handleInputChange('courier', e.target.value)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={handleCloseCompanyInfoModal} className="company-modal-btn">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveCompanyInfo} className="company-modal-btn">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add some custom CSS for better table styling */}
            <style jsx>{`
                .table th {
                    font-weight: 600;
                    background-color: #f8f9fa;
                }
                .contact-row:hover, .address-row:hover {
                    background-color: #f8f9fa;
                }
                .table .form-control {
                    border: 1px solid #dee2e6;
                }
                .table .form-control:focus {
                    border-color: #86b7fe;
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
                }
            `}</style>
        </>
    );
}