function validateTextInput(req, res, next) {
  const text = req.body?.text?.trim();
  if (!text) {
    return res.status(400).json({ error: 'Input text is required.' });
  }
  
  // Attach cleaned text to locals so the route handler doesn't have to redefine it
  res.locals.text = text;
  next();
}

module.exports = { validateTextInput };
