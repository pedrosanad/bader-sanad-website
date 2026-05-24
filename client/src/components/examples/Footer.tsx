import { Footer } from "../Footer";

export default function FooterExample() {
  return (
    <Footer onNavigate={(page) => console.log("Navigate to:", page)} />
  );
}
