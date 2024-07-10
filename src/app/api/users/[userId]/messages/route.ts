import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { userId: number } }) {
  try {
    const sentMessages = await db('messages')
      .whereIn('messages.id', function() {
        this.select(db.raw('MAX(id)'))
          .from('messages')
          .where('sender_id', params.userId)
          .groupBy('recipient_id');
      })
      .where('sender_id', params.userId)
      .join('users', 'messages.recipient_id', 'users.id')
      .select(
        'messages.id as message_id',
        'messages.sender_id',
        'messages.recipient_id',
        'messages.content',
        'messages.created_at',
        'users.username as recipient_username',
        'users.first_name as recipient_name'
      );

    const receivedMessages = await db('messages')
      .whereIn('messages.id', function() {
        this.select(db.raw('MAX(id)'))
          .from('messages')
          .where('recipient_id', params.userId)
          .groupBy('sender_id');
      })
      .where('recipient_id', params.userId)
      .join('users', 'messages.sender_id', 'users.id')
      .select(
        'messages.id as message_id',
        'messages.sender_id',
        'messages.recipient_id',
        'messages.content',
        'messages.created_at',
        'users.username as recipient_username',
        'users.first_name as recipient_name'
      );

    // Combine and deduplicate messages based on recipient_id
    const uniqueMessages = combineAndDeduplicateMessages(sentMessages, receivedMessages);

    return new Response(JSON.stringify(uniqueMessages), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

function combineAndDeduplicateMessages(sentMessages: any[], receivedMessages: any[]): any[] {
  const uniqueRecipientsMap = new Map<number, any>();

  // Add sentMessages to map
  sentMessages.forEach(message => {
    if (!uniqueRecipientsMap.has(message.recipient_id)) {
      uniqueRecipientsMap.set(message.recipient_id, message);
    }
  });

  // Add receivedMessages to map
  receivedMessages.forEach(message => {
    if (!uniqueRecipientsMap.has(message.sender_id)) {
      uniqueRecipientsMap.set(message.sender_id, message);
    }
  });

  // Convert map values back to array
  const uniqueMessages = Array.from(uniqueRecipientsMap.values());

  return uniqueMessages;
}

export async function POST(req: Request, { params }: { params: { userId: number } }) {
  try {
    const { recipient_id, content } = await req.json();

    if (!recipient_id) {
      return Response.json({ message: "Missing parameters" }, { status: 500 });
    };

    const payload = {
      sender_id: params.userId,
      recipient_id,
      content,
    };

    await db("messages").insert(payload);

    return Response.json(payload);
  } catch (e: any) {
    return Response.json(e.message, { status: 500 })
  };
};
