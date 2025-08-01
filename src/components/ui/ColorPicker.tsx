
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
  presets = [
    '#8B5CF6', // purple
    '#3B82F6', // blue  
    '#10B981', // green
    '#EC4899', // pink
    '#F59E0B', // amber
    '#EF4444', // red
    '#6B7280', // gray
    '#1F2937'  // dark
  ]
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-12 p-0 border-2"
              style={{ backgroundColor: color }}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-auto p-4">
            <div className="space-y-4">
              <HexColorPicker color={color} onChange={onChange} />
              
              <div className="grid grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    className="w-8 h-8 rounded border-2 border-border hover:border-ring"
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      onChange(preset);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="flex-1 flex items-center">
          <code className="text-sm text-muted-foreground">{color}</code>
        </div>
      </div>
    </div>
  );
};
