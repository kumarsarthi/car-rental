'use client';

import { useState } from 'react';
import { Listing } from '@/types/listing';
import { useFeedback } from '@/contexts/FeedbackContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Check, X, Edit, Calendar, User, MapPin, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ListingsTableProps {
  listings: Listing[];
  onListingUpdate: (updater: (prev: Listing[]) => Listing[]) => void;
}

export function ListingsTable({ listings, onListingUpdate }: ListingsTableProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const { addMessage } = useFeedback();
  const router = useRouter();

  const handleAction = async (listingId: string, action: 'approve' | 'reject') => {
    setLoadingAction(`${action}-${listingId}`);
    
    try {
      const response = await fetch(`/api/listings/${listingId}/${action}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedListing = await response.json();
        onListingUpdate(prev => 
          prev.map(listing => 
            listing.id === listingId ? updatedListing : listing
          )
        );
        addMessage('success', `Listing ${action}d successfully`);
      } else {
        addMessage('error', `Failed to ${action} listing`);
      }
    } catch (error) {
      addMessage('error', `Error ${action}ing listing`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleEdit = (listingId: string) => {
    router.push(`/dashboard/edit/${listingId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
    }
  };

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No listings found matching your criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Car Rental Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id} className="hover:bg-gray-50">
                  <TableCell>
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate">{listing.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{listing.make} {listing.model}</div>
                      <div className="text-gray-500">{listing.year}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {listing.pricePerDay}/day
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {listing.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(listing.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(listing.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1" />
                        {listing.submittedBy}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(listing.id)}
                        className="flex items-center space-x-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </Button>
                      {listing.status === 'pending' && (
                        <>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check className="h-3 w-3" />
                                <span>Approve</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Approve Listing</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to approve this listing? This will make it visible to customers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleAction(listing.id, 'approve')}
                                  disabled={loadingAction === `approve-${listing.id}`}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  {loadingAction === `approve-${listing.id}` ? 'Approving...' : 'Approve'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-3 w-3" />
                                <span>Reject</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Reject Listing</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to reject this listing? This action can be reversed later.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleAction(listing.id, 'reject')}
                                  disabled={loadingAction === `reject-${listing.id}`}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {loadingAction === `reject-${listing.id}` ? 'Rejecting...' : 'Reject'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}