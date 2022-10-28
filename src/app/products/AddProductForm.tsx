import React from 'react'

import {
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Select,
	Button,
	useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { fetcher, request } from '../common/helpers/api'
import useSWR, { mutate } from 'swr'
import { number, object, string } from 'yup'

interface ProductFormProps {
	onClose: () => void
}
interface CategoryInterface {
	id: number
	name?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProductInterface {
	price: number
	title: string
	currency: string
	category: CategoryInterface
}

const ProductFormSchemaValidation = object().shape({
	price: number().required('Required'),
	currency: string().required('Required'),
	title: string().required('Required'),
	category: number().required('Required'),
})

const AddProductForm: React.FC<ProductFormProps> = ({
	onClose,
}: ProductFormProps): React.ReactElement => {
	const toast = useToast()

	const { data: categories } = useSWR('/categories', fetcher)
	const { data: currencies } = useSWR('/currencies', fetcher)

	const defaultInitialValues = {
		price: '',
		title: '',
		category: '',
		currency: '',
	}

	const { isSubmitting, handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: defaultInitialValues,
		validationSchema: ProductFormSchemaValidation,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values, actions) => {
			const body = {
				price: values.price,
				title: values.title,
				category: {
					id: values.category,
				},
				currency: values.currency,
			}
			const params = {
				headers: { 'Content-type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(body),
			}
			const response = await request('/products', params)

			if (response.ok) {
				actions.setSubmitting(false)
				toast({
					position: 'top',
					description: 'Error',
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			} else {
				toast({
					position: 'top',
					description: 'Product add',
					status: 'success',
					duration: 5000,
					isClosable: true,
				})
				actions.resetForm()
				actions.setSubmitting(false)
			}
			onClose()
			mutate('/products', true)
		},
	})

	return (
		<form noValidate onSubmit={handleSubmit}>
			<Flex direction="column">
				<Flex direction="column" mb="15px">
					<FormControl mb="15px" isInvalid={!!errors.title}>
						<Input
							id="title"
							placeholder="Title"
							fontSize="sm"
							name="title"
							onChange={handleChange}
							value={values.title}
						/>
						<FormErrorMessage>{errors.title}</FormErrorMessage>
					</FormControl>
					<FormControl mb="15px" isInvalid={!!errors.category}>
						<Select
							flex={1}
							fontSize="sm"
							mr="20px"
							border="1px solid #DADADA"
							name="category"
							placeholder="Category"
							onChange={handleChange}
							value={values.category}
						>
							{categories &&
								categories.length > 0 &&
								categories.map((el: CategoryInterface, i: number) => (
									<option key={i} value={el.id}>
										{el.name}
									</option>
								))}
						</Select>
						<FormErrorMessage>{errors.category}</FormErrorMessage>
					</FormControl>
					<Flex>
						<FormControl isInvalid={!!errors.price}>
							<Input
								id="price"
								placeholder="Price"
								fontSize="sm"
								name="price"
								value={values.price}
								onChange={handleChange}
							/>
							<FormErrorMessage>{errors.price}</FormErrorMessage>
						</FormControl>
						<FormControl ml="10px" isInvalid={!!errors.currency}>
							<Select
								flex={1}
								fontSize="sm"
								mr="20px"
								border="1px solid #DADADA"
								name="currency"
								value={values.currency}
								onChange={handleChange}
							>
								{currencies &&
									currencies.map((cn: string, i: number) => (
										<option key={i} value={cn}>
											{cn}
										</option>
									))}
							</Select>
							<FormErrorMessage>{errors.currency}</FormErrorMessage>
						</FormControl>
					</Flex>
				</Flex>
				<Flex>
					<Button
						mr="15px"
						flex={1}
						bg="#325288"
						w="250px"
						h="40px"
						color="white"
						_hover={{ background: '#DFF6FF', color: '#325288' }}
						fontSize="sm"
						type="submit"
						isLoading={isSubmitting}
						onClick={onClose}
					>
						Add
					</Button>
					<Button
						flex={1}
						color="gray.250"
						fontSize="sm"
						border="1px solid #707071"
						bg="#fff"
						_hover={{
							background: 'white',
						}}
						type="reset"
						onClick={onClose}
					>
						Cancel
					</Button>
				</Flex>
			</Flex>
		</form>
	)
}

export default AddProductForm
