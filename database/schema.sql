-- SEHS4701 EV Seminar Registration System - Database Schema
-- MySQL Database

CREATE DATABASE IF NOT EXISTS sehs4701;
USE sehs4701;

-- Customer table
CREATE TABLE IF NOT EXISTS customer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    customer_type ENUM('COMPANY', 'PERSONAL') NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Email verification table
CREATE TABLE IF NOT EXISTS email_verification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

-- Email acknowledgement log table
CREATE TABLE IF NOT EXISTS email_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recipient VARCHAR(255) NOT NULL,
    email_type VARCHAR(50) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    body TEXT,
    status VARCHAR(20) NOT NULL,
    error_message TEXT,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle table
CREATE TABLE IF NOT EXISTS vehicle (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    model_number VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    picture_url VARCHAR(500),
    features TEXT,
    unit_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seminar table
CREATE TABLE IF NOT EXISTS seminar (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    seminar_date DATETIME NOT NULL,
    max_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
);

-- Registration table
CREATE TABLE IF NOT EXISTS registration (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    seminar_id BIGINT NOT NULL,
    seats_booked INT NOT NULL CHECK (seats_booked BETWEEN 1 AND 2),
    status ENUM('SUCCESS', 'WAIT', 'CANCEL') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (seminar_id) REFERENCES seminar(id)
);

-- Indexes for performance
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_seminar_date ON seminar(seminar_date);
CREATE INDEX idx_registration_customer ON registration(customer_id);
CREATE INDEX idx_registration_seminar ON registration(seminar_id);
CREATE INDEX idx_registration_status ON registration(status);
CREATE INDEX idx_email_log_recipient ON email_log(recipient);
CREATE INDEX idx_email_log_type ON email_log(email_type);
