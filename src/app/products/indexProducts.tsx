import {
	Text,
	Box,
	Flex,
	Image,
	IconButton,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Layout from '../common/components/Layout'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ReactComponent as ViewIcon } from '../assets/illustrations/viewIcon.svg'
import { HiOutlinePencil } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import ProductDetails from './ProductDetails'
import UpdateProductForm, { ProductInterface } from './UpdateProductForm'
import AddProductForm from './AddProductForm'
import Pagination, { PageProps } from '../common/components/Pagination'
import styled from 'styled-components'
import IndexCtagories from '../categories/indexCategories'
import useSWR from 'swr'
import { fetcher, request } from '../common/helpers/api'

const StyledViewIcon = styled(ViewIcon)`
	& {
		width: 10px;
		height: auto;
	}

	& path {
		fill: #51a2df;
	}
`

const defaultImage =
	'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'

const IndexProducts: React.FC = (): React.ReactElement => {
	const [detailProduct, setDetailProduct] = useState<ProductInterface>()
	const { data: products } = useSWR('/products', fetcher)
	const toast = useToast()

	const { isOpen: viewItem, onOpen: onOpenItem, onClose: onCloseItem } = useDisclosure()
	const { isOpen: isUpdateItem, onOpen: onUpdateItem, onClose: onCloseUpdateItem } = useDisclosure()
	const { isOpen: isAddItem, onOpen: onAddItem, onClose: onCloseAddItem } = useDisclosure()

	const handleDelete = async (product: any): Promise<void> => {
		const params = {
			headers: { 'Content-type': 'application/json' },
			method: 'DELETE',
		}
		const response = await request(`/products/${product.id}`, params)
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
				description: 'Product deleted',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	const handleView = async (product: ProductInterface): Promise<void> => {
		setDetailProduct(product)
	}

	const [perPage, setPerPage] = useState<number>(5)
	const [page, setPage] = useState<number>(1)
	const onPageChanged = (event: PageProps): void => {
		setPage(event.currentPage)
		setPerPage(event.perPage)
	}

	return (
		<Layout>
			<Flex
				w="100%"
				bg="white"
				direction="column"
				fontSize="sm"
				p="30px"
				mt="20px"
				borderRadius="5px"
				boxShadow="0.36px 0.93px 20px #0000000D"
			>
				<Flex>
					<Button
						mr="20px"
						bg="#325288"
						w="250px"
						h="40px"
						color="white"
						_hover={{ background: '#DFF6FF', color: '#325288' }}
						ml="16px"
						fontSize="sm"
						onClick={(): void => onAddItem()}
					>
						Add new product
					</Button>
				</Flex>
				<Flex mt="30px">
					<Flex flex={1}>
						<IndexCtagories />
					</Flex>
					<Flex direction="column" flex={4}>
						<Flex flexWrap="wrap">
							{products &&
								products.length > 0 &&
								products.map((item: any, index: any) => (
									<Box
										mr="15px"
										mb="15px"
										key={index}
										cursor="pointer"
										maxW="sm"
										_hover={{ boxShadow: '0.36px 0.93px 7px #0000000D' }}
										height="max-content"
										borderWidth="1px"
										borderRadius="lg"
										overflow="hidden"
									>
										<Image src={defaultImage} alt="alt" />

										<Box p="6" display="flex">
											<Flex flex={1} direction="column">
												<Text fontSize="md" fontWeight="bold" color="#325288">
													{item.title}
												</Text>
												<Text fontSize="sm" fontWeight="bold">
													{item.category.name}
												</Text>
												<Text fontSize="md">
													{item.price} {item.currency}
												</Text>
											</Flex>
											<Flex justify="end">
												<Menu>
													<MenuButton
														as={IconButton}
														aria-label="Options"
														icon={<GiHamburgerMenu />}
														variant="outline"
													/>
													<MenuList minWidth="140px" zIndex={10}>
														<MenuItem
															color="#00a5cf"
															onClick={(): void => {
																onOpenItem()
																handleView(item)
															}}
														>
															<IconButton
																border="1px solid #51A2DF"
																aria-label="View"
																size="xs"
																mr="5px"
															>
																<StyledViewIcon />
															</IconButton>
															View
														</MenuItem>
														<MenuItem
															color="#ff7900"
															onClick={(): void => {
																onUpdateItem()
																handleView(item)
															}}
														>
															<IconButton
																icon={<HiOutlinePencil />}
																bg="transparent"
																border="1px solid"
																borderColor="#ff7900"
																mr="5px"
																aria-label="edit"
																size="xs"
															/>
															Update
														</MenuItem>
														<MenuItem
															color="#c71f37"
															onClick={(): void => {
																handleDelete(item)
															}}
														>
															<IconButton
																icon={<AiOutlineDelete />}
																bg="transparent"
																border="1px solid"
																borderColor="#c71f37"
																mr="5px"
																aria-label="delete"
																size="xs"
															/>
															Delete
														</MenuItem>
													</MenuList>
												</Menu>
											</Flex>
										</Box>
									</Box>
								))}
						</Flex>
						<Pagination
							totalData={products && products.length}
							currentPage={page}
							perPage={perPage}
							onPageChanged={onPageChanged}
						/>
					</Flex>
				</Flex>
			</Flex>
			<Modal isOpen={isAddItem} onClose={onCloseAddItem} size="2xl" isCentered>
				<ModalOverlay />
				<ModalContent p={5}>
					<ModalHeader fontSize="lg">Add new product</ModalHeader>
					<ModalCloseButton />
					<ModalBody justifyContent="center" overflow="visible">
						<AddProductForm onClose={onCloseAddItem} />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={viewItem} onClose={onCloseItem} size="2xl" isCentered>
				<ModalOverlay />
				<ModalContent p={5}>
					<ModalHeader fontSize="lg">Detail Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody justifyContent="center" overflow="visible">
						<ProductDetails detailProduct={detailProduct} />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={isUpdateItem} onClose={onCloseUpdateItem} size="2xl" isCentered>
				<ModalOverlay />
				<ModalContent p={5}>
					<ModalHeader fontSize="lg">Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody justifyContent="center" overflow="visible">
						<UpdateProductForm detailProduct={detailProduct} onClose={onCloseUpdateItem} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Layout>
	)
}

export default IndexProducts
