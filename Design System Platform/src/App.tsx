import { useState, useEffect } from "react";
import { DesignSystemBuilder } from "./components/DesignSystemBuilder";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <div className="h-screen bg-background">
      <DesignSystemBuilder 
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
      />
      <Toaster />
    </div>
  );
}