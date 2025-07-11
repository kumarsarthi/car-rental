import { NextRequest, NextResponse } from 'next/server';
import { mockListings, addAuditLog } from '@/lib/mock-data';
import { getAuthUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const listing = mockListings.find(l => l.id === params.id);
  
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  return NextResponse.json(listing);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedData = await request.json();
    const listingIndex = mockListings.findIndex(l => l.id === params.id);
    
    if (listingIndex === -1) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const updatedListing = {
      ...mockListings[listingIndex],
      ...updatedData,
      lastModified: new Date().toISOString(),
      modifiedBy: user.username
    };

    mockListings[listingIndex] = updatedListing;

    // Add audit log
    addAuditLog({
      listingId: params.id,
      action: 'edit',
      adminId: user.id,
      adminName: user.name,
      timestamp: new Date().toISOString(),
      details: `Updated listing: ${updatedListing.title}`
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}