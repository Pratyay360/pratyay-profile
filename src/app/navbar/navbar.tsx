'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/themer/themer';

const navItems = [
  { label: 'About Me', href: '/#aboutme' },
  { label: 'Education', href: '/#education' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Certificates', href: '/#certificate' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blogs', href: '/#blogs' },
  { label: 'Resume', href: '/#resume' },
  { label: 'Donate', href: '/#donate' },
  { label: 'Contact Me', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center">
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-x-6">
            {navItems.map(({ label, href }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className={cn(
                      'relative px-2 py-1 text-sm font-medium transition-colors',
                      pathname === href
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary',
                    )}
                  >
                    {label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-200',
                        pathname === href && 'scale-x-100',
                      )}
                    />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <nav className="mt-6 flex flex-col space-y-3 text-gray-900 dark:text-gray-200">
                  {navItems.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 border-t pt-4">
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}