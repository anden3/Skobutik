function menuClick(e) {
    if (e.target.id === "woman") {
        $("#menu2-" + e.target.id).slideToggle(200);
        $("#menu2-man").slideUp(200);
    }
    else if (e.target.id === "man") {
        $("#menu2-" + e.target.id).slideDown(200);
        $("#menu2-woman").slideUp(200);
    }

    getShoes({
        query: "SELECT * FROM shoes WHERE Gender = '" + e.target.id + "'"
    });
}

function eventListeners() {
    $(".gender").click(function(event) { menuClick(event) });
}

eventListeners();
