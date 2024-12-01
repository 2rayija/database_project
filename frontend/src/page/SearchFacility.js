import React, { useState } from "react";

const SearchPage = () => {
  const [searchType, setSearchType] = useState("facility"); // "facility", "service", or "facility+service"
  const [filters, setFilters] = useState({
    CityName: "",
    Category1: "",
    FreeParking: false,
    HandicapToilet: false,
    WheelchairRental: false,
  });
  const [results, setResults] = useState([]); // 검색 결과
  const [noResults, setNoResults] = useState(false); // 결과 없음 상태

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // 체크박스 핸들러
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = async () => {
    // API 요청 시뮬레이션
    console.log("검색 조건:", searchType, filters);
    const dummyResults = [
      {
        id: 1,
        FacilityName: "시설 A",
        Address: "서울특별시 중구",
        FreeParking: true,
        HandicapToilet: true,
        WheelchairRental: false,
      },
    ];
    const isResultsEmpty = dummyResults.length === 0;
    setResults(dummyResults);
    setNoResults(isResultsEmpty);
  };

  return (
    <div className="common-page bg-background min-h-screen p-4">
      <h1 className="text-3xl font-bold text-secondary text-center mb-6">
        검색 페이지
      </h1>

      {/* 검색 조건 */}
      <div className="bg-primary p-6 rounded-lg shadow-lg max-w-[800px] mx-auto">
        <h2 className="text-xl font-semibold text-secondary mb-4">
          검색 조건을 등록 후 검색하세요
        </h2>

        {/* 필터 선택 */}
        <div className="mb-4 flex flex-col">
          <label className="block text-sm font-medium text-accent mb-2">
            조회 유형
          </label>
          <div className="flex space-x-4 flex-col text-left">
            <label className="flex items-center ml-[2vw]">
              <input
                type="radio"
                name="searchType"
                value="facility"
                checked={searchType === "facility"}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-2 text-sky"
              />
              시설만 조회
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="searchType"
                value="service"
                checked={searchType === "service"}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-2 text-sky"
              />
              서비스만 조회
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="searchType"
                value="facility+service"
                checked={searchType === "facility+service"}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-2 text-sky"
              />
              시설+서비스 조회
            </label>
          </div>
        </div>

        {/* 위치 필터 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent mb-2">
            위치 (시/도)
          </label>
          <input
            type="text"
            name="CityName"
            value={filters.CityName}
            onChange={handleInputChange}
            placeholder="예: 서울특별시"
            className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
          />
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent mb-2">
            카테고리 (시설 유형)
          </label>
          <input
            type="text"
            name="Category1"
            value={filters.Category1}
            onChange={handleInputChange}
            placeholder="예: 공공시설"
            className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
          />
        </div>

        {/* 서비스 체크박스 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent mb-2">
            서비스 제공 여부
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-[1.5vw] font-bold">
              <input
                type="checkbox"
                name="FreeParking"
                checked={filters.FreeParking}
                onChange={handleCheckboxChange}
                className="form-checkbox text-sky"
              />
              무료 주차
            </label>
            <label className="flex items-center text-[1.5vw] font-bold">
              <input
                type="checkbox"
                name="FreeParking"
                checked={filters.FreeParking}
                onChange={handleCheckboxChange}
                className="form-checkbox text-sky"
              />
              장애인 화장실
            </label>
            <label className="flex items-center text-[1.5vw] font-bold">
              <input
                type="checkbox"
                name="FreeParking"
                checked={filters.FreeParking}
                onChange={handleCheckboxChange}
                className="form-checkbox text-sky"
              />
              휠체어 대여
            </label>
          </div>
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
                <th className="px-4 py-2 text-left">시설명</th>
                <th className="px-4 py-2 text-left">주소</th>
                <th className="px-4 py-2 text-center">무료 주차</th>
                <th className="px-4 py-2 text-center">장애인 화장실</th>
                <th className="px-4 py-2 text-center">휠체어 대여</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="odd:bg-primary even:bg-gray-100">
                  <td className="px-4 py-2">{result.FacilityName}</td>
                  <td className="px-4 py-2">{result.Address}</td>
                  <td className="px-4 py-2 text-center">
                    {result.FreeParking ? "O" : "X"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {result.HandicapToilet ? "O" : "X"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {result.WheelchairRental ? "O" : "X"}
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

export default SearchPage;