import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ResultViewProps {
  result: string
}

export function ResultView({ result }: ResultViewProps) {
  return (
    <Card className="h-full bg-[#1e1e1e]/90 border-green-500/50 backdrop-blur-sm">
      <CardHeader className="py-2 bg-[#1e1e1e]/50">
        <CardTitle className="text-green-500 text-sm">Result</CardTitle>
      </CardHeader>
      <CardContent className="p-2 h-[calc(100%-2.5rem)]">
        <ScrollArea className="h-full w-full">
          {result ? (
            <pre className="text-green-400 font-mono text-xs">{result}</pre>
          ) : (
            <p className="text-gray-400 text-xs">Run your code to see the output</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

