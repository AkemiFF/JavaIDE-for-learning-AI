import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ErrorConsoleProps {
  errors: string[]
}

export function ErrorConsole({ errors = [] }: ErrorConsoleProps) {
  return (
    <Card className="h-full bg-[#1e1e1e]/90 border-red-500/50 backdrop-blur-sm">
      <CardHeader className="py-2 bg-[#1e1e1e]/50">
        <CardTitle className="text-red-500 text-sm">Error Console</CardTitle>
      </CardHeader>
      <CardContent className="p-2 h-[calc(100%-2.5rem)]">
        <ScrollArea className="h-full w-full">
          {errors.length > 0 ? (
            <ul className="space-y-2">
              {errors.map((suggestion, index) => (
                <li key={index} className="text-purple-400 text-xs">
                  • {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs">No errors available</p>
          )}

        </ScrollArea>
      </CardContent>
    </Card>
  )
}

