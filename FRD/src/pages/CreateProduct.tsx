import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import create from '../styles/CreateProduct.module.css'
import { AddProduct } from '../components/AddNewProduct'
import { AddColumn } from '../components/AddColumn'

import { SearchProductInfo } from '../components/SerachProduct'
import { Sidebar } from '../components/SiderBar'

interface keyword {
	keyword: string
}

interface searchProduct {
	id: number
	name: string
	icon: string
	description: string
}

const CreateProduct: NextPage = () => {
	const [keyword, setkeyword] = useState<keyword['keyword']>('NOTAKEYWORD')
	const [product, setProduct] = useState<searchProduct[]>([])

	async function fetchSearchProduct(keyword: String) {
		const name = keyword

		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/searchProductIdByName/?keyword=${name}`
		)
		let product = (await res.json()).ProductList.rows
		console.log(product)
		setProduct(product)
	}

	useEffect(() => {
		fetchSearchProduct(keyword)
	}, [keyword])
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Heading />
			<Navbar />

			<div className={create.pageBox}>
				<Container>
					<div>
						<h1 className={create.Title}>Create Product</h1>

						<span className={create.page}>Home. Pages.</span>
						<span className={create.nowPage}>Create Product</span>
					</div>
				</Container>
			</div>

			<div className={create.box}>
				<div className={create.div}>
					<AddProduct />
				</div>

				<div className={create.div}>
					<AddColumn />
				</div>
				<div className={create.searchBox}>
					<div className={create.title}>Serach Product</div>

					<input
						className={create.input}
						placeholder='Search Product'
						type='text'
						onChange={(e) => setkeyword(e.target.value)}
					/>
					{product.map((product: searchProduct) => (
						<SearchProductInfo
							id={product.id}
							icon={product.icon}
							name={product.name}
							description={product.description}
						/>
					))}
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default CreateProduct
