import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Contacto</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Hablemos de <span className="text-primary">negocios</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Somos mayoristas. Si querés revendernos o comprar en volumen, escribinos y te asesoramos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info de contacto */}
          <div className="space-y-6">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                desc: "Respondemos en minutos",
                value: "+54 9 11 1234-5678",
                href: "https://wa.me/5491112345678?text=Hola! Quiero información sobre compras mayoristas.",
                color: "text-green-500",
                bg: "bg-green-500/10 border-green-500/20",
                label: "Escribinos",
              },
              {
                icon: Mail,
                title: "Email",
                desc: "Para consultas formales",
                value: "ventas@parquelectro.com.ar",
                href: "mailto:ventas@parquelectro.com.ar",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/20",
                label: "Enviar email",
              },
              {
                icon: Instagram,
                title: "Instagram",
                desc: "Seguinos para novedades",
                value: "@parquelectro",
                href: "https://instagram.com/parquelectro",
                color: "text-pink-500",
                bg: "bg-pink-500/10 border-pink-500/20",
                label: "Ver perfil",
              },
              {
                icon: Facebook,
                title: "Facebook",
                desc: "Novedades y ofertas",
                value: "Parquelectro Mayorista",
                href: "https://facebook.com/parquelectro",
                color: "text-blue-500",
                bg: "bg-blue-500/10 border-blue-500/20",
                label: "Ver página",
              },
            ].map(({ icon: Icon, title, desc, value, href, color, bg, label }) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer"
                className={`flex items-start gap-4 p-5 rounded-xl border ${bg} hover:scale-[1.02] transition-transform`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{desc}</p>
                  <p className={`text-sm font-medium ${color}`}>{value}</p>
                </div>
                <span className={`text-xs font-medium ${color} self-center`}>{label} →</span>
              </a>
            ))}
          </div>

          {/* Info adicional */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-4">
              <h2 className="font-bold text-foreground text-lg">¿Por qué comprar con nosotros?</h2>
              {[
                "Precios mayoristas sin intermediarios",
                "Stock real, actualizado cada hora",
                "Envíos a todo el país — AMBA en 24hs",
                "Atención personalizada por WhatsApp",
                "Facturación disponible",
                "Más de 800 productos en catálogo",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50 space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Horarios de atención</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Lunes a Viernes</span><span className="text-foreground font-medium">9:00 — 18:00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sábados</span><span className="text-foreground font-medium">9:00 — 13:00</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Domingos</span><span className="text-muted-foreground">Cerrado</span></div>
              </div>
            </div>

            <a href="https://wa.me/5491112345678?text=Hola! Quiero información sobre compras mayoristas."
              target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar por WhatsApp Ahora
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
