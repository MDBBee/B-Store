import * as Sentry from '@sentry/nextjs';

type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';
type EventType = {
  message: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  level: LogLevel;
  error?: unknown;
};

export function logEventToSentry({
  message,
  category = 'general',
  data,
  level = 'info',
  error,
}: EventType) {
  Sentry.addBreadcrumb({
    category,
    message,
    level,
  });

  if (error) {
    Sentry.captureException(error, { extra: data });
  } else {
    Sentry.captureMessage(message, level);
  }
}
