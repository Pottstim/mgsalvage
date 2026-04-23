import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, getLeads } from "./db";
import { sendLeadToN8n } from "./n8n";

const consumerLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleCondition: z.string().optional(),
  titleStatus: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

const b2bLeadSchema = z.object({
  businessName: z.string().min(1),
  contactName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  businessType: z.string().optional(),
  vehicleCount: z.string().optional(),
  vehicleTypes: z.string().optional(),
  pickupTiming: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

const urgentLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  city: z.string().optional(),
  vehicleAccessibility: z.string().optional(),
  needPickupToday: z.string().optional(),
  source: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  leads: router({
    submitConsumer: publicProcedure
      .input(consumerLeadSchema)
      .mutation(async ({ input }) => {
        const lead = await createLead({
          leadType: "consumer",
          name: input.name,
          phone: input.phone,
          email: input.email || null,
          city: input.city || null,
          vehicleYear: input.vehicleYear || null,
          vehicleMake: input.vehicleMake || null,
          vehicleModel: input.vehicleModel || null,
          vehicleCondition: input.vehicleCondition || null,
          titleStatus: input.titleStatus || null,
          notes: input.notes || null,
          source: input.source || "website",
          status: "new",
        });
        if (lead) {
          sendLeadToN8n(lead).catch(err => console.error("[n8n] async error:", err));
        }
        return { success: true, leadId: lead?.id };
      }),

    submitB2B: publicProcedure
      .input(b2bLeadSchema)
      .mutation(async ({ input }) => {
        const leadType = input.businessType
          ? `b2b-${input.businessType.toLowerCase().replace(/\s+/g, "-")}`
          : "b2b";
        const lead = await createLead({
          leadType,
          name: input.contactName,
          phone: input.phone,
          email: input.email || null,
          city: input.city || null,
          businessName: input.businessName || null,
          contactName: input.contactName || null,
          businessType: input.businessType || null,
          vehicleCount: input.vehicleCount || null,
          vehicleTypes: input.vehicleTypes || null,
          pickupTiming: input.pickupTiming || null,
          notes: input.notes || null,
          source: input.source || "website",
          status: "new",
        });
        if (lead) {
          sendLeadToN8n(lead).catch(err => console.error("[n8n] async error:", err));
        }
        return { success: true, leadId: lead?.id };
      }),

    submitUrgent: publicProcedure
      .input(urgentLeadSchema)
      .mutation(async ({ input }) => {
        const lead = await createLead({
          leadType: "urgent",
          name: input.name,
          phone: input.phone,
          city: input.city || null,
          vehicleAccessibility: input.vehicleAccessibility || null,
          needPickupToday: input.needPickupToday || "yes",
          source: input.source || "website",
          status: "new",
        });
        if (lead) {
          sendLeadToN8n(lead).catch(err => console.error("[n8n] async error:", err));
        }
        return { success: true, leadId: lead?.id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
