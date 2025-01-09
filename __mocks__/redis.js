export const createClient = () => {
    return {
      connect: jest.fn(),
      get: jest.fn().mockResolvedValue(null),
      setEx: jest.fn(),
    };
  };
  