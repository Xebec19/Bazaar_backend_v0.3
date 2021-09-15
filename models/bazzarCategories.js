import mongoose from 'mongoose'

const BazaarCategorySchema = new mongoose.Schema({
	CategoryName: {
		type: String,
		required: true
	},
});


const BazaarCategory = mongoose.model("bazaarcategory",BazaarCategorySchema);
export default BazaarCategory;
