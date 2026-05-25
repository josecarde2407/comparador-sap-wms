import AppRouter from "../routes/AppRouter";
import { ComparisonProvider } from "../modules/context/ComparisonContext";

export default function App() {
  return (
    <ComparisonProvider>
      <AppRouter />
    </ComparisonProvider>
  );
}