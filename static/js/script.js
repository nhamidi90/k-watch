document.addEventListener('DOMContentLoaded', function () {

    // navbar 
    let navbar = document.querySelectorAll('.sidenav');
    M.Sidenav.init(navbar);

    // Dropdown menu 
    let dropdown = document.querySelectorAll('select');
    M.FormSelect.init(dropdown);

    // status dropdown 
    let drop = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(drop);

    // Modal
    let modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);

    // Carousel
    let carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel, {
        numVisible: 10
    });

    // Star rating 
    let star = document.querySelectorAll('input.star');
    let showValue = document.querySelector('#rating-value');

    for (let i = 0; i < star.length; i++) {
        star[i].addEventListener('click', function () {
            i = this.value;
            this.parentElement.parentElement.nextElementSibling.innerHTML = i + " out of 10";
            showValue.innerHTML = i + " out of 10";
        });
    }

    // Show/hide drama tables 
    allShows = document.getElementById("all-shows");
    planToWatch = document.getElementById("plan-to-watch");
    currentlyWatching = document.getElementById("currently-watching");
    completed = document.getElementById("completed");
    dropped = document.getElementById("dropped");

    document.getElementById("menu-all")?.addEventListener("click", showAllShows);
    document.getElementById("menu-plan-to-watch")?.addEventListener("click", showPlanToWatch);
    document.getElementById("menu-currently-watching")?.addEventListener("click", showCurrentlyWatching);
    document.getElementById("menu-completed")?.addEventListener("click", completedDramas);
    document.getElementById("menu-dropped")?.addEventListener("click", showDropped);

    document.getElementById("menu-all-desktop")?.addEventListener("click", showAllShows);
    document.getElementById("menu-plan-to-watch-desktop")?.addEventListener("click", showPlanToWatch);
    document.getElementById("menu-currently-watching-desktop")?.addEventListener("click", showCurrentlyWatching);
    document.getElementById("menu-completed-desktop")?.addEventListener("click", completedDramas);
    document.getElementById("menu-dropped-desktop")?.addEventListener("click", showDropped);

    function showAllShows() {
        /**
         * This will display all dramas
         */
        allShows.classList.remove('nodisplay');
        planToWatch.classList.add('nodisplay');
        currentlyWatching.classList.add('nodisplay');
        completed.classList.add('nodisplay');
        dropped.classList.add('nodisplay');
    }

    function showPlanToWatch() {
        /**
         * This will display only plan to watch dramas
         */
        allShows.classList.add('nodisplay');
        planToWatch.classList.remove('nodisplay');
        currentlyWatching.classList.add('nodisplay');
        completed.classList.add('nodisplay');
        dropped.classList.add('nodisplay');
    }

    function showCurrentlyWatching() {
        /**
         * This will display only currently watching dramas
         */
        allShows.classList.add('nodisplay');
        planToWatch.classList.add('nodisplay');
        currentlyWatching.classList.remove('nodisplay');
        completed.classList.add('nodisplay');
        dropped.classList.add('nodisplay');
    }

    function completedDramas() {
        /**
         * This will display only completed dramas
         */
        allShows.classList.add('nodisplay');
        planToWatch.classList.add('nodisplay');
        currentlyWatching.classList.add('nodisplay');
        completed.classList.remove('nodisplay');
        dropped.classList.add('nodisplay');
    }

    function showDropped() {
        /**
         * This will display only dropped dramas
         */
        allShows.classList.add('nodisplay');
        planToWatch.classList.add('nodisplay');
        currentlyWatching.classList.add('nodisplay');
        completed.classList.add('nodisplay');
        dropped.classList.remove('nodisplay');
    }

    // Custom materialize validation 
    validateMaterializeSelect();

    function validateMaterializeSelect() {
        let classValid = "border-bottom: 1px solid #4caf50; box-shadow: 0 1px 0 0 #4caf50;";
        let classInvalid = "border-bottom: 1px solid #f44336; box-shadow: 0 1px 0 0 #f44336;";
        let selectValidate = document.querySelector("select.validate");
        let selectWrapperInput = document.querySelector(".select-wrapper input.select-dropdown");
        let selectWrapperInputs = document.getElementsByClassName('dropdown-trigger');
        for (let i=0; i < selectWrapperInputs.length; i++) {
            selectWrapperInputs[i].addEventListener("focusin", (e) => {
                e.target.parentNode.addEventListener("change", () => {
                    ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
                    for (let i = 0; i < ulSelectOptions.length; i++) {
                        if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled") {
                            e.target.style.cssText = classValid;
                        }
                    }
                });
            });
            selectWrapperInputs[i].addEventListener("click", (e) => {
                ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
                for (let i = 0; i < ulSelectOptions.length; i++) {
                    if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled" && ulSelectOptions[i].style.backgroundColor == "rgba(0, 0, 0, 0.03)") {
                        e.target.style.cssText = classValid;
                    } else {
                        e.target.addEventListener("focusout", () => {
                            if (e.target.parentNode.childNodes[3].hasAttribute("required")) {
                                console.log('this field is required')
                                if (e.target.style.borderBottom != "1px solid rgb(76, 175, 80)") {
                                    e.target.style.cssText = classInvalid;
                                }
                            }
                        });
                    }
                }
            });
        }

        if (selectValidate.hasAttribute("required")) {
            selectValidate.style.cssText = "display: block; height: 0; padding: 0; width: 0; position: absolute;";
        }
        selectWrapperInput.addEventListener("focusin", (e) => {
            e.target.parentNode.addEventListener("change", () => {
                ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
                for (let i = 0; i < ulSelectOptions.length; i++) {
                    if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled") {
                        e.target.style.cssText = classValid;
                    }
                }
            });
        });

        selectWrapperInput.addEventListener("click", (e) => {
            ulSelectOptions = e.target.parentNode.childNodes[1].childNodes;
            for (let i = 0; i < ulSelectOptions.length; i++) {
                if (ulSelectOptions[i].className == "selected" && ulSelectOptions[i].hasAttribute != "disabled" && ulSelectOptions[i].style.backgroundColor == "rgba(0, 0, 0, 0.03)") {
                    e.target.style.cssText = classValid;
                } else {
                    e.target.addEventListener("focusout", () => {
                        if (e.target.parentNode.childNodes[3].hasAttribute("required")) {
                            if (e.target.style.borderBottom != "1px solid rgb(76, 175, 80)") {
                                e.target.style.cssText = classInvalid;
                            }
                        }
                    });
                }
            }
        });
    }

});


$(document).ready(function () {
    // reset star rating
    $(".resetButton").on('click', function () {
        $('.rating > input').prop('checked', '');
        $('#rating-value').empty();
    });

    // toggle delete account section
    $("#delete-account").hide();
    $("#delete-button").on('click', function () {
        $("#delete-account").toggle();
    })

});