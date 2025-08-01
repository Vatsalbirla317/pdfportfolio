
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Share2, Mail, QrCode, ExternalLink } from 'lucide-react';
import { GeneratedPortfolio } from '@/services/portfolioGenerator';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: GeneratedPortfolio | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, portfolio }) => {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  if (!portfolio) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.url);
      toast({
        title: 'URL Copied!',
        description: 'Portfolio URL has been copied to your clipboard.'
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Unable to copy URL to clipboard.',
        variant: 'destructive'
      });
    }
  };

  const handleDownloadZip = async () => {
    try {
      // Create a blob with the HTML content
      const blob = new Blob([portfolio.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolio.template.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Download Started',
        description: 'Your portfolio HTML file is being downloaded.'
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Unable to download portfolio files.',
        variant: 'destructive'
      });
    }
  };

  const handleGenerateQR = async () => {
    setIsGeneratingQR(true);
    try {
      // Generate QR code using a free service
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolio.url)}`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      toast({
        title: 'QR Generation Failed',
        description: 'Unable to generate QR code.',
        variant: 'destructive'
      });
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out my portfolio');
    const body = encodeURIComponent(`Hi,\n\nI'd like to share my professional portfolio with you:\n\n${portfolio.url}\n\nBest regards`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(portfolio.url);
    const text = encodeURIComponent('Check out my professional portfolio');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Portfolio
          </DialogTitle>
          <DialogDescription>
            Share your portfolio with the world using these options.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="download">Download</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio-url">Portfolio URL</Label>
              <div className="flex gap-2">
                <Input
                  id="portfolio-url"
                  value={portfolio.url}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={handleCopyUrl} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Share this link to let others view your portfolio online.
            </div>
          </TabsContent>

          <TabsContent value="download" className="space-y-4">
            <div className="space-y-4">
              <Button onClick={handleDownloadZip} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download HTML File
              </Button>
              <div className="text-sm text-muted-foreground">
                Download your portfolio as a standalone HTML file that you can host anywhere.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={handleEmailShare}
                variant="outline"
                className="w-full justify-start"
              >
                <Mail className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
              
              <Button
                onClick={() => handleSocialShare('linkedin')}
                variant="outline"
                className="w-full justify-start"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
              
              <Button
                onClick={() => handleSocialShare('twitter')}
                variant="outline"
                className="w-full justify-start"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>
              
              <Button
                onClick={() => handleSocialShare('facebook')}
                variant="outline"
                className="w-full justify-start"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share on Facebook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <div className="text-center space-y-4">
              {!qrCodeUrl ? (
                <Button
                  onClick={handleGenerateQR}
                  disabled={isGeneratingQR}
                  className="w-full"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  {isGeneratingQR ? 'Generating...' : 'Generate QR Code'}
                </Button>
              ) : (
                <div className="space-y-4">
                  <img
                    src={qrCodeUrl}
                    alt="Portfolio QR Code"
                    className="mx-auto border rounded-lg"
                  />
                  <div className="text-sm text-muted-foreground">
                    Scan this QR code to access your portfolio on mobile devices.
                  </div>
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = qrCodeUrl;
                      link.download = 'portfolio-qr-code.png';
                      link.click();
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
