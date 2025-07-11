import { Suspense } from 'react';
import { DashboardContent } from '@/components/DashboardContent';
import { mockListings } from '@/lib/mock-data';
import { Listing } from '@/types/listing';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getListings(): Promise<Listing[]> {
  await delay(100); // Simulate API call
  return mockListings;
}

export default async function DashboardPage() {
  const listings = await getListings();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent initialListings={listings} />
    </Suspense>
  );
}