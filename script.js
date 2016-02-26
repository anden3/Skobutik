// If one of the main menus are clicked
function menuClick(e) {
    // Checking if menu already is displayed, and if so, removes it from the search criterias.
    if (searchVars['gender'] === e.target.id) {
        if (!!searchVars.maxPrice) {
            searchVars = { maxPrice: searchVars.maxPrice };
        }
        else {
            searchVars = {};
        }
    }
    // Else, add it to the search criterias.
    else {
        if (!!searchVars.maxPrice) {
            searchVars = { maxPrice: searchVars.maxPrice, gender: e.target.id };
        }
        else {
            searchVars = { gender: e.target.id };
        }
    }
}

// If hovering over a main menu.
function menuHover(e, entering) {
    var id;

    // Set the id based on hovered item.
    if (e.target.classList[0] === "gender") {
        id = e.target.id;
    }
    else if (e.target.classList[0] === "shoe-options") {
        if (e.target.id.indexOf("woman") > -1) {
            id = "woman";
        }
        else {
            id = "man";
        }
    }
    else if (e.target.classList[0] === "type-option" || e.target.classList[0] === "brand-option") {
        if (e.target.parentElement.id.indexOf("woman") > -1) {
            id = "woman";
        }
        else {
            id = "man";
        }
    }
    else if (e.target.classList[0] === "brand" || e.target.classList[0] === "type") {
        if (e.target.parentElement.parentElement.id.indexOf("woman") > -1) {
            id = "woman";
        }
        else {
            id = "man";
        }
    }

    // Reset menus.
    $("#" + e.target.id + "-brand").slideUp(200);
    $("#" + e.target.id + "-type").slideUp(200);

    $("#menu-" + genders[e.target.id]).slideUp(200);

    // Slide down the right menu.
    if (entering) {
        $("#menu-" + e.target.id).slideDown(200);
    }
    else {
        $("#menu-" + e.target.id).slideUp(200);
    }
}

// If hovering over one of the sub menus.
function optionHover(e, entering, button) {
    // Get the grandparent of the option.
    var parentID = e.target.parentElement.parentElement.id;
    var deleteAfter = false;

    // Removing parts of the string, to get the relevant part.
    if (parentID.substring(0, 5).indexOf('man') > 0) {
        var gender = parentID.substring(0, parentID.indexOf('-'));
    }
    else {
        var gender = parentID.substring(5, parentID.length);
    }

    // If entering the sub menu, get the lists of Brands or Types from the database.
    if (entering) {
        // If the gender is in the search criterias, just get the lists.
        if (!!searchVars.gender) {
            getLists(button);
        }
        // Otherwise, temporarily add the gender to the search criteria.
        else {
            searchVars.gender = gender;
            getLists(button);
            deleteAfter = true;
        }

        $("#" + gender + "-" + button).slideDown(200);
    }
    // Else, hide the sub menu.
    else {
        $("#" + gender + "-" + button).slideUp(200);
    }

    // Hide the other sub menu.
    $("#" + gender + "-" + categories[button]).slideUp(200);

    // If gender was added temporarily, remove it after 500 ms .
    if (deleteAfter) {
        setTimeout(function () {
            delete searchVars.gender;
        }, 500);
    }
}

// Toggle an option.
function toggleOptions(e, button) {
    if (!!searchVars[button]) {
        delete searchVars[button];
    }
}

// Event listeners.
function eventListeners() {
    // Reset everything if clicking on the header image.
    $(".header img").click(function (e) { searchVars = {}; getShoes(); });

    // If clicking on one of the main menus, call the menuClick function and get the new Shoes.
    $(".gender").click(function (e) { menuClick(e); getShoes(); });

    // Timer for how long before closing menu after leaving it.
    var hoverTimer = 500;

    // If hovering over one of the main menus.
    $(".gender").on("mouseenter", function (e) {
        // Reset the menu timer.
        clearTimeout(window.close_menu);

        // Call the menuHover function.
        menuHover(e, true);

    }).on("mouseleave", function (e) { // If leaving one of the main menus.
        // Start the menu timer.
        window.close_menu = setTimeout(function() { menuHover(e, false) }, hoverTimer);
    });

    // If hovering over one of the sub menus.
    $(".shoe-options").on("mouseenter", function (e) {
        // Reset the menu timer.
        clearTimeout(window.close_menu);

        // Call the menuHover function.
        menuHover(e);

    }).on("mouseleave", function (e) { // If leaving one of the sub menus.
        // Start the menu timer.
        window.close_menu = setTimeout(function() { menuHover(e, false) }, hoverTimer);
    });

    // If hovering over one of the Brand options.
    $(".brand-option").on("mouseenter", function (e) {
        // Reset the timers.
        clearInterval(window.close_category);
        clearInterval(window.close_menu);

        // Call the optionHover function.
        optionHover(e, true, "brand");

    }).on("mouseleave", function (e) { // If leaving one of the Brand options.
        // Start the category timer.
        window.close_category = setTimeout(function() { optionHover(e, false, "brand"); }, hoverTimer);
    });

    // If hovering over one of the Type options.
    $(".type-option").on("mouseenter", function (e) {
        // Reset the timers.
        clearInterval(window.close_category);
        clearInterval(window.close_menu);

        // Call the optionHover function.
        optionHover(e, true, "type");

    }).on("mouseleave", function (e) { // If leaving one of the Type options.
        // Start the category timer.
        window.close_category = setTimeout(function() { optionHover(e, false, "type"); }, hoverTimer);
    });

    // If clicking one of the options, call the toggleOptions function and get the new Shoes.
    $(".brand-option").click(function (e) { toggleOptions(e, "brand"); getShoes(); });
    $(".type-option").click(function (e) { toggleOptions(e, "type"); getShoes(); });

    // If changing the Max Price slider, update its label with the current value.
    $("#search-price").on('input', function (e) { $("#search-price-label").html(e.target.value); });

    // If the Max Price slider was changed, set its value as a search criteria, and get the new Shoes.
    $("#search-price").change(function (e) { searchVars["maxPrice"] = e.target.value; getShoes(); });
}

// Call the eventListeners function.
eventListeners();
