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
import bouquet4 from "@assets/generated_images/exotic_purple_orchid_arrangement.png";
import bouquet5 from "@assets/generated_images/blush_pink_peonies_in_glass_vase.png";
import bouquet6 from "@assets/generated_images/dried_flower_sculpture_arrangement.png";
import bouquet7 from "@assets/generated_images/vibrant_coral_and_orange_sunset_bouquet.png";
import bouquet8 from "@assets/generated_images/signature_mono-botanical_rose_arrangement.png";
import bouquet9 from "@assets/generated_images/avant-garde_anthurium_and_orchid_design.png";
import bouquet10 from "@assets/generated_images/lush_garden_style_table_centerpiece.png";
import bouquet11 from "@assets/generated_images/modern_architectural_tulip_arrangement.png";

const products = [
  {
    id: 1,
    name: "The Ethereal",
    price: 450,
    image: bouquet1,
    category: "Signature Collection"
  },
  {
    id: 2,
    name: "Midnight Velvet",
    price: 520,
    image: bouquet2,
    category: "Luxury Edition"
  },
  {
    id: 3,
    name: "Wild Garden",
    price: 380,
    image: bouquet3,
    category: "Seasonal"
  },
  {
    id: 4,
    name: "Noir Orchid",
    price: 650,
    image: bouquet4,
    category: "Exotic"
  },
  {
    id: 5,
    name: "Blush Peony",
    price: 580,
    image: bouquet5,
    category: "Premium"
  },
  {
    id: 6,
    name: "Desert Sculpture",
    price: 420,
    image: bouquet6,
    category: "Dried Series"
  },
  {
    id: 7,
    name: "Sunset Coral",
    price: 395,
    image: bouquet7,
    category: "Seasonal"
  },
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
    id: 10,
    name: "Garden Centerpiece",
    price: 850,
    image: bouquet10,
    category: "Events"
  },
  {
    id: 11,
    name: "French Tulips",
    price: 480,
    image: bouquet11,
    category: "Seasonal"
  }
];

export default function Shop() {
  const { addItem, setCartOpen } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
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
    <div className="pt-24 md:pt-32 pb-24 px-4 md:px-6 min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Shop All</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary">The Collection</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
            >
              <div className="glass-card p-2 md:p-3 transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[1/1] overflow-hidden rounded-lg mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-2 right-2 md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 rounded-full h-9 w-9 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center space-y-1 md:space-y-2">
                <span className="block font-sans text-[8px] md:text-[10px] tracking-widest uppercase text-muted-foreground">
                  {product.category}
                </span>
                <h3 className="font-display text-lg md:text-2xl group-hover:text-primary/80 transition-colors">
                  {product.name}
                </h3>
                <p className="font-serif italic text-sm md:text-base text-primary">AED {product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
