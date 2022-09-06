import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import error from '../styles/Error.module.css'
import Link from 'next/link'
import errorPhoto from '../pages/photo/error.png'
import { Footer } from '../components/Footer'
import errorImage from './error.png'

const Error: NextPage = () => {
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

			<div className={error.errorBackground}>
			<div>
				<h1 className={error.errorTitle}>404 Not Found</h1>

				
					<span className={error.page}>Home. Pages.</span>
					<span className={error.nowPage}>404 Not Found</span>
				</div>

				<div></div>
			</div>

			<div className={error.container}>
				<Image
					className={error.photo}
					src={errorPhoto}
					width={1000}
					height={500}
				/>
				<Link href='/Home'>
					<p className={error.button}>Home Page</p>
				</Link>
			</div>

			<Footer />
		</div>
	)
}

export default Error
