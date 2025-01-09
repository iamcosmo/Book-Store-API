import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  keyGenerator: (req) => req.headers['x-user-id'],
});

export default limiter;
