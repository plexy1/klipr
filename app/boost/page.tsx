"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

export default function BoostPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });

    try {
      // Replace with your actual Google Sheets API endpoint
      // This should be the published web app URL from your Google Apps Script
      const sheetUrl = "https://script.google.com/macros/s/AKfycbzIxq8fdMB0qgRyy8OQ-yHjBV5LuKt7q7k9tylap5jPecjZ6qK9ru637XCk9b4XVGsX0Q/exec";
      
      await fetch(sheetUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Required for Google Apps Script
      });

      // Since no-cors mode doesn't allow reading the response
      // We assume success after submission
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Failed to submit form. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col boost-page-font">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-8 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold custom-font flex flex-col items-center">
          <span>KLIPR<span className="blink-cursor">.</span></span>
          <span className="text-xs font-mono tracking-[0.2em] mt-1">M E D I A</span>
        </Link>
        <nav className="hidden sm:flex gap-8 font-mono text-sm">
          <a href="#contact" className="hover:underline">CONTACT</a>
          <a href="#services" className="hover:underline">SERVICES</a>
          <a href="#packages" className="hover:underline">PACKAGES</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Contact Form Section - Now at the top */}
        <section id="contact" className="w-full max-w-[800px] mt-8 sm:mt-12 mb-16 px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold custom-font mb-4 text-center">
            Boost Your Brand
          </h1>
          
          <div className="text-center mb-10">
            <p className="text-xl sm:text-2xl mb-4 opacity-90">
              Ready to elevate your digital presence?
            </p>
            <p className="text-lg sm:text-xl mb-8 opacity-80">
              Get started today and transform how your audience experiences your brand.
            </p>
            <div className="w-16 h-1 bg-[var(--foreground)] opacity-30 mx-auto"></div>
          </div>
          
          <p className="text-center mb-8 text-lg opacity-80 max-w-[600px] mx-auto">
            Fill out the form below to start your brand transformation journey with KLIPR Media.
          </p>
          
          {formStatus.submitted ? (
            <div className="success-message p-6 bg-green-100 border border-green-300 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2 text-green-800">Thank You!</h3>
              <p className="text-green-700">Your information has been successfully submitted. We&apos;ll be in touch soon!</p>
            </div>
          ) : (
            <form className="boost-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+1 (555) 123-4567" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Your company" 
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">Tell us about your brand goals</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  placeholder="What are you hoping to achieve?"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
              </button>
              
              {formStatus.error && (
                <p className="error-message text-red-600 mt-4 text-center">{formStatus.error}</p>
              )}
            </form>
          )}
        </section>
        
        {/* Services Section - Moved below the form */}
        <section id="services" className="w-full max-w-[1200px] px-4 sm:px-8 mb-16">
          <h2 className="text-3xl font-bold custom-font mb-6 sm:mb-10 text-center sm:text-left">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="boost-card">
              <div className="card-icon">✨</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Analytics</h3>
              <p>Get insights from our advanced algorithms designed to enhance your brand&apos;s presence and impact.</p>
            </div>
            
            <div className="boost-card">
              <div className="card-icon">📈</div>
              <h3 className="text-xl font-bold mb-2">Growth Strategies</h3>
              <p>Custom tailored approaches to expand your market reach and customer engagement.</p>
            </div>
            
            <div className="boost-card">
              <div className="card-icon">👥</div>
              <h3 className="text-xl font-bold mb-2">Influencer Marketing</h3>
              <p>Connect with micro and macro influencers to amplify your brand message and reach targeted audiences effectively.</p>
            </div>
            
            <div className="boost-card">
              <div className="card-icon">🔍</div>
              <h3 className="text-xl font-bold mb-2">Competitive Analysis</h3>
              <p>See how you stack up against competitors and identify opportunities for differentiation.</p>
            </div>
            
            <div className="boost-card">
              <div className="card-icon">🚀</div>
              <h3 className="text-xl font-bold mb-2">Performance Optimization</h3>
              <p>Continuous improvement through data feedback loops and iterative refinement.</p>
            </div>
            
            <div className="boost-card">
              <div className="card-icon">🎨</div>
              <h3 className="text-xl font-bold mb-2">Custom Web Design</h3>
              <p>Tailored websites that capture your brand&apos;s identity with seamless user experiences and robust management.</p>
            </div>
          </div>
        </section>
        
        {/* Packages Section */}
        <section id="packages" className="w-full max-w-[1200px] px-4 sm:px-8 mb-16">
          <h2 className="text-3xl font-bold custom-font mb-6 sm:mb-10 text-center">
            Our Packages
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            {/* Package 1 */}
            <div className="package-card">
              <div className="package-header">
                <h3 className="package-title">SOCIAL MEDIA MANAGEMENT</h3>
                <div className="package-subtitle">PACKAGE - 1</div>
                <div className="package-price">PRICE: CAD 1400/MONTH</div>
              </div>
              
              <div className="package-content">
                <h4 className="package-section-title">Deliverables:</h4>
                <ul className="package-list">
                  <li>12 Posts per Month</li>
                  <li>4 Reel Videos: Creative, engaging short videos designed to capture attention and boost engagement, posted on Instagram, Facebook, and TikTok.</li>
                  <li>8 Static Posts: Eye-catching visuals and graphics posted on Instagram and Facebook.</li>
                  <li>1-2 Monthly Shoots: On-site content creation for high-quality reels and posts.</li>
                  <li>Professional Team: Our team of experienced video editors, photographers, and social media managers will handle all aspects of content creation to ensure premium quality and alignment with your brand.</li>
                </ul>
                
                <p className="package-description">
                  This package ensures your business consistently engages its audience with visually appealing and interactive content across key social media platforms.
                </p>
              </div>
              
              <div className="package-cta">
                <button className="package-button">Select Package</button>
              </div>
            </div>
            
            {/* Package 2 */}
            <div className="package-card premium">
              <div className="package-header">
                <h3 className="package-title">SOCIAL MEDIA <span style={{fontFamily: 'sans-serif'}}>+</span> PERFORMANCE MARKETING</h3>
                <div className="package-subtitle">PACKAGE - 2</div>
                <div className="package-price">PRICE: CAD 2000/MONTH</div>
              </div>
              
              <div className="package-content">
                <h4 className="package-section-title">Includes Everything in Package 1 Plus:</h4>
                <ul className="package-list">
                  <li>Performance Marketing:
                    <ul className="package-sublist">
                      <li>Specialized ad campaigns targeting Meta (Facebook and Instagram Ads) and Google.</li>
                      <li>Strategic audience segmentation to reach potential customers effectively.</li>
                      <li>Monthly analytics and reporting to optimize campaign performance and ROI.</li>
                    </ul>
                  </li>
                  <li>Professional Team: Our team of experienced video editors, photographers, and social media managers will handle all aspects of content creation to ensure premium quality and alignment with your brand.</li>
                </ul>
                
                <p className="package-description">
                  Additionally, our professional performance marketing staff will design and execute campaigns tailored to maximize ROI and achieve measurable growth.
                </p>
                
                <p className="package-description">
                  With Package 2, your business will benefit from organic and paid strategies to increase reach, drive traffic, and achieve measurable results.
                </p>
                
                <div className="package-badge premium">
                  <span>Premium</span>
                </div>
              </div>
              
              <div className="package-cta">
                <button className="package-button premium">Select Package</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Influencer Collaboration Section */}
        <section id="influencer" className="w-full max-w-[1200px] px-4 sm:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="feature-section">
              <h2 className="text-3xl font-bold custom-font mb-6">
                COMPREHENSIVE MARKETING WITH<br />
                INFLUENCER COLLABORATION
              </h2>
              
              <p className="mb-6">
                We are a dynamic social media marketing agency specializing in elevating brand presence across all
                major platforms. Our comprehensive services include content creation, strategy development, paid advertising,
                and community management to help businesses connect with their target audience effectively.
              </p>
              
              <h3 className="text-xl font-bold mb-4">WE ALSO PROVIDE</h3>
              
              <p className="mb-6">
                In addition, we offer tailored influencer marketing solutions designed to maximize reach and engagement.
                Our influencer packages are cost-based and flexible, depending on the number of influencers and the type
                of reach you desire:
              </p>
              
              <ul className="package-list mb-6">
                <li><strong>Micro-Influencers (10K–100K followers):</strong> Ideal for niche targeting, higher engagement rates, and authentic
                  connections with specific communities.</li>
                <li><strong>Macro-Influencers (100K+ followers):</strong> Perfect for broader exposure, strong brand authority, and higher
                  visibility.</li>
              </ul>
              
              <p>
                Whether you&apos;re looking for a targeted campaign or a large-scale influencer collaboration, we provide
                customized strategies that align with your brand goals and budget. Let&apos;s help your brand make a lasting
                impact!
              </p>
            </div>
            
            <div className="feature-section">
              <div className="brand-logo mb-8">
                <h3 className="text-2xl font-bold custom-font text-center">KLIPR<span>.</span></h3>
                <p className="text-center font-mono">M E D I A</p>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Additional Benefits of Partnering with Klipr Media</h3>
              
              <p className="mb-8 normal-case leading-relaxed">
                We specialize in crafting custom websites that perfectly capture your brand&apos;s
                identity, ensuring seamless user experiences and robust management.
                Additionally, our interior design services create inspiring spaces that reflect your
                unique style and vision.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Policies</h3>
              
              <p className="mb-8 normal-case leading-relaxed">
                At KLIPR Media, we believe in establishing a strong and consistent partnership
                with our clients. As such, we require a minimum contract period of 3 months to ensure
                effective implementation of strategies and to achieve measurable results.
                This commitment will allow us to focus on delivering the best
                outcomes for your business.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Next Steps</h3>
              
              <p className="normal-case leading-relaxed">
                We&apos;re excited to help your business elevate its digital presence.
                Let us know which package aligns best with your goals, and we&apos;ll schedule a
                kickoff meeting to dive into the details.
                Thank you for considering KLIPR Media as your trusted marketing partner. We look forward
                to working together to make your business the talk of the town!
              </p>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="w-full max-w-[900px] px-4 sm:px-8 mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold custom-font mb-6">
            Ready to Boost Your Brand?
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 max-w-[700px] mx-auto opacity-90">
            Let&apos;s create something extraordinary together. Your journey to a stronger, more impactful brand presence starts with a single step.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
            <a href="#contact" className="btn-primary">
              START TODAY
            </a>
            <a href="#packages" className="btn-primary btn-secondary">
              EXPLORE PACKAGES
            </a>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-[var(--foreground)] border-opacity-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="font-mono text-sm mb-4 sm:mb-0">© KLIPR Media</div>
          <div className="flex gap-6">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="https://instagram.com/kliprmedia" className="social-link">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 