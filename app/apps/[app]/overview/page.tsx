'use client';

import Parse from 'parse';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [schemas, setSchemas] = useState<Parse.RestSchema[]>([]);
  useEffect(() => {
    Parse.Schema.all().then((schemaList) => {
      setSchemas(schemaList);
    });
  }, []);
  return (
    <div>overview {schemas.length}</div>
  );
}
