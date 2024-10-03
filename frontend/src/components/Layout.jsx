import React, { useEffect, useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	HomeOutlined,
	UserSwitchOutlined,
	MoneyCollectOutlined,
	CameraOutlined,
	LogoutOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./Layout.css";
import MenuItem from "antd/es/menu/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
	const { cartItems, loading } = useSelector((state) => state.rootReducer);

	const [collapsed, setCollapsed] = useState(false);

	const navigate = useNavigate();

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const toggle = () => {
		setCollapsed(!collapsed);
	};

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	return (
		<Layout>
			{loading && <Spinner />}
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo">
					<h2 className="logo-title">PhotoCamera</h2>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={window.location.pathname}
				>
					<MenuItem key={1} icon={<HomeOutlined />}>
						<Link to="/">Home</Link>
					</MenuItem>
					<MenuItem key="/bills" icon={<MoneyCollectOutlined />}>
						<Link to="/bills">Comenzi</Link>
					</MenuItem>
					<MenuItem key="/products" icon={<CameraOutlined />}>
						<Link to="/products">Produse</Link>
					</MenuItem>
					<MenuItem key="/customers" icon={<UserSwitchOutlined />}>
						<Link to="/customers">Clienți</Link>
					</MenuItem>
					<MenuItem
						key="/logout"
						icon={<LogoutOutlined />}
						onClick={() => {
							localStorage.removeItem("auth");
							navigate("/login");
						}}
					>
						LogOut
					</MenuItem>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }}>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: toggle,
						}
					)}
					<div className="cart-items" onClick={() => navigate("/cart")}>
						<ShoppingCartOutlined />
						<span className="cart-badge">{cartItems.length}</span>
					</div>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutApp;
