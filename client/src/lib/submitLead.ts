/**
 * submitLead.ts
 *
 * Centralised lead-submission utility for all three form types:
 *   - Consumer estimate requests  (ConsumerForm)
 *   - B2B / business inquiries    (B2BForm)
 *   - Urgent same-day requests    (UrgentForm)
 *
 * How it works
 * ─────────────
 * 1. Primary:  POST to VITE_LEADS_ENDPOINT (your own backend / Cloudflare Worker / n8n webhook).
 * 2. Fallback: POST to Formspree (VITE_FORMSPREE_ID) if the primary endpoint is not configured.
 *
 * Environment variables (set in .env or Cloudflare Pages → Settings → Environment variables):
 *   VITE_LEADS_ENDPOINT   – Full URL of your lead-capture API, e.g. https://api.mgsalvage.com/leads
 *   VITE_FORMSPREE_ID     – Formspree form ID, e.g. xpwzgkqr  (sign up free at formspree.io)
 *
 * If neither variable is set the function throws so the form shows a user-friendly error.
 */

export interface LeadPayload {
  // Identity
  name: string;
  phone: string;
  email?: string;
  city?: string;

  // Vehicle (consumer forms)
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleCondition?: string;
  titleStatus?: string;
  notes?: string;

  // Business fields (B2B form)
  businessName?: string;
  businessType?: string;
  vehicleCount?: string;
  pickupTiming?: string;
  vehicleTypes?: string;

  // Urgent form
  vehicleAccessibility?: string;
  needPickupToday?: string;

  // Metadata (always set by the form)
  source: string;
  leadType: "consumer" | "b2b" | "urgent";
  submittedAt: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const primaryEndpoint = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

  if (primaryEndpoint) {
    // ── Option A: Your own backend / Cloudflare Worker / n8n webhook ──────────
    const response = await fetch(primaryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Lead submission failed (${response.status}): ${text}`);
    }
    return;
  }

  if (formspreeId) {
    // ── Option B: Formspree fallback ──────────────────────────────────────────
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        // Formspree uses _subject for email subject line
        _subject: `🔥 New ${payload.leadType.toUpperCase()} Lead — ${payload.name} (${payload.city || "Unknown City"})`,
        // Disable Formspree's default redirect
        _next: "https://mgsalvage.com/thank-you",
      }),
    });

    if (!response.ok) {
      const json = await response.json().catch(() => ({}));
      throw new Error(`Formspree submission failed: ${JSON.stringify(json)}`);
    }
    return;
  }

  // ── Neither configured ────────────────────────────────────────────────────
  throw new Error(
    "No lead endpoint configured. Set VITE_LEADS_ENDPOINT or VITE_FORMSPREE_ID in your environment variables."
  );
}
