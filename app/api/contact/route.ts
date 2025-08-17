// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body || {};

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID!; // masalan: -4980191958

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { error: "Server not configured (telegram envs missing)" },
        { status: 500 }
      );
    }

    const text =
      `🆕 *Yangi lead*\n` +
      `👤 *Ism:* ${escapeMd(name)}\n` +
      `📧 *Email:* ${escapeMd(email)}\n` +
      `📱 *Telefon:* ${escapeMd(phone)}\n` +
      `📝 *Xabar:*\n${escapeMd(message)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    });

    const json = await tgRes.json();
    if (!json.ok) {
      console.error("Telegram error:", json);
      return NextResponse.json({ error: "Telegram send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escapeMd(text: string) {
  return String(text).replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}
