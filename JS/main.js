var space = document.getElementsByClassName("space-conatiner")[0];
var sun = document.getElementById('jupiter');
var moon = document.getElementById('io');

var control = 1;
var moonControl = 0;
var maxPlanetQuantity = 0;
var maxStarQuantitity = 0;
sun.style.zIndex = "100";
sun.style.cursor = "pointer";


function twist() {
	if(moonControl < 1)  {
		var jupiter = document.getElementById("jupiter");
		var io = document.getElementById("io");
		var space = document.getElementsByClassName("space-conatiner")[0];
		var spaceWidth = space.clientWidth;
		var spaceHeight = space.clientHeight;
		var ioWidth = io.clientWidth;
		var ioHeight = io.clientHeight;
		var innerOffsetLeft = parseInt(getComputedStyle(io).getPropertyValue("left"));
		var innerOffsetTop = parseInt(getComputedStyle(io).getPropertyValue("top"));
		var ghostContainer = document.createElement("div");
		ghostContainer.appendChild(io);
		var ghostContainerWidth = spaceWidth - innerOffsetLeft * 2.5;
		var ghostContainerHeight = spaceHeight - innerOffsetLeft * 2.5;

		ghostContainer.style.left = innerOffsetLeft * 1.25 + "px";
		ghostContainer.style.top = innerOffsetLeft * 1.25 + "px";
		ghostContainer.style.width = ghostContainerWidth + "px";
		ghostContainer.style.height = ghostContainerHeight + "px";
		ghostContainer.style.position = "relative";
		space.appendChild(ghostContainer);

		io.style.transition = "opacity 0.7s linear";
		io.style.opacity = "0";
		setTimeout(function() {
			io.style.opacity = "1";
		}, 0);

		var radius = ghostContainerWidth / 2;
		var angle = 250; 
		var newAngle = 2 * Math.PI / 180;

		setTimeout(function go() {
			angle += newAngle;
			io.style.left =  (ghostContainerWidth - ioWidth) / 2 + radius * Math.sin(angle)  + 'px'; 
			io.style.top =   (ghostContainerHeight - ioWidth) / 2 + radius * Math.cos(angle) + 'px';
			setTimeout(go, 20);
		}, 20);
		moonControl += 1;
	}

}

function makeWrap(element) {
	var container = document.createElement("div");
	var oldStyle = {
		width: element.clientWidth,
		height: getComputedStyle(element).getPropertyValue("height"),
		position: getComputedStyle(element).getPropertyValue("position"),
		left: getComputedStyle(element).getPropertyValue("left"),
		top: getComputedStyle(element).getPropertyValue("top"),
		transform: getComputedStyle(element).getPropertyValue("transform")
	}
	var clearStyle = {
		width: element.clientWidth,
		height: getComputedStyle(element).getPropertyValue("height"),
		position: "static",
		left: "0",
		top: "0",
		transform: "none"
	}
	container.style.width = oldStyle.width + "px";
	container.style.height = oldStyle.height;
	container.style.position = oldStyle.position;
	container.style.left = oldStyle.left;
	container.style.top = oldStyle.top;
	container.style.zIndex = 40;
	container.style.transform = oldStyle.transform;
	container.className = element.className + "__wrap";

	element.style.width = clearStyle.width + "px";
	element.style.height = clearStyle.height;
	element.style.position = clearStyle.position;
	element.style.left = clearStyle.left;
	element.style.top = clearStyle.top;
	element.style.transform = clearStyle.transform;
	container.appendChild(element);
	space.appendChild(container)
}

var rotateElement = function (element, turnover, t) {
	var rotateControl = 0
	var element = element;
	var turnover = (turnover == undefined) ? (2 * 360) : turnover * 360;

	var currentTurnover= 0;
	var time = (t == undefined) ? 25 : t;
	setTimeout(function goRotate() {
		if(currentTurnover <= turnover) {
			element.style.transform = "rotate(" + rotateControl + "deg)";
			rotateControl += 1;
			currentTurnover += 1;
			setTimeout(goRotate, time);
		}
	}, time);
}

