import { Box, Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'
import Layout from '../common/components/Layout'
import { fetcher, request } from '../common/helpers/api'
import { HiOutlinePencil } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'

const ListCategories: React.FC = (): React.ReactElement => {
	const toast = useToast()
	const { data: categories } = useSWR('/categories', fetcher)

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
				description: 'Product deleted',
				status: 'success',
				duration: 5000,
				isClosable: true,
			})
		}
	}
	return (
		<Layout>
			<form>
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
								{cat && cat.parent ? (
									<Text bg="white" flex={1}>
										<li>{cat.parent.name}</li>
									</Text>
								) : (
									<Text flex={1}>No sub category</Text>
								)}
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
			</form>
		</Layout>
	)
}

export default ListCategories
