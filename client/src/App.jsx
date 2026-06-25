import AppRoutes from "./routes/AppRoutes";
import AnimatedBackground from "./components/AnimatedBackground";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AnimatedBackground />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
