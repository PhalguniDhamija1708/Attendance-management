create table Employee
( 
 EmpId int IDENTITY(1,1) Primary key,
 UserName varchar(255) Not Null,
 Pass_Word varchar(255) Not NUll,
 Email varchar(255) Not null,
 EmpName varchar(255) not null,
 ApproverId int not null
)

create table Project
(
ProjectId int IDENTITY(1,1) Primary key,
ProjectDes varchar(400) not null
)

create table DaysEntry
(
Id int IDENTITY(1,1) Primary key,
EmpId int foreign key(EmpId) References Employee(EmpId),
ProjectId int foreign key(ProjectId) References Project(ProjectId),
Duration int,
Task varchar(100),
Leave_reason varchar(100),
CurrDate Date not null,
isHoliday bit not null, 
CurrWeek int 
)

ALTER TABLE DaysEntry
ADD Status varchar(50);

Select * from DaysEntry