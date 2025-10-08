CREATE TABLE IF NOT EXISTS student (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  year INTEGER,
  boxno INTEGER,
	seq   integer,
	cont_cnt integer,
	cont_detl TEXT,
	file_state TEXT
);

insert into student values(11,'amin','2000',1,23,3,'crt1 crt2','in order');
insert into student values(12,'namdia','2012',24,3,3,'crt1 crt2','in order');
insert into student values(13,'asma','2002',2,25,3,'crt1 crt2','in order');
insert into student values(14,'reem','2009',4,26,3,'crt1 crt2','in order');
insert into student values(15,'ali','2010',5,28,3,'crt1 crt2','in order');

insert into student (name, year, boxno, seq, cont_cnt, cont_detl, file_state) 
values('alzahra','207',11,12,3,'crt1 crt2','in order');


