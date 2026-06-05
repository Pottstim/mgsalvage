/**
 * ConsumerForm.tsx — 3-step wizard (Zeigarnik + IKEA Effect)
 * Step 1: Vehicle details  |  Step 2: Condition & Title  |  Step 3: Contact
 * Leads are submitted via submitLead() → VITE_LEADS_ENDPOINT or Formspree fallback.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, ArrowRight, ArrowLeft, Shield, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { submitLead, type LeadPayload } from "@/lib/submitLead";

interface ConsumerFormProps {
  source?: string;
}

const STEPS = ["Your Vehicle", "Condition & Title", "Get Your Offer"];

export default function ConsumerForm({ source = "consumer-form" }: ConsumerFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<LeadPayload>>({});

  const updateFields = (updates: Partial<LeadPayload>) =>
    setFormData((prev) => ({ ...prev, ...updates }));

  const handleStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateFields({
      vehicleYear: fd.get("vehicleYear") as string,
      vehicleMake: fd.get("vehicleMake") as string,
      vehicleModel: fd.get("vehicleModel") as string,
    });
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateFields({
      vehicleCondition: fd.get("vehicleCondition") as string,
      titleStatus: fd.get("titleStatus") as string,
      notes: (fd.get("notes") as string) || undefined,
    });
    setStep(3);
  };

  const handleStep3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload: LeadPayload = {
      ...formData,
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || undefined,
      city: (fd.get("city") as string) || undefined,
      source,
      leadType: "consumer",
      submittedAt: new Date().toISOString(),
    };
    try {
      await submitLead(payload);
      setSubmitted(true);
      toast.success("Offer request sent! We'll call you back within minutes.");
    } catch (err) {
      console.error("Lead submission error:", err);
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
          You're All Set!
        </h3>
        <p className="text-muted-foreground mb-2">
          We received your request for your{" "}
          <strong>{[formData.vehicleYear, formData.vehicleMake, formData.vehicleModel].filter(Boolean).join(" ") || "vehicle"}</strong>.
        </p>
        <p className="text-muted-foreground mb-6">
          Expect a call back <strong>within minutes</strong> during business hours (Mon–Sat 8AM–6PM).
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); setFormData({}); }}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  const ProgressBar = () => (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i + 1 < step ? "bg-primary text-white" : i + 1 === step ? "bg-primary text-white ring-2 ring-primary/30" : "bg-muted text-muted-foreground"
              }`}>
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i + 1 === step ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-6 sm:w-12 mx-2 rounded ${i + 1 < step ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const TrustBadges = () => (
    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <DollarSign className="w-3.5 h-3.5 text-primary" />Cash paid on the spot
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5 text-primary" />100% free towing — no deductions
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5 text-primary" />Response within minutes
      </div>
    </div>
  );

  if (step === 1) {
    return (
      <form onSubmit={handleStep1} className="bg-white rounded-xl border border-border p-6 md:p-8">
        <ProgressBar />
        <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          What vehicle are you selling?
        </h3>
        <p className="text-sm text-muted-foreground mb-6">Takes 30 seconds — get a cash offer today.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicleYear">Year *</Label>
            <Input id="vehicleYear" name="vehicleYear" placeholder="e.g. 2008" defaultValue={formData.vehicleYear} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vehicleMake">Make *</Label>
            <Input id="vehicleMake" name="vehicleMake" placeholder="e.g. Honda" defaultValue={formData.vehicleMake} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vehicleModel">Model *</Label>
            <Input id="vehicleModel" name="vehicleModel" placeholder="e.g. Civic" defaultValue={formData.vehicleModel} required />
          </div>
        </div>
        <Button type="submit" className="w-full mt-6" size="lg">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <TrustBadges />
      </form>
    );
  }

  if (step === 2) {
    return (
      <form onSubmit={handleStep2} className="bg-white rounded-xl border border-border p-6 md:p-8">
        <ProgressBar />
        <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          Tell us about the condition
        </h3>
        <p className="text-sm text-muted-foreground mb-6">We buy cars in <strong>any</strong> condition — running or not.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicleCondition">Vehicle Condition *</Label>
            <Select name="vehicleCondition" required defaultValue={formData.vehicleCondition}>
              <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="runs">Runs &amp; Drives</SelectItem>
                <SelectItem value="starts">Starts but doesn't drive</SelectItem>
                <SelectItem value="dead">Doesn't start</SelectItem>
                <SelectItem value="wrecked">Wrecked / Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="titleStatus">Title Status *</Label>
            <Select name="titleStatus" required defaultValue={formData.titleStatus}>
              <SelectTrigger><SelectValue placeholder="Do you have the title?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="clean">Yes — Clean Title</SelectItem>
                <SelectItem value="salvage">Yes — Salvage Title</SelectItem>
                <SelectItem value="none">No Title (call to verify)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <Label htmlFor="notes">Anything else we should know? (optional)</Label>
          <Textarea id="notes" name="notes" placeholder="e.g. Missing wheels, engine pulled, stored in backyard..." rows={3} defaultValue={formData.notes} />
        </div>
        <div className="flex gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />Back
          </Button>
          <Button type="submit" className="flex-1" size="lg">
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <TrustBadges />
      </form>
    );
  }

  return (
    <form onSubmit={handleStep3} className="bg-white rounded-xl border border-border p-6 md:p-8">
      <ProgressBar />
      <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        Where should we send your cash offer?
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        We'll call you back <strong>within minutes</strong> with a guaranteed offer for your{" "}
        {[formData.vehicleYear, formData.vehicleMake, formData.vehicleModel].filter(Boolean).join(" ") || "vehicle"}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(919) 555-0123" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">City *</Label>
          <Input id="city" name="city" placeholder="Sanford" required />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <Button type="button" variant="outline" onClick={() => setStep(2)} className="shrink-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</>
          ) : (
            <>Get My Cash Offer Now <ArrowRight className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        No obligation. Price-lock guarantee — the offer we quote is the price you receive.
      </p>
      <TrustBadges />
    </form>
  );
}
