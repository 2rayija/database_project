# database_project

## 1. 프로젝트 개요

- 교통 약자의 이동권 보장과 배리어프리 서비스의 필요성
    - 교통약자의 증가: 장애인, 노인 등 사회적 약자의 수가 지속적으로 증가.
    - 이동 환경 부족: 자유로운 이동을 위한 시설과 방법이 여전히 부족하며 선택지 제한.
- 배리어 프리의 중요성
    - 개념: 물리적, 제도적, 심리적 장벽 제거로 차별 없는 환경 조성.
    - 효과: 교통약자의 이동권 보장 및 사회 참여 기회 확대.
- 프로젝트 목표
    - 목적: 교통약자의 이동권 보장을 위해 배리어 프리 위치, 서비스 및 이동지원센터 정보 제공.
    - 의미: 더 많은 선택지와 편리한 이동환경을 제공하여 교통약자의 삶의 질 향상.

## 기술 스택

![Django](https://img.shields.io/badge/Backend-Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 2. 데이터베이스 설계

![image](https://github.com/user-attachments/assets/e439a7b3-cf33-4c11-8651-6ebdc17de690)

### 테이블 설계

1. **배리어프리 시설 정보 (BarrierFreeLocations)**
    - Primary Key: FacilityID
    - Foreign Key: AdminID → FacilityManagementOperators(OperatorID)
    - 속성: FacilityID, AdminID, FacilityName, Category, Address, PhoneNumber, Website
2. **배리어프리 서비스 정보 (BarrierFreeServices)**
    - Primary Key: ServiceID
    - Foreign Key: FacilityID → BarrierFreeLocations(FacilityID), AdminID → FacilityManagementOperators(OperatorID)
    - 속성: ServiceID, FacilityID, AdminID, FreeParking, PaidParking, HandicapToilet, WheelchairRental, BrailleGuide 등
3. **이동지원센터 정보 (TransportSupportCenters)**
    - Primary Key: CenterID
    - Foreign Key: AdminID → FacilityManagementOperators(OperatorID)
    - 속성: CenterID, AdminID, CenterName, Address, ReservationPhone, ReservationURL, VehicleCount, WheelchairLiftCount 등
4. **사용자 정보 (Users)**
    - Primary Key: UserID
    - Foreign Key: CenterID → TransportSupportCenters(CenterID)
    - 속성: UserID, CenterID, FullName, Address, ContactNumber, DisabilityType, MobilityAidType, Email, PasswordHash
5. **운영자 정보 (FacilityManagementOperators)**
    - Primary Key: OperatorID
    - 속성: OperatorID, Name, Email, EncryptedPassword, Permissions, FacilityType

### 관계 설정

- **배리어프리 시설과 서비스**: 1:1 관계 (모든 시설에 서비스 정보가 등록됨)
- **배리어프리 시설과 운영자**: 1:N 관계 (하나의 운영자가 여러 시설을 관리)
- **운영자와 이동지원센터**: 1:N 관계 (하나의 운영자가 여러 이동지원센터를 운영)
- **이동지원센터와 교통약자**: N:M 관계 (교통약자는 여러 이동지원센터를 이용 가능)

### 물리적 스키마 및 무결성 유지

- **개체 무결성**: Primary Key 및 NOT NULL 제약조건 적용
- **참조 무결성**: Foreign Key를 활용하여 데이터 연동, ON DELETE CASCADE 또는 ON DELETE SET NULL 설정
- **도메인 무결성**: BOOLEAN 속성 기본값 FALSE 설정, 숫자형 속성 CHECK 제약 추가
- **사용자 정의 무결성**: 운영자 권한 JSON 관리, 주소 필수값 설정

---

## 3. 프로젝트 구현

![image (1)](https://github.com/user-attachments/assets/000144b2-40df-44a5-985e-6efdb7f2075b)

### 3.1 로그인 및 계정 생성

- **로그인 기능**: 사용자와 운영자가 시스템에 로그인 가능
- **계정 생성 기능**: 새로운 사용자 및 운영자가 계정을 등록 가능

![image (2)](https://github.com/user-attachments/assets/3a763ce6-f01e-4078-8ece-e6c169b46690)

### 3.2 시설 및 서비스 관리

- **시설 관리**: 운영자가 시설 정보를 추가, 수정, 삭제 가능 (시설명, 카테고리, 주소 등 입력 필드 포함)
- **서비스 정보 관리**: 운영자가 시설에서 제공하는 서비스(휠체어 대여, 장애인 화장실 여부 등)를 관리 가능

![image (3)](https://github.com/user-attachments/assets/84b9cc9b-b050-41bb-abec-d9b3b0139a59)

### 3.3 검색 및 이동지원센터 관리

- **배리어프리 시설 조회**: 사용자 조건(시설, 서비스, 시설+서비스)에 따른 검색 기능 제공
- **이동지원센터 관리**: 운영자가 센터의 위치, 차량 정보, 서비스 내용을 추가, 수정, 삭제 가능

![image (4)](https://github.com/user-attachments/assets/51473081-9258-4e44-81b2-9196178f3f21)

### 3.4 이동지원센터 상세 페이지

- **사용자 맞춤 검색**: 지역, 차량 지원 여부, 휠체어 리프트 보유 여부 등의 조건으로 센터 검색 가능
- **센터 상세 정보 제공**: 선택한 센터의 ID를 기반으로 위치, 예약 가능 여부, 제공 서비스 정보 확인 가능
