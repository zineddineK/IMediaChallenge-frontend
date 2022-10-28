import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

type MenuItemsProps = {
	items: any
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }: MenuItemsProps) => {
	const [dropdown, setDropdown] = useState(false)

	const onMouseEnter = () => {
		window.innerWidth > 960 && setDropdown(true)
	}

	const onMouseLeave = () => {
		window.innerWidth > 960 && setDropdown(false)
	}

	const closeDropdown = () => {
		dropdown && setDropdown(false)
	}

	return (
		<>
			<li
				className="menu-items"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={closeDropdown}
			>
				{items.submenu && items.url ? (
					<>
						<button
							type="button"
							aria-haspopup="menu"
							aria-expanded={dropdown ? 'true' : 'false'}
							onClick={(): void => setDropdown(!dropdown)}
						>
							<Link to={items.url}>{items.title}</Link>
							<span className="arrow" />
						</button>
						<Dropdown submenus={items.submenu} dropdown={dropdown} />
					</>
				) : !items.url && items.submenu ? (
					<>
						<button
							type="button"
							aria-haspopup="menu"
							aria-expanded={dropdown ? 'true' : 'false'}
							onClick={(): void => setDropdown(!dropdown)}
						>
							{items.title}
						</button>
					</>
				) : (
					<Link to={items.url}>{items.title}</Link>
				)}
			</li>
		</>
	)
}

export default MenuItems
