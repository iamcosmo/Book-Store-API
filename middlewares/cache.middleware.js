import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6380' });
await client.connect().catch(console.error);

const cache = async (req, res, next) => {
  try {
    const key = req.originalUrl;
    const cachedData = await client.get(key);

    if (cachedData) {
      console.log('Returning cached data...');
      return res.status(200).json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      client.setEx(key, 60, JSON.stringify(body));
      res.sendResponse(body);
    };

    next();
  } catch (error) {
    console.error('Cache middleware error:', error);
    next();  
  }
};

export default cache;
