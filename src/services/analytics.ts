interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

interface AnalyticsConfig {
  apiKey?: string;
  endpoint?: string;
  enabled: boolean;
  debug: boolean;
}

class AnalyticsService {
  private config: AnalyticsConfig;
  private sessionId: string;
  private userId?: string;
  private queue: AnalyticsEvent[] = [];
  private isOnline = navigator.onLine;

  constructor(config: Partial<AnalyticsConfig> = {}) {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      debug: process.env.NODE_ENV === 'development',
      ...config
    };
    
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.loadFromStorage();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners() {
    // Track online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track('page_hidden');
      } else {
        this.track('page_visible');
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.track('page_unload');
      this.flushQueue(true); // Force flush on unload
    });
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('analytics_queue');
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load analytics queue from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('analytics_queue', JSON.stringify(this.queue));
    } catch (error) {
      console.warn('Failed to save analytics queue to storage:', error);
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.track('user_identified', { userId });
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.config.enabled) {
      if (this.config.debug) {
        console.log('Analytics (debug):', event, properties);
      }
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screen: {
          width: window.screen.width,
          height: window.screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId
    };

    this.queue.push(analyticsEvent);
    this.saveToStorage();

    if (this.config.debug) {
      console.log('Analytics tracked:', analyticsEvent);
    }

    // Try to flush immediately if online
    if (this.isOnline) {
      this.flushQueue();
    }
  }

  private async flushQueue(force = false) {
    if (!this.config.enabled || this.queue.length === 0) {
      return;
    }

    if (!force && (!this.isOnline || !this.config.endpoint)) {
      return;
    }

    const eventsToSend = [...this.queue];
    this.queue = [];
    this.saveToStorage();

    try {
      if (this.config.endpoint) {
        await fetch(this.config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
          },
          body: JSON.stringify({ events: eventsToSend })
        });

        if (this.config.debug) {
          console.log('Analytics events sent:', eventsToSend.length);
        }
      }
    } catch (error) {
      console.warn('Failed to send analytics events:', error);
      // Re-add failed events to queue
      this.queue.unshift(...eventsToSend);
      this.saveToStorage();
    }
  }

  // Convenience methods for common events
  trackPageView(page?: string) {
    this.track('page_view', {
      page: page || window.location.pathname,
      title: document.title
    });
  }

  trackClick(element: string, properties?: Record<string, any>) {
    this.track('click', {
      element,
      ...properties
    });
  }

  trackFileUpload(fileName: string, fileSize: number, fileType: string) {
    this.track('file_upload', {
      fileName,
      fileSize,
      fileType
    });
  }

  trackParsingStart(fileName: string) {
    this.track('parsing_start', { fileName });
  }

  trackParsingComplete(fileName: string, duration: number, success: boolean) {
    this.track('parsing_complete', {
      fileName,
      duration,
      success
    });
  }

  trackResumeEdit(section: string, action: string) {
    this.track('resume_edit', {
      section,
      action
    });
  }

  trackThemeChange(theme: string, property: string, value: string) {
    this.track('theme_change', {
      theme,
      property,
      value
    });
  }

  trackTemplateSelect(templateId: string, templateName: string) {
    this.track('template_select', {
      templateId,
      templateName
    });
  }

  trackPortfolioGenerate(templateId: string, duration: number) {
    this.track('portfolio_generate', {
      templateId,
      duration
    });
  }

  trackPortfolioShare(method: string, templateId: string) {
    this.track('portfolio_share', {
      method,
      templateId
    });
  }

  trackPortfolioDownload(format: string, templateId: string) {
    this.track('portfolio_download', {
      format,
      templateId
    });
  }

  trackError(error: string, context?: Record<string, any>) {
    this.track('error', {
      error,
      stack: new Error().stack,
      ...context
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit
    });
  }

  // User behavior tracking
  trackTimeOnPage(startTime: number) {
    const timeSpent = Date.now() - startTime;
    this.track('time_on_page', {
      timeSpent,
      page: window.location.pathname
    });
  }

  trackFeatureUsage(feature: string, used = true) {
    this.track('feature_usage', {
      feature,
      used
    });
  }

  // A/B testing support
  trackExperiment(experimentId: string, variant: string, metric?: string, value?: number) {
    this.track('experiment', {
      experimentId,
      variant,
      metric,
      value
    });
  }

  // Conversion tracking
  trackConversion(goal: string, value?: number, currency = 'USD') {
    this.track('conversion', {
      goal,
      value,
      currency
    });
  }

  // Get analytics data for dashboard
  getSessionData(): {
    sessionId: string;
    userId?: string;
    eventsCount: number;
    isOnline: boolean;
  } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      eventsCount: this.queue.length,
      isOnline: this.isOnline
    };
  }

  // Clear all data
  clear() {
    this.queue = [];
    this.saveToStorage();
    localStorage.removeItem('analytics_queue');
  }
}

// Create singleton instance
export const analytics = new AnalyticsService({
  // Configure with your analytics service
  // endpoint: 'https://api.your-analytics-service.com/events',
  // apiKey: 'your-api-key'
});

// Hook for React components
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackClick: analytics.trackClick.bind(analytics),
    trackFileUpload: analytics.trackFileUpload.bind(analytics),
    trackParsingStart: analytics.trackParsingStart.bind(analytics),
    trackParsingComplete: analytics.trackParsingComplete.bind(analytics),
    trackResumeEdit: analytics.trackResumeEdit.bind(analytics),
    trackThemeChange: analytics.trackThemeChange.bind(analytics),
    trackTemplateSelect: analytics.trackTemplateSelect.bind(analytics),
    trackPortfolioGenerate: analytics.trackPortfolioGenerate.bind(analytics),
    trackPortfolioShare: analytics.trackPortfolioShare.bind(analytics),
    trackPortfolioDownload: analytics.trackPortfolioDownload.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackTimeOnPage: analytics.trackTimeOnPage.bind(analytics),
    trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
    trackExperiment: analytics.trackExperiment.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
    getSessionData: analytics.getSessionData.bind(analytics)
  };
};

export default analytics;