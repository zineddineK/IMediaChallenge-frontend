import React from 'react'
import { Flex } from '@chakra-ui/react'
import Header from './Header'

interface AppLayoutProps {
	children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }: AppLayoutProps): React.ReactElement => {
	return (
		<div className="content">
			<Flex direction="column" bg="white" position="relative" flex={1} height="100vh">
				<Header />
				<Flex
					direction="column"
					height="100%"
					overflowY="auto"
					px={['12px', '12px', '22px', '22px']}
					py="20px"
				>
					{children}
				</Flex>
			</Flex>
		</div>
	)
}

export default AppLayout
