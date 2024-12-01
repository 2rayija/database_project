import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import RegisterAccount from "./pages/RegisterAccount.js";
import FacilityManagement from "./pages/FacilityManagement.js";
import ServiceManagement from "./pages/ServiceManagement.js";
import SearchFacility from "./pages/SearchFacility.js";
import SupportCenterSearch from "./pages/SupportCenterSearch.js";
import SupportCenterDetail from "./pages/SupportCenterDetail.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="/" element={<Login />} />
        {/* 계정 등록 */}
        <Route path="/register" element={<RegisterAccount />} />
        {/* 로그인 */}
        <Route path="/facilitymanagement" element={<FacilityManagement />} />
        {/* 서비스 정보관리 */}
        <Route path="/servicemanagement" element={<ServiceManagement />} />
        {/* 시설 관리 */}
        <Route path="/searchfacility" element={<SearchFacility />} />
        {/* 이동지원센터 관리 */}
        <Route path="/searchsupportcenter" element={<SupportCenterSearch />} />
        {/* 이동지원센터 관리 */}
        <Route path="/supportcenter/:id" element={<SupportCenterDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;