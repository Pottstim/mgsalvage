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
import ServiceAreas from "./pages/ServiceAreas";
import CityPage from "./pages/CityPage";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sell-your-junk-car" component={SellYourJunkCar} />
        <Route path="/junk-car-removal" component={JunkCarRemoval} />
        <Route path="/business-vehicle-removal" component={BusinessVehicleRemoval} />
        <Route path="/business-vehicle-removal/:slug">
          {(params) => <B2BVertical slug={params.slug} />}
        </Route>
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/service-areas/:city">
          {(params) => <CityPage city={params.city} />}
        </Route>
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
