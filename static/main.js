window.addEventListener("load", () => {
	let lastTouchTime = 0;
	
	function enableHover() {
		if (new Date() - lastTouchTime < 500) return;
		document.body.classList.add("hasHover");
	}
	
	function disableHover() {
		document.body.classList.remove("hasHover");
	}
	
	function updateLastTouchTime() {
		lastTouchTime = new Date();
	}
	
	document.addEventListener("touchstart", updateLastTouchTime, true);
	document.addEventListener("touchstart", disableHover, true);
	document.addEventListener("mousemove", enableHover, true);

	enableHover();
});

document.querySelector('div.burger').addEventListener("click", function() {
	if(!document.querySelector('div.burger').classList.contains('open')) {
		openMenu();
	} else {
		closeMenu();
	}
});

var mobileMenuItems = document.querySelectorAll('div.menu ul li a');
for(var i = 0; i < mobileMenuItems.length; i++) {
	mobileMenuItems[i].addEventListener("click", function(e) {
		closeMenu();
	});
};

function openMenu() {
	document.querySelector('body').classList.add('menuOpened');

	document.querySelector('div.circle').classList.add('expand');
	document.querySelector('div.burger').classList.add('open');
	document.querySelector('div.x').classList.add('collapse');
	document.querySelector('div.z').classList.add('collapse');

	document.getElementById('mobileMenuWrapper').style.pointerEvents = "auto";
	
	var menuItems = document.querySelectorAll('.list li');
	for(var i = 0; i < menuItems.length; i++) {
		menuItems[i].classList.add('animate');
	};

	setTimeout(function() {
		document.querySelector('div.y').style.display = 'none';
		document.querySelector('div.x').classList.add('rotate30');
		document.querySelector('div.z').classList.add('rotate150');
	}, 70);

	setTimeout(function() {
		document.querySelector('div.x').classList.add('rotate45');
		document.querySelector('div.z').classList.add('rotate135');
	}, 120);
}

function closeMenu() {
	document.querySelector('body').classList.remove('menuOpened');

	document.getElementById('mobileMenuWrapper').style.pointerEvents = "none";

	document.querySelector('div.burger').classList.remove('open');
	document.querySelector('div.x').classList.remove('rotate45');
	document.querySelector('div.x').classList.add('rotate30');
	document.querySelector('div.z').classList.remove('rotate135');
	document.querySelector('div.circle').classList.remove('expand');

	var menuItems = document.querySelectorAll('.list li');
	for(var i = 0; i < menuItems.length; i++) {
		menuItems[i].classList.remove('animate');
	};
	
	setTimeout(function() {
		document.querySelector('div.x').classList.remove('rotate30');
		document.querySelector('div.z').classList.remove('rotate150');
	}, 50);
	setTimeout(function() {
		document.querySelector('div.y').style.display = 'block';
		document.querySelector('div.x').classList.remove('collapse');
		document.querySelector('div.z').classList.remove('collapse');
	}, 70);
	setTimeout(function() {
		document.getElementById("mobileNav").style.height="var(--nav-height)";
	}, 300);
}