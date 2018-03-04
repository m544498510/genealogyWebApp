import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost/genealogy')
  .then(() => {
    console.log('connect the mongodb');
  });

