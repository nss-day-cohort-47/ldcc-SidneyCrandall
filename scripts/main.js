console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar, populateDropdown, toppingDropdown } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import { logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser, getSnacks, getSingleSnack, getToppings, getSnackToppings, useToppingsCollection, useSnackCollection } from "./data/apiManager.js";
import { modalFunction } from "./nav/ModalFunction.js";


const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const listElement = document.querySelector(".mainContainer");
					listElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        const name = document.querySelector("input[name='addSnackNameHere']").value
        const snackImg = document.querySelector("input[name='addSnackImageHere']").value
        const count = document.querySelector("input[name='addSnackCountHere']").value
        const inFlavorId = document.querySelector("input[name='addSnackShapeHere']").value
        const shapeId = document.querySelector("input[name='addSnackFlavorHere']").value
        const seasonId = document.querySelector("input[name='addSnackSeasonHere']").value
        const description = document.querySelector("input[name='addSnackDescriptionHere']").value
        const toppings = document.querySelector("input[name='addSnackToppingsHere']").value
            const snackObj = {
            name: name,
            snackImg: snackImg, 
            count: count,
            shapeId: shapeId,
            inFlavorId: inFlavorId,
            seasonId: seasonId,
            description: description,
            toppings: toppings
        }
        createSnack(snackObj)
    }
});
// end login register listeners

// snack listeners

applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(response => {
				showDetails(response);
			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

// Toppings listener
// This Event Listener pulls from the function in NavBar.js. Utilizing .find() and .filter() to find the snacks that match the toppings that are chosen from the dropdown.
applicationElement.addEventListener("change", event => {
	event.preventDefault();
	if(event.target.id === "toppingDropdown") {
		const index = event.target.options.selectedIndex
		const selectedTopping = event.target.options[index].value
		const selectToppingsArray = useSnackCollection()
		const filteredToppings = selectToppingsArray.filter(eachSnack => {
			const snack = eachSnack.snackToppings.find(eachTopping => eachTopping.toppingId === parseInt(selectedTopping))
			if (snack) {
				return eachSnack
			}
		})
			const listElement = document.querySelector("#mainContent")
			listElement.innerHTML = SnackList(filteredToppings)
	}
})
	
		
// for snack detail button
const showDetails = (snackObj, toppingObject) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
}
//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

//A get function had to be used since a function inside the navbar controls the dropdown and other buttons.
// A modal function was added for LD to add a snack at any time she would like. 
const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	getToppings().then(() =>{
		showNavBar();
		applicationElement.innerHTML += `<div id="mainContent"></div>`;
		showSnackList();
		showFooter();
		modalFunction();
	})
}
checkForUser();

