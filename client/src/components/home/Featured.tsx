import { motion } from "framer-motion";
import { Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import bouquet1 from "@assets/generated_images/elegant_white_and_green_bridal_bouquet.png";
import bouquet2 from "@assets/generated_images/dramatic_deep_red_luxury_bouquet.png";
import bouquet3 from "@assets/generated_images/modern_artistic_pastel_wildflower_arrangement.png";
import bouquet8 from "@assets/generated_images/signature_mono-botanical_rose_arrangement.png";
import bouquet9 from "@assets/generated_images/avant-garde_anthurium_and_orchid_design.png";

const featuredProducts = [
  {
    id: 8,
    name: "Quicksand Roses",
    price: 550,
    image: bouquet8,
    category: "Mono-Botanical"
  },
  {
    id: 9,
    name: "Avant Garde",
    price: 720,
    image: bouquet9,
    category: "Sculptural"
  },
  {
    id: 2,
    name: "Midnight Velvet",
    price: 520,
    image: bouquet2,
    category: "Luxury Edition"
  },
  {
    id: 1,
    name: "The Ethereal",
    price: 450,
    image: bouquet1,
    category: "Signature Collection"
  },
  {
    id: 3,
    name: "Wild Garden",
    price: 380,
    image: bouquet3,
    category: "Seasonal"
  }
];

export function Featured() {
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your selection.`,
      duration: 3000,
    });
    setCartOpen(true);
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Curated Selection</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary">Featured Blooms</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer glass-card p-3 md:p-4"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-3 right-3 md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 rounded-full h-10 w-10 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center space-y-1 px-2">
                    <span className="block font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
                      {product.category}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl group-hover:text-primary/80 transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-serif italic text-primary">AED {product.price}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-full h-12 w-12 transition-all duration-300 hover:scale-110" />
            <CarouselNext className="static translate-y-0 border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-full h-12 w-12 transition-all duration-300 hover:scale-110" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
