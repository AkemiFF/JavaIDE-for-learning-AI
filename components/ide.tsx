'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import { useState } from 'react'
import { CodeEditor } from './code-editor'
import { ErrorConsole } from './error-console'
import { ResultView } from './result-view'
import LoadingSpinner from './spinner'
import { Suggestions } from './suggestions'

const base = '// Write your Java code here\n public class Temp {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}'
export function IDE() {
  const [code, setCode] = useState<string>(base)
  const [errors, setErrors] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [result, setResult] = useState<string>('')
  const [isResultVisible, setIsResultVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const executeJavaCode = async () => {
    setResult('');

    try {

      const response = await fetch('/api/compileJava', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ javaCode: code }),
      });




      const data = await response.json();

      if (response.ok) {

        setResult(data.output);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // setErrors(err);
    }
  };
  const fetchJavaCodeAnalysis = async () => {
    try {
      const response = await fetch('/api/javaAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          javaCode: code
        }),
      });

      const data = await response.json();

      if (data.response) {
        console.log("raw data", data);
        const parsedResponse = JSON.parse(data.response); // Analyser la chaîne JSON
        const errors = parsedResponse.erreurs && parsedResponse.erreurs.length > 0
          ? parsedResponse.erreurs
          : ["Aucune erreur détectée"]; // Valeur par défaut si vide

        const suggestions = parsedResponse.suggestions && parsedResponse.suggestions.length > 0
          ? parsedResponse.suggestions
          : ["Aucune suggestion disponible"]; // Valeur par défaut si vide



        setErrors(errors);
        setSuggestions(suggestions);

        console.log("res.erreurs:", errors);
        console.log("res.suggestions:", suggestions);
      } else {
        console.error('Aucune réponse de l\'API');
      }
      return data.response;
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleRun = async () => {
    try {
      setErrors([]);
      setSuggestions([]);
      setIsLoading(true);
      await fetchJavaCodeAnalysis();
      await executeJavaCode();
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
    }
  }

  const toggleResultView = () => {
    setIsResultVisible(!isResultVisible)
  }

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <LoadingSpinner visible={isLoading} />
      <div className="col-span-3 flex flex-col">
        <div className={`flex-grow ${isResultVisible ? 'h-2/3' : 'h-full'}`}>
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
          />
        </div>
        {isResultVisible && (
          <div className="h-1/3 mt-4">
            <ResultView result={result} />
          </div>
        )}
        <Button
          className="mt-2 w-full bg-gray-700 hover:bg-gray-600 text-xs"
          onClick={toggleResultView}
        >
          {isResultVisible ? (
            <>
              <ChevronDown className="mr-1 h-3 w-3" />
              Hide Result
            </>
          ) : (
            <>
              <ChevronUp className="mr-1 h-3 w-3" />
              Show Result
            </>
          )}
        </Button>
      </div>
      <div className="col-span-1 space-y-4 flex flex-col h-full">
        <div className="flex-1">
          <ErrorConsole errors={errors} />
        </div>
        <div className="flex-1">
          <Suggestions suggestions={suggestions} />
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Button
          className="bg-green-500 hover:bg-green-600 text-xs"
          onClick={handleRun}
        >
          <Play className="mr-1 h-3 w-3" />
          Run
        </Button>
      </div>
    </div>
  )
}

