'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestAPIPage() {
  const [results, setResults] = useState<{
    seed?: {
      message: string;
      products_added?: number;
      action?: string;
      existing_count?: number;
    };
    products?: {
      products: Array<Record<string, unknown>>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    };
    error?: string;
  }>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testSeedDatabase = async () => {
    setLoading('seed');
    try {
      const response = await fetch('/api/products/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResults(prev => ({ ...prev, seed: data, error: undefined }));
      console.log('Seed result:', data);
    } catch (error) {
      console.error('Seed error:', error);
      setResults(prev => ({ ...prev, error: `Seed failed: ${error}` }));
    } finally {
      setLoading(null);
    }
  };

  const testGetProducts = async () => {
    setLoading('products');
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setResults(prev => ({ ...prev, products: data, error: undefined }));
      console.log('Products result:', data);
    } catch (error) {
      console.error('Products error:', error);
      setResults(prev => ({ ...prev, error: `Get products failed: ${error}` }));
    } finally {
      setLoading(null);
    }
  };

  const checkEnvironment = () => {
    const env = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'Not set',
    };
    console.log('Environment variables:', env);
    return env;
  };

  const env = checkEnvironment();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Testing Dashboard</h1>
          <p className="text-gray-600">Test Supabase API endpoints for UAE Water Delivery</p>
        </div>

        {/* Environment Check */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(env).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium text-sm">{key}:</span>
                  <Badge variant={value === 'Set' ? 'default' : 'destructive'}>
                    {value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Seeding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Populate the database with sample products
              </p>
              <Button
                onClick={testSeedDatabase}
                disabled={loading === 'seed'}
                className="w-full"
              >
                {loading === 'seed' ? 'Seeding...' : 'Seed Database'}
              </Button>
              {results.seed && (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                  <pre className="overflow-auto max-h-32">
                    {JSON.stringify(results.seed, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Fetch all products from the database
              </p>
              <Button
                onClick={testGetProducts}
                disabled={loading === 'products'}
                variant="outline"
                className="w-full"
              >
                {loading === 'products' ? 'Loading...' : 'Get Products'}
              </Button>
              {results.products && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                  <div className="mb-2">
                    <strong>Found {results.products.products?.length || 0} products</strong>
                  </div>
                  <pre className="overflow-auto max-h-32">
                    {JSON.stringify(results.products.pagination, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {results.error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 bg-red-50 p-3 rounded border border-red-200">
                {results.error}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setResults({});
                  console.clear();
                }}
                variant="outline"
                size="sm"
              >
                Clear Results
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                size="sm"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => window.location.href = '/admin/dashboard'}
                variant="outline"
                size="sm"
              >
                Admin Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>1. First, check that all environment variables are set correctly</p>
            <p>2. Click "Seed Database" to populate with sample products</p>
            <p>3. Click "Get Products" to verify the data was inserted</p>
            <p>4. Check the browser console for detailed logs</p>
            <p>5. If seeding fails, check Supabase connection and credentials</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
