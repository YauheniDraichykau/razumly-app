'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Card,
  CardContent,
  Button,
} from '@core/ui';
import { DashboardSidebar } from '@platform/components/dashboard-sidebar';
import { DashboardHeader } from '@platform/components/dashboard-header';
import { DocumentResult } from '@platform/components/document-result';

export default function Dashboard() {
  const [documentType, setDocumentType] = useState('general');
  const [documentText, setDocumentText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<null | {
    simplified: string;
    highlights: Array<{
      text: string;
      type: 'normal' | 'caution' | 'important';
    }>;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentText.trim()) {
      setError('Please enter some text to simplify');
      return;
    }

    setIsProcessing(true);
    setError(null);

    setTimeout(() => {
      try {
        const mockResults: Record<string, any> = {
          medical: {
            simplified:
              'Your blood pressure is a bit high. The doctor recommends eating less salt and exercising more. You should take this medicine once a day with food.',
            highlights: [
              { text: 'Your blood pressure is a bit high.', type: 'normal' },
              {
                text: 'The doctor recommends eating less salt and exercising more.',
                type: 'caution',
              },
              {
                text: 'You should take this medicine once a day with food.',
                type: 'important',
              },
            ],
          },
          legal: {
            simplified:
              "This contract says you'll work for the company for 2 years. You'll be paid monthly. You can't work for competitors during this time.",
            highlights: [
              {
                text: "This contract says you'll work for the company for 2 years.",
                type: 'normal',
              },
              { text: "You'll be paid monthly.", type: 'normal' },
              {
                text: "You can't work for competitors during this time.",
                type: 'important',
              },
            ],
          },
          financial: {
            simplified:
              'Your account has $5,000. Last month, you spent $1,200. You saved $300. Your biggest expense was groceries.',
            highlights: [
              { text: 'Your account has $5,000.', type: 'normal' },
              { text: 'Last month, you spent $1,200.', type: 'caution' },
              { text: 'You saved $300.', type: 'normal' },
              { text: 'Your biggest expense was groceries.', type: 'normal' },
            ],
          },
          general: {
            simplified:
              'This document explains how to set up your new device. First, charge it for 2 hours. Then, turn it on and follow the on-screen instructions.',
            highlights: [
              {
                text: 'This document explains how to set up your new device.',
                type: 'normal',
              },
              { text: 'First, charge it for 2 hours.', type: 'important' },
              {
                text: 'Then, turn it on and follow the on-screen instructions.',
                type: 'normal',
              },
            ],
          },
        };

        setResult(mockResults[documentType] || mockResults.general);
        setIsProcessing(false);
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setDocumentText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-6 text-2xl font-bold md:text-3xl">Document Simplifier</h1>

            <Tabs defaultValue="simplify" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="simplify">Simplify Document</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="simplify">
                <Card>
                  <CardContent className="p-6">
                    {!result ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="document-type" className="text-sm font-medium">
                            Document Type
                          </label>
                          <Select value={documentType} onValueChange={setDocumentType}>
                            <SelectTrigger id="document-type" className="w-full md:w-1/3">
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="general">General</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="document-text" className="text-sm font-medium">
                            Paste Your Document Text
                          </label>
                          <Textarea
                            id="document-text"
                            placeholder="Paste or type your document text here..."
                            className="min-h-[200px] resize-y"
                            value={documentText}
                            onChange={(e) => setDocumentText(e.target.value)}
                          />
                        </div>

                        {error && (
                          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
                            {error}
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <Button
                            type="submit"
                            className="bg-primary hover:bg-primary-hover"
                            disabled={isProcessing}
                          >
                            {isProcessing ? 'Processing...' : 'Explain Document'}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isProcessing || !documentText}
                          >
                            Clear
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <DocumentResult result={result} onReset={handleReset} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="mb-4 text-muted-foreground/70">
                        Your document history will appear here.
                      </p>
                      <Button variant="outline" onClick={() => {}} className="mt-2">
                        Go to Simplifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
