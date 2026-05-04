"use client"

import { Smartphone, Speaker, Cable, Tv, Gamepad2, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Cargadores",
    icon: Smartphone,
    count: 85,
    color: "primary",
    href: "#"
  },
  {
    name: "Audio",
    icon: Speaker,
    count: 124,
    color: "secondary",
    href: "#"
  },
  {
    name: "Cables",
    icon: Cable,
    count: 210,
    color: "accent",
    href: "#"
  },
  {
    name: "TV Box",
    icon: Tv,
    count: 32,
    color: "primary",
    href: "#"
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: 95,
    color: "secondary",
    href: "#"
  },
  {
    name: "Iluminación",
    icon: Zap,
    count: 67,
    color: "accent",
    href: "#"
  }
]

export function Categories() {
  return (
    <section id="categorias" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Explora Nuestro Catálogo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Categorías <span className="text-neon-orange">Principales</span>
          </h2>
          <p className="text-muted-foreground">
            Encuentra todo lo que necesitas para tu negocio organizado por categorías especializadas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            const colorClasses = {
              primary: "group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:text-primary",
              secondary: "group-hover:bg-secondary/20 group-hover:border-secondary/50 group-hover:text-secondary",
              accent: "group-hover:bg-accent/20 group-hover:border-accent/50 group-hover:text-accent"
            }
            
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`group relative flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border/50 transition-all duration-300 ${colorClasses[category.color as keyof typeof colorClasses]}`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  category.color === 'primary' ? 'group-hover:bg-primary/20' :
                  category.color === 'secondary' ? 'group-hover:bg-secondary/20' :
                  'group-hover:bg-accent/20'
                }`}>
                  <Icon className={`w-7 h-7 text-muted-foreground transition-colors ${
                    category.color === 'primary' ? 'group-hover:text-primary' :
                    category.color === 'secondary' ? 'group-hover:text-secondary' :
                    'group-hover:text-accent'
                  }`} />
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="font-semibold text-card-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.count} productos
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
