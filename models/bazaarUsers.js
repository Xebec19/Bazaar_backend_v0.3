import mongoose from 'mongoose'

const BazaarUserSchema = new mongoose.Schema({
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
	phoneNumber: {
		type: Number,
	},
	token: [String],
	cart: [{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "bazaarproducts"
		},
		quantity: {
			type: Number
		},
		price: {
			type: Number
		}
	}],
	total: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		default: Date.now
	}
});


const BazaarUser = mongoose.model("BazaarUsers", BazaarUserSchema);
export default BazaarUser;
