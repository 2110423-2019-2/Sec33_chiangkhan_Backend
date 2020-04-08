CREATE DATABASE chiangkhan;
\c chiangkhan

CREATE TABLE member (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  password VARCHAR(100),
  email VARCHAR(50),
  address TEXT,
  phone VARCHAR(20),
  bankaccount VARCHAR(150),
  driving_license TEXT,
  credit_card TEXT,
  cash INT DEFAULT 1000
);

CREATE TABLE car (
  car_id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES member(user_id) NOT NULL,
  licenseplate VARCHAR(30),
  capacity INT,
  car_model VARCHAR(20),
  car_description TEXT,
  avg_rating INT,
  photo_of_car_document TEXT,
  car_type TEXT DEFAULT 'personal',
  is_in_use BOOLEAN DEFAULT FALSE
);

CREATE TABLE car_available (
  car_available_id SERIAL PRIMARY KEY,
  car_id INT REFERENCES car(car_id) NOT NULL,
  pickup_location POINT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  price INT DEFAULT 900,
  agreement TEXT DEFAULT 'DO NOT STEAL MY CAR'
);

CREATE TABLE car_reservation (
  car_reservation_id SERIAL PRIMARY KEY,
  car_available_id INT REFERENCES car_available(car_available_id) NOT NULL,
  lessee_id INT REFERENCES member(user_id) NOT NULL,
  status TEXT,
  pickup_date TIMESTAMP,
  return_date TIMESTAMP,
  return_location POINT
);