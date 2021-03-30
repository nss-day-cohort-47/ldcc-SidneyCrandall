import { getLoggedInUser, getToppings, useToppingsCollection } from "../data/apiManager.js"


// Using the fetch() to call the toppings 
export const toppingDropdown = () => {
	const toppingsArray = useToppingsCollection()
	console.log(toppingsArray);
	//let topppingsSelect = "";
	const toppingsSelection = toppingsArray.map((topping) => {
		 return `<option value="${topping.id}">${topping.name}</option>`
	});
	
	return toppingsSelection.join("")
}

export const populateDropdown = () => {
	getToppings()
		.then(() => {
			const selection = useToppingsCollection()
			toppingDropdown(selection)
		})
}

export const NavBar = () => {
	//only show navItems and addTypeButton if user is logged in

	//toppingDropdown();
	const navItems = getLoggedInUser().id ? `
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav me-auto mb-2 mb-lg-0">
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="allSnacks">All Snacks</button>
		</li>
		<li class="nav-item ms-1">
			<select class="form-select topping-dropdown btn-info" id="toppingDropdown" aria-label="Select A Topping">
				<option selected>Select A Topping</option>
				${toppingDropdown()};
			</select>
		</li>
		<li class="nav-item ms-1">
			<button class="btn btn-info" type="button" id="logout">Logout</button>
		</li>
	</ul>
	</div>` : ""

	const addTypeButton = getLoggedInUser().admin ? `
	<nav class="navbar navbar-light"">
		<div class="container-fluid">
			<button class="btn btn-outline-primary" type="button">Add A Type</button>
		</div>
	</nav>` : ""

	return `
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  		<div class="container-fluid">
		  <span class="navbar-brand mb-0 h1">LDCC
		  	<span class="navbar-text">Little Debbie Collector Club</span>
		  </span>
		${navItems}
  		</div>
	</nav>
	${addTypeButton}
	`
}


		