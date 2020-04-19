CREATE DATABASE chiangkhan;
\c chiangkhan

CREATE TABLE member (
  user_id SERIAL PRIMARY KEY,
  name TEXT,
  username TEXT UNIQUE,
  password VARCHAR(100),
  email VARCHAR(50),
  address TEXT,
  phone_num VARCHAR(20),
  bank_account VARCHAR(150),
  bank_account_branch VARCHAR(150),
  driving_license TEXT,
  credit_card_number TEXT,
  credit_card_security TEXT,
  credit_card_expiry TEXT,
  cash INT DEFAULT 10000,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL
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
  car_id INT REFERENCES car(car_id) ON DELETE CASCADE,
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

CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES member(user_id) NOT NULL,
  car_id INT REFERENCES car(car_id) NOT NULL,
  comment TEXT,
  rating INT
);
