export interface Listing {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  location: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  lastModified: string;
  modifiedBy?: string;
}

export interface AuditLog {
  id: string;
  listingId: string;
  action: 'approve' | 'reject' | 'edit' | 'create';
  adminId: string;
  adminName: string;
  timestamp: string;
  details?: string;
}

export interface Admin {
  id: string;
  username: string;
  name: string;
  email: string;
}