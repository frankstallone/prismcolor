'use client';
import {
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  PencilIcon,
} from '@heroicons/react/16/solid';
import {
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './sidebar';
import { usePathname } from 'next/navigation';
import { usePaletteStore } from '@/app/store';

export function ClientSidebar() {
  const pathname = usePathname();
  const paletteSeed = usePaletteStore((state) => state.paletteSeed);

  return (
    <SidebarBody>
      <SidebarSection>
        {paletteSeed.map((palette) => (
          <SidebarItem
            key={palette.semantic}
            href={`/edit/${palette.semantic}`}
            current={pathname === `/edit/${palette.semantic}`}
          >
            <PencilIcon />
            <SidebarLabel className="capitalize">
              {palette.semantic}
            </SidebarLabel>
          </SidebarItem>
        ))}
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
