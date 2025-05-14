import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LeaderboardProps {
  data: Array<{
    rank: number;
    address: string;
    [key: string]: any;
  }>;
  valueKey: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ data, valueKey, valuePrefix = '', valueSuffix = '' }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.rank}>
            <TableCell className="font-medium">{item.rank}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell className="text-right">
              {valuePrefix}{item[valueKey].toLocaleString()}{valueSuffix}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
