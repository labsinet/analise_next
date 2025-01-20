'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AnalysisTable from '@/components/AnalysisTable';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { t } = useTranslation('common');
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('all');
  const [analyses, setAnalyses] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch analyses when session is available
  useEffect(() => {
    if (session?.user) {
      fetchAnalyses();
    }
  }, [session]);

  async function fetchAnalyses() {
    try {
      const res = await fetch('/api/analyses', {
        headers: {
          'Content-Type': 'application/json',
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

  const canEdit = (analysis) => {
    return session?.user?.id === analysis.id_user || 
           session?.user?.role === 'user' ||
           session?.user?.role === 'admin' || 
           session?.user?.role === 'manager';
  };

  // Show loading state
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>;
  }

  // Show auth required message
  if (!session) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Please sign in to access the dashboard</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-700"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Analytics Dashboard</span>
              </div>
            </div>

            {/* Profile Menu */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User size={20} />
                    <span>{session.user.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-50
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-lg
        `}>
          <div className="h-full px-4 py-6">
            <nav>
            {(session.user.role === 'admin' || 
                session.user.role === 'manager' ) && (
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => setSelectedView('all')}
              >
                All Analyses
              </Button>
              )}
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => setSelectedView('my')}
              >
                My Analyses
              </Button>
              {(session.user.role === 'admin' || 
                session.user.role === 'manager' ) && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedView('users')}
                >
                  User Management
                </Button>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">
                {selectedView === 'all' && 'All Analyses'}
                {selectedView === 'my' && 'My Analyses'}
                {selectedView === 'users' && 'User Management'}
              </h1>
              <Button className="flex items-center gap-2">
                <Plus size={20} />
                {selectedView === 'users' ? 'Add User' : 'New Analysis'}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <AnalysisTable analyses={analyses} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;