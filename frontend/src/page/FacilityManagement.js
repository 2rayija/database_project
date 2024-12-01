import React, { useState } from "react";

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]); // 시설 목록
  const [formData, setFormData] = useState({
    FacilityName: "",
    Category1: "",
    Category2: "",
    Category3: "",
    CityName: "",
    DistrictName: "",
    SubdistrictName: "",
    VillageName: "",
    StreetName: "",
    BuildingNumber: "",
    PhoneNumber: "",
    Website: "",
  });

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editId, setEditId] = useState(null);

  // 폼 입력 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러 (추가/수정)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setFacilities(
        facilities.map((facility) =>
          facility.id === editId ? { ...formData, id: editId } : facility
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setFacilities([...facilities, { ...formData, id: Date.now() }]);
    }
    setFormData({
      FacilityName: "",
      Category1: "",
      Category2: "",
      Category3: "",
      CityName: "",
      DistrictName: "",
      SubdistrictName: "",
      VillageName: "",
      StreetName: "",
      BuildingNumber: "",
      PhoneNumber: "",
      Website: "",
    });
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = (id) => {
    const facility = facilities.find((f) => f.id === id);
    setFormData(facility);
    setIsEditing(true);
    setEditId(id);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = (id) => {
    setFacilities(facilities.filter((f) => f.id !== id));
  };

  return (
    <div className="common-page h-screen bg-background flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-secondary mb-6">시설 관리</h1>
      <p>시설 등록 페이지입니다.</p>
      <br />
      <div className="w-full max-w-[800px] bg-primary p-6 rounded-lg shadow-lg">
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-accent">
              시설 이름
            </label>
            <input
              type="text"
              name="FacilityName"
              value={formData.FacilityName}
              onChange={handleInputChange}
              placeholder="시설 이름을 입력하세요"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent">
              카테고리 1
            </label>
            <input
              type="text"
              name="Category1"
              value={formData.Category1}
              onChange={handleInputChange}
              placeholder="카테고리 1"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent">
              카테고리 2
            </label>
            <input
              type="text"
              name="Category2"
              value={formData.Category2}
              onChange={handleInputChange}
              placeholder="카테고리 2"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent">
              카테고리 3
            </label>
            <input
              type="text"
              name="Category3"
              value={formData.Category3}
              onChange={handleInputChange}
              placeholder="카테고리 3"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent">
              도시 이름
            </label>
            <input
              type="text"
              name="CityName"
              value={formData.CityName}
              onChange={handleInputChange}
              placeholder="도시 이름"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent">
              전화번호
            </label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="전화번호"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-sky"
            >
              {isEditing ? "수정" : "추가"}
            </button>
          </div>
        </form>

        {/* Facility Table */}
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-2 text-left">시설 이름</th>
              <th className="px-4 py-2 text-left">도시</th>
              <th className="px-4 py-2 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id} className="odd:bg-primary even:bg-gray-100">
                <td className="px-4 py-2">{facility.FacilityName}</td>
                <td className="px-4 py-2">{facility.CityName}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(facility.id)}
                    className="text-sky hover:underline mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(facility.id)}
                    className="text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityManagement;