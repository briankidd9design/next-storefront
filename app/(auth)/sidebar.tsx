"use client";
import {
  BarChart,
  ChevronUp,
  CogIcon,
  CreditCard,
  Library,
  Package2,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const links = [
  { href: "/", label: "Dashboard", icon: BarChart },
  {
    href: "/products",
    label: "Products",
    icon: ShoppingBasket,
  },
  {
    href: "sales",
    label: "Sales",
    icon: CreditCard,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: CogIcon,
  },
  {
    href: "/library",
    label: "Library",
    icon: Library,
  },
];

export function Sidebar() {
  // Next components are rendered on the server and not on the client. Hooks run on the client and not on the server.So to implement usePathname we need to use the directive use client.
  // We can use pathname to determine the link we are on and if that link is active
  const pathname = usePathname();
  console.log(pathname);
  // lucide is part ot the ShadCn UI
  //   return <Package2 className="w-4 h-4" />;
  return (
    <div className="flex flex-col justify-between h-full gap-4 py-2">
      <div>
        <div className="flex h-14 mb-4 items-center border-b px-4">
          {/* providing prefetching and client side navigation between routes without reloading the page. A standard anchor tag would make it so you the page would be reloaded upon visiting the link */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="size-6" />
            <span>Next Storefront</span>
          </Link>
        </div>

        <nav className="grid gap-1 px-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: pathname === link.href ? "default" : "ghost",
                }),
                "justify-start",
                pathname !== link.href && "hover:bg-zinc-200"
              )}
            >
              <link.icon className="mr-2 size-4" /> {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex h-14 pt-2 items-center border-t px-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://avatar.vercel.sh/asdf" />
                </Avatar>
                {/* width value is set as an arbitrary value */}
                {/* truncate will make sure the text does not go beyond 150px */}
                <div className="flex flex-col items-start w-[150px] truncate">
                  <p className="text-sm font-medium text-zinc-950">Full Name</p>
                  <p className="text-xs font-normal text-zinc-500">
                    Email Address
                  </p>
                </div>
              </div>
              <ChevronUp className="siz-4 ml-2 text-zinc-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[220px] mb-4" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
