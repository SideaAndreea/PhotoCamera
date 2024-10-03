import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";

const Products = () => {
	const dispatch = useDispatch();
	const [productData, setProductData] = useState([]);
	const [popModal, setPopModal] = useState(false);
	const [editProduct, setEditProduct] = useState(false);

	const getAllProducts = async () => {
		try {
			dispatch({
				type: "SHOW_LOADING",
			});
			const { data } = await axios.get("/api/products/getproducts");
			setProductData(data);
			dispatch({
				type: "HIDE_LOADING",
			});
			console.log(data);
		} catch (error) {
			dispatch({
				type: "HIDE_LOADING",
			});
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	const handlerDelete = async (record) => {
		try {
			dispatch({
				type: "SHOW_LOADING",
			});
			await axios.post("/api/products/deleteproducts", {
				productId: record._id,
			});
			message.success("Produs șters cu succes!");
			getAllProducts();
			setPopModal(false);
			dispatch({
				type: "HIDE_LOADING",
			});
		} catch (error) {
			dispatch({
				type: "HIDE_LOADING",
			});
			message.error("Error!");
			console.log(error);
		}
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
			title: "Acțiune",
			dataIndex: "_id",
			render: (id, record) => (
				<div>
					<DeleteOutlined
						className="cart-action"
						onClick={() => handlerDelete(record)}
					/>
					<EditOutlined
						className="cart-edit"
						onClick={() => {
							setEditProduct(record);
							setPopModal(true);
						}}
					/>
				</div>
			),
		},
	];

	const handlerSubmit = async (value) => {
		//console.log(value);
		if (editProduct === null) {
			try {
				dispatch({
					type: "SHOW_LOADING",
				});
				const res = await axios.post("/api/products/addproducts", value);
				message.success("Produs adăugat cu succes!");
				getAllProducts();
				setPopModal(false);
				dispatch({
					type: "HIDE_LOADING",
				});
			} catch (error) {
				dispatch({
					type: "HIDE_LOADING",
				});
				message.error("Error!");
				console.log(error);
			}
		} else {
			try {
				dispatch({
					type: "SHOW_LOADING",
				});
				await axios.put("/api/products/updateproducts", {
					...value,
					productId: editProduct._id,
				});
				message.success("Produs modificat cu succes!");
				getAllProducts();
				setPopModal(false);
				dispatch({
					type: "HIDE_LOADING",
				});
			} catch (error) {
				dispatch({
					type: "HIDE_LOADING",
				});
				message.error("Error!");
				console.log(error);
			}
		}
	};

	return (
		<LayoutApp>
			<h2>Toate Produsele</h2>
			<Button className="add-new" onClick={() => setPopModal(true)}>
				Adăugare produs nou
			</Button>
			<Table dataSource={productData} columns={columns} bordered />

			{popModal && (
				<Modal
					title={`${
						editProduct !== null ? "Editare produs" : "Adăugare produs nou"
					}`}
					visible={popModal}
					onCancel={() => {
						setEditProduct(null);
						setPopModal(false);
					}}
					footer={false}
				>
					<Form
						layout="vertical"
						initialValues={editProduct}
						onFinish={handlerSubmit}
					>
						<FormItem name="name" label="Nume">
							<Input />
						</FormItem>
						<Form.Item name="category" label="Categorie">
							<Select>
								<Select.Option value="Canon">Canon</Select.Option>
								<Select.Option value="Nikon">Nikon</Select.Option>
								<Select.Option value="Sony">Sony</Select.Option>
							</Select>
						</Form.Item>
						<FormItem name="price" label="Preț">
							<Input />
						</FormItem>
						<FormItem name="image" label="URL Imagine">
							<Input />
						</FormItem>
						<div className="form-btn-add">
							<Button htmlType="submit" className="add-new">
								Adăugare
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</LayoutApp>
	);
};

export default Products;
