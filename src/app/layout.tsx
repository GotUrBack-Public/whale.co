import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Whale.co | Solana Community", description: "A Solana community platform for wallet insights, VIP memberships and quests." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
