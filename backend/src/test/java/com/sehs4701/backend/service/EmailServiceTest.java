package com.sehs4701.backend.service;

import com.sehs4701.backend.entity.EmailLog;
import com.sehs4701.backend.repository.EmailLogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private EmailLogRepository emailLogRepository;

    @Test
    void sendVerificationEmailUsesSenderAsFromAndRequestEmailAsRecipient() {
        EmailService emailService = new EmailService(mailSender, emailLogRepository);
        ReflectionTestUtils.setField(emailService, "fromAddress", "sender@gmail.com");

        emailService.sendVerificationEmailOrThrow(" New.User@Example.COM ", "123456");

        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(messageCaptor.capture());
        SimpleMailMessage message = messageCaptor.getValue();

        assertEquals("sender@gmail.com", message.getFrom());
        assertArrayEquals(new String[]{"new.user@example.com"}, message.getTo());
        ArgumentCaptor<EmailLog> logCaptor = ArgumentCaptor.forClass(EmailLog.class);
        verify(emailLogRepository).save(logCaptor.capture());
        assertEquals("new.user@example.com", logCaptor.getValue().getRecipient());
        assertEquals("MembershipVerification", logCaptor.getValue().getEmailType());
        assertEquals("SUCCESS", logCaptor.getValue().getStatus());
    }
}
