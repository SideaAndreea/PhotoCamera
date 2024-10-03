import Product from "../models/productModel.js";

export const getProductController = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		console.log(error);
	}
};

export const addProductController = async (req, res) => {
	try {
		const newProducts = new Product(req.body);
		await newProducts.save();
		res.status(200).send("Produs creat cu succes!");
	} catch (error) {
		console.log(error);
	}
};

export const updateProductController = async (req, res) => {
	try {
		await Product.findOneAndUpdate({ _id: req.body.productId }, req.body, {
			new: true,
		});
		res.status(201).json("Produs modificat cu succes!");
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
};

export const deleteProductController = async (req, res) => {
	try {
		await Product.findOneAndDelete({ _id: req.body.productId });
		res.status(200).json("Produs șters cu succes!");
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
};
