import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sempre Studios",
  description: "Privacy policy for Sempre Studios.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Back to home
        </Link>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mb-12 text-muted-foreground">Last updated: February 2, 2025</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sempre Studios respects your privacy. This policy describes how we collect,
              use, and protect your information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect information you provide directly (e.g. when you contact us or
              submit a form), usage data (e.g. pages visited, referring URLs), and
              technical data (e.g. browser type, IP address) via cookies and similar
              technologies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to operate and improve our services,
              respond to your inquiries, send relevant updates (with your consent), and
              analyze site usage. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Cookies & Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies, including Google Analytics, to
              understand how visitors use our site. You can control cookie preferences
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy, please contact us through
              our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
