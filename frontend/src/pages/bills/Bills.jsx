import { Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";

const Bills = () => {
	const componentRef = useRef();
	const dispatch = useDispatch();
	const [billsData, setBillsData] = useState([]);
	const [popModal, setPopModal] = useState(false);
	const [selectedBill, setSelectedBill] = useState(null);

	const getAllBills = async () => {
		try {
			dispatch({
				type: "SHOW_LOADING",
			});
			const { data } = await axios.get("/api/bills/getbills");
			setBillsData(data);
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
		getAllBills();
	}, []);

	const columns = [
		{
			title: "ID",
			dataIndex: "_id",
		},
		{
			title: "Nume client",
			dataIndex: "customerName",
		},
		{
			title: "Număr de telefon",
			dataIndex: "customerPhone",
		},
		{
			title: "Adresa",
			dataIndex: "customerAddress",
		},
		{
			title: "Sub Total",
			dataIndex: "subTotal",
		},
		{
			title: "Taxe",
			dataIndex: "tax",
		},
		{
			title: "Valoare totală",
			dataIndex: "totalAmount",
		},
		{
			title: "Acțiune",
			dataIndex: "_id",
			render: (id, record) => (
				<div>
					<EyeOutlined
						className="cart-edit eye"
						onClick={() => {
							setSelectedBill(record);
							setPopModal(true);
						}}
					/>
				</div>
			),
		},
	];

	return (
		<LayoutApp>
			<h2>Toate Facturile</h2>
			<Table dataSource={billsData} columns={columns} bordered />

			{popModal && (
				<Modal
					title="Detalii factura"
					width={400}
					pagination={false}
					open={popModal}
					onCancel={() => setPopModal(false)}
					footer={false}
				>
					<div className="card" ref={componentRef}>
						<div className="cardHeader">
							<h2 className="logo">PhotoCamera</h2>
							<span>
								Număr de telefon: <b>+40/0000000</b>
							</span>
							<span>
								Adresa: <b>Oradea</b>
							</span>
						</div>
						<div className="cardBody">
							<div className="group">
								<span>Numele clientului:</span>
								<span>
									<b>{selectedBill.customerName}</b>
								</span>
							</div>
							<div className="group">
								<span>Numărul de telefon:</span>
								<span>
									<b>{selectedBill.customerPhone}</b>
								</span>
							</div>
							<div className="group">
								<span>Adresa clientului:</span>
								<span>
									<b>{selectedBill.customerAddress}</b>
								</span>
							</div>
							<div className="group">
								<span>Valoare totală</span>
								<span>
									<b>€{selectedBill.totalAmount}</b>
								</span>
							</div>
						</div>
						<div className="cardFooter">
							<h4>Comanda ta</h4>
							{selectedBill.cartItems.map((product) => (
								<>
									<div className="footerCard">
										<div className="group">
											<span>Produs:</span>
											<span>
												<b>{product.name}</b>
											</span>
										</div>
										<div className="group">
											<span>Cantitate:</span>
											<span>
												<b>{product.quantity}</b>
											</span>
										</div>
										<div className="group">
											<span>Preț:</span>
											<span>
												<b>€{product.price}</b>
											</span>
										</div>
									</div>
								</>
							))}
							<div className="footerCardTotal">
								<div className="group">
									<h3>Total:</h3>
									<h3>
										<b>€{selectedBill.totalAmount}</b>
									</h3>
								</div>
							</div>
							<div className="footerThanks">
								<span>Mulțumim că ați comandat de la noi!</span>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</LayoutApp>
	);
};

export default Bills;
