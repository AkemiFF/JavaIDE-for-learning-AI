'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <Card className="h-full bg-[#1e1e1e]/90 border-cyan-500/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="py-2 bg-[#1e1e1e]/50">
        <CardTitle className="text-cyan-500 text-sm">Code Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-2.5rem)]">
        <MonacoEditor
          height="100%"
          defaultLanguage="java"
          defaultValue={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            roundedSelection: false,
            renderLineHighlight: 'all',
            fontFamily: 'Fira Code, monospace',
          }}
        />
      </CardContent>
    </Card>
  )
}

