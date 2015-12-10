var searchVars = {};

function menuClick(e) {
    if (e.target.id === "woman") {
        $("#menu2-" + e.target.id).slideToggle(200);
        $("#menu2-man").slideUp(200);
        searchVars["gender"] = "woman";
    }
    else if (e.target.id === "man") {
        $("#menu2-" + e.target.id).slideToggle(200);
        $("#menu2-woman").slideUp(200);
        searchVars["gender"] = "man";
    }

    getShoes({
        search: searchVars
    });
}

function eventListeners() {
    $(".gender").click(function(event) { menuClick(event) });

    $("#search-price").on('input', function(event) {
        $("#search-price-label").html(event.target.value);
    });

    $("#search-price").change(function(event) {
        searchVars["maxPrice"] = event.target.value;
    });

    $("#search-type").change(function(event) {
        searchVars["type"] = event.target.value;
    });
    $("#search-color").change(function(event) {
        searchVars["color"] = event.target.value;
    });
}

eventListeners();
