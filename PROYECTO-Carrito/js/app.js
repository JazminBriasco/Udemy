//Queries importantes

CREATE TABLE escuelas(
	id_escuela int auto_increment,
	nombre VARCHAR(50) unique,
	cantidad_alumnos int,
	CONSTRAINT PK_id_escuela primary key(id_escuela).
	CONSTRAINT CK_restriccion_id CHECK cantidad_alumnos >= 0
);


ALTER TABLE escuelas ADD id_localidad int;
ALTER TABLE escuelas ADD FK_id_localidad foreign key(id_localidad) REFERENCES localidades(id_localidad);

UPDATE escuelas SET id_localidad = 7600 WHERE id_escuela = 1;
UPDATE escuelas SET id_localidad = 8900 WHERE id_escuela = 2;






create table equipos(
	id_equipo int unsigned auto_increment,
	nombre_equipo varchar(50),
	constraint pk_equipos primary key (id_equipo)
);

create table jugadores(
	id_jugador int unsigned auto_increment,
	id_equipo int unsigned,
	nombre_jugador varchar(50),
	apellido varchar (50),
	constraint pk_id_jugador primary key (id_jugador),
	constraint fk_id_equipo foreign key (id_equipo) references equipos (id_equipo)
);

create table partidos(
	id_partido int unsigned auto_increment,
	id_equipo_local int unsigned,
	id_equipo_visitante int unsigned,
	fecha datetime,
	constraint pk_id_partido primary key (id_partido),
	constraint fk_local foreign key (id_equipo_local) references equipos (id_equipo),
	constraint fk_visitante foreign key (id_equipo_visitante) references equipos (id_equipo),
	constraint check (id_equipo_local <> id_equipo_visitante)
);

create table jugadores_x_equipo_x_partido(
	id_jugador int unsigned,
	id_partido int unsigned,
	puntos int unsigned,
	rebotes int unsigned,
	asistencias int unsigned,
	minutos int unsigned,
	faltas int unsigned,
	constraint pk_jugador_partido primary key (id_jugador, id_partido),
	constraint fk_id_jugador foreign key (id_jugador) references jugadores (id_jugador),
	constraint fk_id_partido foreign key (id_partido) references partidos (id_partido)
);
