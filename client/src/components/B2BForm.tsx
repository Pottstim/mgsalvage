import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface B2BFormProps {
  source?: string;
  defaultBusinessType?: string;
}

export default function B2BForm({ source = "website", defaultBusinessType }: B2BFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const fd = new FormData(e.currentTarget);
    const data = {
      businessName: fd.get("businessName") as string,
      contactName: fd.get("contactName") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || "",
      city: (fd.get("city") as string) || "",
      businessType: (fd.get("businessType") as string) || "",
      vehicleCount: (fd.get("vehicleCount") as string) || "",
      vehicleTypes: (fd.get("vehicleTypes") as string) || "",
      pickupTiming: (fd.get("pickupTiming") as string) || "",
      notes: (fd.get("notes") as string) || "",
      source,
      leadType: "b2b",
      submittedAt: new Date().toISOString(),
    };
    
    console.log("B2B Lead submitted:", data);
    
    // TODO: Wire to Google Sheets + Email
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Business inquiry submitted! We'll be in touch shortly.");
      setIsSubmitting(false);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Inquiry Received!
        </h3>
        <p className="text-muted-foreground mb-4">
          We've received your business inquiry and will reach out to discuss your needs. Expect a response within one business day.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        Business Vehicle Removal Inquiry
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Tell us about your business needs and we'll create a custom removal plan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input id="businessName" name="businessName" placeholder="Your Business Name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Contact Person *</Label>
          <Input id="contactName" name="contactName" placeholder="Full Name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(919) 555-0123" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="contact@business.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Sanford" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="businessType">Business Type</Label>
          <Select name="businessType" defaultValue={defaultBusinessType}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mechanic Shop">Mechanic Shop</SelectItem>
              <SelectItem value="Auto Body Shop">Auto Body / Collision Center</SelectItem>
              <SelectItem value="Used Car Dealer">Used Car Dealer</SelectItem>
              <SelectItem value="Fleet Operator">Fleet Operator</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-6">
        <p className="text-sm font-semibold text-foreground mb-4">Vehicle Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicleCount">Number of Vehicles</Label>
            <Select name="vehicleCount">
              <SelectTrigger>
                <SelectValue placeholder="How many vehicles?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">1-3 vehicles</SelectItem>
                <SelectItem value="4-10">4-10 vehicles</SelectItem>
                <SelectItem value="11-25">11-25 vehicles</SelectItem>
                <SelectItem value="25+">25+ vehicles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pickupTiming">Ideal Pickup Timing</Label>
            <Select name="pickupTiming">
              <SelectTrigger>
                <SelectValue placeholder="When do you need pickup?" />
              </SelectTrigger>
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
          <Label htmlFor="vehicleTypes">Vehicle Types</Label>
          <Input id="vehicleTypes" name="vehicleTypes" placeholder="e.g., Sedans, trucks, SUVs" />
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Any other details about your needs?" rows={3} />
      </div>

      <Button type="submit" className="w-full mt-6" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </>
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
