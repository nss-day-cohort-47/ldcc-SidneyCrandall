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
            <button class="btn btn-outline-primary" id="myBtn" type="button";>Add A Type</button>
            <!-- The Modal -->
            <div id="myModal" class="modal">
                
                <!-- Modal content -->
                <div class="modal-content">
                    <div class="addSnack">
                        <input value="" name="addSnackNameHere" class="post_SnackName" type="text" placeholder="Name of Snack" />
                        <br>
                        <input value="" name="addSnackImageHere" class="post_SnackImage" type="text" placeholder="ImageURL of Snack" />
                        <br>
                        <input value="" name="addSnackCountHere" class="post_SnackCount" type="text" placeholder="Count of Snack" />
                        <br>
                        <input value="" name="addSnackShapeHere" class="post_SnackShape" type="text" placeholder="Shape of Snack" />
                        <br>
                        <input value="" name="addSnackFlavorHere" class="post_SnackFlavor" type="text" placeholder="Flavor of Snack" />
                        <br>
                        <input value="" name="addSnackSeasonHere" class="post_SnackSeason" type="text" placeholder="Season of Snack" />
                        <br>
                        <input value="" name="addSnackDescriptionHere" class="post_SnackDescription" type="text" placeholder="Description of Snack" />
                        <br>
                        <input value="" name="addSnackToppingsHere" class="post_SnackToppings" type="text" placeholder="Toppings of Snack" />
                        <br>
                        
                    </div>
                    <button id="newPost__submit">Submit</button>
                </form>  
                <span class="close">&times;</span>
                <p>Please add the desired snack.</p>
            </div>
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


