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
import { logo } from "public/assets/static";
import * as React from "react";

interface AiSeoAuditEmailProps {
  name: string;
  companyWebsite: string;
}

export const AiSeoAuditEmail: React.FC<AiSeoAuditEmailProps> = ({
  name,
  companyWebsite,
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        We&apos;ve received your AI SEO Audit request - Nagana Media
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Heading style={styles.mainHeading}>Nagana Media</Heading>
          </Section>

          {/* Top accent bar */}
          <Section style={styles.accentBar} />

          {/* Content */}
          <Section style={styles.content}>
            <Heading style={styles.heading}>
              AI SEO audit request for{" "}
              {new URL(companyWebsite).hostname.replace("www.", "")}
            </Heading>

            <Text style={styles.text}>Dear {name},</Text>

            <Text style={styles.text}>
              Thank you for reaching out to Nagana Media.
            </Text>

            <Text style={styles.text}>
              We&apos;re pleased to confirm that we have successfully received
              your request for an AI SEO Audit. Our team is currently reviewing
              the information you provided and will begin assessing your
              website&apos;s SEO performance, AI search visibility, content
              optimization opportunities, and overall digital presence.
            </Text>

            <Text style={styles.text}>
              If you have any questions in the meantime, simply reply to this
              email and we&apos;ll be happy to assist.
            </Text>

            <Text style={styles.text}>
              Best regards,
              <br />
              <strong>The Nagana Media Team</strong>
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
            <Text style={styles.footerMuted}>
              You are receiving this email because you submitted an AI SEO Audit
              request at naganamedia.com.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AiSeoAuditEmail;

// ─── styles ──────────────────────────────────────────────────────────────────
// Brand colour from globals.css: hsl(196 86% 62%) ≈ #38bfea

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
  highlightBox: {
    backgroundColor: "#f0fbff",
    borderLeft: "4px solid #38bfea",
    borderRadius: "4px",
    padding: "16px 20px",
    margin: "24px 0",
  },
  highlightHeading: {
    color: "#0c1323",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    margin: "0 0 12px",
  },
  highlightItem: {
    color: "#374151",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 8px",
  },
  dot: {
    color: "#38bfea",
    marginRight: "8px",
    fontSize: "10px",
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
