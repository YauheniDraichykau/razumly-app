'use client';

import { Button } from '@core/ui';

interface DocumentResultProps {
  result: {
    simplified: string;
    highlights: Array<{
      text: string;
      type: 'normal' | 'caution' | 'important';
    }>;
  };
  onReset: () => void;
}

export const DocumentResult = ({ result, onReset }: DocumentResultProps) => {
  const getHighlightColor = (type: string) => {
    switch (type) {
      case 'normal':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'caution':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'important':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case 'normal':
        return '🟢';
      case 'caution':
        return '🟡';
      case 'important':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Simplified Explanation</h3>
        <div className="rounded-md border bg-white p-4">
          <p className="text-muted-foreground">{result.simplified}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Key Points</h3>
        <div className="space-y-3">
          {result.highlights.map((highlight, index) => (
            <div
              key={index}
              className={`rounded-md border p-3 ${getHighlightColor(highlight.type)}`}
            >
              <div className="flex items-start gap-2">
                <span>{getHighlightIcon(highlight.type)}</span>
                <p>{highlight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button
          type="button"
          className="bg-primary hover:bg-primary-hover"
          onClick={() => {
            // In a real app, this would save or export the result
            alert('Document saved to your history!');
          }}
        >
          Save Result
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Simplify Another Document
        </Button>
      </div>
    </div>
  );
};
