import { notFound } from 'next/navigation';
import { mockListings } from '@/lib/mock-data';
import { EditListingForm } from '@/components/EditListingForm';

interface EditListingPageProps {
  params: {
    id: string;
  };
}

export default function EditListingPage({ params }: EditListingPageProps) {
  const listing = mockListings.find(l => l.id === params.id);

  if (!listing) {
    notFound();
  }

  return <EditListingForm listing={listing} />;
}