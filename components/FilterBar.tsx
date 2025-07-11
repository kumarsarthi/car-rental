'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  filter: 'all' | 'pending' | 'approved' | 'rejected';
  onFilterChange: (filter: 'all' | 'pending' | 'approved' | 'rejected') => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterBar({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  totalCount,
  filteredCount
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <Label htmlFor="status-filter" className="text-sm font-medium">
              Status:
            </Label>
            <Select value={filter} onValueChange={onFilterChange}>
              <SelectTrigger id="status-filter" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Showing {filteredCount} of {totalCount} listings
        </div>
      </div>
    </div>
  );
}