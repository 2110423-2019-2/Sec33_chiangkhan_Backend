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

CREATE TABLE cardeal (
  car_deal_id SERIAL PRIMARY KEY,
  car_id INT REFERENCES car(car_id),
  car_info TEXT, 
  priceperday INT,
  rating INT,
  available_start_date DATE,
  available_end_date DATE,
  pickup_province TEXT,
  lessee_id INT REFERENCES member(user_id),
  lesseor_id INT REFERENCES member(user_id)
);