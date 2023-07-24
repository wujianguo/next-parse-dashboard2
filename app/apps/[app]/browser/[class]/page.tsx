'use client';

import Parse from 'parse';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {  defaultColumns, getColumns } from "./components/columns"
import { useEffect, useMemo, useState } from "react";
import { useSchemas } from '../hooks/schema';
import { DataTable } from './components/data-table';
import React from 'react';
import { DataTablePagination } from './components/data-table-pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { table } from 'console';
import { DataTableToolbar } from './components/data-table-toolbar';

export default function IndexPage({ params }: { params: { app: string, class: string }}) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [curPage, setCurPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const schemas = useSchemas();
  const [schema, setSchema] = useState<Parse.RestSchema>();
  const [total, setTotal] = useState(0);

  useMemo(() => {
    let schema;
    if (params.class.startsWith('_')) {
      schema = schemas[0].find((schema) => schema.className === params.class);
    } else {
      schema = schemas[1].find((schema) => schema.className === params.class);
    }
    if (schema) {
      setSchema(schema);
    }
  }, [schemas, params.class]);

  const [data, setData] = React.useState<Parse.Object[]>([]);
  React.useEffect(() => {
    const object = Parse.Object.extend(params.class);
    const query = new Parse.Query(object);
    query.skip((curPage - 1) * perPage);
    query.limit(perPage);
    query.find({useMasterKey: true}).then((results) => {
      setData(results);
    });

    query.count({useMasterKey: true}).then((count) => {
      setTotal(count);
    });
  }, [curPage, params.class, perPage]);

  // const [rowSelection, setRowSelection] = React.useState({})
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({})
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // )
  // const [sorting, setSorting] = React.useState<SortingState>([])


  const columns = schema ? getColumns(schema) : [];
  const table = useReactTable({
    data,
    columns,
    // state: {
    //   sorting,
    //   columnVisibility,
    //   rowSelection,
    //   columnFilters,
    // },
    getCoreRowModel: getCoreRowModel(),
  })

  // table.resetRowSelection();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {/* {schema && <DataTable schema={schema} />} */}
      <div className="space-y-4">
      {schema && <DataTableToolbar table={table} schema={schema} onSchemaChange={ (schema) => {
        router.push(`/apps/${params.app}/browser/${schema.className}`);
        // setSchema(schema);
        // table.resetRowSelection();
      }} />}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination 
        table={table} 
        total={total} 
        pageSize={perPage} 
        pageIndex={curPage} 
        setPageSize={ (pageSize) => {
          table.resetRowSelection();
          setPerPage(pageSize);
        }}
        setPageIndex={(pageIndex) => {
          table.resetRowSelection();
          setCurPage(pageIndex)
        }}
      />
    </div>

    </div>
  )
}
