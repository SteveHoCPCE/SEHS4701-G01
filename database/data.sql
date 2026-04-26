-- SEHS4701 EV Seminar Registration System - Seed Data
USE sehs4701;

-- Vehicles (5 Chinese EV models)
INSERT IGNORE INTO vehicle (id, model_number, description, picture_url, features, unit_price) VALUES
(1, 'BYD-SEAL', 'BYD Seal - Premium Electric Sedan',
 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
 'Blade Battery Technology, 0-100km/h in 3.8s, 700km Range, Intelligent Driving Assistance, 15.6" Rotating Display',
 268800.00),
(2, 'NIO-ET7', 'NIO ET7 - Luxury Smart Electric Sedan',
 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
 '150kWh Solid-State Battery, 1000km Range, NIO Autonomous Driving (NAD), Battery Swap Technology, NOMI AI Assistant',
 448000.00),
(3, 'XPENG-G9', 'XPeng G9 - Flagship Smart SUV',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2022_XPeng_G9_%28front%29.jpg/1280px-2022_XPeng_G9_%28front%29.jpg',
 'XNGP Advanced Driving, 800V SiC Platform, 5-minute 200km Fast Charge, Xopera 5D Music Cockpit',
 309900.00),
(4, 'LI-MEGA', 'Li Auto MEGA - Premium Family MPV',
 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
 '5C Ultra-Fast Charging, 710km CLTC Range, Flagship Refrigerator-Seat Comfort, Mind GPT AI, Highway NOA',
 559800.00),
(5, 'ZEEKR-001', 'Zeekr 001 - High-Performance Shooting Brake',
 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
 'Dual Motor AWD 544hp, WE Edition SEA Platform, CTC Battery Integration, Mobileye SuperVision, Yamaha Audio System',
 269000.00);

-- Refresh picture URLs for existing rows (so old example.com URLs are replaced)
UPDATE vehicle SET picture_url = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80' WHERE id = 1;
UPDATE vehicle SET picture_url = 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80' WHERE id = 2;
UPDATE vehicle SET picture_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2022_XPeng_G9_%28front%29.jpg/1280px-2022_XPeng_G9_%28front%29.jpg', features = 'XNGP Advanced Driving, 800V SiC Platform, 5-minute 200km Fast Charge, Xopera 5D Music Cockpit' WHERE id = 3;
UPDATE vehicle SET picture_url = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80' WHERE id = 4;
UPDATE vehicle SET picture_url = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80' WHERE id = 5;

-- Seminars (7 upcoming seminars)
INSERT IGNORE INTO seminar (id, vehicle_id, seminar_date, max_seats) VALUES
(1, 1, '2026-05-10 14:00:00', 30),
(2, 2, '2026-05-15 10:00:00', 2),
(3, 3, '2026-05-20 14:00:00', 25),
(4, 4, '2026-05-25 10:00:00', 15),
(5, 5, '2026-06-01 14:00:00', 30),
(6, 1, '2026-06-10 10:00:00', 20),
(7, 3, '2026-06-15 14:00:00', 25);
