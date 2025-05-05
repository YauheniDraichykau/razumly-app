'use client';

import Link from 'next/link';
import { Bell, User } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarTrigger,
} from '@core/ui';
import { signOut } from 'next-auth/react';

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex-1 md:flex md:justify-center">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/history"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              History
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="text"
                  size="text"
                  className="w-full flex justify-start"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
