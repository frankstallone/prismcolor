'use client';
import {
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/16/solid';
import {
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './sidebar';
import { usePathname } from 'next/navigation';

export function ClientSidebar() {
  const pathname = usePathname();
  return (
    <SidebarBody>
      <SidebarSection>
        <SidebarItem href="/" current={pathname === '/'}>
          <HomeIcon />
          <SidebarLabel>Home</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/events" current={pathname.startsWith('/events')}>
          <Square2StackIcon />
          <SidebarLabel>Events</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/orders" current={pathname.startsWith('/orders')}>
          <TicketIcon />
          <SidebarLabel>Orders</SidebarLabel>
        </SidebarItem>
        <SidebarItem
          href="/settings"
          current={pathname.startsWith('/settings')}
        >
          <Cog6ToothIcon />
          <SidebarLabel>Settings</SidebarLabel>
        </SidebarItem>
      </SidebarSection>

      <SidebarSpacer />

      <SidebarSection>
        <SidebarItem href="#">
          <QuestionMarkCircleIcon />
          <SidebarLabel>Support</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="#">
          <SparklesIcon />
          <SidebarLabel>Changelog</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarBody>
  );
}
