import * as React from 'react'

import { chakra, Flex, FlexProps } from '@chakra-ui/react'

import Logo from '../../assets/illustrations/shopping.png'
import AtomReact from '../../assets/illustrations/atom.png'
import Nav from './Navbar'

interface HeaderProps extends FlexProps {}

const Header: React.FC<HeaderProps> = ({ ...props }: HeaderProps): React.ReactElement => {
	return (
		<Flex {...props} justify="space-between" align="center" bg="#EFFFFD">
			<Flex p={5}>
				<chakra.img src={Logo} width="100px" height="70px" />
			</Flex>
			<Flex flex={1}>
				<Nav />
			</Flex>
			<Flex
				p="18px 30px"
				ml="30px"
				height="100%"
				cursor="pointer"
				align="center"
				display={['none', 'none', 'inherit', 'inherit']}
			>
				<chakra.img src={AtomReact} />
			</Flex>
		</Flex>
	)
}

export default Header
