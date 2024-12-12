import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY; // Clé API fournie
const BASE_URL = 'https://api.aimlapi.com/chat/completions'; // Point de terminaison correct

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body || !body.messages) {
            return NextResponse.json(
                { error: 'Le corps de la requête doit inclure `messages`.' },
                { status: 400 }
            );
        }

        const { messages } = body;

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Erreur avec la requête API.', statusCode: response.status },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'appel API.', details: (error as Error).message },
            { status: 500 }
        );
    }
}
