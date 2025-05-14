import { NextResponse } from 'next/server';

const mockMessages = [
  { id: '1', sender: 'Alice', content: 'Hey everyone! How\'s the market looking today?', timestamp: new Date('2023-05-10T10:00:00Z'), profilePhoto: '/placeholder.svg?height=32&width=32' },
  { id: '2', sender: 'Bob', content: 'Pretty volatile, but our $METAL is holding strong!', timestamp: new Date('2023-05-10T10:05:00Z'), profilePhoto: '/placeholder.svg?height=32&width=32' },
  { id: '3', sender: 'Charlie', content: 'I just increased my stake. Feeling bullish!', timestamp: new Date('2023-05-10T10:10:00Z'), profilePhoto: '/placeholder.svg?height=32&width=32' },
];

let profiles: { [key: string]: any } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'getProfile') {
    const address = searchParams.get('address');
    return NextResponse.json({ profile: profiles[address || ''] || null });
  }

  return NextResponse.json({ messages: mockMessages });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === 'updateProfile') {
    const { address, profile } = body;
    profiles[address] = profile;
    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  }

  if (body.message) {
    const newMessage = {
      id: Date.now().toString(),
      sender: body.message.sender,
      content: body.message.content,
      timestamp: new Date(),
      profilePhoto: body.message.profilePhoto || `/placeholder.svg?height=32&width=32`,
    };
    mockMessages.push(newMessage);
    return NextResponse.json({ success: true, message: newMessage });
  }

  return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
}
