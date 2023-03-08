const mongoose = require('mongoose');


// connect to database
const connectToDB = async () => {
  try {
      const result = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/ReceiptScannr');
      console.log("connected to db");
  }
  catch (err) {
      console.error(err);
      process.exit(1);

  }
}

// connect to database
connectToDB();