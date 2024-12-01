import React, { useState } from "react";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    FacilityID: "",
    FreeParking: false,
    HandicapToilet: false,
    WheelchairRental: false,
  });

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editId, setEditId] = useState(null);

  // Boolean 필드 핸들러
  const handleBooleanChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // 일반 입력 필드 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setServices(
        services.map((service) =>
          service.FacilityID === editId
            ? { ...formData, FacilityID: editId }
            : service
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setServices([...services, { ...formData, FacilityID: Date.now() }]);
    }
    setFormData({
      FacilityID: "",
      FreeParking: false,
      HandicapToilet: false,
      WheelchairRental: false,
    });
  };

  // 수정 버튼 클릭 핸들러
  const handleEdit = (id) => {
    const service = services.find((s) => s.FacilityID === id);
    setFormData(service);
    setIsEditing(true);
    setEditId(id);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = (id) => {
    setServices(services.filter((s) => s.FacilityID !== id));
  };

  return (
    <div className="common-page h-screen bg-background flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-secondary mb-6">서비스 관리</h1>
      <div className="w-full max-w-[800px] bg-primary p-6 rounded-lg shadow-lg">
        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-accent">
              시설 ID
            </label>
            <input
              type="text"
              name="FacilityID"
              value={formData.FacilityID}
              onChange={handleInputChange}
              placeholder="시설 ID 입력"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky"
              required
              disabled={isEditing} // 수정 시 비활성화
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="FreeParking"
              checked={formData.FreeParking}
              onChange={handleBooleanChange}
              className="form-checkbox text-sky"
            />
            <label className="text-sm font-medium text-accent">무료 주차</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="HandicapToilet"
              checked={formData.HandicapToilet}
              onChange={handleBooleanChange}
              className="form-checkbox text-sky"
            />
            <label className="text-sm font-medium text-accent">
              장애인 화장실
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="WheelchairRental"
              checked={formData.WheelchairRental}
              onChange={handleBooleanChange}
              className="form-checkbox text-sky"
            />
            <label className="text-sm font-medium text-accent">
              휠체어 대여
            </label>
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

        {/* Service Table */}
        <table className="max-w-[90%] text-[1.5vw] bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="px-4 py-2 text-left">시설 ID</th>
              <th className="px-4 py-2 text-center">무료 주차</th>
              <th className="px-4 py-2 text-center">장애인 화장실</th>
              <th className="px-4 py-2 text-center">휠체어 대여</th>
              <th className="px-4 py-2 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.FacilityID}
                className="odd:bg-primary even:bg-gray-100"
              >
                <td className="px-4 py-2">{service.FacilityID}</td>
                <td className="px-4 py-2 text-center">
                  {service.FreeParking ? "O" : "X"}
                </td>
                <td className="px-4 py-2 text-center">
                  {service.HandicapToilet ? "O" : "X"}
                </td>
                <td className="px-4 py-2 text-center">
                  {service.WheelchairRental ? "O" : "X"}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(service.FacilityID)}
                    className="text-sky hover:underline mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(service.FacilityID)}
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

export default ServiceManagement;
