'use client';

import { DataTable, HeaderWithSort } from '@/components/client';
import { Checkbox } from '@/components/ui';
import { JobWithPayload, ColumnDef } from '@/types';
import { formatTime } from '@/lib/utils';
import { ActionMenu } from './ActionMenu';
import { addDays } from 'date-fns';

export const columns: ColumnDef<JobWithPayload>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        size="sm"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        size="sm"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <HeaderWithSort
        title="Name"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <span>Description</span>,
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'employment',
    header: ({ column }) => (
      <HeaderWithSort
        title="Employment"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => (
      <div className="font-bold">{row.getValue('employment')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <HeaderWithSort
        title="Created At"
        className="justify-end"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => {
      const formatted = formatTime(row.getValue('createdAt'));

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: 'expiredIn',
    header: ({ column }) => (
      <HeaderWithSort
        title="Expired At"
        className="justify-end"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => {
      const expiredAt = addDays(
        new Date(row.getValue('createdAt')),
        row.getValue('expiredIn')
      );
      const formatted = formatTime(expiredAt);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionMenu job={row.original} />,
  },
];

export type JobListProps = {
  data?: JobWithPayload[];
};

export const JobTable = ({ data }: JobListProps) => {
  return (
    <div className="w-full min-w-max max-w-full">
      <DataTable data={data} columns={columns} filterKey="name" />
    </div>
  );
};
