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
import { DashboardSidebar } from '@platform/components/app-sidebar';
import { DashboardHeader } from '@platform/components/app-header';
import { DocumentResult } from '@platform/components/app-result';
import { useQuery } from '@tanstack/react-query';
import { createDocument, getDocument } from '@core/lib/documents';
import { useToast } from '@core/hooks/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState('general');
  const [documentText, setDocumentText] = useState('');
  const [docId, setDocId] = useState<string | null>(null);
  const [result, setResult] = useState<null | {
    simplified: string;
    highlights: Array<{
      text: string;
      type: 'normal' | 'caution' | 'important';
    }>;
  }>(null);
  const { data: doc, isFetching } = useQuery({
    queryKey: ['doc', docId],
    queryFn: () => getDocument(docId!), // ! – we know it's not null when enabled
    enabled: !!docId,
    refetchInterval: ({ state }) => (state.data?.status === 'PENDING' ? 3000 : false), // poll while pending
  });
  const [error, setError] = useState<string | null>(null);

  const isProcessing = !!docId && (!doc || doc.status === 'PENDING');
  const resultReady = doc?.status === 'COMPLETED';
  const failed = doc?.status === 'FAILED';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!documentText.trim()) {
      toast({
        title: 'Error',
        description: 'Please paste some text',
        variantStyle: 'error',
      });
      return;
    }
    try {
      const created = await createDocument({
        type: documentType.toUpperCase(),
        text: documentText,
        // TODO: if file – call /documents/upload first and put file meta here
      });
      setDocId(created.id); // triggers polling
    } catch (err: any) {
      toast({
        title: 'Error',
        description: 'Upload failed',
        variantStyle: 'error',
      });
    }
  }

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
                    {!resultReady && (
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
                              {/* <SelectItem value="financial">Financial</SelectItem> */}
                              {/* <SelectItem value="general">General</SelectItem> */}
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
                        {failed && (
                          <p className="text-destructive">
                            Sorry, LLM failed: {doc?.error ?? 'Unknown error'}
                          </p>
                        )}
                      </form>
                    )}
                    {resultReady && doc?.simplified && (
                      <DocumentResult
                        result={{ simplified: doc.simplified, highlights: [] }} // ← parse highlights later
                        onReset={handleReset}
                      />
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
