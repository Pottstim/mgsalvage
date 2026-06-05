import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import SellYourJunkCar from "./pages/SellYourJunkCar";
import JunkCarRemoval from "./pages/JunkCarRemoval";
import BusinessVehicleRemoval from "./pages/BusinessVehicleRemoval";
import B2BVertical from "./pages/B2BVertical";
import BusinessAccount from "./pages/BusinessAccount";
import ServiceAreas from "./pages/ServiceAreas";
import CityPage from "./pages/CityPage";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sell-your-junk-car" component={SellYourJunkCar} />
        <Route path="/junk-car-removal" component={JunkCarRemoval} />
        <Route path="/business-vehicle-removal" component={BusinessVehicleRemoval} />
        <Route path="/business-vehicle-removal/:slug" component={B2BVertical} />
        <Route path="/business-account" component={BusinessAccount} />
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/service-areas/:slug" component={CityPage} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
