import mongoose from 'mongoose'

const BazaarProductSchema = new mongoose.Schema({
	ProductName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	Gender: {
		type: String,
		required: false
	},
	Size: {
		type: String,
		required: true
	},
	Category: {
		type: String,
		required: true
	},
	Color: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
});


const BazaarProduct = mongoose.model("BazaarProduct", BazaarProductSchema);
export default BazaarProduct;
