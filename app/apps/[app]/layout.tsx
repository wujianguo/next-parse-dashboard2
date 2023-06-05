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
    <div className="grid lg:grid-cols-7">
      <div className="w-full overflow-y-auto px-4 py-2">
        <Menu items={items} prefix={prefix} root={true} />
      </div>
      <div className="col-span-3 lg:col-span-5">
        {children}
      </div>
    </div>
  );

//   <div>
//   <div className="fixed flex w-full px-4 py-2 lg:w-80">
//     <Menu items={items} prefix={prefix} root={true} />
//   </div>
//   <div className="lg:border-l lg:pl-60">
//     {children}
//   </div>
// </div>

}
