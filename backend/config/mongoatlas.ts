var mongoose = require('mongoose');

let mongo_url = process.env.MONGO_URL;
async function connectToDB() {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    });
    console.log('>> Connected to Mongo Atlas.');
  } catch (e) {
    console.log(e);
    throw e;
  }
}
connectToDB();
