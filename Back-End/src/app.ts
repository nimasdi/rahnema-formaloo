import express from 'express';
import mongoose from 'mongoose';
import updateRoutes from './routes/form.route';

export const app = express();

app.use(express.json());
app.use('/update', updateRoutes);

// mongoose.connect('mongodb://localhost:27017/formdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
