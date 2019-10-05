use dbms;
create table UserTable(
ID serial,
Email varchar(40) not null unique,
Name varchar(30),
Password varchar(15)not null,
Usertype varchar(10) not null,
primary key (ID)
);
drop table UserTable;
create table NonAdmin(
ID serial,
Gender varchar(7),
Phone numeric(10,0) not null unique constraint Phone1_chk check(Phone>999999999),
Address varchar(100),
primary key(ID),
foreign key(ID) references UserTable(ID) on delete cascade 
);

create table Admin(
ID serial,
AgencyName  varchar(35) not null,
AgencyPhone varchar(10)not null unique constraint Phone2_chk check(AgencyPhone>999999999),
AgencyOffice varchar(50),
primary key(AgencyName),
foreign key(ID) references UserTable(ID) on delete cascade
);

create table BusInfo(
BusRegnNo varchar(15) not null,
AgencyName varchar(35) not null,
TotalSeats integer default 40,
AC numeric(1) default 0,
LocationName varchar(20),
Latitude numeric(17,10),
Longitude numeric(17,10),
primary key(BusRegnNo),
foreign key(AgencyName) references Admin(AgencyName) on delete cascade
);

create table AgencyDetails(
AgencyName varchar(35) not null,
AgencyAddress varchar(50) not null
);

alter table BusSchedule drop index DriverID;

create table BusSchedule(
BusRegnNo varchar(15) not null,
RouteID integer not null constraint Routeid1_chk check(RouteID>0),
DriverID integer unique constraint Driverid1_chk check(DriverID>0),
StartTime numeric(4,2) constraint Start_chk1 check(StartTime>=0 and StartTime<2400),
Fare integer constraint fair_chk check(Fare>0),
ReservedSeats integer default 0,
TravelTime numeric(10) constraint EstTim1_chk check(Traveltime>0),
primary key(RouteID,DriverID,StartTime),
foreign key(BusRegnNo) references BusInfo(BusRegnNo) on delete cascade
);

create table TimeForTravel(
TravelTime numeric(10) constraint EstTim2_chk check(Traveltime>0),
StartTime numeric(4,2) constraint Start1_check check(StartTime>=0 and StartTime<24),
EndTime numeric(4,2) constraint End1_chk check(EndTime>=0 and EndTime<24),
primary key(TravelTime,StartTime)
);

create table RouteDetails(
RouteID integer constraint Routeid4_chk check(RouteID>0),
RouteName varchar(30) not null,
Source varchar(30) not null,
Destination varchar(30) not null
);

create table BusStops(
RouteID integer not null constraint Routeid_chk check(RouteID>0),
IntermediateStops varchar(20) not null,
StopNumber integer not null constraint Stop_num check(StopNumber>0)
);

create table DriverDetails(
DriverID serial,
DriverName varchar(20) not null,
DriverPhone numeric(10) constraint Phone3_chk check(DriverPhone>999999999),
Age numeric(3) constraint check(Age>0),
Date_Of_Join date,
primary key(DriverID)
);
drop table DriverDetails;
create table Ticket(
BusRegnNo varchar(15) not null,
TicketPNR serial,
BookingDate date,
TravelDate date, 
primary key(TicketPNR),
constraint dat_chk check(TravelDate>BookingDate+2),
foreign key(BusRegnNo) references BusInfo(BusRegnNo)
);

create table SeatsBooked(
TicketPNR integer,
BookedSeats integer,
primary key(TicketPNR,BookedSeats)
);
drop table SeatsBooked;
create table SeatInfo(
BusRegnNo varchar(15) not null unique, 
SeatNo integer constraint SeatNo_chk check(SeatNo>40),
Sleeper numeric(1) default 0,
foreign key(BusRegnNo) references BusInfo(BusRegnNo) on delete cascade
);

