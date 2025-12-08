const Terms = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using UrbanServices, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-muted-foreground">
              UrbanServices provides an online platform that connects customers with service professionals 
              for various home services. We act as an intermediary and are not directly responsible for the 
              quality of services provided by independent professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Registration</h2>
            <p className="text-muted-foreground mb-2">
              To use our services, you must:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Be at least 18 years of age</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Booking and Payment</h2>
            <p className="text-muted-foreground mb-2">
              When you book a service:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
              <li>Payment must be completed before or after service as per selected option</li>
              <li>Service charges may vary based on location and service type</li>
              <li>We reserve the right to modify prices with prior notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cancellation Policy</h2>
            <p className="text-muted-foreground">
              Cancellations made 4 hours or more before scheduled time are free of charge. Cancellations 
              within 4 hours may incur cancellation fees. No-shows will be charged full amount.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Service Warranty</h2>
            <p className="text-muted-foreground">
              We provide a 30-day service warranty on most services. If you're unsatisfied with the service 
              quality, contact us within the warranty period for resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              UrbanServices shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from the use of our services. Our total liability is limited to the amount 
              paid for the specific service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Privacy</h2>
            <p className="text-muted-foreground">
              Your use of our services is also governed by our Privacy Policy. Please review it to 
              understand our practices regarding your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of our services after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms & Conditions, please contact us at support@urbanservices.com
            </p>
          </section>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Last updated: November 27, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;