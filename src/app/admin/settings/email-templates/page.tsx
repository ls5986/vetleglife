'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState({
    client_completion: { subject: '', html: '' },
    rep_completion: { subject: '', html: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await fetch('/api/admin/email-templates');
        const json = await resp.json();
        if (!json?.success) throw new Error(json?.error || 'Failed to load templates');
        setTemplates(json.templates);
      } catch (e) {
        setError((e as any)?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      const resp = await fetch('/api/admin/email-templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templates })
      });
      const json = await resp.json();
      if (!json?.success) throw new Error(json?.error || 'Failed to save');
      alert('Templates saved');
    } catch (e) {
      alert('Failed to save templates');
      console.error(e);
    }
  };

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Email Templates</h2>
        <p className="text-gray-600">Manage the emails sent by your funnels.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Subject</Label>
            <Input
              value={templates.client_completion.subject}
              onChange={(e) => setTemplates({ ...templates, client_completion: { ...templates.client_completion, subject: e.target.value } })}
            />
          </div>
          <div>
            <Label>HTML</Label>
            <textarea
              className="w-full border rounded-md p-2 text-sm h-40"
              value={templates.client_completion.html}
              onChange={(e) => setTemplates({ ...templates, client_completion: { ...templates.client_completion, html: e.target.value } })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rep Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Subject</Label>
            <Input
              value={templates.rep_completion.subject}
              onChange={(e) => setTemplates({ ...templates, rep_completion: { ...templates.rep_completion, subject: e.target.value } })}
            />
          </div>
          <div>
            <Label>HTML</Label>
            <textarea
              className="w-full border rounded-md p-2 text-sm h-40"
              value={templates.rep_completion.html}
              onChange={(e) => setTemplates({ ...templates, rep_completion: { ...templates.rep_completion, html: e.target.value } })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Templates</Button>
      </div>
    </div>
  );
}


