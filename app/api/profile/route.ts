import { NextResponse } from 'next/server';

// This would be replaced with your actual database in a production environment
let profiles: { [key: string]: any } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  return NextResponse.json({ profile: profiles[address] || null });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { walletAddress, ...profileData } = body;

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  // In a real application, you would validate the data and save it to a database
  profiles[walletAddress] = profileData;

  return NextResponse.json({ success: true, message: 'Profile updated successfully' });
}
