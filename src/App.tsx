import TextConverter from "./components/TextConverter";
import TypingGuide from "./components/TypingGuide";

export default function App() {
  return (
    <main className="min-h-screen bg-base-200 font-sans text-base-content">
      <TextConverter />
      <TypingGuide />
    </main>
  );
}
