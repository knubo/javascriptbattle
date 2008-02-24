create table jsb_user(
  username varchar(25) PRIMARY KEY,
  pass varchar(15),
  person INT(11) unsigned,
  readonly tinyint,
  reducedwrite tinyint

);

create table jsb_brains(
  owner varchar(25),
  name varchar(20) primary key,
  created date,
  bot text
);
