import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "../../components/Layout";
import {
	DeleteOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";

const Cart = () => {
	const [subTotal, setSubTotal] = useState(0);
	const [billPopUp, setBillPopUp] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems } = useSelector((state) => state.rootReducer);

	const handlerIncrement = (record) => {
		dispatch({
			type: "UPDATE_CART",
			payload: { ...record, quantity: record.quantity + 1 },
		});
	};

	const handlerDecrement = (record) => {
		if (record.quantity !== 1) {
			dispatch({
				type: "UPDATE_CART",
				payload: { ...record, quantity: record.quantity - 1 },
			});
		}
	};

	const handlerDelete = (record) => {
		dispatch({
			type: "DELETE_FROM_CART",
			payload: record,
		});
	};

	const columns = [
		{
			title: "Nume",
			dataIndex: "name",
		},
		{
			title: "Imagine",
			dataIndex: "image",
			render: (image, record) => (
				<img src={image} alt={record.name} height={60} width={60} />
			),
		},
		{
			title: "Preț",
			dataIndex: "price",
		},
		{
			title: "Cantitate",
			dataIndex: "_id",
			render: (id, record) => (
				<div>
					<MinusCircleOutlined
						className="cart-minus"
						onClick={() => handlerDecrement(record)}
					/>
					<strong className="cart-quantity">{record.quantity}</strong>
					<PlusCircleOutlined
						className="cart-plus"
						onClick={() => handlerIncrement(record)}
					/>
				</div>
			),
		},
		{
			title: "Acțiune",
			dataIndex: "_id",
			render: (id, record) => (
				<DeleteOutlined
					className="cart-action"
					onClick={() => handlerDelete(record)}
				/>
			),
		},
	];

	useEffect(() => {
		let temp = 0;
		cartItems.forEach(
			(product) => (temp = temp + product.price * product.quantity)
		);
		setSubTotal(temp);
	}, [cartItems]);

	const handlerSubmit = async (value) => {
		//console.log(value);
		try {
			const newObject = {
				...value,
				cartItems,
				subTotal,
				tax: Number(((subTotal / 100) * 10).toFixed(2)),
				totalAmount: Number(
					(
						Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
					).toFixed(2)
				),
				userId: JSON.parse(localStorage.getItem("auth"))._id,
			};
			await axios.post("/api/bills/addbills", newObject);
			message.success("Factură generată!");
			localStorage.removeItem(cartItems);
			navigate("/bills");
		} catch (error) {
			message.error("Error!");
			console.log(error);
		}
	};
	return (
		<LayoutApp>
			<h2>Cos</h2>
			<Table dataSource={cartItems} columns={columns} bordered />
			<div className="subTotal">
				<h2>
					Sub Total: <span>€ {subTotal.toFixed(2)}</span>
				</h2>
				<Button onClick={() => setBillPopUp(true)} className="add-new">
					Creare Factură
				</Button>
			</div>
			<Modal
				title="Creare Factură"
				open={billPopUp}
				onCancel={() => setBillPopUp(false)}
				footer={false}
			>
				<Form layout="vertical" onFinish={handlerSubmit}>
					<FormItem name="customerName" label="Numele clientului">
						<Input />
					</FormItem>
					<FormItem name="customerPhone" label="Numărul de telefon">
						<Input />
					</FormItem>
					<FormItem name="customerAddress" label="Adresa clientului">
						<Input />
					</FormItem>
					<Form.Item name="paymentMethod" label="Metoda de plată">
						<Select>
							<Select.Option value="cash">Cash</Select.Option>
							<Select.Option value="paypal">Paypal</Select.Option>
							<Select.Option value="Card">Card</Select.Option>
						</Select>
					</Form.Item>
					<div className="total">
						<span>SubTotal: €{subTotal.toFixed(2)}</span>
						<br />
						<span>Taxă: €{((subTotal / 100) * 10).toFixed(2)}</span>
						<h3>
							Total: €
							{(
								Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
							).toFixed(2)}
						</h3>
					</div>
					<div className="form-btn-add">
						<Button htmlType="submit" className="add-new">
							Generează factura
						</Button>
					</div>
				</Form>
			</Modal>
		</LayoutApp>
	);
};

export default Cart;
