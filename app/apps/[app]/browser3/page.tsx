'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, UserCog, Users, AirVent } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Parse from 'parse';
import { useEffect, useState } from 'react';
import { useSchemas } from './hooks/schema';

function ClassCard({ className }: { className: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const object = Parse.Object.extend(className);
    const query = new Parse.Query(object);
    query.count().then((count) => {
      setCount(count);
    }).catch((error) => {
      console.error(error);
    });
  });
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {className}
        </CardTitle>
        {className === '_User' && (<Users className="h-4 w-4 text-muted-foreground" />)}
        {className === '_Role' && (<UserCog className="h-4 w-4 text-muted-foreground" />)}
        {className === '_Installation' && (<Activity className="h-4 w-4 text-muted-foreground" />)}
        {className === '_Session' && (<AirVent className="h-4 w-4 text-muted-foreground" />)}

      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
}

export default function IndexPage() {
  const schemas = useSchemas();
  const pathname = usePathname();
  return (
      <div className='px-4 py-2'>
        <div className="grid gap-4 py-2 md:grid-cols-2 lg:grid-cols-4">
          {schemas[0].map((schema) => (
            <Link key={schema.className} href={`${pathname}/${schema.className}`}>
              <ClassCard className={schema.className}></ClassCard>
            </Link>
          ))}
        </div>
        <div className="grid gap-4 py-2 md:grid-cols-2 lg:grid-cols-4">
          {schemas[1].map((schema) => (
            <Link key={schema.className} href={`${pathname}/${schema.className}`}>
              <ClassCard className={schema.className}></ClassCard>
            </Link>
          ))}
        </div>
      </div>
  );
}
