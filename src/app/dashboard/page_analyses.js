'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AnalysisTable from '@/components/AnalysisTable';

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchAnalyses(token);
  }, []);

  async function fetchAnalyses(token) {
    try {
      const res = await fetch('/api/analyses', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await res.json();
      setAnalyses(data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalysisTable analyses={analyses} />
        </CardContent>
      </Card>
    </div>
  );
}