function addStarBg(element) {
	var src = document.getElementsByClassName("bg")[0].getAttribute("src");
	var absBg = document.createElement("div");

	absBg.style.width = "100%";
	absBg.style.height = "100%";
	absBg.style.position = "absolute";
	absBg.style.left = "0";
	absBg.style.top = "0";
	absBg.style.backgroundImage = "url(" + src + ")";
	absBg.style.backgroundRepeat = "no-repeat";
	absBg.style.backgroundSize = "121%";
	absBg.style.backgroundPosition = "center";
	absBg.style.opacity = "0.45";
	absBg.className = "visualBg";
	space.appendChild(absBg);
}

function addMove() {
	var newBg = document.getElementsByClassName("visualBg")[0];

	if (control == 3) {
		console.log(control);
		control -= 1;
	}
	if (control == 2) {

		rotateElement(sun, 2, 5);
		setTimeout(function ()  {
			rotateElement(newBg, 3, 25);
		}, 2000);
		sun.removeEventListener("click", addMove);
		setTimeout(function () {
			sun.addEventListener("click", addMove);
		}, 4100)
		control += 1;
	}
	if( control == 1) {
		makeWrap(sun);
		rotateElement(sun, 2, 5);
		sun.removeEventListener("click", addMove);
		setTimeout(function () {
			rotateElement(newBg, 3, 25);
		}, 1800);
		setTimeout(function () {
			sun.addEventListener("click", addMove);
		}, 4100);
		control += 1;
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

sun.addEventListener("click", addMove);
sun.addEventListener("click", addStarBg(space));


space.addEventListener("click", function(event) {
	var target = event.target;
	var left = event.clientX - space.getBoundingClientRect().left;
	var top = event.clientY - space.getBoundingClientRect().top;
	var limitTop = space.clientHeight;
	var limitLeft = space.clientWidth;
	if (maxPlanetQuantity < 7) {
		if(!target.classList.contains("space-object")) {
			if(target.tagName == "DIV" && !target.classList.contains("newPlanet__color")) {
				var newPlanet = document.createElement("div");
				var newPlanetContainer = document.createElement("div");
				var newPlanetForm = document.createElement("img");
				var newPlanetColor = document.createElement("div");
				var newPlanetText = document.createElement("div");
				var src = moon.getAttribute("src");
				var size = getRandomInt(20, 60);
				var randomColor = "rgba(" + getRandomInt(0, 255) + ", " + getRandomInt(0, 255) + ", " + getRandomInt(0, 255) + ", " + (getRandomInt(4, 8) / 10)  + ")";

				newPlanet.style.width = size + "px";
				newPlanet.style.height = size + "px";
				newPlanet.style.position = "absolute";
				newPlanet.style.borderRadius = "50%";
				newPlanet.classList.add("newPlanet");

				newPlanetContainer.style.width = "100%";
				newPlanetContainer.style.height = "100%";
				newPlanetContainer.style.position = "relative";
				newPlanetForm.setAttribute("src", src);
				newPlanetForm.style.display = "inline-block";
				newPlanetForm.style.width = "100%";
				newPlanetColor.style.width = "100%";
				newPlanetColor.style.height = "100%";
				newPlanetColor.style.position = "absolute";
				newPlanetColor.style.left = "0";
				newPlanetColor.style.top = "0";
				newPlanetColor.style.backgroundColor = randomColor;
				newPlanetColor.style.borderRadius = "50%";
				newPlanet.style.cursor = "pointer";
				newPlanetColor.classList.add("newPlanet__color");

				newPlanetText.appendChild(document.createTextNode("Whyyyy ???"));
				newPlanetText.style.padding = "5px 10px";

				newPlanetText.style.width = "85px";
				newPlanetText.style.height = "27px";
				newPlanetText.style.position = "absolute";
				newPlanetText.style.right =  "-40px";
				newPlanetText.style.top =  (size < 30) ? "-35px" : "-40px"
				newPlanetText.style.border = "3px solid #000";
				newPlanetText.style.backgroundColor = "#fff";
				newPlanetText.style.color = "#000";
				newPlanetText.style.fontSize = "10px";
				newPlanetText.style.fontWeight = "700";
				newPlanetText.style.textAlign = "center";
				newPlanetText.style.opacity = "0";
				newPlanetText.style.transition = "all 0.1s linear";

				if( (top > size) && (top < limitTop - size) && (left > size) && (left < limitLeft - size) ) {
					newPlanetContainer.appendChild(newPlanetForm);
					newPlanetContainer.appendChild(newPlanetColor)
					newPlanetContainer.appendChild(newPlanetText);
					newPlanet.appendChild(newPlanetContainer);
					space.appendChild(newPlanet);
					newPlanet.style.top =  (top - newPlanet.offsetHeight / 2) + "px";
					newPlanet.style.left = (left - newPlanet.offsetWidth / 2) + "px";
					maxPlanetQuantity += 1;
				} 
			}
		}
	}
	if(target.classList.contains("newPlanet__color")) {
		var neighbor = target.nextElementSibling;
		while(!target.classList.contains("newPlanet")) {
			target = target.parentElement;
			if(target.classList.contains("newPlanet")) {
				neighbor.style.opacity = "1";
				target.style.transition = "all 3s linear";
				target.style.opacity = 0;	
				maxPlanetQuantity -= 1;	
				setTimeout(function () {
					target.style.display = "none";
				}, 3000);		
			}
		}
	}
	
	if(maxPlanetQuantity >= 7 && maxStarQuantitity < 1000) {
		if(!target.classList.contains("space-object") && !target.classList.contains("newPlanet__color")) {
			var newStar = document.createElement("div");
			var newStarContainer = document.createElement("div");
			var newStarColor = document.createElement("div");
			var size = getRandomInt(2.5, 4);
			var randomColor = "rgba(" + getRandomInt(200, 255) + ", " + getRandomInt(200, 255) + ", " + getRandomInt(200, 255) + ", " + (getRandomInt(6, 9) / 10)  + ")";

			newStar.style.width = size + "px";
			newStar.style.height = size + "px";
			newStar.style.position = "absolute";
			newStar.style.borderRadius = "50%";
			newStar.classList.add("newStar");

			newStarContainer.style.width = "100%";
			newStarContainer.style.height = "100%";
			newStarContainer.style.position = "relative";

			newStarColor.style.width = "100%";
			newStarColor.style.height = "100%";
			newStarColor.style.position = "absolute";
			newStarColor.style.left = "0";
			newStarColor.style.top = "0";
			newStarColor.style.backgroundColor = randomColor;
			newStarColor.style.borderRadius = "50%";
			newStarColor.classList.add("newStar__color");


			if( (top > size) && (top < limitTop - size) && (left > size) && (left < limitLeft - size) ) {
				newStarContainer.appendChild(newStarColor)
				newStar.appendChild(newStarContainer);
				space.appendChild(newStar);
				newStar.style.top =  (top - newStar.offsetHeight / 2) + "px";
				newStar.style.left = (left - newStar.offsetWidth / 2) + "px";
				maxStarQuantitity += 1;
			} 
		}
	}
});

space.addEventListener("mouseover", function (event) {
	var target = event.target;
	var check = target.classList.contains("newPlanet__color");
	if(check) {
		while(!target.classList.contains("newPlanet")) {
			target = target.parentElement;
			if(target.classList.contains("newPlanet")) {
				target.addEventListener("mouseenter", function(event) {
					target.style.transform = "scale(1.3)"
					target.style.transition = "all 0.7s linear";
				});
				target.addEventListener("mouseleave", function(event) {
					target.style.transition = "all 0.4s linear";
					target.style.transform = "scale(1)";	
					console.log("leave");	
				});
			}
		}
	}
	
})

var button = document.getElementById("button");
button.addEventListener("click", twist);
// twist();
addStarBg(space);