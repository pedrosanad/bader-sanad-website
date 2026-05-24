import { Button } from "@/components/ui/button";
import { Award, Camera, Users, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutSectionProps {
  onBookClick?: () => void;
}

export function AboutSection({ onBookClick }: AboutSectionProps) {
  const { t } = useLanguage();

  const stats = [
    { icon: Camera, value: "500+", label: t.about.stats.sessions },
    { icon: Users, value: "350+", label: t.about.stats.clients },
    { icon: Award, value: "10+", label: t.about.stats.experience },
    { icon: Heart, value: "100%", label: t.about.stats.passion },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-light mb-6">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t.about.p1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.about.p2}</p>
            <Button onClick={onBookClick} data-testid="button-about-book">
              {t.about.bookSession}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-md p-6 text-center border border-card-border"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <p className="font-serif text-3xl font-medium mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
