import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email. 
    // For prototype, we'll redirect to WhatsApp.
    const phoneNumber = "971562901494";
    window.open(`https://wa.me/${phoneNumber}?text=Hi Rooted Team, I'd like to make an inquiry.`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-primary mb-4 block">Get in Touch</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 md:mb-8">
                Let's Create <br />
                <span className="font-serif italic text-primary">Together.</span>
              </h1>
              <p className="font-sans text-sm leading-loose text-muted-foreground mb-12 max-w-md">
                Whether you're planning an event, looking for a weekly subscription, or just want to say hello, we'd love to hear from you.
              </p>

              <div className="space-y-8 font-sans text-sm">
                <div>
                  <h4 className="uppercase tracking-widest text-primary mb-2">WhatsApp / Call</h4>
                  <p className="text-muted-foreground">+971 56 290 1494</p>
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-primary mb-2">Email</h4>
                  <p className="text-muted-foreground">hello@rooted.rs</p>
                </div>
                {/* Removed Studio Address as requested */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white p-8 md:p-12 border border-border/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <Textarea className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-primary resize-none" placeholder="How can we help?" />
                </div>
                <Button type="submit" className="w-full rounded-none h-12 bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.2em] text-xs">
                  Send Message
                </Button>
                <p className="text-[10px] text-muted-foreground text-center pt-4">
                  * For faster response, this form redirects to WhatsApp
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
