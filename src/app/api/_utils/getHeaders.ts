const getHeaders = (req: Request) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return headers as any;
};

export default getHeaders;
