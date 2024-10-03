import User from "../models/userModel.js";

export const loginController = async (req, res) => {
	try {
		const { userId, password } = req.body;
		const user = await User.findOne({ userId, password, verified: true });
		if (user) {
			res.status(200).send(user);
		} else {
			res.json({
				message: "Autentificare nereușită!",
				user,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const registerController = async (req, res) => {
	try {
		const newUser = new User({ ...req.body, verified: true });
		await newUser.save();
		res.status(200).send("Utilizator nou adăugat cu succes!");
	} catch (error) {
		console.log(error);
	}
};
