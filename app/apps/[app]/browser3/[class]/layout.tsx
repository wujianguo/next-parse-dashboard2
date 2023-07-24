'use client';

import AppSwitcher from "../../components/app-switcher";


interface AppLayoutProps {
  children: React.ReactNode;
  params: { class: string };
}

export default function Layout({ children, params }: AppLayoutProps) {

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {/* <div className="flex items-center justify-between space-y-2"> */}
        {/* <AppSwitcher classList={[params.class, 'xyz']} currentClass={params.class} onSelectClass={(className) => { }} onNewClass={(className) => { }} /> */}
      {/* </div> */}
      {children}
    </div>
  );

}
