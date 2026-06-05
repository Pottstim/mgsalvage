/**
 * UrgentForm.tsx — Same-day pickup request form
 * Wired to submitLead() → VITE_LEADS_ENDPOINT or Formspree fallback.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Zap, Phone } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/submitLead";
import { COMPANY } from "@/lib/siteData";

interface UrgentFormProps {
  source?: string;
}

export default function UrgentForm({ source = "contact-urgent" }: UrgentFormProps) {
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
        city: (fd.get("city") as string) || undefined,
        vehicleAccessibility: (fd.get("vehicleAccessibility") as string) || undefined,
        needPickupToday: (fd.get("needPickupToday") as string) || "yes",
        source,
        leadType: "urgent",
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
      toast.success("Urgent request sent! We'll call you back ASAP.");
    } catch (err) {
      console.error("Urgent lead submission error:", err);
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border-2 border-primary/30 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          We're On It!
        </h3>
        <p className="text-muted-foreground mb-2">
          Your urgent request has been received. Expect a callback <strong>within the hour</strong> during business hours.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Can't wait? Call us directly:{" "}
          <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary font-semibold hover:underline">
            {COMPANY.phone}
          </a>
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Request</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border-2 border-primary/30 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Same-Day Pickup Request
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Need your vehicle picked up today? Fill this out and we'll call you back ASAP.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="urgentName">Your Name *</Label>
          <Input id="urgentName" name="name" placeholder="Your Name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="urgentPhone">Phone Number *</Label>
          <Input id="urgentPhone" name="phone" type="tel" placeholder="(919) 555-0123" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="urgentCity">City</Label>
          <Input id="urgentCity" name="city" placeholder="Sanford" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vehicleAccessibility">Vehicle Accessibility</Label>
          <Select name="vehicleAccessibility">
            <SelectTrigger><SelectValue placeholder="Where is the vehicle?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="driveway">Driveway / Street</SelectItem>
              <SelectItem value="backyard">Backyard</SelectItem>
              <SelectItem value="garage">Garage</SelectItem>
              <SelectItem value="other">Other (describe in notes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</>
        ) : (
          <><Zap className="w-4 h-4 mr-2" />Request Same-Day Pickup</>
        )}
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Phone className="w-3.5 h-3.5" />
        <span>Or call directly:</span>
        <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary font-semibold hover:underline">
          {COMPANY.phone}
        </a>
      </div>
    </form>
  );
}
