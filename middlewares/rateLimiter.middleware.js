import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each user to 10 requests per minute
  keyGenerator: (req) => req.headers['x-user-id'], // Identify users by userId
});

export default limiter;
