'use client';

import { useEffect } from "react";
import Parse from 'parse';
import { SchemaProvider, SchemasActionType, useSchemaDispatch } from "./hooks/schema";


interface AppLayoutProps {
  children: React.ReactNode;
  params: { class: string };
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useSchemaDispatch();
  useEffect(() => {
    Parse.Schema.all().then((schemaList) => {
      dispatch({ type: SchemasActionType.Init, schemas: schemaList });
    });
  }, [dispatch]);
  return (<>
    {children}
  </>
  );
}

export default function Layout({ children, params }: AppLayoutProps) {
  return (
    <SchemaProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </SchemaProvider>
  );
}
