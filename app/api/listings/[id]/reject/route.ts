import { NextRequest, NextResponse } from 'next/server';
import { mockListings, addAuditLog } from '@/lib/mock-data';
import { getAuthUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const listingIndex = mockListings.findIndex(l => l.id === params.id);
  
  if (listingIndex === -1) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  const updatedListing = {
    ...mockListings[listingIndex],
    status: 'rejected' as const,
    lastModified: new Date().toISOString(),
    modifiedBy: user.username
  };

  mockListings[listingIndex] = updatedListing;

  // Add audit log
  addAuditLog({
    listingId: params.id,
    action: 'reject',
    adminId: user.id,
    adminName: user.name,
    timestamp: new Date().toISOString(),
    details: `Rejected listing: ${updatedListing.title}`
  });

  return NextResponse.json(updatedListing);
}