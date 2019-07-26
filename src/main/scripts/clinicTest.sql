drop schema if exists clinic_test;
create schema clinic_test;
use clinic_test;

create table staff (
    id int not null auto_increment,
    last_name varchar(50) not null,
    first_name varchar(50) not null,
    date_of_birth varchar(50) not null,
    address varchar(50) not null,
    phone_number int not null,
    job varchar(50) not null,
    primary key (id)
);

create table user (
    id int not null auto_increment,
    username varchar(50) not null unique,
    password text not null,
    salt varchar(50) not null unique,
    access varchar(50) not null unique,
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
    name varchar(50) not null,
    primary key (id),
    foreign key (insurance_company_fk) references insurance_company(id)
);

create table patient (
	id int not null auto_increment,
    last_name varchar(50) not null,
    first_name varchar(50) not null,
    date_of_birth varchar(50) not null,
    address varchar(50) not null,
    phone_number int not null,
    insurance_fk int not null,
    insurance_number varchar(50) not null unique,
    primary key (id),
    foreign key (insurance_fk) references insurance(id)
);

create table visit (
	id int not null auto_increment,
    patient_fk int not null,
    date date not null,
    anamnesis text not null,
    primary key (id),
    foreign key (patient_fk) references patient(id)
);

create table queue (
    id int not null auto_increment,
    date date not null,
    patient_fk int not null,
    priority boolean not null,
    status varchar(50) not null,
    primary key (id),
    foreign key (patient_fk) references patient(id)
);

insert into staff
values
(null, "Hoffman", "Jarrad", "1987-07-03", "Sunset Drive 92", 8420014, "Doctor"),
(null, "Irwin", "Isabel", "1983-05-16", "New Street 22", 8605834, "Nurse"),
(null, "Aldred", "Myla", "1988-10-27", "Walnut Avenue 12", 8204893, "Doctor"),
(null, "McDowell", "Mohammed", "1980-03-29", "Hickory Lane 13", 8451294, "Doctor"),
(null, "Bassett", "Hussein", "1983-08-04", "Smith Street 62", 8008465, "Nurse");

insert into user
values
(null, "1", "2a4faaae91fc288f73887053158a8699dbe8c34f5fa36d7162b847506cb7377a", "466e13e6101ad461359cbef495dbdb13", "466e13e6101ad461359cbef495dbdb13", 1),
(null, "2", "968269c1823bfcb95eb3561fd4668fdcef2df49b4dae8787151db299736b1466", "9cfba1e8d299cfad1ed49d732bd0cb84", "9cfba1e8d299cfad1ed49d732bd0cb84", 2),
(null, "3", "2918fd70bca43ff4b665bb3fb28eed6dad060d2ed5df7b795fdb835a7e5537fc", "c2bd625025d76e048a9111991bdbfee6", "c2bd625025d76e048a9111991bdbfee6", 3),
(null, "4", "4f86e21b2e8e4f32c60d371de0c40d13d94ae7d925f1f5e23f38c50994ab0c37", "259b3c12699d13852e7ca3a8ccb17da8", "259b3c12699d13852e7ca3a8ccb17da8", 4),
(null, "5", "67077d5e16c61b1712eba08c903377b77362e61713c0437365adf26e6f01b7b9", "b8c4dcecaafe9157eb3cdf19fcec4de7", "b8c4dcecaafe9157eb3cdf19fcec4de7", 5);

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
(null, "Lloyd", "Breanna", "1989-11-30", "3rd Street 13", 8883694, 1, "HE7353"),
(null, "Fuller", "Abi", " 1990-01-17", "Grove Avenue 13", 8994695, 2, "OC7688"),
(null, "Howard", "Caius", "1987-03-13", "Pearl Street 18", 7071387, 1, "HE6095"),
(null, "Rivera", "Juliet", "1984-10-01", "Wall Street 78", 7539392, 3, "AP7765"),
(null, "McCartney", "Liya", "1986-03-29", "Cherry Lane 95", 8183489, 4, "AU2594"),
(null, "Randolph", "Clarice", "1990-11-15", "Mill Street 73", 8092020, 5, "HV7362"),
(null, "Stark", "Rebekka", "1987-04-22", "7th Avenue 39", 8661802, 3, "AP7754"),
(null, "Mackay", "Elaina", "1981-04-26", "Forest Street 12", 7719159, 6, "AA4211"),
(null, "Molina", "Joao", "1982-02-28", "Woodland Road 68", 7095340, 2, "OC7145"),
(null, "Sampson", "Aidan", "1980-10-14", "Inverness Drive 89", 7568359, 4, "AU3014");

insert into visit
values
(null, 6, curdate() - interval 1 day, "C1"),
(null, 7, curdate() - interval 1 day, "T2, P2"),
(null, 2, curdate() - interval 1 day, "C3, T3, P3, R3"),
(null, 4, curdate() - interval 1 day, "C4, T4, P4, R4"),
(null, 2, curdate(), "C5, P5"),
(null, 9, curdate(), "T6, P6, R6");

insert into queue
values
(null, curdate() - interval 1 day, 6, false, "Finished"),
(null, curdate() - interval 1 day, 4, true, "Canceled"),
(null, curdate() - interval 1 day, 7, true, "Finished"),
(null, curdate() - interval 1 day, 1, false, "Canceled"),
(null, curdate() - interval 1 day, 2, false, "Finished"),
(null, curdate() - interval 1 day, 4, false, "Finished"),
(null, curdate(), 2, false, "Finished"),
(null, curdate(), 9, false, "Finished"),
(null, curdate(), 5, false, "Canceled"),
(null, curdate(), 8, false, "Waiting"),
(null, curdate(), 7, true, "Waiting"),
(null, curdate(), 6, false, "Waiting");