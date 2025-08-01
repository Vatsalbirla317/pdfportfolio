
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const { toast } = useToast();

  const handleGitHubLogin = () => {
    // Mock login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    
    dispatch({ type: 'SET_USER', payload: mockUser });
    toast({
      title: 'Welcome back!',
      description: 'You have been successfully logged in.'
    });
    navigate('/dashboard');
  };

  const handleEmailLogin = () => {
    // Mock email login
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    
    dispatch({ type: 'SET_USER', payload: mockUser });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to manage your portfolios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={handleGitHubLogin}
                className="w-full"
                variant="outline"
              >
                <Github className="w-4 h-4 mr-2" />
                Continue with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button onClick={handleEmailLogin} className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 h-auto">
                  Sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
