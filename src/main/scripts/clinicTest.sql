drop schema if exists clinic_test;
create schema clinic_test;
use clinic_test;

create table staff (
    id int not null auto_increment,
    last_name varchar(50) not null,
    first_name varchar(50) not null,
    job varchar(50) not null,
    status varchar(50) not null,
    primary key (id)
);

create table user (
    id int not null auto_increment,
    username varchar(50) not null unique,
    password text not null,
    salt varchar(50) not null unique,
    staff_fk int not null unique,
    primary key (id),
    foreign key (staff_fk) references staff(id)
);

create table insurance_company (
    id int not null auto_increment,
    name varchar(50) not null unique,
    primary key (id)
);

create table insurance (
    id int not null auto_increment,
    insurance_company_fk int not null,
    name varchar(50) not null unique,
    primary key (id),
    foreign key (insurance_company_fk) references insurance_company(id)
);

create table patient (
	id int not null auto_increment,
    last_name varchar(50) not null,
    first_name varchar(50) not null,
    insurance_fk int not null,
    insurance_number varchar(50) not null unique,
    staff_fk int not null,
    primary key (id),
    foreign key (insurance_fk) references insurance(id),
    foreign key (staff_fk) references staff(id)
);

create table service (
    id int not null auto_increment,
    name varchar(50) not null unique,
    primary key (id)
);

create table visit (
	id int not null auto_increment,
    patient_fk int not null,
    date date not null,
    service_fk int not null,
    comment text not null,
    primary key (id),
    foreign key (patient_fk) references patient(id),
    foreign key (service_fk) references service(id)
);

create table queue (
    id int not null auto_increment,
    date date not null,
    ticket int not null,
    patient_fk int not null,
    status varchar(50) not null,
    primary key (id),
    foreign key (patient_fk) references patient(id)
);

insert into staff
values
(null, "Hoffman", "Jarrad", "Doctor", "Free"),
(null, "Irwin", "Isabel", "Nurse", "N/A"),
(null, "Aldred", "Myla", "Doctor", "Free"),
(null, "McDowell", "Mohammed", "Doctor", "Busy"),
(null, "Bassett", "Hussein", "Nurse", "N/A");

insert into user
values
(null, "1", "2a4faaae91fc288f73887053158a8699dbe8c34f5fa36d7162b847506cb7377a", "466e13e6101ad461359cbef495dbdb13", 1),
(null, "2", "968269c1823bfcb95eb3561fd4668fdcef2df49b4dae8787151db299736b1466", "9cfba1e8d299cfad1ed49d732bd0cb84", 2),
(null, "3", "2918fd70bca43ff4b665bb3fb28eed6dad060d2ed5df7b795fdb835a7e5537fc", "c2bd625025d76e048a9111991bdbfee6", 3),
(null, "4", "4f86e21b2e8e4f32c60d371de0c40d13d94ae7d925f1f5e23f38c50994ab0c37", "259b3c12699d13852e7ca3a8ccb17da8", 4),
(null, "5", "67077d5e16c61b1712eba08c903377b77362e61713c0437365adf26e6f01b7b9", "b8c4dcecaafe9157eb3cdf19fcec4de7", 5);

insert into insurance_company
values
(null, "Hypova"),
(null, "Omniyo"),
(null, "Amosis");

insert into insurance
values
(null, 1, "Enose"),
(null, 2, "Centigen"),
(null, 3, "Parare"),
(null, 3, "Univee"),
(null, 1, "Vicelia"),
(null, 3, "Aurill");

insert into patient
values
(null, "Lloyd", "Breanna", 1, "HE7353", 1),
(null, "Fuller", "Abi", 2, "OC7688", 1),
(null, "Howard", "Caius", 1, "HE6095", 1),
(null, "Rivera", "Juliet", 3, "AP7765", 1),
(null, "McCartney", "Liya", 4, "AU2594", 2),
(null, "Randolph", "Clarice", 5, "HV7362", 1),
(null, "Stark", "Rebekka", 3, "AP7754", 1),
(null, "Mackay", "Elaina", 6, "AA4211", 3),
(null, "Molina", "Joao", 2, "OC7145", 1),
(null, "Sampson", "Aidan", 4, "AU3014", 3);

insert into service
values
(null, "Check Up"),
(null, "Treatment"),
(null, "Prescription"),
(null, "Referral");

insert into visit
values
(null, 6, curdate() - interval 1 day, 1, "C1"),
(null, 7, curdate() - interval 1 day, 2, "T2"),
(null, 7, curdate() - interval 1 day, 3, "P2"),
(null, 2, curdate() - interval 1 day, 1, "C3"),
(null, 2, curdate() - interval 1 day, 2, "T3"),
(null, 2, curdate() - interval 1 day, 3, "P3"),
(null, 2, curdate() - interval 1 day, 4, "R3"),
(null, 2, curdate(), 1, "C4"),
(null, 2, curdate(), 3, "P4");

insert into queue
values
(null, curdate() - interval 1 day, 1, 6, "Finished"),
(null, curdate() - interval 1 day, 2, 4, "Canceled"),
(null, curdate() - interval 1 day, 2, 7, "Finished"),
(null, curdate() - interval 1 day, 3, 1, "Canceled"),
(null, curdate() - interval 1 day, 4, 2, "Finished"),
(null, curdate(), 1, 2, "Finished"),
(null, curdate(), 2, 9, "Canceled"),
(null, curdate(), 1, 5, "Waiting"),
(null, curdate(), 3, 8, "Calling"),
(null, curdate(), 4, 7, "In Progress"),
(null, curdate(), 4, 6, "In Progress");