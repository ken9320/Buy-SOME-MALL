import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'
import Watch from '../uploads/watch.png'

export default function ProductList() {
	return (
		<Wrapper>
			<article>
				<Link href='/products'>
					<Image src={Watch} />
				</Link>

				<div>
					<h4>Product Name</h4>
					<h5>Product Price</h5>
					<p>Cutie bear pure cotton t-shirt from Japan....Description</p>
                    <Button variant="contained" href='/productsInfo' className='btn'>Details</Button>
				</div>
			</article>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	display: grid;
	row-gap: 3rem;

	img {
		width: 100%;
		display: block;
		width: 300px;
		height: 200px;
		object-fit: cover;
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}
	h4 {
		margin-bottom: 0.5rem;
	}
	.price {
		color: var(--clr-primary-6);
		margin-bottom: 0.75rem;
	}
	p {
		max-width: 45em;
		margin-bottom: 1rem;
	}
	.btn {
		font-size: 0.5rem;
		padding: 0.25rem 0.5rem;
        background-color:purple;
	}
	@media (min-width: 992px) {
		article {
			display: grid;
			grid-template-columns: auto 1fr;
			column-gap: 2rem;
			align-items: center;
		}
	}
`


// const ListView: React.FC<{ filteredProducts: productDataType[] }> = ({
//     filteredProducts,
//   }) => {
//     return (
//       <Wrapper>
//         {filteredProducts.map(product => {
//           const { slug, images, name, price, itemDescription } = product
//           return (
//             <article key={slug}>
//               <Link to={`/products/${slug}`}>
//                 <img src={images[0]} alt={name} />
//               </Link>
  
//               <div>
//                 <h4>{name}</h4>
//                 <h5>{formatPrice(price)}</h5>
//                 <p>{itemDescription.substring(0, 150)}...</p>
//                 <Link to={`/products/${slug}`} className='btn'>
//                   Details
//                 </Link>
//               </div>
//             </article>
//           )
//         })}
//       </Wrapper>
//     )
//   }