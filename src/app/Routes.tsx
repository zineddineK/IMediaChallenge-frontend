import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import IndexProducts from './products/indexProducts'
import ListCategories from './categories/ListCategories'

const Router: React.FC = (): React.ReactElement => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={IndexProducts} />
			<Route exact path="/products" component={IndexProducts} />
			<Route exact path="/category-list" component={ListCategories} />
		</Switch>
	</BrowserRouter>
)

export default Router
