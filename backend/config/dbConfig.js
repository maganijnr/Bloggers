import mongoose from "mongoose";

const connectToDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`Connected: ${connect.connection.host}`.green.bold);
	} catch (err) {
		console.log(`Unable to connect to Db`.red.underline);
		console.log(err);
	}
};

export default connectToDb;
