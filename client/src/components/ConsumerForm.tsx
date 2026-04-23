import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ConsumerFormProps {
  source?: string;
}

export default function ConsumerForm({ source = "website" }: ConsumerFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const mutation = trpc.leads.submitConsumer.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Estimate request submitted! We'll be in touch shortly.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutation.mutate({
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || "",
      city: (fd.get("city") as string) || "",
      vehicleYear: (fd.get("vehicleYear") as string) || "",
      vehicleMake: (fd.get("vehicleMake") as string) || "",
      vehicleModel: (fd.get("vehicleModel") as string) || "",
      vehicleCondition: (fd.get("vehicleCondition") as string) || "",
      titleStatus: (fd.get("titleStatus") as string) || "",
      notes: (fd.get("notes") as string) || "",
      source,
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Request Received!
        </h3>
        <p className="text-muted-foreground mb-4">
          We've received your estimate request and will get back to you shortly — usually within minutes during business hours.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        Get Your Free Estimate
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Fill out the form below and we'll get back to you with a cash offer.
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
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Sanford" />
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-6">
        <p className="text-sm font-semibold text-foreground mb-4">Vehicle Details</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicleYear">Year</Label>
            <Input id="vehicleYear" name="vehicleYear" placeholder="2008" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vehicleMake">Make</Label>
            <Input id="vehicleMake" name="vehicleMake" placeholder="Honda" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vehicleModel">Model</Label>
            <Input id="vehicleModel" name="vehicleModel" placeholder="Civic" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="vehicleCondition">Condition</Label>
            <Select name="vehicleCondition">
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="runs">Runs &amp; Drives</SelectItem>
                <SelectItem value="starts">Starts but doesn't drive</SelectItem>
                <SelectItem value="dead">Doesn't start</SelectItem>
                <SelectItem value="wrecked">Wrecked / Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="titleStatus">Title Status</Label>
            <Select name="titleStatus">
              <SelectTrigger>
                <SelectValue placeholder="Select title status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clean">Clean Title</SelectItem>
                <SelectItem value="salvage">Salvage Title</SelectItem>
                <SelectItem value="none">No Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Anything else we should know about your vehicle?" rows={3} />
      </div>

      <Button type="submit" className="w-full mt-6" size="lg" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          "Get My Free Estimate"
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        No obligation. We'll respond within minutes during business hours.
      </p>
    </form>
  );
}
