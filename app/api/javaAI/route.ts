import { NextResponse } from 'next/server';

const apiKey = process.env.GPT_API_KEY;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body || !body.javaCode) {
            return NextResponse.json(
                { error: 'Le corps de la requête doit inclure `javaCode`.' },
                { status: 400 }
            );
        }


        const { javaCode } = body;

        // Construction du prompt pour l'IA
        const prompt = `
            Voici un code Java :
            \`\`\`
            ${javaCode}
            \`\`\`
            Analyser ce code et fournir un résultat sous forme de JSON avec deux parties :
            1. Une liste des erreurs potentielles dans le code, sous forme de tableau (ex: ["Erreur 1", "Erreur 2"]).
            2. Une liste de suggestions d'amélioration du code, sous forme de tableau (ex: ["Suggestion 1", "Suggestion 2"]).
            Le format JSON doit ressembler à ceci :
            {
              "erreurs": ["Erreur 1", "Erreur 2"],
              "suggestions": ["Suggestion 1", "Suggestion 2"]
            }
        `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                temperature: 0.7
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const chatbotResponse = data.choices[0].message.content;
            return NextResponse.json({ response: chatbotResponse });
        } else {
            return NextResponse.json(
                { error: data.error.message },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
