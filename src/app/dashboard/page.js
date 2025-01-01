'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';
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

const Dashboard = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('all');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [analyses, setAnalyses] = useState([]);

 
  useEffect(() => {
const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedCategory = localStorage.getItem('category');
    if (storedCategory) {
      setCategory(storedCategory);
    } 
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

  const canEdit = (analysis) => {
    return user.id === analysis.id_user || 
           category === 'user' ||
           category === 'admin' || 
           category === 'manager';
  };
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
                    <span>{username}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
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
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => setSelectedView('all')}
              >
                All Analyses
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start mb-2"
                onClick={() => setSelectedView('my')}
              >
                My Analyses
              </Button>
              {(category === 'admin' || category === 'manager' || category === 'user') && (
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

            {/* Analysis Cards Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                      {analysis.subject}
                    </CardTitle>
                    {canEdit(analysis) && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Group:</span>
                        <span>{analysis.id_group}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Department:</span>
                        <span>{analysis.id_department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Average:</span>
                        <span className="font-semibold">{analysis.average}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Students:</span>
                        <span>{analysis.count_stud}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>*/}
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