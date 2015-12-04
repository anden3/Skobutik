function menuClick(e) {
    if (e.target.id === "woman") {
        $("#man").parent().slideToggle(200, function() {
            $("#menu2-" + e.target.id).slideToggle(200);
        });
    }
    else if (e.target.id === "man") {
        $("#woman").parent().slideToggle(200, function() {
            $("#menu2-" + e.target.id).slideToggle(200);
        });
    }

    getShoes({
        query: "SELECT * FROM shoes WHERE Gender = '" + e.target.id + "'"
    });
}

function eventListeners() {
    $(".gender").click(function(event) { menuClick(event) });
}

eventListeners();
