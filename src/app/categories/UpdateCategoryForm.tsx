import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Select,
	useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React from 'react'
import useSWR, { mutate } from 'swr'
import { fetcher, request } from '../common/helpers/api'
import { CategoryInterface } from '../products/UpdateProductForm'

interface CategoryFormProps {
	category?: CategoryInterface
	onClose: () => void
}

const UpdateCategoryForm: React.FC<CategoryFormProps> = ({
	category,
	onClose,
}: CategoryFormProps): React.ReactElement => {
	const toast = useToast()

	const { data: categories } = useSWR('/categories/main', fetcher)

	const defaultInitialValues = {
		name: category?.name || '',
		category_id: category?.parent?.id || '',
	}

	const { isSubmitting, handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: defaultInitialValues,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values, actions) => {
			let parent = null
			if (values.category_id) {
				parent = {
					id: values.category_id,
					name: '',
				}
			}
			const body = {
				name: values.name,
				parent,
			}

			const params = {
				headers: { 'Content-type': 'application/json' },
				method: 'PUT',
				body: JSON.stringify(body),
			}
			const response = await request(`/categories/${category?.id}`, params)

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
					description: 'Category updated',
					status: 'success',
					duration: 5000,
					isClosable: true,
				})
				actions.resetForm()
				actions.setSubmitting(false)
			}
			mutate('/categories')
			onClose()
		},
	})
	return (
		<form onSubmit={handleSubmit}>
			<Flex direction="column">
				<Flex mb="15px">
					<FormControl mb="15px" isInvalid={!!errors.name} mr="15px">
						<Input
							id="name"
							placeholder="Category name"
							fontSize="sm"
							name="name"
							onChange={handleChange}
							value={values.name}
						/>
						<FormErrorMessage>{errors.name}</FormErrorMessage>
					</FormControl>
					<FormControl mb="15px" isInvalid={!!errors.name}>
						<Select
							flex={1}
							fontSize="sm"
							mr="20px"
							border="1px solid #DADADA"
							name="category_id"
							placeholder="Category parent"
							onChange={handleChange}
							value={values.category_id}
						>
							{categories &&
								categories.length > 0 &&
								categories.map((el: CategoryInterface, i: number) => (
									<option key={i} value={el.id}>
										{el.name}
									</option>
								))}
						</Select>
						<FormErrorMessage>{errors.name}</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex>
					<Button
						mr="15px"
						flex={1}
						bg="#ff7900"
						color="white"
						fontSize="sm"
						type="submit"
						_hover={{ background: '#ff7900' }}
						isLoading={isSubmitting}
					>
						Update
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
					>
						Cancel
					</Button>
				</Flex>
			</Flex>
		</form>
	)
}

export default UpdateCategoryForm
