document.addEventListener('DOMContentLoaded', function() {
    let navbar = document.querySelectorAll('.sidenav');
    M.Sidenav.init(navbar);

    let dropdown = document.querySelectorAll('select');
    M.FormSelect.init(dropdown);
});