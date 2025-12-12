import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-6">ROOTED</h2>
            <p className="font-sans text-sm leading-relaxed max-w-sm mx-auto md:mx-0 opacity-80">
              Bespoke floral design studio creating rooted, organic, and premium arrangements for events and everyday luxury.
            </p>
          </div>

          <div>
            <h3 className="font-serif italic text-lg mb-6">Explore</h3>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase opacity-80">
              <li><Link href="/shop" className="hover:opacity-100 transition-opacity">Shop Collection</Link></li>
              <li><Link href="/about" className="hover:opacity-100 transition-opacity">Our Story</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif italic text-lg mb-6">Connect</h3>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase opacity-80">
              <li><a href="https://www.instagram.com/rooted.rs/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a></li>
              <li><a href="mailto:hello@rooted.rs" className="hover:opacity-100 transition-opacity">Email Us</a></li>
              <li><a href="https://wa.me/971562901494" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">WhatsApp</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-60 font-sans">
          <p>&copy; {new Date().getFullYear()} Rooted Flowers by RS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {/* Removed dead links for premium polish */}
             <span>Dubai, UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
