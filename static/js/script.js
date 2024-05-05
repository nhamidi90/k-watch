document.addEventListener('DOMContentLoaded', function() {
    let navbar = document.querySelectorAll('.sidenav');
    M.Sidenav.init(navbar);

    let dropdown = document.querySelectorAll('select');
    M.FormSelect.init(dropdown);

    let star = document.querySelectorAll('input');
    let showValue = document.querySelector('#rating-value');

    for (let i = 0; i < star.length; i++) {
	    star[i].addEventListener('click', function() {
		    i = this.value;

		showValue.innerHTML = i + " out of 10";
	});
}


    let status = document.getElementById('status');
    let episodesWatched = document.getElementById('number-of-eps');
    status.addEventListener('click', showElement);

function showElement(status, episodesWatched){
        if (status.value === "Currently Watching") {
            revealElement(episodesWatched);
        }
    }

    function revealElement(episodesWatched) {
        episodesWatched.classList.remove("nodisplay")
    }

});

