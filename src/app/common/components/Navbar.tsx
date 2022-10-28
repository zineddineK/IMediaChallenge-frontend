import React from 'react'
import { menuItems } from './menuItems'
import MenuItems from './MenuItem'

const Nav: React.FC = (): React.ReactElement => {
	return (
		<nav>
			<ul className="menus">
				{menuItems.map((menu, index) => {
					return <MenuItems items={menu} key={index} />
				})}
			</ul>
		</nav>
	)
}

export default Nav
