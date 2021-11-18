var mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

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

async function connectToDBTest() {
  try {
    const mockgoose = new Mockgoose(mongoose);
    await mockgoose.prepareStorage();

    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    });
    console.log('>> Connected to Mock MongoDB.');
  } catch (e) {
    console.log(e);
    throw e;
  }
}

exports.connectToDB =  function() {
  return new Promise<void>(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      connectToDBTest().then(() => {resolve()}).catch((error: Error) => {reject(error)});
    } else {
      connectToDB().then(() => {resolve()}).catch((error: Error) => {reject(error)});
    }
  })
}
