import { Listing, AuditLog } from '@/types/listing';

 let mockListings: Listing[] = [
  {
    id: '1',
    title: 'BMW X5 - Perfect for Business Travel',
    description: 'Luxury SUV with premium features, perfect for business trips and family outings.',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    pricePerDay: 120,
    location: 'San Francisco, CA',
    imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'pending',
    submittedBy: 'user1@example.com',
    submittedAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Tesla Model 3 - Electric Excellence',
    description: 'Clean, efficient electric vehicle with autopilot features and premium interior.',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    pricePerDay: 95,
    location: 'Los Angeles, CA',
    imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'approved',
    submittedBy: 'user2@example.com',
    submittedAt: '2024-01-14T14:20:00Z',
    lastModified: '2024-01-14T16:45:00Z',
    modifiedBy: 'admin'
  },
  {
    id: '3',
    title: 'Mercedes-Benz C-Class - Premium Sedan',
    description: 'Elegant sedan with sophisticated design and advanced safety features.',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    pricePerDay: 85,
    location: 'New York, NY',
    imageUrl: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'approved',
    submittedBy: 'user3@example.com',
    submittedAt: '2024-01-13T09:15:00Z',
    lastModified: '2024-01-13T11:30:00Z',
    modifiedBy: 'admin'
  },
  {
    id: '4',
    title: 'Audi A4 - Sporty Performance',
    description: 'Dynamic sedan with sport-tuned suspension and premium technology package.',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    pricePerDay: 90,
    location: 'Chicago, IL',
    imageUrl: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'rejected',
    submittedBy: 'user4@example.com',
    submittedAt: '2024-01-12T16:00:00Z',
    lastModified: '2024-01-12T18:30:00Z',
    modifiedBy: 'admin'
  },
  {
    id: '5',
    title: 'Honda Civic - Reliable Compact',
    description: 'Fuel-efficient compact car perfect for city driving and daily commutes.',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    pricePerDay: 45,
    location: 'Seattle, WA',
    imageUrl: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=800',
    status: 'pending',
    submittedBy: 'user5@example.com',
    submittedAt: '2024-01-11T12:45:00Z',
    lastModified: '2024-01-11T12:45:00Z'
  },
  {
    id: '6',
    title: 'Ford Mustang - American Icon',
    description: 'Classic American muscle car with powerful V8 engine and iconic design.',
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    pricePerDay: 110,
    location: 'Miami, FL',
    imageUrl: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'approved',
    submittedBy: 'user6@example.com',
    submittedAt: '2024-01-10T15:20:00Z',
    lastModified: '2024-01-10T17:00:00Z',
    modifiedBy: 'admin'
  }
];

let mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    listingId: '2',
    action: 'approve',
    adminId: '1',
    adminName: 'John Admin',
    timestamp: '2024-01-14T16:45:00Z',
    details: 'Approved Tesla Model 3 listing'
  },
  {
    id: '2',
    listingId: '3',
    action: 'approve',
    adminId: '1',
    adminName: 'John Admin',
    timestamp: '2024-01-13T11:30:00Z',
    details: 'Approved Mercedes-Benz C-Class listing'
  },
  {
    id: '3',
    listingId: '4',
    action: 'reject',
    adminId: '1',
    adminName: 'John Admin',
    timestamp: '2024-01-12T18:30:00Z',
    details: 'Rejected Audi A4 listing - insufficient documentation'
  },
  {
    id: '4',
    listingId: '6',
    action: 'approve',
    adminId: '1',
    adminName: 'John Admin',
    timestamp: '2024-01-10T17:00:00Z',
    details: 'Approved Ford Mustang listing'
  }
];

export function addAuditLog(log: Omit<AuditLog, 'id'>): AuditLog {
  const newLog: AuditLog = {
    ...log,
    id: Date.now().toString()
  };
  mockAuditLogs.unshift(newLog);
  return newLog;
}

export { mockListings, mockAuditLogs }
