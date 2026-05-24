import { Navigation } from "../Navigation";

export default function NavigationExample() {
  return (
    <Navigation
      currentPage="home"
      onNavigate={(page) => console.log("Navigate to:", page)}
    />
  );
}
