import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import ClerkProvider from "@/components/clerk-provider";
import ConvexClientProvider from "@/components/convex-provider";

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <ClerkProvider>
                <ConvexClientProvider>{children}</ConvexClientProvider>
            </ClerkProvider>
        </ThemeProvider>
    );
}
