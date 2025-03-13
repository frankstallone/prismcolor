import '@/app/globals.css';
import type { Metadata } from 'next';
import type React from 'react';
import { Avatar } from '@/components/avatar';
import { ClientSidebar } from '@/components/clientsidebar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/navbar';
import {
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from '@/components/sidebar';
import { SidebarLayout } from '@/components/sidebar-layout';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';

export const metadata: Metadata = {
  title: {
    template: '%s - PrismColor',
    default: 'PrismColor',
  },
  description: '',
};

// type prismStore = {
//   delegate: Delegate;
//   model: Model;
//   setDelegateContrast: (contrast: string) => void;
// };

// export const usePrismStore = create<prismStore>((set) => ({
//   delegate: {
//     optimization: 'Universal',
//     contrast: 'CIE L* (d65)',
//     editing: null,
//   },
//   setDelegateContrast: (contrast: string) =>
//     set((state) => ({ delegate: { ...state.delegate, contrast } })),
//   model: new PaletteModel(paletteSeed),
// }));

function AccountDropdownMenu({
  anchor,
}: {
  anchor: 'top start' | 'bottom end';
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
        <SidebarLayout
          navbar={
            <Navbar>
              <NavbarSpacer />
              <NavbarSection>
                <Dropdown>
                  <DropdownButton as={NavbarItem}>
                    <Avatar src="/users/erica.jpg" square />
                  </DropdownButton>
                  <AccountDropdownMenu anchor="bottom end" />
                </Dropdown>
              </NavbarSection>
            </Navbar>
          }
          sidebar={
            <Sidebar>
              <SidebarHeader>
                <Dropdown>
                  <DropdownButton as={SidebarItem}>
                    <SidebarLabel>PrismColor</SidebarLabel>
                    <ChevronDownIcon />
                  </DropdownButton>
                  <DropdownMenu
                    className="min-w-80 lg:min-w-64"
                    anchor="bottom start"
                  >
                    <DropdownItem href="/settings">
                      <Cog8ToothIcon />
                      <DropdownLabel>Settings</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="#">
                      <Avatar slot="icon" src="/teams/catalyst.svg" />
                      <DropdownLabel>PrismColor</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="#">
                      <PlusIcon />
                      <DropdownLabel>New team&hellip;</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </SidebarHeader>

              <ClientSidebar />
            </Sidebar>
          }
        >
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
