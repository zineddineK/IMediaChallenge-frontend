import { Button, Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export interface PageProps {
	currentPage: number
	totalPages?: number
	perPage: number
	totalRecords?: number
}
interface PaginationProps {
	totalData: number
	perPage: number
	currentPage: number
	onPageChanged: (f: PageProps) => void
}
const Pagination: React.FC<PaginationProps> = (props: PaginationProps): React.ReactElement => {
	const [perPage, setperPage] = useState<number>(props.perPage)
	const [currentPage, setCurrentPage] = useState<number>(props.currentPage)

	useEffect(() => {
		setCurrentPage(props.currentPage)
	}, [currentPage, props.currentPage])

	const howManyPageBlocks = (totalPages: number): Array<number> => {
		const from = currentPage - 2 > 0 ? currentPage - 2 : currentPage - 1 > 0 ? currentPage - 1 : 1
		let to =
			currentPage + 2 <= totalPages
				? currentPage + 2
				: currentPage + 1 <= totalPages
				? currentPage + 1
				: currentPage
		const pagesBlocks = []
		let i = from

		if (to < 5 && 5 <= totalPages) to = 5
		while (i <= to) {
			pagesBlocks.push(i)
			i++
		}

		return pagesBlocks
	}
	const handleSelectPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setperPage(+event.target.value)
		setCurrentPage(1)
		props.onPageChanged({ perPage: +event.target.value, currentPage: 1 })
	}

	const changePage = (page: number): void => {
		setCurrentPage(page)

		props.onPageChanged({ perPage: perPage, currentPage: page })
	}
	const handlePageClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		if (totalPages > 0) {
			const e = event.target as HTMLButtonElement
			const page: number =
				e.value === 'Previous' ? currentPage - 1 : e.value === 'Next' ? currentPage + 1 : +e.value
			changePage(page)
		}
	}
	const totalPages = Math.ceil(props.totalData / perPage)
	return (
		<Flex mt="50px" justify="space-between">
			<Flex alignItems="center" justifyItems="center">
				<Select
					width="107px"
					border="1px solid #E2E2E2"
					fontSize="xs"
					color="gray.800"
					onChange={handleSelectPerPageChange}
					value={perPage}
				>
					<option value="5">5/page</option>
					<option value="10">10/page</option>
					<option value="20">20/page</option>
					<option value="50">50/page</option>
				</Select>
				<Text ml="20px" fontSize="xs" color="gray.800">
					Show 1 of {perPage} entry {props.totalData}
				</Text>
			</Flex>
			<Flex height="40px">
				<Button
					bg="white"
					fontSize="sm"
					fontWeight="normal"
					border="0.9px solid #E2E2E2"
					disabled={currentPage === 1 ? true : false}
					onClick={handlePageClick}
					value="Previous"
					borderRightRadius="0px"
				>
					Previous
				</Button>
				{howManyPageBlocks(totalPages).map((page, index) => (
					<Button
						key={index}
						bg={currentPage === page ? '#325288' : 'white'}
						fontSize="sm"
						fontWeight="normal"
						color={currentPage === page ? 'white' : 'gray.800'}
						borderRadius="0px"
						border="0.9px solid #E2E2E2"
						value={page}
						onClick={handlePageClick}
					>
						{page}
					</Button>
				))}

				<Button
					bg="white"
					fontSize="sm"
					fontWeight="normal"
					border="0.9px solid #E2E2E2"
					disabled={currentPage === totalPages ? true : false}
					value="Next"
					onClick={handlePageClick}
					borderLeftRadius="0px"
				>
					Next
				</Button>
			</Flex>
		</Flex>
	)
}

export default Pagination
