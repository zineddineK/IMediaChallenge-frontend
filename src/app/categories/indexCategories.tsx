import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Divider,
	Flex,
	Heading,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../common/helpers/api'

const IndexCtagories: React.FC = (): React.ReactElement => {
	const { data: categories } = useSWR('/categories', fetcher)

	return (
		<Flex
			p={6}
			w="90%"
			height="max-content"
			bg="white"
			direction="column"
			fontSize="sm"
			borderRadius="5px"
			boxShadow="0.36px 0.93px 20px #0000000D"
		>
			<Heading color="#253d4e">Category</Heading>
			<Divider p={1} />
			{categories &&
				categories.length > 0 &&
				categories.map((item: any, index: any) => (
					<Accordion key={index} allowMultiple mt="20px">
						<AccordionItem borderTop="0px" borderBottom="0px" bg="#F8F8F8" borderRadius="5px">
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{item.name}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							{item && item.parent ? (
								<AccordionPanel bg="white">
									<li>{item.parent.name}</li>
								</AccordionPanel>
							) : (
								<AccordionPanel bg="white">
									<Text>No sub category</Text>
								</AccordionPanel>
							)}
						</AccordionItem>
					</Accordion>
				))}
		</Flex>
	)
}

export default IndexCtagories
