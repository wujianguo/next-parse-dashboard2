import { Menu, MenuItem } from "@/components/menu";

interface AppLayoutProps {
  children: React.ReactNode;
  params: { app: string };
}

export default function AppLayout({ children, params }: AppLayoutProps) {
  const items: MenuItem[] = [
    {
      title: "Overview",
      link: "overview",
      icon: 'activity',
    }, {
      title: "Core",
      icon: 'database',
      children: [
        {
          title: "Browser",
          link: "browser",
        }, {
          title: "Webhooks",
          link: "webhooks",
        }, {
          title: "Jobs",
          link: "jobs",
        }, {
          title: "Logs",
          link: "logs",
        }
      ]
    }, {
      title: "Push",
      icon: 'bell',
      children: [
        {
          title: "Audiences",
          link: "audiences",
        }
      ]
    }
  ];
  const prefix = `/apps/${params.app}/`;
  return (
    <div>
      <div className="fixed inset-0 top-16 z-20 w-full overflow-y-auto px-4 py-2 lg:right-auto lg:w-[13.5rem]">
        <Menu items={items} prefix={prefix} root={true} />
      </div>
      <div className="lg:pl-[13.5rem]">
        {children}
      </div>
    </div>
  );

}
