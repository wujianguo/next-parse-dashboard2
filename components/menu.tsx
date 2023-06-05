'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";

export interface MenuItem {
  title: string;
  icon?: 'activity' | 'database' | 'bell';
  link?: string;
  children?: MenuItem[];
}

export interface MenuProps {
  items?: MenuItem[]
  prefix?: string;
  root?: boolean;
}

export function Menu({ items, prefix, root }: MenuProps) {
  const icon = {
    activity: <Icons.activity className="h-4 w-4" />,
    database: <Icons.database className="h-4 w-4" />,
    bell: <Icons.bell className="h-4 w-4" />,
  }
  const pathname = usePathname();
  return (
    <ul>
      {items?.map((item) =>
        item.link ?
          <li key={item.title}>
            <Link href={`${prefix}${item.link}`} className={`${buttonVariants({ size: 'sm', variant: pathname.startsWith(`${prefix}${item.link}`) ? 'secondary' : 'ghost' }).replace('justify-center', '')} my-1 w-full ${root ? '' : 'px-9'}`}>
              {item.icon ? 
              <div className="flex items-center gap-x-2">
                {icon[item.icon]}
                <span>{item.title}</span>
              </div> : <span>{item.title}</span>
              }

            </Link>
          </li> :
          <li key={item.title}>
            <Accordion type="multiple" defaultValue={[item.title]} className="w-full">
              <AccordionItem value={item.title}>
                <AccordionTrigger className={`${buttonVariants({variant: 'ghost'}).replace('justify-center', '')} px-3 py-2`}>
                  {item.icon ?
                  <div className="flex items-center gap-x-2">
                    {icon[item.icon]}
                    <span>{item.title}</span>
                  </div> : <span>{item.title}</span>
                  }
                </AccordionTrigger>
                <AccordionContent>
                  <Menu items={item.children} prefix={prefix} root={false} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
      )}
    </ul>
  );
}
