import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            <div className="md:col-span-5 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl md:text-5xl mb-4">ROOTED</h2>
                <p className="font-serif italic text-sm opacity-70 mb-6">Flowers by RS</p>
                <p className="font-sans text-sm leading-relaxed max-w-sm mx-auto md:mx-0 opacity-80">
                  Bespoke floral design studio creating rooted, organic, and premium arrangements for life's most beautiful moments.
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                  <a 
                    href="https://www.instagram.com/rooted.rs/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://wa.me/971562901494" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:hello@rooted.rs" 
                    className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="font-serif italic text-lg mb-6">Explore</h3>
                <ul className="space-y-4 font-sans text-xs tracking-widest uppercase">
                  <li>
                    <Link href="/shop" className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-4 h-px bg-primary-foreground transition-all duration-300" />
                      Shop Collection
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-4 h-px bg-primary-foreground transition-all duration-300" />
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-4 h-px bg-primary-foreground transition-all duration-300" />
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="md:col-span-4 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-serif italic text-lg mb-6">Visit Us</h3>
                <div className="space-y-4 font-sans text-sm opacity-80">
                  <p className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Dubai, United Arab Emirates</span>
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="w-4 h-4 shrink-0" />
                    <a href="tel:+971562901494" className="hover:opacity-100">+971 56 290 1494</a>
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="w-4 h-4 shrink-0" />
                    <a href="mailto:hello@rooted.rs" className="hover:opacity-100">hello@rooted.rs</a>
                  </p>
                </div>
                
                <div className="mt-8 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Hours</p>
                  <p className="text-sm">Daily: 9:00 AM - 9:00 PM</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 font-sans">
            <p>&copy; {new Date().getFullYear()} Rooted Flowers by RS. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-current" /> in Dubai
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