create table Passenger(
ID serial,
BusRegnNo varchar(15) not null,
PassengerID integer constraint passid_chk check(PassengerID>0),
PassengerName varchar(20),
PassengeGender varchar(7),
Age integer constraint age2_chk check(age>5),
primary key(PassengerID),
foreign key(ID) references NonAdmin(ID) on delete cascade,
foreign key(BusRegnNo) references BusInfo(BusRegnNo)
);
drop table Through;
create table Through(
RouteID integer,
DriverID integer,
StartTime numeric(4,2),
BusRegnNo integer not null,
TicketPNR integer not null constraint pnr4_chk check(TicketPNR>0),
primary key(RouteID,DriverID,StartTime,TicketPNR)
);

create assertion AT_LEAST_ONE as CHECK(
not exists
(select count(*) as TRIPS from through group by BusRegnNo where TRIPS=0)
);
alter table RouteDetails add constraint check(AproxDistance>0);
insert into DriverDetails values('126', 'Prithvi', '9834534565','29','2017-09-22');
insert into BusStops values('4','Chennai','7');

delete from TimeForTravel;
insert into RouteDetails values('4','BGL-CNI','Bangalore','Chennai','345');
insert into RouteDetails values('3','CNI-BGL','Chennai','Bangalore','345');

insert into RouteDetails values('2','BGL-TRR','Bangalore','Tirupur','322');
insert into TimeForTravel values('12','17.30','05.30');

alter table Through modify column BusRegnNo varchar(50); 
insert into TimeForTravel values('15','19.00','10.00');
insert into TimeForTravel values('14','19.45','9.45');
insert into TimeForTravel values('15','19.15','10.15');
insert into TimeForTravel values('17','19.00','12.00');
insert into TimeForTravel values('15','20.00','11.00');
insert into TimeForTravel values('1','1.00','2.00');
drop table Ticket;
insert into SeatsBooked values('1006','25');
insert into SeatsBooked values('1006','26');
insert into SeatsBooked values('1006','27');
insert into SeatsBooked values('1007','20');
insert into SeatsBooked values('1007','21');
insert into SeatsBooked values('1008','25');
insert into SeatsBooked values('1009','14');
insert into SeatsBooked values('1009','15');
insert into SeatsBooked values('1009','16');
insert into SeatsBooked values('1009','17');
insert into SeatsBooked values('1010','1');
insert into SeatsBooked values('1011','10');
insert into SeatsBooked values('1011','12');
insert into SeatsBooked values('1011','19');

alter table TimeForTravel modify column StartTime numeric(4,2); 
insert into TimeForTravel values('15','19.00','10.00');
insert into TimeForTravel values('14','19.45','9.45');
insert into TimeForTravel values('15','19.15','10.15');
insert into TimeForTravel values('17','19.00','12.00');
insert into TimeForTravel values('15','20.00','11.00');
insert into TimeForTravel values('1','1.00','2.00');


insert into Through values('1', '121', '17.30', '0', '1003');
insert into Through values('1', '122', '19.00', '0', '1004');
insert into Through values('2', '123', '19.45', '0', '1001');
insert into Through values('3', '124', '19.15', '0', '1005');
insert into Through values('4', '125', '1.00', '0', '1002');

delimiter $$
create trigger TimeTravel after insert on BusSchedule
for each row 
begin
if(new.TravelTime+new.StartTime>24.00) then
	insert into TimeForTravel(TravelTime,StartTime,EndTime)
	values(new.TravelTime,new.StartTime,new.TravelTime+new.StartTime-24);
else
	insert into TimeForTravel(TravelTime,StartTime,EndTime)
	values(new.TravelTime,new.StartTime,new.TravelTime+new.StartTime);
end if;
end$$
delimiter ;

create procedure totalrevenue()
begin
select AgencyName,sum(fare) from BusInfo natural join BusSchedule group by AgencyName;
end$$
delimiter ;
call totalrevenue();

show function status where db='dbms';
select AgencyName,sum(fare) from BusInfo natural join BusSchedule group by AgencyName;
