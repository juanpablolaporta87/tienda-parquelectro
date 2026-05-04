"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, Package, BadgePercent, Users, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: BadgePercent,
    title: "Hasta -30%",
    description: "Descuento por volumen"
  },
  {
    icon: Package,
    title: "Envío Gratis",
    description: "En pedidos +$500"
  },
  {
    icon: TrendingUp,
    title: "Stock Real",
    description: "Inventario actualizado"
  },
  {
    icon: Users,
    title: "Soporte VIP",
    description: "Atención dedicada"
  }
]

export function WholesaleBanner() {
  return (
    <section id="mayorista" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted/50" />
          <div className="absolute inset-0 gradient-neon" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30">
                  <BadgePercent className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">Programa Mayorista</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  <span className="text-neon-purple neon-glow-purple">Potencia</span> Tu Negocio con{" "}
                  <span className="text-neon-orange neon-glow-orange">Precios Exclusivos</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Únete a nuestra red de distribuidores y accede a precios especiales, inventario garantizado y soporte prioritario para hacer crecer tu negocio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-foreground font-semibold px-8 neon-border-orange"
                  >
                    Registrarse como Mayorista
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary/10"
                  >
                    Ver Beneficios
                  </Button>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={benefit.title}
                      className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all hover:bg-background/70"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
