
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, Edit, Trash2, Share, Download, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  // Mock portfolios data
  const mockPortfolios = [
    {
      id: '1',
      name: 'Software Developer Portfolio',
      createdAt: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'published'
    },
    {
      id: '2',
      name: 'Designer Portfolio',
      createdAt: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'draft'
    }
  ];

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'RESET_STATE' });
    navigate('/');
  };

  if (!state.user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {state.user.name}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/upload')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPortfolios.map((portfolio) => (
            <Card key={portfolio.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                <CardDescription>
                  Created on {new Date(portfolio.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    portfolio.status === 'published' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {portfolio.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Modified {new Date(portfolio.lastModified).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/preview')}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/edit')}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create new card */}
          <Card 
            className="border-dashed border-2 hover:border-purple-400 cursor-pointer transition-colors"
            onClick={() => navigate('/upload')}
          >
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create New Portfolio</h3>
              <p className="text-muted-foreground text-center">
                Upload your resume to get started
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
