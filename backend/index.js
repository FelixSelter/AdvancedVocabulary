import mongoose from 'mongoose';
import app from './app.js';
console.clear();
mongoose.connect(process.env.MONGODB_ADDRESS);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
