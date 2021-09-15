import mongoose from 'mongoose'

const BazaarProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
    phoneNumber: {
        type: Number,
    },
	date: {
		type: Date,
		default: Date.now
	}
});


const BazaarProduct = mongoose.model("BazaarProduct",BazaarProductSchema);
export default BazaarProduct;
