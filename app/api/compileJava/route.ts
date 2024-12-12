import { exec } from 'child_process';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// Fonction utilitaire pour exécuter des commandes shell et renvoyer une promesse
function execPromise(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { javaCode } = body;

        if (!javaCode || typeof javaCode !== 'string') {
            return NextResponse.json(
                { error: 'Le code Java est requis et doit être une chaîne de caractères.' },
                { status: 400 }
            );
        }

        const tempFileName = 'Temp.java';
        const tempFilePath = path.join(process.cwd(), tempFileName);

        // Écrire le code Java dans un fichier temporaire
        fs.writeFileSync(tempFilePath, javaCode);

        try {
            // Compiler le fichier Java
            await execPromise(`javac ${tempFilePath}`);

            // Exécuter le fichier compilé
            const output = await execPromise(`java -cp ${process.cwd()} Temp`);

            // Nettoyage des fichiers temporaires
            fs.unlinkSync(tempFilePath);
            fs.unlinkSync(path.join(process.cwd(), 'Temp.class'));

            return NextResponse.json(
                { output },
                { status: 200 }
            );
        } catch (err) {
            // Nettoyage en cas d'erreur de compilation ou d'exécution
            fs.unlinkSync(tempFilePath);
            fs.unlinkSync(path.join(process.cwd(), 'Temp.class'));

            return NextResponse.json(
                { error: err },
                { status: 400 }
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.json(
            { error: 'Une erreur interne est survenue.' },
            { status: 500 }
        );
    }
}
