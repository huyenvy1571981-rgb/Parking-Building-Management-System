# Parking Building Management System ERD

## USER
- user_id
- full_name
- email
- password
- role_id

## ROLE
- role_id
- role_name

## VEHICLE
- vehicle_id
- license_plate
- user_id

## PARKING_SLOT
- slot_id
- slot_code
- status
- zone_id

## PARKING_ZONE
- zone_id
- zone_name

## RESERVATION
- reservation_id
- user_id
- slot_id
- reservation_time

## PAYMENT
- payment_id
- reservation_id
- amount
- payment_method
