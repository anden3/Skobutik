var womenBrandsGenerated = false;
var womenTypesGenerated = false;

var menBrandsGenerated = false;
var menTypesGenerated = false;

var searchVars = {};

var genders = { woman: "man", man: "woman" };
var categories = { brand: "type", type: "brand" };
var categoriesColumns = { brand: "Brand", type: "DISTINCT Type" };

window.closeCategory;
window.closeMenu;

String.prototype.capitalize = function () {
    return this.slice(0, 1).toUpperCase() + this.substring(1);
}

function hasOneProperty(object) {
    var properties = [];

    for (property in object) {
        if (object[property] !== null) {
            properties.push(property);
        }
    }

    if (properties.length === 1) {
        return properties[0];
    }
    return false;
}

function getLists(category) {
    if (!!searchVars.gender && !window[searchVars.gender + category.capitalize() + "sGenerated"]) {
        window[searchVars.gender + category.capitalize() + "sGenerated"] = true;
        query = "SELECT " + categoriesColumns[category] + ' FROM shoes WHERE Gender = "' + searchVars.gender + '"';
    }
    else {
        return false;
    }

    $.post("get_shoes.php", {query: query}, function(data) {
        for (var s = 0; s < data.length; s++) {
            $("#" + searchVars.gender + "-" + category).append('<li><a class="' + category + '">' + data[s][category.capitalize()] + "</a></li>");
        }

        $('.' + category).on("mouseenter", function (e) {
            clearInterval(close_category);
        }).on("mouseleave", function (e) {
            close_category = setTimeout(function() { optionHover(e, false, category); }, 500);
        });

        $('.' + category).click(function (e) {
            delete searchVars[categories[category]];
            searchVars[category] = e.target.innerHTML;
            getShoes();
        });
    });
}

function getShoes() {
    var query = "";

    if (!!searchVars) {
        query = "SELECT * FROM shoes WHERE 1 = 1";

        for (var key in searchVars) {
            if (key !== "maxPrice") {
                query += " AND " + key.capitalize() + ' = "' + searchVars[key] + '"';
            }
            else {
                query += ' AND Price <= ' + searchVars.maxPrice;
            }
        }
    }

    else {
        query = "SELECT * FROM shoes";
    }

    $.post("get_shoes.php", {query: query}, function(data) {
        $(".contents").html("");

        for (var s = 0; s < data.length; s++) {
            $(".contents").append('<div class="shoe"><h3>' + data[s].Name + "</h3><p>" + data[s].Brand + '</p><img src="' + data[s].Image + '"><p><b>' + data[s].Price + ':-</b></p></div>');
        }
    });
}

getShoes();
