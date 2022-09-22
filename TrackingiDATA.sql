DROP DATABASE IF EXISTS trackingiDATA;

CREATE DATABASE trackingiDATA;

USE trackingiDATA;


CREATE TABLE trackingiDATA.tracking (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  awb TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  flight_no	TEXT NOT NULL,
  etd TEXT NOT NULL,
  eta TEXT NOT NULL,
  actual_p TEXT NOT NULL,
  actual_k TEXT NOT NULL,
  consultation_date TEXT NOT NULL,
  last_update TEXT NOT NULL,
  type_company TEXT NOT NULL
);
