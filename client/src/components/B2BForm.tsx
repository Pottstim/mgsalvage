/**
 * B2BForm.tsx — Business vehicle removal inquiry form
 * Wired to submitLead() → VITE_LEADS_ENDPOINT or Formspree fallback.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";

interface B2BFormProps {
  source?: string;
  businessType?: string;
}

export default function B2BForm({ source = "b2b-form", businessType }: B2BFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);

    try {
      await submitLead({
        name: fd.get("name") as string,
        phone: fd.get("phone") as string,
        email: (fd.get("email") as string) || undefined,
        city: (fd.get("city") as string) || undefined,
        businessName: (fd.get("businessName") as string) || undefined,
        businessType: (fd.get("businessType") as string) || businessType || undefined,
        vehicleCount: (fd.get("vehicleCount") as string) || undefined,
        pickupTiming: (fd.get("pickupTiming") as string) || undefined,
        vehicleTypes: (fd.get("vehicleTypes") as string) || undefined,
        notes: (fd.get("notes") as string) || undefined,
        source,
        leadType: "b2b",
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
      toast.success("Business inquiry submitted! We'll be in touch within one business day.");
    } catch (err) {
      console.error("B2B lead submission error:", err);
      toast.error("Something went wrong. Please call us directly or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Inquiry Received!
        </h3>
        <p className="text-muted-foreground mb-6">
          We'll review your business inquiry and get back to you within one business day to discuss your vehicle removal needs.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Inquiry</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Building2 className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Business Vehicle Removal Inquiry
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Tell us about your business needs and we'll set up a removal plan that works for you.
      </p>

      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Contact Name *</Label>
          <Input id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(919) 555-0123" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@business.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Sanford" />
        </div>
      </div>

      {/* Business info */}
      <div className="border-t border-border mt-6 pt-6">
        <p className="text-sm font-semibold text-foreground mb-4">Business Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input id="businessName" name="businessName" placeholder="ABC Auto Repair" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="businessType">Business Type *</Label>
            <Select name="businessType" required defaultValue={businessType}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mechanic">Mechanic Shop</SelectItem>
                <SelectItem value="body-shop">Auto Body / Collision Center</SelectItem>
                <SelectItem value="dealer">Used Car Dealer</SelectItem>
                <SelectItem value="fleet">Fleet Operator</SelectItem>
                <SelectItem value="towing">Towing Company</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vehicleCount">Vehicles to Remove</Label>
            <Select name="vehicleCount">
              <SelectTrigger><SelectValue placeholder="Approximate count" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">1–3 vehicles</SelectItem>
                <SelectItem value="4-10">4–10 vehicles</SelectItem>
                <SelectItem value="11-25">11–25 vehicles</SelectItem>
                <SelectItem value="25+">25+ vehicles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pickupTiming">Ideal Pickup Timing</Label>
            <Select name="pickupTiming">
              <SelectTrigger><SelectValue placeholder="When do you need pickup?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ASAP">As soon as possible</SelectItem>
                <SelectItem value="This Week">This week</SelectItem>
                <SelectItem value="This Month">This month</SelectItem>
                <SelectItem value="Recurring">Recurring / Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <Label htmlFor="vehicleTypes">Vehicle Types (optional)</Label>
          <Input id="vehicleTypes" name="vehicleTypes" placeholder="e.g. Sedans, trucks, SUVs" />
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="notes">Additional Notes (optional)</Label>
        <Textarea id="notes" name="notes" placeholder="Any other details about your needs?" rows={3} />
      </div>

      <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting...</>
        ) : (
          "Submit Business Inquiry"
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        We'll respond within one business day to discuss your needs.
      </p>
    </form>
  );
}
