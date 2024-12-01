import React, { useState } from "react";

const RegisterAccount = () => {
  const [accountType, setAccountType] = useState("user"); // Default account type
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    disabilityType: "",
    mobilityAid: "",
    facilityType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setFormData({
      ...formData,
      address: "",
      contact: "",
      disabilityType: "",
      mobilityAid: "",
      facilityType: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("계정이 생성되었습니다.");
  };

  return (
    <div className="common-page h-screen bg-background flex items-center justify-center">
      <div className="bg-primary shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
          계정 생성
        </h2>

        {/* Account Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent">
            계정 유형 선택:
          </label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="user"
                checked={accountType === "user"}
                onChange={handleAccountTypeChange}
                className="mr-2 text-accent"
              />
              사용자
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="operator"
                checked={accountType === "operator"}
                onChange={handleAccountTypeChange}
                className="mr-2 text-accent"
              />
              운영자
            </label>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-accent">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-accent">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-accent">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
              required
            />
          </div>

          {/* 사용자 전용 필드 */}
          {accountType === "user" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-accent">
                  주소
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="주소를 입력하세요"
                  className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-accent">
                  연락처
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="연락처를 입력하세요"
                  className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-accent">
                  장애 유형
                </label>
                <input
                  type="text"
                  name="disabilityType"
                  value={formData.disabilityType}
                  onChange={handleInputChange}
                  placeholder="장애 유형을 입력하세요 (선택사항)"
                  className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-accent">
                  이동 보조기구
                </label>
                <input
                  type="text"
                  name="mobilityAid"
                  value={formData.mobilityAid}
                  onChange={handleInputChange}
                  placeholder="이동 보조기구를 입력하세요 (선택사항)"
                  className="w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                />
              </div>
            </>
          )}

          {/* 운영자 전용 필드 */}
          {accountType === "operator" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-accent">
                관리 시설 유형
              </label>
              <select
                name="facilityType"
                value={formData.facilityType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
                required
              >
                <option value="">시설 유형을 선택하세요</option>
                <option value="배리어프리 시설">배리어프리 시설</option>
                <option value="이동지원센터">이동지원센터</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-sky"
          >
            계정 생성
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAccount;