import { NextPage } from 'next'
import { Navbar } from '../../components/Navbar'
import { HeadTitle } from '../../components/HeadTitle'
import { Heading } from '../../components/Heading'
import { Footer } from '../../components/Footer'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EditUserProfileForm from '../../components/EditUserProfileForm'
import { userInfo } from 'os'
import { UserBox } from '../../components/userBox'

interface User {
	icon: string
	nickname: string
}

const userInformation: NextPage = () => {
	const [userInfos, setUserInfos] = useState<User[]>([])

	async function fetchUser() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userinfo`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)

		const user = await res.json()

		const userinfo = user.userInfo

		// const userAddressInfo = user.addressInfo.rows

		setUserInfos(userinfo)
		console.log(userinfo)
		// console.log(userAddressInfo);
	}

	useEffect(() => {
		fetchUser()
	}, [setUserInfos])

	const { handleSubmit, register } = useForm()

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />

			{userInfos.map((userInfos) => (
            <UserBox name={userInfos.nickname} 
			icon={userInfos.icon} />
			))}

			<form
				onSubmit={handleSubmit(async (data) => {
					const formData = new FormData()

					formData.append('nickname', data.nickname)
					formData.append('icon', data.icon[0])
					// formData.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userinfo`,
						{
							method: 'PATCH',
							// headers: header.headers,
							// credentials: 'include',
							body: formData
						}
					)
					if (res.status === 200) {
						alert('success')
					}
				})}>
				<input type='file' {...register('icon')} />
				<input
					type='text'
					placeholder='nickname'
					{...register('nickname')}
				/>

				<input type='submit' value='Submit'></input>
			</form>
			<Footer />
		</>
	)
}

export default userInformation