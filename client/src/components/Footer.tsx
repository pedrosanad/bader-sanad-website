import { Camera, Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook, SiPinterest } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-6 w-6" />
              <span className="font-serif text-xl font-medium">Bader Sanad</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" data-testid="link-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-pinterest">
                <SiPinterest className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t.footer.quickLinks}</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate?.("portfolio-portrait")}
                className="text-muted-foreground hover:text-foreground text-sm text-start transition-colors"
                data-testid="footer-link-portrait"
              >
                {t.footer.links.portrait}
              </button>
              <button
                onClick={() => onNavigate?.("portfolio-events")}
                className="text-muted-foreground hover:text-foreground text-sm text-start transition-colors"
                data-testid="footer-link-events"
              >
                {t.footer.links.events}
              </button>
              <button
                onClick={() => onNavigate?.("portfolio-commercial")}
                className="text-muted-foreground hover:text-foreground text-sm text-start transition-colors"
                data-testid="footer-link-commercial"
              >
                {t.footer.links.commercial}
              </button>
              <button
                onClick={() => onNavigate?.("booking")}
                className="text-muted-foreground hover:text-foreground text-sm text-start transition-colors"
                data-testid="footer-link-booking"
              >
                {t.footer.links.booking}
              </button>
            </nav>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t.footer.contact}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>Bader.sanad@shooter.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>0549084443</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t.footer.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
