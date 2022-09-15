use newhire;

drop table auth;
create table auth(
    id INT(11) primary key NOT NULL AUTO_INCREMENT,
    name VARCHAR(25),
    description VARCHAR(100)
);

drop table users;
create table users(
    id INT(11) primary key NOT NULL AUTO_INCREMENT,
    auth_id INT(11),
    foreign key(auth_id) references auth(id),
    name VARCHAR(25) UNIQUE,
    pwd VARCHAR(50)
);

drop table video;
create table video(
    id INT(11) primary key NOT NULL AUTO_INCREMENT,
    uploader_id INT(11),
    foreign key(uploader_id) references users(id),
    name VARCHAR(25),
    filehash VARCHAR(36) UNIQUE,
    pic VARCHAR(200),
    url VARCHAR(200),
    upload_date DATETIME
);

drop table favorite;
create table favorite(
    id INT(11) primary key NOT NULL AUTO_INCREMENT,
    user_id INT(11),
    foreign key(user_id) references users(id),
    video_id INT(11),
    foreign key(video_id) references video(id)
);

insert into auth(name, description) values(
    'read', 'Normal, can only watch videos'
),(
    'admin', 'Admin, have all auth & can set auth'
);

insert into users(auth_id, name, pwd) values(
    1, 'Jim', '91ffa436a58a4f38b8f1661d1a389f7c'
),(
    3, 'Sam', '9c22a2e5ffc0933e34bc311a1328088e'
);

insert into favorite(user_id, video_id) values(
    1, 1
);

insert into video(uploader_id, name, filehash, upload_date) values(
    2, 'test', '91ffa436a58a4f38b8f1661d1a389f7c', now()
);