import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock axios to intercept n8n webhook calls
vi.mock("axios", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ status: 200, data: { ok: true } }),
  },
}));

import axios from "axios";
const mockedPost = vi.mocked(axios.post);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

beforeEach(() => {
  mockedPost.mockClear();
});

describe("leads.submitConsumer", () => {
  it("accepts a valid consumer lead and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitConsumer({
      name: "John Doe",
      phone: "9195551234",
      email: "john@example.com",
      city: "Sanford",
      vehicleYear: "2008",
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      vehicleCondition: "runs",
      titleStatus: "clean",
      notes: "Test submission",
      source: "test",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBeDefined();
  });

  it("rejects a consumer lead without required phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submitConsumer({
        name: "John Doe",
        phone: "",
      })
    ).rejects.toThrow();
  });

  it("rejects a consumer lead without required name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.submitConsumer({
        name: "",
        phone: "9195551234",
      })
    ).rejects.toThrow();
  });
});

describe("leads.submitB2B", () => {
  it("accepts a valid B2B lead and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitB2B({
      businessName: "Joe's Auto Shop",
      contactName: "Joe Smith",
      phone: "9195559876",
      email: "joe@autoshop.com",
      city: "Fayetteville",
      businessType: "Mechanic Shop",
      vehicleCount: "5-10",
      vehicleTypes: "Sedans, trucks",
      pickupTiming: "Weekly",
      notes: "Test B2B",
      source: "test",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBeDefined();
  });

  it("tags mechanic shop leads as b2b-mechanic-shop", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitB2B({
      businessName: "Fix It Garage",
      contactName: "Mike",
      phone: "9195551111",
      businessType: "Mechanic Shop",
      source: "test",
    });

    expect(result.success).toBe(true);
    // The n8n webhook should have been called with the lead payload
    // Wait a tick for the async sendLeadToN8n to fire
    await new Promise((r) => setTimeout(r, 100));
    if (process.env.N8N_WEBHOOK_URL) {
      expect(mockedPost).toHaveBeenCalled();
      const payload = mockedPost.mock.calls[mockedPost.mock.calls.length - 1]?.[1];
      expect(payload?.leadType).toBe("b2b-mechanic-shop");
    }
  });

  it("tags auto body shop leads as b2b-auto-body-shop", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitB2B({
      businessName: "Collision Center",
      contactName: "Sarah",
      phone: "9195552222",
      businessType: "Auto Body Shop",
      source: "test",
    });

    expect(result.success).toBe(true);
    await new Promise((r) => setTimeout(r, 100));
    if (process.env.N8N_WEBHOOK_URL) {
      const payload = mockedPost.mock.calls[mockedPost.mock.calls.length - 1]?.[1];
      expect(payload?.leadType).toBe("b2b-auto-body-shop");
    }
  });

  it("tags used car dealer leads as b2b-used-car-dealer", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitB2B({
      businessName: "Quick Cars",
      contactName: "Tom",
      phone: "9195553333",
      businessType: "Used Car Dealer",
      source: "test",
    });

    expect(result.success).toBe(true);
    await new Promise((r) => setTimeout(r, 100));
    if (process.env.N8N_WEBHOOK_URL) {
      const payload = mockedPost.mock.calls[mockedPost.mock.calls.length - 1]?.[1];
      expect(payload?.leadType).toBe("b2b-used-car-dealer");
    }
  });
});

describe("leads.submitUrgent", () => {
  it("accepts a valid urgent lead and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submitUrgent({
      name: "Jane Doe",
      phone: "9195554321",
      city: "Pittsboro",
      vehicleAccessibility: "In driveway, keys available",
      needPickupToday: "yes",
      source: "test",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBeDefined();
  });
});

describe("n8n webhook integration", () => {
  it("has N8N_WEBHOOK_URL environment variable set", () => {
    const url = process.env.N8N_WEBHOOK_URL;
    expect(url).toBeDefined();
    expect(typeof url).toBe("string");
    expect(url!.length).toBeGreaterThan(0);
  });

  it("sends lead payload to n8n webhook on consumer submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.leads.submitConsumer({
      name: "Webhook Test",
      phone: "9195550000",
      email: "test@test.com",
      city: "Sanford",
      source: "webhook-test",
    });

    // Wait for async webhook call
    await new Promise((r) => setTimeout(r, 200));

    if (process.env.N8N_WEBHOOK_URL) {
      expect(mockedPost).toHaveBeenCalled();
      const lastCall = mockedPost.mock.calls[mockedPost.mock.calls.length - 1];
      const url = lastCall?.[0];
      const payload = lastCall?.[1];

      expect(url).toBe(process.env.N8N_WEBHOOK_URL);
      expect(payload).toHaveProperty("leadType", "consumer");
      expect(payload).toHaveProperty("name", "Webhook Test");
      expect(payload).toHaveProperty("phone", "9195550000");
      expect(payload).toHaveProperty("source", "webhook-test");
      expect(payload).toHaveProperty("submittedAt");
    }
  });

  it("sends full lead payload with all fields to n8n", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.leads.submitUrgent({
      name: "Urgent Webhook",
      phone: "9195559999",
      city: "Carthage",
      vehicleAccessibility: "On street",
      needPickupToday: "yes",
      source: "urgent-test",
    });

    await new Promise((r) => setTimeout(r, 200));

    if (process.env.N8N_WEBHOOK_URL) {
      expect(mockedPost).toHaveBeenCalled();
      const payload = mockedPost.mock.calls[mockedPost.mock.calls.length - 1]?.[1];
      expect(payload).toHaveProperty("leadType", "urgent");
      expect(payload).toHaveProperty("vehicleAccessibility", "On street");
      expect(payload).toHaveProperty("needPickupToday", "yes");
    }
  });
});
