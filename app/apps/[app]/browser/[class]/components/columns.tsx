"use client"

import { ColumnDef } from "@tanstack/react-table"
import Parse from "parse"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { DataTableCell, CellObject } from "./data-table-cell"

export const defaultColumns: ColumnDef<CellObject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="objectId" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];


export function getColumns(schema: Parse.RestSchema): ColumnDef<CellObject>[] {
  const columnList: ColumnDef<CellObject>[] = [];
  columnList.push({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  });
  for (const field in schema.fields) {
    columnList.push({
      id: field,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field} />
      ),
      cell: ({ row }) => {
        // let content;
        // if (field === 'objectId') {
        //   content = row.original.id;
        // } else if (field === 'ACL') {
        //   content = row.original.getACL();
        //   if (!content) {
        //     content = schema.classLevelPermissions;
        //   }
        // } else {
        //   content = row.original.get(field);
        // }
        return (
          // <div className="flex space-x-2">
          // {label && <Badge variant="outline">{label.label}</Badge>}
          <DataTableCell field={field} row={row} schema={schema} />
          // <span className="max-w-[100px]">
          //   {content ? content.toString() : ''}
          // </span>
          // </div>
        );
        // return <div className="w-[80px]">{xx ? xx.toString() : ''}</div>
      },
      enableSorting: true,
      enableHiding: true,  
    });
  }
  // columnList.push({
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // });
  return columnList;
}
