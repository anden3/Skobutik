var womenBrandsGenerated = false;
var womenTypesGenerated = false;

var menBrandsGenerated = false;
var menTypesGenerated = false;

var searchVars = {};

var genders = { woman: "man", man: "woman" };
var categories = { brand: "type", type: "brand" };
var categoriesColumns = { brand: "Brand", type: "DISTINCT Type" };

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

function getShoes(searchItem) {
    var query = "";

    if (typeof searchItem === "string" && !!searchVars.gender && !window[searchVars.gender + searchItem.capitalize() + "sGenerated"]) {
        window[searchVars.gender + searchItem.capitalize() + "sGenerated"] = true;
        query = "SELECT " + categoriesColumns[searchItem] + ' FROM shoes WHERE Gender = "' + searchVars.gender + '"';
    }

    else if (!!searchVars) {
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
        if (!!hasOneProperty(data[0])) {
            getOneProperty = hasOneProperty(data[0]).toLowerCase();
            var active = "#" + searchVars.gender + "-" + getOneProperty;

            if (!$(active).children().length) {
                for (var s = 0; s < data.length; s++) {
                    $(active).append('<li><a class="' + getOneProperty + '">' + data[s][getOneProperty.capitalize()] + "</a></li>");
                }

                $('.' + getOneProperty).click(function (e) {
                    delete searchVars[categories[getOneProperty]];
                    searchVars[getOneProperty] = e.target.innerHTML;
                    getShoes();
                });
            }
        }
        else {
            $(".contents").html("");

            for (var s = 0; s < data.length; s++) {
                $(".contents").append('<div class="shoe"><h3>' + data[s].Name + "</h3><p>" + data[s].Brand + '</p><img src="' + data[s].Image + '"><p><b>' + data[s].Price + ':-</b></p></div>');
            }
        }
    });
}

getShoes();
