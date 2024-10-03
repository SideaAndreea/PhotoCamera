import Bills from "../models/billsModel.js";

export const getBillsController = async (req, res) => {
	try {
		const bills = await Bills.find();
		res.send(bills);
	} catch (error) {
		console.log(error);
	}
};

export const addBillsController = async (req, res) => {
	try {
		const newBills = new Bills(req.body);
		await newBills.save();
		res.send("Factură creată cu succes!");
	} catch (error) {
		console.log(error);
	}
};
