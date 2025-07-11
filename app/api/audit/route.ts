import { NextRequest, NextResponse } from 'next/server';
import { mockAuditLogs } from '@/lib/mock-data';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = getAuthUser(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(mockAuditLogs);
}