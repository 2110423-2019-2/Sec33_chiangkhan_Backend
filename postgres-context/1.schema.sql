CREATE DATABASE chiangkhan;
\c chiangkhan

CREATE TABLE member (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  email TEXT,
  address TEXT,
  phone TEXT,
  bankaccount TEXT,
  driving_license TEXT,
  credit_card TEXT
);

CREATE TABLE car (
  car_id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES member(user_id),
  licenseplate TEXT,
  capacity INT,
  car_model TEXT,
  car_description TEXT,
  avg_rating INT,
  photo_of_car_document TEXT,
  car_type TEXT DEFAULT 'personal'
);

CREATE TABLE car_available (
  car_available_id SERIAL PRIMARY KEY,
  car_id INT REFERENCES car(car_id),
  pickup_location POINT,
  start_date TIMESTAMP,
  end_date TIMESTAMP
);

CREATE TABLE car_reservation (
  car_reservation_id SERIAL PRIMARY KEY,
  car_available_id INT REFERENCES car_available(car_available_id),
  status TEXT,
  pickup_date DATE,
  return_date DATE,
  return_location POINT
);