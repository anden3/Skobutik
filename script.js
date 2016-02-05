function menuClick(e) {
    if (searchVars['gender'] === e.target.id) {
        if (!!searchVars.maxPrice) {
            searchVars = { maxPrice: searchVars.maxPrice };
        }
        else {
            searchVars = {};
        }
    }
    else {
        if (!!searchVars.maxPrice) {
            searchVars = { maxPrice: searchVars.maxPrice, gender: e.target.id };
        }
        else {
            searchVars = { gender: e.target.id };
        }
    }
}

function menuHover(e, entering) {
    var id;

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

    $("#" + e.target.id + "-brand").slideUp(200);
    $("#" + e.target.id + "-type").slideUp(200);

    $("#menu-" + genders[e.target.id]).slideUp(200);

    if (entering) {
        $("#menu-" + e.target.id).slideDown(200);
    }
    else {
        $("#menu-" + e.target.id).slideUp(200);
    }
}

function optionHover(e, entering, button) {
    var parentID = e.target.parentElement.parentElement.id;
    var deleteAfter = false;

    if (parentID.substring(0, 5).indexOf('man') > 0) {
        gender = parentID.substring(0, parentID.indexOf('-'));
    }
    else {
        var gender = parentID.substring(5, parentID.length);
    }

    if (entering) {
        if (!!searchVars.gender) {
            getLists(button);
        }
        else {
            searchVars.gender = gender;
            getLists(button);
            deleteAfter = true;
        }

        $("#" + gender + "-" + button).slideDown(200);
    }
    else {
        $("#" + gender + "-" + button).slideUp(200);
    }

    $("#" + gender + "-" + categories[button]).slideUp(200);

    if (deleteAfter) {
        setTimeout(function () {
            delete searchVars.gender;
        }, 500);
    }
}

function toggleOptions(e, button) {
    if (!!searchVars[button]) {
        delete searchVars[button];
    }
}

function showShoe(id) {
    $(".contents").css.display = "none";
    $(".desc").html = "";

    console.log(shoes);
    console.log(id);

    $(".desc").append('<h2>' + shoes[id]["Name"] + '</h2>');
}

function eventListeners() {
    $(".header img").click(function (e) { searchVars = {}; getShoes(); });

    $(".gender").click(function (e) { menuClick(e); getShoes(); });

    var hoverTimer = 500;

    $(".gender").on("mouseenter", function (e) {
        clearTimeout(window.close_menu);
        menuHover(e, true);
    }).on("mouseleave", function (e) {
        window.close_menu = setTimeout(function() { menuHover(e, false) }, hoverTimer);
    });

    $(".shoe-options").on("mouseenter", function (e) {
        clearTimeout(window.close_menu);
        menuHover(e);
    }).on("mouseleave", function (e) {
        window.close_menu = setTimeout(function() { menuHover(e, false) }, hoverTimer);
    });

    $(".brand-option").on("mouseenter", function (e) {
        clearInterval(window.close_category);
        clearInterval(window.close_menu);
        optionHover(e, true, "brand");
    }).on("mouseleave", function (e) {
        window.close_category = setTimeout(function() { optionHover(e, false, "brand"); }, hoverTimer);
    });

    $(".type-option").on("mouseenter", function (e) {
        clearInterval(window.close_category);
        clearInterval(window.close_menu);
        optionHover(e, true, "type");
    }).on("mouseleave", function (e) {
        window.close_category = setTimeout(function() { optionHover(e, false, "type"); }, hoverTimer);
    });

    $(".brand-option").click(function (e) { toggleOptions(e, "brand"); getShoes(); });
    $(".type-option").click(function (e) { toggleOptions(e, "type"); getShoes(); });

    $("#search-price").on('input', function (e) { $("#search-price-label").html(e.target.value); });

    $("#search-price").change(function (e) { searchVars["maxPrice"] = e.target.value; getShoes(); });
}

eventListeners();
