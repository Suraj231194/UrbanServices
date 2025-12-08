const Privacy = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">
              We collect information that you provide directly to us:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Name, email address, phone number, and address</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Service preferences and booking history</li>
              <li>Communication records with our support team</li>
              <li>Feedback and reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your bookings and payments</li>
              <li>Send booking confirmations and service updates</li>
              <li>Improve our services and user experience</li>
              <li>Communicate with you about promotions and offers</li>
              <li>Ensure safety and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-2">
              We share your information only in these circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>With service professionals to fulfill your booking</li>
              <li>With payment processors to complete transactions</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights and safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information. However, 
              no method of transmission over the internet is 100% secure. We cannot guarantee absolute 
              security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
              and deliver personalized content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-2">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your information for as long as necessary to provide services and comply with legal 
              obligations. You can request deletion of your data at any time, subject to legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not intended for children under 18. We do not knowingly collect information 
              from children. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              through email or prominent notice on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              For questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 text-muted-foreground">
              <p>Email: privacy@urbanservices.com</p>
              <p>Phone: +91 1800 123 4567</p>
            </div>
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

export default Privacy;