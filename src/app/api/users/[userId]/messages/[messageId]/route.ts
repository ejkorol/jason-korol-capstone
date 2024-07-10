import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { messageId: number, userId: number } }) {
  try {
    const { sender_id, recipient_id } = await db('messages')
      .where('id', params.messageId)
      .select('sender_id', 'recipient_id')
      .first();

    const [messages, recipientInfo] = await Promise.all([
      db('messages')
        .where(function() {
          this.where('sender_id', sender_id).andWhere('recipient_id', recipient_id)
          .orWhere('sender_id', recipient_id).andWhere('recipient_id', sender_id);
        })
        .join('users as senders', 'messages.sender_id', 'senders.id')
        .join('users as recipients', 'messages.recipient_id', 'recipients.id')
        .select(
          'messages.id as message_id',
          'messages.sender_id',
          'senders.username as sender_username',
          'senders.first_name as sender_name',
          'messages.recipient_id',
          'recipients.username as recipient_username',
          'recipients.first_name as recipient_name',
          'messages.content',
          'messages.created_at'
        )
        .orderBy('messages.created_at', 'asc'),
      db('users')
        .where('id', recipient_id)
        .select('id', 'username', 'first_name')
        .first()
    ]);

    const response = {
      messages,
      recipient: {
        id: recipientInfo.id,
        username: recipientInfo.username,
        name: recipientInfo.first_name
      }
    };

    return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
