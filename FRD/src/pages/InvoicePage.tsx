import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import invoice from '../styles/Invoice.module.css'
import Link from 'next/link'
import errorPhoto from '../pages/photo/error.png'
import { Footer } from '../components/Footer'
import errorImage from './error.png'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { Invoice } from '../components/Receipt'
import { LoadingState } from '../models'
import Skeleton from 'react-loading-skeleton'
import { useAppDispatch, useAppSelector } from '../store'

interface Props {
	id: number
	invoiceNumber: string
	status_id: string
	user_id: string
	address: string
	totalPrice: number
	product: string
	icon: string
	color: string
	size: string
	number: number
}

const InvoicePage: NextPage = () => {
	const [invoices, setInvoice] = useState<Props[]>([])
	const [invoiceNumber, setInvoicesNumber] = useState<String>('')
	const [invoiceTotalPrice, setInvoicesTotalPrice] = useState<String>('')

	const dispatch = useAppDispatch()
	const cartLoaded = useAppSelector(state => state.cart.loading)

	async function fetchInvoice() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/invoice`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)

		let invoiceInfo = await res.json()
		
		console.log('invoiceInfo: ',invoiceInfo);
		
		

		let invoice = invoiceInfo.invoiceRecord
		

	
			// let invoiceNumber = invoiceInfo.invoiceRecord[0].invoiceNumber
			// let invoicePrice = invoiceInfo.invoiceRecord[0].totalPrice

			if (invoice.length > 0) {
			setInvoice(invoice)
			setInvoicesNumber(invoiceInfo.invoiceRecord[0].invoiceNumber)
			setInvoicesTotalPrice(invoiceInfo.invoiceRecord[0].totalPrice)
			}
		}
		
		useEffect(() => {
			fetchInvoice()
	}, [invoices, invoiceTotalPrice, invoiceNumber])



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

			<div className={invoice.pageBox}>
				<Container>
					<div>
						<h1 className={invoice.Title}>Invoice</h1>

						<span className={invoice.page}>Home. Pages.</span>
						<span className={invoice.nowPage}>Invoice</span>
					</div>
				</Container>
			</div>

			<div className={invoice.box}>
				<div className={invoice.invoiceDiv}>

					<div className={invoice.order}>My Order</div>
					{
						cartLoaded !== LoadingState.Loaded ?
							<Skeleton baseColor='#E02310' height={30} /> :
							invoices.length > 0 ? <div>{invoiceNumber}</div>
								: <div></div>
					}


					{

						cartLoaded !== LoadingState.Loaded ?
							<Skeleton baseColor='#E02310' height={30} /> :
							invoices.length > 0 ?

								invoices.map((invoices) => (

									<Invoice
										id={invoices.id}
										invoiceNumber={invoices.invoiceNumber}
										status_id={invoices.status_id}
										user_id={invoices.user_id}
										address={invoices.address}
										totalPrice={invoices.totalPrice}
										product={invoices.product}
										icon={invoices.icon}
										color={invoices.color}
										size={invoices.size}
										number={0}
									/>
								))
								: <div></div>

					}

					<div>{invoiceTotalPrice}</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default InvoicePage
