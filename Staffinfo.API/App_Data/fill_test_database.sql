INSERT INTO dbo.tbl_Rank(RankName, RankWeight, Term)
  VALUES (N'������� �������', 1, 1),
          (N'�������', 2, 2),
          (N'������� �������', 3, 3),
          (N'��������', 4, 3),
          (N'���������', 5, 5),
          (N'������� ���������', 6, 1),
          (N'���������', 7, 2),
          (N'������� ���������', 8, 3),
          (N'�������', 9, 3),
          (N'�����', 10, 4),
          (N'������������', 11, 5);

GO

INSERT INTO dbo.tbl_Service (ServiceName, ServiceShortName, ServiceGroupId)
  VALUES (N'������� ������', N'��', 100),
        (N'������ ������ � ����������������', N'����',200),
        (N'����� ������������ ����������', N'���',300),
        (N'����������� ������', N'��', 400),
        (N'���������-������������ ������', N'���', 500),
        (N'����������������� ������', N'���',600),
        (N'������ ���������� � ������������ ������', N'����',700),
        (N'�������-������������ ������', N'���',800),
        (N'��������� ���������� �����', NULL, 801),
        (N'�������������� ���������', NULL, 802),
        (N'��������� ����� � ����������', NULL, 803),
        (N'�������-������������ ���������', NULL, 804);

GO

INSERT INTO dbo.tbl_Post (PostName, ServiceID, PostWeight)
  VALUES (N'���. ������', 1, 1),	--������� ������
        (N'���. �� ���', 1, 2),
        (N'���. �� ���', 1, 2),
        (N'���. �� ����', 1, 2),
        (N'���. ���. �����', 1, 3),
        (N'������� �������', 1, 4),
        (N'��������� ��. ����', 2, 1),	--������ ������ � ����������������
        (N'��������� ��. ����������������', 2, 2),
        (N'���. ���. �����', 3, 1),	--����� ������������ ����������
        (N'������� �������', 3, 2),
        (N'���������', 3, 3),
        (N'���������', 4, 1),	--����������� ������
        (N'���� ������ ���. ������', 4, 2),
        (N'���������-��������', 4, 3),
        (N'��������-�������', 4, 4),
        (N'���������', 5, 1),	--���������-������������ ������
        (N'�������� ���������', 5, 2),
        (N'���������-�������', 5, 3),
        (N'��������-�������', 5, 4),
        (N'���������', 6, 1),	--����������������� ������
        (N'�������-������������', 6, 2),
        (N'�������� ���������', 6, 3),
        (N'������� ���������-������������', 6, 4),
        (N'��������-������������', 6, 5),
        (N'���������', 7, 1),	--������ ���. � ������������ ������
        (N'�������', 7, 2),
        (N'�������� ���������', 7, 3),
        (N'������� ���������-�����-��������.', 7, 4),
        (N'���������', 8, 1),	--�������-������������ ������
        (N'��������-���������', 9, 1), --��������� ���������� �����
        (N'������� ����������-�������', 10, 1),	--�������������� ���������
        (N'���������-�������', 10, 2),
        (N'�������', 11, 1),	--��������� ����� � ����������
        (N'������ �����', 11, 2),
        (N'��������-�������', 11, 3),
        (N'�������� ���������', 12, 1),	--�������-������������ ���������
        (N'������� ���������-��������', 12, 2),
        (N'���������-��������', 12, 3),
        (N'������� ��������-���������', 12, 4),
        (N'��������-���������', 12, 5)
GO

INSERT INTO dbo.tbl_Address(City, Area, DetailedAddress, ZipCode) 
  VALUES (N'������', N'����������', N'��. �����������, �.23, ��. 2', '222333'),
         (N'������', N'����������', N'��. �������, �.21, ��.5', '215345'),
         (N'��������', N'����������', N'��. ��������, �.3, ��.93', '241562'),
         (N'���������', N'����������', N'��. ��������, �.11, ��.51', '235561'),
         (N'������', N'����������', N'��. ��������, �.5, ��.4', '213312'),
         (N'������', N'����������', N'��. ������, �.77, ��.89', '238093'),
         (N'������', N'����������', N'��. �������, �.23, ��.75', '289754'),
         (N'����', N'����������', N'��. ��������, �.34, ��.55', '235086'),
         (N'�������', N'����������', N'��. �������� ������, �.43, ��.13', '241043'),
         (N'����', N'����������', N'��. �������, �.41, ��.141', '453988'),
         (N'������', N'����������', N'��. ����������, �.42, ��.34', '209283'),
         (N'������', N'����������', N'��. �������, �.55, ��.4', '298774'),
         (N'������', N'����������', N'��. ������, �.1, ��.15', '294855'),
         (N'������', N'����������', N'��. ��������������, �.32, ��.54', '215432');

GO

