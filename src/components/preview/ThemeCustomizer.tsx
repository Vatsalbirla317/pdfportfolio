
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const ThemeCustomizer = () => {
  const { state, dispatch } = useApp();
  const theme = state.themeSettings;

  const colors = [
    { name: 'Purple', value: 'purple', hex: '#8B5CF6' },
    { name: 'Blue', value: 'blue', hex: '#3B82F6' },
    { name: 'Green', value: 'green', hex: '#10B981' },
    { name: 'Pink', value: 'pink', hex: '#EC4899' }
  ];

  const fonts = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Poppins', value: 'Poppins' }
  ];

  const updateTheme = (field: string, value: string) => {
    dispatch({
      type: 'SET_THEME_SETTINGS',
      payload: { ...theme, [field]: value }
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Customize Theme</CardTitle>
        <CardDescription>
          Personalize your portfolio appearance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Selection */}
        <div className="space-y-3">
          <Label>Accent Color</Label>
          <div className="grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <Button
                key={color.value}
                variant={theme.color === color.value ? "default" : "outline"}
                onClick={() => updateTheme('color', color.value)}
                className="justify-start gap-2"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <Label>Font Family</Label>
          <div className="grid grid-cols-1 gap-2">
            {fonts.map((font) => (
              <Button
                key={font.value}
                variant={theme.font === font.value ? "default" : "outline"}
                onClick={() => updateTheme('font', font.value)}
                className="justify-start"
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
