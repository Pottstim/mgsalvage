import axios from "axios";
import type { Lead } from "../drizzle/schema";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "";

export async function sendLeadToN8n(lead: Lead): Promise<boolean> {
  if (!N8N_WEBHOOK_URL) {
    console.warn("[n8n] No webhook URL configured, skipping notification");
    return false;
  }

  try {
    const payload = {
      id: lead.id,
      leadType: lead.leadType,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      city: lead.city,
      notes: lead.notes,
      // Consumer fields
      vehicleYear: lead.vehicleYear,
      vehicleMake: lead.vehicleMake,
      vehicleModel: lead.vehicleModel,
      vehicleCondition: lead.vehicleCondition,
      titleStatus: lead.titleStatus,
      // B2B fields
      businessName: lead.businessName,
      contactName: lead.contactName,
      businessType: lead.businessType,
      vehicleCount: lead.vehicleCount,
      vehicleTypes: lead.vehicleTypes,
      pickupTiming: lead.pickupTiming,
      // Urgent fields
      vehicleAccessibility: lead.vehicleAccessibility,
      needPickupToday: lead.needPickupToday,
      // Meta
      source: lead.source,
      status: lead.status,
      createdAt: lead.createdAt,
      submittedAt: new Date().toISOString(),
    };

    await axios.post(N8N_WEBHOOK_URL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    console.log(`[n8n] Lead #${lead.id} (${lead.leadType}) sent to webhook`);
    return true;
  } catch (error) {
    console.error("[n8n] Failed to send lead to webhook:", error);
    return false;
  }
}
