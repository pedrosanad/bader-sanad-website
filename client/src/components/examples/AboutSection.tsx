import { AboutSection } from "../AboutSection";

export default function AboutSectionExample() {
  return (
    <AboutSection onBookClick={() => console.log("Book clicked")} />
  );
}
