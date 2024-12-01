import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const SupportCenterDetail = () => {
  const { id } = useParams(); // 센터 ID를 URL 파라미터에서 가져옴
  const navigate = useNavigate();

  // 더미 데이터 (API 호출 대신 사용)
  const dummyCenter = {
    id: 1,
    centerName: "이동지원센터 A",
    location: "서울특별시 강남구",
    phone: "02-123-4567",
    website: "https://center-a.example.com",
    services: ["무료 주차", "장애인 화장실", "휠체어 대여"],
    description:
      "이동지원센터 A는 장애인과 교통 약자를 위해 다양한 서비스를 제공합니다.",
  };

  return (
    <div className="common-page bg-background min-h-screen p-4">
      <h1 className="text-3xl font-bold text-secondary text-center mb-6">
        {dummyCenter.centerName}
      </h1>

      <div className="bg-primary p-6 rounded-lg shadow-lg max-w-[800px] mx-auto">
        <h2 className="text-xl font-semibold text-secondary mb-4">센터 정보</h2>

        {/* 센터 정보 */}
        <div className="mb-4">
          <p className="text-sm font-medium text-accent">
            <span className="font-bold">위치:</span> {dummyCenter.location}
          </p>
          <p className="text-sm font-medium text-accent">
            <span className="font-bold">전화번호:</span>{" "}
            <a
              href={`tel:${dummyCenter.phone}`}
              className="text-sky hover:underline"
            >
              {dummyCenter.phone}
            </a>
          </p>
          <p className="text-sm font-medium text-accent">
            <span className="font-bold">웹사이트:</span>{" "}
            <a
              href={dummyCenter.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky hover:underline"
            >
              {dummyCenter.website}
            </a>
          </p>
        </div>

        {/* 센터 설명 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary mb-2">
            센터 설명
          </h3>
          <p className="text-sm text-accent">{dummyCenter.description}</p>
        </div>

        {/* 제공 서비스 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary mb-2">
            제공 서비스
          </h3>
          <ul className="list-disc pl-5">
            {dummyCenter.services.map((service, index) => (
              <li key={index} className="text-sm text-accent">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate("/searchsupportcenter")} // 이전 페이지로 이동
          className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-sky"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default SupportCenterDetail;