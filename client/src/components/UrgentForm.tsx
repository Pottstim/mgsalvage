import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

interface UrgentFormProps {
  source?: string;
}

export default function UrgentForm({ source = "contact-urgent" }: UrgentFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const mutation = trpc.leads.submitUrgent.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Urgent request submitted! We'll call you back ASAP.");
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
      city: (fd.get("city") as string) || "",
      vehicleAccessibility: (fd.get("vehicleAccessibility") as string) || "",
      needPickupToday: (fd.get("needPickupToday") as string) || "yes",
      source,
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          We're On It!
        </h3>
        <p className="text-muted-foreground mb-4">
          Your urgent request has been received. Expect a callback within the hour during business hours.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
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
          <Label htmlFor="urgentCity">City / Location</Label>
          <Input id="urgentCity" name="city" placeholder="Sanford, NC" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="needPickupToday">Need Pickup Today?</Label>
          <Select name="needPickupToday" defaultValue="yes">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="vehicleAccessibility">Vehicle Accessibility</Label>
        <Textarea
          id="vehicleAccessibility"
          name="vehicleAccessibility"
          placeholder="Where is the vehicle? (e.g., In driveway, keys available, on street, etc.)"
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full mt-6" size="lg" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-1" />
            Request Urgent Callback
          </>
        )}
      </Button>
    </form>
  );
}
