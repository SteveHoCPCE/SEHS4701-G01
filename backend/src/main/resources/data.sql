-- Seed data for EV Seminar Registration System
-- Using INSERT IGNORE for idempotent re-runs

-- Vehicles (5 Chinese EV models)
INSERT IGNORE INTO vehicle (id, model_number, description, picture_url, features, unit_price) VALUES
(1, 'BYD-SEAL', 'BYD Seal - Premium Electric Sedan', 'https://example.com/images/byd-seal.jpg',
 'Blade Battery Technology, 0-100km/h in 3.8s, 700km Range, Intelligent Driving Assistance, 15.6" Rotating Display',
 268800.00),
(2, 'NIO-ET7', 'NIO ET7 - Luxury Smart Electric Sedan', 'https://example.com/images/nio-et7.jpg',
 '150kWh Solid-State Battery, 1000km Range, NIO Autonomous Driving (NAD), Battery Swap Technology, NOMI AI Assistant',
 448000.00),
(3, 'XPENG-G9', 'XPeng G9 - Flagship Smart SUV', 'https://example.com/images/xpeng-g9.jpg',
 'XNGP Advanced Driving, 800V SiC Platform, 5-minute 200km Fast Charge, Xopera 5D Music Cockpit, Dual-chamber Air Suspension',
 309900.00),
(4, 'LI-MEGA', 'Li Auto MEGA - Premium Family MPV', 'https://example.com/images/li-mega.jpg',
 '5C Ultra-Fast Charging, 710km CLTC Range, Flagship Refrigerator-Seat Comfort, Mind GPT AI, Highway NOA',
 559800.00),
(5, 'ZEEKR-001', 'Zeekr 001 - High-Performance Shooting Brake', 'https://example.com/images/zeekr-001.jpg',
 'Dual Motor AWD 544hp, WE Edition SEA Platform, CTC Battery Integration, Mobileye SuperVision, Yamaha Audio System',
 269000.00);

-- Seminars (7 upcoming seminars with different dates and seat limits)
INSERT IGNORE INTO seminar (id, vehicle_id, seminar_date, max_seats) VALUES
(1, 1, '2026-05-10 14:00:00', 30),
(2, 2, '2026-05-15 10:00:00', 20),
(3, 3, '2026-05-20 14:00:00', 25),
(4, 4, '2026-05-25 10:00:00', 15),
(5, 5, '2026-06-01 14:00:00', 30),
(6, 1, '2026-06-10 10:00:00', 20),
(7, 3, '2026-06-15 14:00:00', 25);
