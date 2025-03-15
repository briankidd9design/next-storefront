import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./convex-client-provider";

export const metadata: Metadata = {
  title: {
    default: "Next Storefront",
    template: "%s - Next Storefront",
  },
  description: "",
};

const inter = Inter({
  // The Alphabet that is used for subsets
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // the root layout wraps around every single page
  //   In the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

  // This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

  // Route groups are useful for:

  // Organizing routes into groups e.g. by site section, intent, or team.
  // Enabling nested layouts in the same route segment level:
  // Creating multiple nested layouts in the same segment, including multiple root layouts
  // Adding a layout to a subset of routes in a common segment
  // Adding a loading skeleton to specific route in a common segment
  // More on route groups https://nextjs.org/docs/app/building-your-application/routing/route-groups
  // Essentially we can have a particular layout only applied to one group
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
