import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OtpEmailProps {
  name: string;
  otp: string;
}

export const OtpEmail: React.FC<OtpEmailProps> = ({ name, otp }) => {
  const digits = otp.split("");

  return (
    <Html lang="en">
      <Head />
      <Preview>Your Nagana Media verification code: {otp}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Heading style={styles.mainHeading}>Nagana Media</Heading>
          </Section>

          {/* Accent bar */}
          <Section style={styles.accentBar} />

          {/* Content */}
          <Section style={styles.content}>
            <Heading style={styles.heading}>Verify your email</Heading>

            <Text style={styles.text}>Hi {name},</Text>

            <Text style={styles.text}>
              Use the code below to verify your email address and submit your AI
              SEO Audit request. This code expires in <strong>5 minutes</strong>
              .
            </Text>

            {/* OTP digits */}
            <Section style={styles.otpRow}>
              {digits.map((digit, i) => (
                <span key={i} style={styles.otpDigit}>
                  {digit}
                </span>
              ))}
            </Section>

            <Text style={styles.hint}>
              If you did not request this, you can safely ignore this email.
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              <Link
                href="https://www.naganamedia.com"
                style={styles.footerLink}
              >
                naganamedia.com
              </Link>
              {"  ·  "}
              <Link
                href="https://www.linkedin.com/company/nagana-media-tech/"
                style={styles.footerLink}
              >
                LinkedIn
              </Link>
            </Text>
            <Text style={styles.footerMuted}>
              © {new Date().getFullYear()} Nagana Media. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpEmail;

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    maxWidth: "580px",
    margin: "0 auto",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  header: {
    backgroundColor: "#0c1323",
    padding: "24px 32px",
  },
  logo: {
    display: "block",
  },
  accentBar: {
    backgroundColor: "#38bfea",
    height: "4px",
    width: "100%",
  },
  content: {
    padding: "36px 32px 28px",
  },
  mainHeading: {
    color: "#FFFFFF",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "1.3",
    margin: "0 0 24px",
  },
  heading: {
    color: "#0c1323",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "1.3",
    margin: "0 0 24px",
  },
  text: {
    color: "#374151",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: "0 0 16px",
  },
  otpRow: {
    textAlign: "center" as const,
    margin: "28px 0",
  },
  otpDigit: {
    display: "inline-block",
    width: "48px",
    height: "56px",
    lineHeight: "56px",
    textAlign: "center" as const,
    fontSize: "28px",
    fontWeight: "700",
    color: "#0c1323",
    backgroundColor: "#f0fbff",
    border: "2px solid #38bfea",
    borderRadius: "8px",
    margin: "0 4px",
  },
  hint: {
    color: "#9ca3af",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "16px 0 0",
  },
  divider: {
    borderColor: "#e5e7eb",
    margin: "0 32px",
  },
  footer: {
    padding: "20px 32px 28px",
  },
  footerText: {
    color: "#6b7280",
    fontSize: "13px",
    margin: "0 0 6px",
  },
  footerLink: {
    color: "#38bfea",
    textDecoration: "none",
  },
  footerMuted: {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "1.6",
    margin: "0 0 4px",
  },
};
