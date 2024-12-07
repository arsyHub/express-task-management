const verifySecretKey = (req, res, next) => {
  const secretKey = req.headers["secret_key"];
  const expectedKey = process.env.SECRET_KEY;

  if (!secretKey) {
    return res.status(401).json({
      message: "Unauthorized: secret_key is missing",
    });
  }

  if (secretKey !== expectedKey) {
    return res.status(403).json({
      message: "Forbidden: Invalid secret_key " + secretKey + " is missing",
    });
  }

  next();
};

export default verifySecretKey;
