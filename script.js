var searchVars = {};

function menuClick(e) {
    searchVars = {};

    var target = "woman";
    var other = "man";

    if (e.target.id === "man") {
        var target = "man";
        var other = "woman";
    }

    if (target == "woman" && ($("#woman-brand").is(":visible") || $("#woman-type").is(":visible"))) {
        $("#menu2-woman").slideToggle(200);
        $("#man").slideDown(200);
    }
    else {
        $("#menu2-" + target).slideToggle(200);
        $("#menu2-" + other).slideUp(200);
    }

    searchVars["gender"] = target;
    getShoes(searchVars);
}

function toggleOptions(e, button) {
    if (!!searchVars['brand']) {
        delete searchVars['brand'];
    }

    var active = "#" + searchVars.gender + "-" + button;

    if (button === "brand") {
        var other = "#" + searchVars.gender + "-type";

        $(active).slideToggle(200);
        $(other).slideUp(200);
    }
    else {
        var other = "#" + searchVars.gender + "-brand";

        $(active).slideToggle(200);
        $(other).slideUp(200);
    }

    setTimeout(function () {
        if (searchVars.gender === "woman" && $("#woman-brand").is(":hidden") && $("#woman-type").is(":hidden")) {
            $("#man").slideDown(200);
        }
        else if (searchVars.gender === "woman") {
            $("#man").slideUp(200);
        }
    }, 300);
}

function eventListeners() {
    $(".gender").click(function(event) { menuClick(event); });

    $(".brand-option").click(function (event) { toggleOptions(event, "brand"); getShoes("brand"); });

    $(".type-option").click(function (event) { toggleOptions(event, "type"); getShoes("type"); });

    $("#search-price").on('input', function(event) {
        $("#search-price-label").html(event.target.value);
    });

    $("#search-price").change(function(event) {
        searchVars["maxPrice"] = event.target.value;
        getShoes(searchVars);
    });

    $("#search-type").change(function(event) {
        if (event.target.value !== "default") {
            searchVars["type"] = event.target.value;
        }
        else {
            delete searchVars["type"];
        }
        getShoes(searchVars);
    });
    $("#search-color").change(function(event) {
        if (event.target.value !== "default") {
            searchVars["color"] = event.target.value;
        }
        else {
            delete searchVars["color"];
        }
        getShoes(searchVars);
    });
}

eventListeners();
