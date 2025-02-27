import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <AnimatePresence>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </AnimatePresence>
  );
}
