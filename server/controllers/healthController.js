import mongoose from 'mongoose';

export function getHealth(req, res) {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    message: 'API is healthy.',
    data: {
      database: isDatabaseConnected ? 'connected' : 'disconnected',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
  });
}
