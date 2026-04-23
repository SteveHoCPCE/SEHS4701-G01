package com.sehs4701.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendVerificationEmail(String to, String otpCode) {
        sendEmail(to, "Email Verification - EV Seminar Registration",
                "Welcome to the EV Seminar Registration System!\n\n" +
                "Your verification code is: " + otpCode + "\n\n" +
                "This code will expire in 5 minutes.\n" +
                "Please enter this code to verify your email address.");
    }

    @Async
    public void sendRegistrationSuccess(String to, String customerName) {
        sendEmail(to, "Registration Successful - EV Seminar Registration",
                "Dear " + customerName + ",\n\n" +
                "Your membership registration has been completed successfully.\n" +
                "You can now login with your email to register for EV seminars.\n\n" +
                "Thank you for joining us!");
    }

    @Async
    public void sendSeminarRegistrationSuccess(String to, String customerName, String vehicleModel, String seminarDate, int seats) {
        sendEmail(to, "Seminar Registration Confirmed",
                "Dear " + customerName + ",\n\n" +
                "Your seminar registration has been confirmed with status: SUCCESS\n\n" +
                "Details:\n" +
                "- Vehicle: " + vehicleModel + "\n" +
                "- Date: " + seminarDate + "\n" +
                "- Seats Booked: " + seats + "\n\n" +
                "We look forward to seeing you!");
    }

    @Async
    public void sendSeminarRegistrationWait(String to, String customerName, String vehicleModel, String seminarDate, int seats) {
        sendEmail(to, "Seminar Registration - Waitlisted",
                "Dear " + customerName + ",\n\n" +
                "Your seminar registration has been placed on the waitlist.\n\n" +
                "Details:\n" +
                "- Vehicle: " + vehicleModel + "\n" +
                "- Date: " + seminarDate + "\n" +
                "- Seats Requested: " + seats + "\n\n" +
                "You will be notified if a spot becomes available.");
    }

    @Async
    public void sendCancellationNotice(String to, String customerName, String vehicleModel, String seminarDate) {
        sendEmail(to, "Seminar Registration Cancelled",
                "Dear " + customerName + ",\n\n" +
                "Your seminar registration has been cancelled.\n\n" +
                "Details:\n" +
                "- Vehicle: " + vehicleModel + "\n" +
                "- Date: " + seminarDate + "\n\n" +
                "If this was a mistake, please register again.");
    }

    @Async
    public void sendWaitlistPromotion(String to, String customerName, String vehicleModel, String seminarDate, int seats) {
        sendEmail(to, "Seminar Registration - You're In!",
                "Dear " + customerName + ",\n\n" +
                "Great news! Your registration status has been upgraded from WAIT to SUCCESS.\n\n" +
                "Details:\n" +
                "- Vehicle: " + vehicleModel + "\n" +
                "- Date: " + seminarDate + "\n" +
                "- Seats Confirmed: " + seats + "\n\n" +
                "We look forward to seeing you!");
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            log.info("Email sent to {} with subject: {}", to, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }
}
