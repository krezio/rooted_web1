import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import aboutImage from "@assets/generated_images/minimalist_luxury_florist_studio_interior.png"; // Placeholder, will update after generation

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <section className="container mx-auto px-4 md:px-6 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-primary mb-4 block">Our Philosophy</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 md:mb-8">
              Rooted in <span className="font-serif italic text-primary">Nature</span>, <br />
              Elevated by Design.
            </h1>
            <p className="font-sans text-sm leading-loose text-muted-foreground max-w-2xl mx-auto">
              We are a boutique floral design studio based in Dubai, specializing in organic, sculptural arrangements that bridge the gap between wild nature and refined luxury.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-secondary"
          >
            <img 
              src={aboutImage} 
              alt="Our Studio" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        <section className="bg-white py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <h3 className="font-display text-3xl">The Process</h3>
              <p className="font-sans text-sm leading-loose text-muted-foreground">
                Each arrangement begins with a thoughtful selection of the season's finest blooms. We source from sustainable growers and local farms whenever possible, ensuring that every stem tells a story of quality and care.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-display text-3xl">The Service</h3>
              <p className="font-sans text-sm leading-loose text-muted-foreground">
                From intimate gatherings to grand celebrations, our dedicated team brings a bespoke approach to every commission. We believe that flowers are not just decoration, but a sensory experience that transforms space and mood.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
