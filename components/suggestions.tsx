import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
interface SuggestionsProps {
  suggestions: string[];
}

export function Suggestions({ suggestions = [] }: SuggestionsProps) {
  return (
    <Card className="h-full bg-[#1e1e1e]/90 border-purple-500/50 backdrop-blur-sm">
      <CardHeader className="py-2 bg-[#1e1e1e]/50">
        <CardTitle className="text-purple-500 text-sm">Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="p-2 h-[calc(100%-2.5rem)]">
        <ScrollArea className="h-full w-full">
          {suggestions.length > 0 ? (
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-purple-400 text-xs">
                  • {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs">No suggestions available</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

