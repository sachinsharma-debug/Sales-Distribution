// import React from "react";
// import Sidebar from "../../component/Sidebar";
// import Header from "../../component/Header";
// import DashboardCard from "../../component/DashboradCard";
// import "./DashboardCard1.css";

// const approvalItems = [
//   { title: "Items", count: 1 },
//   { title: "Ledgers", count: 2 },
// ];

// const submissionItems = [
//   { title: "Purchase Invoice", count: 1 },
// ];

// const Dashboard = () => {
//   return (
//     <>
//     <div className="dashboard">
//       <Sidebar />
//       <div className="dashboard-main">
//         <Header />
//         <div className="dashboard-content">
//           <h3>Need Your Attention</h3>
//           <div className="dashboard-cards">
//             <DashboardCard
//               title="PENDING FOR APPROVAL"
//               icon="⏳"
//               count={3}
//               items={approvalItems}
//               color="#3498db"
//             />
//             <DashboardCard
//               title="PENDING FOR SUBMISSION"
//               icon="✅"
//               count={1}
//               items={submissionItems}
//               color="#e74c3c"
//             />
//             </div>
//         </div>
//       </div>
//     </div>

//     </>

//   );
// };

// export default Dashboard;

import React from "react";
import DashboardCard from "../../component/DashboradCard";
import "./DashboardCard1.css";
import { Link } from "react-router-dom";

const DashboardCard1 = () => {
  const approvalItems = [
    { title: "Items", count: 1 },
    { title: "Ledgers", count: 2 },
  ];

  const submissionItems = [{ title: "Purchase Invoice", count: 1 }];

  return (
    // <div className="dashboard-page">
    //   <h3 className="page-title">Transaction</h3>
    //   <div className="cards-container">
    //     <DashboardCard
    //       title="PENDING FOR APPROVAL"
    //       icon="⏳"
    //       count={3}
    //       items={approvalItems}
    //       color="#3498db"
    //     />
    //     <DashboardCard
    //       title="PENDING FOR SUBMISSION"
    //       icon="✅"
    //       count={1}
    //       items={submissionItems}
    //       color="#e74c3c"
    //     />
    //   </div>
    // </div>
    <div className="settings-content">
      <div className="heading">Dashboard</div>
      <div className="row">
        <div className="col-3">
          <div className="simple-org-container">
            {/* <div className="org-header">Transaction</div> */}
            {/* <div className="org-list">
              <Link to="/salesEnquiry">
                <div className="org-tab">Sales Enquiry</div>
              </Link>
              <Link to="/SalesQuotation">
                <div className="org-tab">Sales Quotation</div>
              </Link>
              <Link to="/taxation">
                <div className="org-tab">Sales Order</div>
              </Link>
              <Link to="/branches">
                <div className="org-tab">Sales Confirmaton</div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard1;