INSERT INTO dbo.tbl_Passport(PassportNumber, PassportOrganization)
  VALUES (N'HB7865463', N'���������� ����'),
	 (N'HB2495463', N'���������� ����'),
	 (N'HB7852456', N'���������� ����'),
	 (N'HB3893042', N'���������� ����'),
	 (N'HB1354675', N'���������� ����'),
	 (N'HB7353223', N'���������� ����'),
	 (N'HB8288383', N'���������� ����'),
	 (N'HB7737228', N'���������� ����'),
	 (N'HB8984857', N'���������� ����'),
	 (N'HB1786232', N'���������� ����'),
	 (N'HB4788524', N'���������� ����'),
	 (N'HB3664234', N'���������� ����'),
	 (N'HB8304983', N'���������� ����'),
	 (N'HB8263567', N'���������� ����');


GO

INSERT INTO dbo.tbl_Employee(EmployeeFirstname, EmployeeLastname, EmployeeMiddlename, BirthDate, PassportID, AddressID, RetirementDate, Description)
  VALUES (N'����', N'�����', N'����������', '1974-10-01', 1, 1, NULL, NULL),
	(N'����', N'���������', N'����������', '1975-02-04', 2, 2, NULL, NULL),
	(N'������', N'������', N'����������', '1969-01-04', 3, 3, NULL, NULL),
	(N'�������', N'������', N'��������', '1974-04-06', 4, 4, NULL, NULL),
	(N'�����', N'������', N'��������', '1981-04-03', 5, 5, NULL, NULL),
	(N'������', N'����', N'��������', '1983-04-06', 6, 6, NULL, NULL),
	(N'����', N'�������', N'��������', '1981-03-11', 7, 7, NULL, NULL),
	(N'�����', N'������', N'����������', '1984-11-09', 8, 8, NULL, NULL),
	(N'�����', N'������', N'���������', '1983-04-06', 9, 9, NULL, NULL),
	(N'�����', N'��������', N'����������', '1989-04-03', 10, 10, NULL, NULL),
	(N'�������', N'��������', N'����������', '1991-04-08', 11, 11, NULL, NULL),
	(N'����', N'������', N'����������', '1987-05-01', 12, 12, NULL, NULL),
	(N'�������', N'������', N'����������', '1980-12-06', 13, 13, NULL, NULL),
	(N'��', N'������', N'��������', '1979-09-03', 14, 14, NULL, NULL);

GO

INSERT INTO dbo.tbl_Location(LocationName, Address, Description)
VALUES (N'���������� ����', N'��������� 59', N'��'),
	(N'���������� �� 15', N'��������� 59', N'��'),
	(N'���������� �� 7', N'��������� 59', N'��'),
	(N'��������� �� 3', N'��������� 59', N'��'),
	(N'����������� �� 11', N'��������� 59', N'��'),
	(N'���������� �� 1', N'��������� 59', N'��');

GO

INSERT INTO dbo.tbl_MESAchievement (EmployeeID, LocationID, StartDate, FinishDate, PostID, RankID, Description)
 VALUES (1, 1, '2000-04-05', NULL, 1, 1, N'xz'),
	(2, 2, '2000-04-05', '2010-05-06', 8, 2, N'xz'),
	(3, 3, '2000-04-05', '2001-05-06', 3, 3, N'xz'),
	(4, 4, '2000-04-05', '2007-05-06', 17, 4, N'xz');

GO

INSERT INTO dbo.tbl_Notification (Author, Title, Details, DueDate)
  VALUES (N'qwerty', N'����������� 1', N'������ �������� �����������', '2016-12-12'),
      (N'qwerty', N'����������� 2', N'������ �������� �����������', '2016-12-11'),
      (N'qwerty', N'����������� 2', N'������ �������� �����������', '2016-11-12');

GO

INSERT INTO dbo.tbl_OutFromOffice (EmployeeID, startdate, FinishDate, Cause, Description)
  VALUES (1, '2000-04-05', '2010-05-06', 'S', N'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
  (2, '2000-04-05', '2010-05-06', 'S', N''),
  (3, '2000-04-05', '2010-05-06', 'S', N''),
  (1, '2000-04-05', '2010-05-06', 'D', N'');

GO

INSERT INTO dbo.tbl_GratitudesAndPunishment(Title, EmployeeID, ItemType, Date, Description, AwardOrFine)
  VALUES (N'�� �������� ������', 4, 'G', '2016-12-03', N'������', 50000),
      (N'�� �������� ������', 2, 'V', '2016-02-03', N'������', 50000),
      (N'�� �������� ������', 2, 'G', '2016-12-03', N'������', 50000),
      (N'�� �������� ������', 3, 'V', '2016-12-03', N'������', 50000),
      (N'�� �������� ������',2, 'G', '2016-12-03', N'������', 50000);

GO

INSERT INTO dbo.tbl_Sertification(EmployeeID, DueDate, Description)
  VALUES (1, '2010-12-10', N'description1'),
      (1, '2010-11-10', N'description2');

GO