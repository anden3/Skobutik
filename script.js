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
    var gender = parentID.substring(5, parentID.length);
    var deleteAfter = false;

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

function eventListeners() {
    $(".header").click(function (e) { searchVars = {}; getShoes(); });

    $(".gender").click(function (e) { menuClick(e); getShoes(); });

    $(".gender").on("mouseenter", function (e) {
        menuHover(e, true);
    }).on("mouseleave", function (e) {
        if (!"shoe-options" in e.relatedTarget.classList && !"brand-option" in e.relatedTarget.classList && !"type-option" in e.relatedTarget.classList) {
            menuHover(e, false);
        }
    });

    $(".shoe-options").hover(function (e) { menuHover(e); });

    $(".brand-option").on("mouseenter", function (e) {
        optionHover(e, true, "brand");
    }).on("mouseleave", function (e) {
        optionHover(e, false, "brand");
    });

    $(".type-option").on("mouseenter", function (e) {
        optionHover(e, true, "type");
    }).on("mouseleave", function (e) {
        optionHover(e, false, "type");
    });

    $(".brand-option").click(function (e) { toggleOptions(e, "brand"); getShoes(); });
    $(".type-option").click(function (e) { toggleOptions(e, "type"); getShoes(); });

    $("#search-price").on('input', function (e) { $("#search-price-label").html(e.target.value); });

    $("#search-price").change(function (e) { searchVars["maxPrice"] = e.target.value; getShoes(); });

    $(document).mouseup(function (e) {
        if (!!searchVars.gender && e.target.classList[0] !== "gender") {
            var container = $("#menu-" + searchVars['gender']);

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();

                if (!!searchVars.maxPrice) {
                    searchVars = { maxPrice: searchVars.maxPrice };
                }
                else {
                    searchVars = {};
                }

                getShoes();
            }
        }
    });
}

eventListeners();
