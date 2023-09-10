import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import ClerkProvider from "@/components/clerk-provider";

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <ClerkProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
    );
}
