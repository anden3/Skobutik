var searchVars = {};

function menuClick(e) {
    var target = "woman";
    var other = "man";

    if (e.target.id === "man") {
        var target = "man";
        var other = "woman";
    }

    $("#menu2-" + target).slideToggle(200);
    $("#menu2-" + other).slideUp(200);

    if (searchVars["gender"] === target) {
        delete searchVars["gender"];
    }
    else {
        searchVars["gender"] = target;
    }

    getShoes(searchVars);
}

function eventListeners() {
    $(".gender").click(function(event) { menuClick(event); });

    $("#brand").click(function (event) { getShoes("brand"); });

    $("#type").click(function (event) { getShoes("type"); });

    $("#search-price").on('input', function(event) {
        $("#search-price-label").html(event.target.value);
    });

    $("#search-price").change(function(event) {
        searchVars["maxPrice"] = event.target.value;
        getShoes({search: searchVars});
    });

    $("#search-type").change(function(event) {
        if (event.target.value !== "default") {
            searchVars["type"] = event.target.value;
        }
        else {
            delete searchVars["type"];
        }
        getShoes({search: searchVars});
    });
    $("#search-color").change(function(event) {
        if (event.target.value !== "default") {
            searchVars["color"] = event.target.value;
        }
        else {
            delete searchVars["color"];
        }
        getShoes({search: searchVars});
    });
}

eventListeners();
