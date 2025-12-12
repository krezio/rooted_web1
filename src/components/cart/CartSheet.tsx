import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft, MapPin, Phone, User, MessageCircle, Calendar, Clock, Gift, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CheckoutStep = "cart" | "details" | "delivery" | "confirm";

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  emirate: string;
  area: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  occasion: string;
  cardMessage: string;
  specialInstructions: string;
}

const emirates = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain"
];

const timeSlots = [
  "Morning (9AM - 12PM)",
  "Afternoon (12PM - 4PM)",
  "Evening (4PM - 8PM)",
  "Night (8PM - 10PM)"
];

const occasions = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Congratulations",
  "Get Well Soon",
  "Thank You",
  "Sympathy",
  "Just Because",
  "Other"
];

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    email: "",
    emirate: "",
    area: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    occasion: "",
    cardMessage: "",
    specialInstructions: ""
  });

  const updateDetails = (field: keyof CustomerDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "971562901494";
    const orderItems = items
      .map((item) => `• ${item.name} (x${item.quantity}) - AED ${item.price * item.quantity}`)
      .join("\n");
    
    const message = `🌸 *New Order from Rooted Flowers* 🌸

*Customer Details*
━━━━━━━━━━━━━━━
👤 Name: ${details.name}
📱 Phone: ${details.phone}
📧 Email: ${details.email || "Not provided"}

*Delivery Information*
━━━━━━━━━━━━━━━
📍 Emirate: ${details.emirate}
🏘️ Area: ${details.area}
🏠 Address: ${details.address}
📅 Date: ${details.deliveryDate}
🕐 Time: ${details.deliveryTime}

*Order Details*
━━━━━━━━━━━━━━━
${orderItems}

💰 *Total: AED ${total()}*

${details.occasion ? `🎉 Occasion: ${details.occasion}` : ""}
${details.cardMessage ? `💌 Card Message: "${details.cardMessage}"` : ""}
${details.specialInstructions ? `📝 Special Instructions: ${details.specialInstructions}` : ""}

Thank you for choosing Rooted Flowers! 🌿`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    setStep("cart");
    onOpenChange(false);
  };

  const canProceedToDelivery = details.name && details.phone;
  const canProceedToConfirm = details.emirate && details.area && details.address && details.deliveryDate && details.deliveryTime;

  const resetAndClose = () => {
    setStep("cart");
    onOpenChange(false);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Sheet open={open} onOpenChange={resetAndClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background border-l border-border p-0">
        <AnimatePresence mode="wait">
          {step === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 pb-4 border-b border-border/40">
                <SheetHeader className="space-y-2">
                  <SheetTitle className="font-display text-2xl">Your Selection</SheetTitle>
                  <SheetDescription className="font-sans text-xs uppercase tracking-widest">
                    {items.length === 0 ? "Your cart is currently empty." : `${items.length} item${items.length > 1 ? 's' : ''} in cart`}
                  </SheetDescription>
                </SheetHeader>
              </div>

              {items.length > 0 ? (
                <>
                  <ScrollArea className="flex-1 px-6">
                    <div className="space-y-6 py-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 group">
                          <div className="h-24 w-20 bg-secondary overflow-hidden shrink-0 rounded-lg">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-display text-lg leading-tight">{item.name}</h4>
                              <p className="font-serif italic text-sm text-primary">AED {item.price * item.quantity}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-border rounded-full overflow-hidden">
                                <button 
                                  className="p-2 hover:bg-muted transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                   <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 text-xs font-mono min-w-[2rem] text-center">{item.quantity}</span>
                                <button 
                                  className="p-2 hover:bg-muted transition-colors"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                   <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-muted-foreground hover:text-destructive text-xs uppercase tracking-widest"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-6 border-t border-border/40 space-y-4 bg-gradient-to-t from-stone-50/50 to-transparent dark:from-stone-950/50">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                      <span className="font-display text-2xl">AED {total()}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center">
                      Free delivery across Dubai • Same day available
                    </p>
                    <Button 
                      className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs uppercase tracking-[0.2em] gap-2"
                      onClick={() => setStep("details")}
                    >
                      Continue to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-6">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 stroke-1 text-muted-foreground" />
                  </div>
                  <p className="font-serif italic text-muted-foreground">Start adding blooms to your collection.</p>
                  <Button variant="outline" className="rounded-full" onClick={resetAndClose}>
                    Browse Collection
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setStep("cart")} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-muted" />
                    <div className="w-8 h-1 rounded-full bg-muted" />
                  </div>
                </div>
                <SheetHeader className="space-y-2">
                  <SheetTitle className="font-display text-2xl">Your Details</SheetTitle>
                  <SheetDescription className="font-sans text-xs uppercase tracking-widest">
                    Let us know how to reach you
                  </SheetDescription>
                </SheetHeader>
              </div>

              <ScrollArea className="flex-1 px-6">
                <div className="space-y-5 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={details.name}
                      onChange={(e) => updateDetails("name", e.target.value)}
                      className="h-12 rounded-lg border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={details.phone}
                      onChange={(e) => updateDetails("phone", e.target.value)}
                      className="h-12 rounded-lg border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5" /> Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={details.email}
                      onChange={(e) => updateDetails("email", e.target.value)}
                      className="h-12 rounded-lg border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border/40 bg-gradient-to-t from-stone-50/50 to-transparent dark:from-stone-950/50">
                <Button 
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs uppercase tracking-[0.2em] gap-2"
                  onClick={() => setStep("delivery")}
                  disabled={!canProceedToDelivery}
                >
                  Continue to Delivery
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "delivery" && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setStep("details")} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-muted" />
                  </div>
                </div>
                <SheetHeader className="space-y-2">
                  <SheetTitle className="font-display text-2xl">Delivery Details</SheetTitle>
                  <SheetDescription className="font-sans text-xs uppercase tracking-widest">
                    Where should we deliver your flowers?
                  </SheetDescription>
                </SheetHeader>
              </div>

              <ScrollArea className="flex-1 px-6">
                <div className="space-y-5 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Emirate *
                      </Label>
                      <Select value={details.emirate} onValueChange={(v) => updateDetails("emirate", v)}>
                        <SelectTrigger className="h-12 rounded-lg">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {emirates.map(e => (
                            <SelectItem key={e} value={e}>{e}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area" className="text-xs uppercase tracking-widest text-muted-foreground">
                        Area *
                      </Label>
                      <Input
                        id="area"
                        placeholder="e.g. JBR, Downtown"
                        value={details.area}
                        onChange={(e) => updateDetails("area", e.target.value)}
                        className="h-12 rounded-lg border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs uppercase tracking-widest text-muted-foreground">
                      Full Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Building name, floor, apartment/villa number, street..."
                      value={details.address}
                      onChange={(e) => updateDetails("address", e.target.value)}
                      className="min-h-[80px] rounded-lg border-border/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Delivery Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        min={getTomorrowDate()}
                        value={details.deliveryDate}
                        onChange={(e) => updateDetails("deliveryDate", e.target.value)}
                        className="h-12 rounded-lg border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Time Slot *
                      </Label>
                      <Select value={details.deliveryTime} onValueChange={(v) => updateDetails("deliveryTime", v)}>
                        <SelectTrigger className="h-12 rounded-lg">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Gift className="w-3.5 h-3.5" /> Optional Extras
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                          Occasion
                        </Label>
                        <Select value={details.occasion} onValueChange={(v) => updateDetails("occasion", v)}>
                          <SelectTrigger className="h-12 rounded-lg">
                            <SelectValue placeholder="Select occasion (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {occasions.map(o => (
                              <SelectItem key={o} value={o}>{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardMessage" className="text-xs uppercase tracking-widest text-muted-foreground">
                          Card Message
                        </Label>
                        <Textarea
                          id="cardMessage"
                          placeholder="Write a personal message for the card..."
                          value={details.cardMessage}
                          onChange={(e) => updateDetails("cardMessage", e.target.value)}
                          className="min-h-[60px] rounded-lg border-border/50 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instructions" className="text-xs uppercase tracking-widest text-muted-foreground">
                          Special Instructions
                        </Label>
                        <Textarea
                          id="instructions"
                          placeholder="Any special requests or delivery instructions..."
                          value={details.specialInstructions}
                          onChange={(e) => updateDetails("specialInstructions", e.target.value)}
                          className="min-h-[60px] rounded-lg border-border/50 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border/40 bg-gradient-to-t from-stone-50/50 to-transparent dark:from-stone-950/50">
                <Button 
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs uppercase tracking-[0.2em] gap-2"
                  onClick={() => setStep("confirm")}
                  disabled={!canProceedToConfirm}
                >
                  Review Order
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setStep("delivery")} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-primary" />
                  </div>
                </div>
                <SheetHeader className="space-y-2">
                  <SheetTitle className="font-display text-2xl">Review Order</SheetTitle>
                  <SheetDescription className="font-sans text-xs uppercase tracking-widest">
                    Please confirm your order details
                  </SheetDescription>
                </SheetHeader>
              </div>

              <ScrollArea className="flex-1 px-6">
                <div className="space-y-6 py-6">
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Customer
                    </p>
                    <div className="space-y-1">
                      <p className="font-medium">{details.name}</p>
                      <p className="text-sm text-muted-foreground">{details.phone}</p>
                      {details.email && <p className="text-sm text-muted-foreground">{details.email}</p>}
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> Delivery
                    </p>
                    <div className="space-y-1">
                      <p className="font-medium">{details.area}, {details.emirate}</p>
                      <p className="text-sm text-muted-foreground">{details.address}</p>
                      <p className="text-sm text-primary font-medium mt-2">
                        {details.deliveryDate} • {details.deliveryTime}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5" /> Order Items
                    </p>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span className="text-sm">{item.name} × {item.quantity}</span>
                          <span className="text-sm font-medium">AED {item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-border/40 flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="font-display text-xl">AED {total()}</span>
                      </div>
                    </div>
                  </div>

                  {(details.occasion || details.cardMessage || details.specialInstructions) && (
                    <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Gift className="w-3.5 h-3.5" /> Extras
                      </p>
                      <div className="space-y-2 text-sm">
                        {details.occasion && <p><span className="text-muted-foreground">Occasion:</span> {details.occasion}</p>}
                        {details.cardMessage && <p><span className="text-muted-foreground">Card:</span> "{details.cardMessage}"</p>}
                        {details.specialInstructions && <p><span className="text-muted-foreground">Instructions:</span> {details.specialInstructions}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border/40 space-y-3 bg-gradient-to-t from-stone-50/50 to-transparent dark:from-stone-950/50">
                <Button 
                  className="w-full h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-xs uppercase tracking-[0.2em] gap-3"
                  onClick={handleWhatsAppCheckout}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Complete Order on WhatsApp
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  You'll be redirected to WhatsApp to confirm and pay
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
