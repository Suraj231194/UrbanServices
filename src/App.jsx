import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking.jsx";
import Bookings from "./pages/Bookings.jsx";
import Payment from "./pages/Payment.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Auth from "./pages/Auth.jsx";
import HomeCleaning from "./pages/services/HomeCleaning.jsx";
import Appliance from "./pages/services/Appliance.jsx";
import Vehicle from "./pages/services/Vehicle.jsx";
import Beauty from "./pages/services/Beauty.jsx";
import Plumbing from "./pages/services/Plumbing.jsx";
import Electrical from "./pages/services/Electrical.jsx";
import Painting from "./pages/services/Painting.jsx";
import Carpentry from "./pages/services/Carpentry.jsx";
import PestControl from "./pages/services/PestControl.jsx";
import Landscaping from "./pages/services/Landscaping.jsx";
import Footer from "./pages/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/services/home-cleaning" element={<HomeCleaning />} />
            <Route path="/services/appliance" element={<Appliance />} />
            <Route path="/services/vehicle" element={<Vehicle />} />
            <Route path="/services/beauty" element={<Beauty />} />
            <Route path="/services/plumbing" element={<Plumbing />} />
            <Route path="/services/electrical" element={<Electrical />} />
            <Route path="/services/painting" element={<Painting />} />
            <Route path="/services/carpentry" element={<Carpentry />} />
            <Route path="/services/pest-control" element={<PestControl />} />
            <Route path="/services/landscaping" element={<Landscaping />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
