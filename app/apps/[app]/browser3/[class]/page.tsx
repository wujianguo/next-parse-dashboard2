'use client';

import Parse from 'parse';
// import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
// import { z } from "zod"

import { columns2, getColumns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import AppSwitcher from "../../components/app-switcher"
import { useEffect, useMemo, useState } from "react";
import { useSchemas } from '../hooks/schema';
import { ColumnDef } from '@tanstack/react-table';
// import { taskSchema } from "./data/schema"

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "app/apps/[app]/browser/[class]/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())
//   return tasks;

// }

export default function IndexPage({ params }: { params: { app: string, class: string }}) {
  const [objects, setObjects] = useState<Parse.Object[]>([]);
  useEffect(() => {
    const object = Parse.Object.extend(params.class);
    const query = new Parse.Query(object);
    query.find({useMasterKey: true}).then((results) => {
      setObjects(results);
    });
  }, [params.app, params.class]);

  const schemas = useSchemas();
  const [schema, setSchema] = useState<Parse.RestSchema>();
  const [columns, setColumns] = useState(columns2);
  useMemo(() => {
    let schema;
    if (params.class.startsWith('_')) {
      schema = schemas[0].find((schema) => schema.className === params.class);
    } else {
      schema = schemas[1].find((schema) => schema.className === params.class);
    }
    if (schema) {
      setSchema(schema);
      setColumns(getColumns(schema));
    }
  }, [schemas, params.class]);

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div> */}
      {/* <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <AppSwitcher classList={['']} currentClass={params.class} onSelectClass={(className) => { }} onNewClass={(className) => { }} />
        </div>
        <DataTable data={tasks} columns={columns} />
      </div> */}
      {/* <div> */}
        {/* {schemas[0].length} */}
      {/* </div> */}
      <DataTable data={objects} columns={columns} schema={schema!} />
    </>
  )
}
