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

    $("#" + e.target.id + "-brand").slideUp(200);
    $("#" + e.target.id + "-type").slideUp(200);

    $("#menu-" + e.target.id).slideToggle(200);
    $("#menu-" + genders[e.target.id]).slideUp(200);

    getShoes();
}

function toggleOptions(e, button) {
    if (!!searchVars[button]) {
        delete searchVars[button];
    }

    $("#" + searchVars.gender + "-" + button).slideToggle(200);
    $("#" + searchVars.gender + "-" + categories[button]).slideUp(200);
}

function eventListeners() {
    $(".header").click(function (e) { searchVars = {}; getShoes(); });

    $(".gender").click(function (e) { menuClick(e); });

    $(".brand-option").click(function (e) { toggleOptions(e, "brand"); getShoes("brand"); });

    $(".type-option").click(function (e) { toggleOptions(e, "type"); getShoes("type"); });

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
