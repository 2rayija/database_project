import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupportCenterSearch = () => {
  const [region, setRegion] = useState(""); // 지역 입력값
  const [results, setResults] = useState([]); // 검색 결과
  const [noResults, setNoResults] = useState(false); // 결과 없음 상태
  const navigate = useNavigate(); // 상세보기로 이동

  const handleSearch = async () => {
    // API 요청 시뮬레이션
    console.log("검색 지역:", region);

    // 더미데이터
    const dummyResults = [
      {
        id: 1,
        centerName: "이동지원센터 A",
        location: "서울특별시 강남구",
        services: "무료 주차, 장애인 화장실",
      },
      {
        id: 2,
        centerName: "이동지원센터 B",
        location: "서울특별시 서초구",
        services: "휠체어 대여, 무료 주차",
      },
      {
        id: 3,
        centerName: "이동지원센터 C",
        location: "경기도 안산시 상록구",
        services: "무료 주차, 장애인 화장실",
      },
    ];

    const filteredResults = dummyResults.filter((result) =>
      result.location.includes(region)
    );

    setResults(filteredResults);
    setNoResults(filteredResults.length === 0);
  };

  return (
    <div className="common-page bg-background min-h-screen p-4">
      <h1 className="text-3xl font-bold text-secondary text-center mb-6">
        이동지원센터 검색
      </h1>

      {/* 검색 조건 */}
      <div className="bg-primary p-6 rounded-lg shadow-lg max-w-[800px] mx-auto">
        <h2 className="text-xl font-semibold text-secondary mb-4">검색 조건</h2>

        {/* 지역 필드 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent mb-2">
            지역 선택 (시/도)
          </label>
          <input
            type="text"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="예: 서울특별시"
            className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
          />
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-sky"
        >
          검색
        </button>
      </div>

      {/* 검색 결과 */}
      <div className="mt-8 max-w-[800px] mx-auto">
        {noResults ? (
          <p className="text-center text-accent">
            조건에 맞는 데이터가 없습니다.
          </p>
        ) : (
          <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-4 py-2 text-left">센터명</th>
                <th className="px-4 py-2 text-left">위치</th>
                <th className="px-4 py-2 text-left">주요 서비스</th>
                <th className="px-4 py-2 text-center">작업</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="odd:bg-primary even:bg-gray-100">
                  <td className="px-4 py-2">{result.centerName}</td>
                  <td className="px-4 py-2">{result.location}</td>
                  <td className="px-4 py-2">{result.services}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/supportcenter/${result.id}`)}
                      className="text-sky hover:underline"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupportCenterSearch;