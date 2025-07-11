'use client';

import { useState, useMemo } from 'react';
import { Listing } from '@/types/listing';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ListingsTable } from '@/components/ListingsTable';
import { FilterBar } from '@/components/FilterBar';
import { AuditTrail } from '@/components/AuditTrail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardContentProps {
  initialListings: Listing[];
}

export function DashboardContent({ initialListings }: DashboardContentProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredListings = useMemo(() => {
    let filtered = listings;

    if (filter !== 'all') {
      filtered = filtered.filter(listing => listing.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [listings, filter, searchTerm]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings">Listings Management</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings" className="space-y-6">
              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                totalCount={listings.length}
                filteredCount={filteredListings.length}
              />
              <ListingsTable
                listings={filteredListings}
                onListingUpdate={setListings}
              />
            </TabsContent>
            
            <TabsContent value="audit">
              <AuditTrail />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
}