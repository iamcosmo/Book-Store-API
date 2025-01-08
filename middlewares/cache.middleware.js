import redis from 'redis';

const client = redis.createClient();

client.connect().catch(console.error);

const cache = async (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = await client.get(key);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setEx(key, 60, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  }
};

export default cache;
