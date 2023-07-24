"use client"

import { Row } from "@tanstack/react-table";
import Parse from "parse"

export interface CellObject {
  id: string;
  // label: string;

  get(key: string): any;

  getACL(): Parse.ACL | undefined;

  attributes: any;
}

interface DataTableCellProps {
  field: string;
  row: Row<CellObject>;
  schema: Parse.RestSchema;
}

export function DataTableCell({
  field,
  row,
  schema,
}: DataTableCellProps) {
  let content;
  if (field === 'objectId') {
    content = row.original.id;
  } else if (field === 'ACL') {
    content = row.original.getACL();
    if (!content) {
      content = schema.classLevelPermissions;
    }
  } else {
    if (schema.fields[field].type === 'String') {
      content = row.original.get(field);
    } else if (schema.fields[field].type === 'Date') {
      content = row.original.get(field).toLocaleString();
    }
    // console.log(content);
    // console.log(row.original.attributes);
    // console.log(row.original.attributes);
  }

  return (
    <span className="max-w-[100px]">
      {content ? content.toString() : ''}
    </span>
  );
}
