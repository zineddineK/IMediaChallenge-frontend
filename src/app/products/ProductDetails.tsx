import React from 'react'
import { Flex, Heading, Text, Image } from '@chakra-ui/react'

interface ProductDetailProps {
	detailProduct: any
}

const ProductDetails: React.FC<ProductDetailProps> = ({
	detailProduct,
}: ProductDetailProps): React.ReactElement => {
	const defaultImage =
		'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'

	return (
		<Flex direction="column">
			<Image src={defaultImage} alt="alt" />
			<Flex direction="column">
				<Heading fontSize="md" color="gray.800" mb="10px">
					{detailProduct?.title}
				</Heading>
				<Text mb="10px">{detailProduct?.category.name}</Text>
				<Text mb="10px">{detailProduct?.price}</Text>
				<Text>{detailProduct?.currency}</Text>
			</Flex>
		</Flex>
	)
}

export default ProductDetails
