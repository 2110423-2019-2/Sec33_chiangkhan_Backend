\c chiangkhan

/* prevent car_reservation of timeslot that has started, full, and overlaps */ 
CREATE OR REPLACE FUNCTION is_reservable() RETURNS TRIGGER AS
$BODY$
DECLARE

  timeslot_overlaps INT;
  is_applicable BOOLEAN;
  
BEGIN

  SELECT (NEW.pickup_date >= A.start_date) AND (NEW.return_date <= A.end_date)
  INTO is_applicable
  FROM car_available A
  WHERE A.car_available_id = NEW.car_available_id;

  SELECT COUNT(*)
  INTO timeslot_overlaps
  FROM car_reservation R
  WHERE NEW.lessee_id = R.lessee_id 
    AND (NEW.pickup_date, NEW.return_date) OVERLAPS (R.pickup_date, R.return_date);
  
  IF NOT(is_applicable) THEN
    RAISE EXCEPTION 'pickupDate and returnDate did not applicable with this availability';
  END IF;

  IF NOT(timeslot_overlaps = 0) THEN
    RAISE EXCEPTION 'pickupDate and returnDate is overlaps on prior reservation';
  END IF;

  RETURN NEW;

END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER befor_insert_reservation_trigger BEFORE INSERT ON car_reservation
FOR EACH ROW EXECUTE PROCEDURE is_reservable();