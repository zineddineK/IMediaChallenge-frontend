import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import Layout from '../common/components/Layout'
import { fetcher, request } from '../common/helpers/api'
import { HiOutlinePencil } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useFormik } from 'formik'
import UpdateCategoryForm from './UpdateCategoryForm'
import { CategoryInterface } from '../products/UpdateProductForm'

const ListCategories: React.FC = (): React.ReactElement => {
	const [updatingCategory, setUpdatingCategory] = useState<CategoryInterface>()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isOpenCat, onOpen: onOpenCat, onClose: onCloseCat } = useDisclosure()
	const toast = useToast()
	const { data: categories } = useSWR('/categories', fetcher)

	const defaultInitialValues = {
		name: '',
		category_id: '',
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
				method: 'POST',
				body: JSON.stringify(body),
			}
			const response = await request('/categories', params)

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
					description: 'Category add',
					status: 'success',
					duration: 5000,
					isClosable: true,
				})
				actions.resetForm()
				actions.setSubmitting(false)
			}
			mutate('/categories', true)
			onClose()
		},
	})

	const handleDelete = async (category: any): Promise<void> => {
		const params = {
			headers: { 'Content-type': 'application/json' },
			method: 'DELETE',
		}
		const response = await request(`/categories/${category.id}`, params)
		if (response.ok) {
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
				description: 'Category deleted',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		}
		mutate('/categories', true)
	}

	return (
		<Layout>
			<Flex direction="column" align="center" p={5}>
				<Flex flex={1} mb="20px">
					<Button
						mr="20px"
						bg="#256D85"
						color="white"
						_hover={{ background: '#DFF6FF', color: '#256D85' }}
						ml="16px"
						fontSize="sm"
						onClick={(): void => onOpen()}
					>
						Add new categpry
					</Button>
				</Flex>
				{categories &&
					categories.length > 0 &&
					categories.map((cat: any, indexCat: number) => (
						<>
							<Box
								key={indexCat}
								display="flex"
								p={6}
								w="30%"
								mb="15px"
								height="max-content"
								bg="white"
								fontSize="sm"
								borderRadius="5px"
								boxShadow="0.36px 0.93px 20px #0000000D"
							>
								<Text fontSize="md" color="#256D85" flex={1}>
									{cat.name}
								</Text>

								<Flex>
									<IconButton
										icon={<HiOutlinePencil />}
										bg="transparent"
										border="1px solid"
										borderColor="#ff7900"
										color="#ff7900"
										mr="5px"
										aria-label="edit"
										size="xs"
										onClick={(): void => {
											onOpenCat()
											setUpdatingCategory(cat)
										}}
									/>
									<IconButton
										icon={<AiOutlineDelete />}
										bg="transparent"
										border="1px solid"
										borderColor="#c71f37"
										color="#c71f37"
										mr="5px"
										aria-label="delete"
										size="xs"
										onClick={(): void => {
											handleDelete(cat)
										}}
									/>
								</Flex>
							</Box>
						</>
					))}
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
				<ModalOverlay />
				<ModalContent p={5}>
					<ModalHeader fontSize="lg" color="#256D85">
						Add new category
					</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit}>
						<ModalBody justifyContent="center" overflow="visible">
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
									<FormControl mb="15px">
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
										bg="#256D85"
										color="white"
										_hover={{ background: '#DFF6FF', color: '#256D85' }}
										fontSize="sm"
										type="submit"
										isLoading={isSubmitting}
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
						</ModalBody>
					</form>
				</ModalContent>
			</Modal>
			<Modal isOpen={isOpenCat} onClose={onCloseCat} size="2xl" isCentered>
				<ModalOverlay />
				<ModalContent p={5}>
					<ModalHeader fontSize="lg">Update Category</ModalHeader>
					<ModalCloseButton />
					<ModalBody justifyContent="center" overflow="visible">
						<UpdateCategoryForm category={updatingCategory} onClose={onCloseCat} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Layout>
	)
}

export default ListCategories
