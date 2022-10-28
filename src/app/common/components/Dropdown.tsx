import React from 'react'
import { Link } from 'react-router-dom'

type DropdownProps = {
	submenus: any
	dropdown: any
}

const Dropdown: React.FC<DropdownProps> = ({
	submenus,
	dropdown,
}: DropdownProps): React.ReactElement => {
	return (
		<ul className={`dropdown ${dropdown ? 'show' : ''}`}>
			{submenus.map((submenu: any, index: number) => (
				<li key={index} className="menu-items">
					<Link to={submenu.url}>{submenu.title}</Link>
				</li>
			))}
		</ul>
	)
}

export default Dropdown
