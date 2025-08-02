import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};

// Predefined skeleton components for common use cases
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          'h-4',
          i === lines - 1 ? 'w-3/4' : 'w-full'
        )} 
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-3', className)}>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-20 w-full" />
  </div>
);

export const ListSkeleton: React.FC<{ items?: number; className?: string }> = ({ 
  items = 5, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export const FormSkeleton: React.FC<{ fields?: number; className?: string }> = ({ 
  fields = 4, 
  className 
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number; className?: string }> = ({ 
  rows = 5, 
  cols = 4, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div className="flex space-x-3">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-8 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-3">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-6 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const AvatarSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
  );
};

export const ButtonSkeleton: React.FC<{ variant?: 'default' | 'wide'; className?: string }> = ({ 
  variant = 'default', 
  className 
}) => {
  const variantClasses = {
    default: 'h-10 w-24',
    wide: 'h-10 w-32'
  };

  return (
    <Skeleton className={cn('rounded-md', variantClasses[variant], className)} />
  );
};

export const ImageSkeleton: React.FC<{ 
  aspectRatio?: 'square' | 'video' | 'portrait'; 
  className?: string 
}> = ({ aspectRatio = 'square', className }) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  return (
    <Skeleton className={cn('w-full rounded-md', aspectClasses[aspectRatio], className)} />
  );
};

// Loading states for specific app components
export const ResumeEditorSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <FormSkeleton fields={3} />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-8 w-36" />
      <ListSkeleton items={3} />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <TextSkeleton lines={4} />
    </div>
  </div>
);

export const PortfolioPreviewSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <AvatarSkeleton size="lg" className="mx-auto" />
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-6 w-24" />
      <TextSkeleton lines={3} />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <ButtonSkeleton />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4 p-4 border rounded-lg">
          <ImageSkeleton aspectRatio="video" />
          <CardSkeleton />
          <div className="flex justify-between">
            <ButtonSkeleton variant="default" />
            <ButtonSkeleton variant="default" />
          </div>
        </div>
      ))}
    </div>
  </div>
);