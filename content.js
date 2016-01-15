var womenBrandsGenerated = false
var womenTypesGenerated = false

var menBrandsGenerated = false
var menTypesGenerated = false

function displayShoe(data) {
    var name = "<h3>" + data.Name + "</h3>";
    var brand = "<p>" + data.Brand + "</p>";
    var image = '<img src="' + data.Image + '">';
    var price = '<p><b>' + data.Price + ':-</b></p>';

    return '<div class="shoe">' + name + brand + image + price + "</div>";
}

function displayProperties(property, value) {
    return '<li><a class="' + property.toLowerCase() + '">' + value + "</a></li>";
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
    else {
        return false;
    }
}

function getShoes(searchArgs) {
    var query = "";

    if (typeof searchArgs === "string" && !!searchVars.gender) {
        if (searchArgs === "brand" && !window[searchVars.gender + 'BrandsGenerated']) {
            window[searchVars.gender + 'BrandsGenerated'] = true;
            query = 'SELECT Brand FROM shoes WHERE Gender = "' + searchVars.gender + '"';
        }

        else if (searchArgs === "type" && !window[searchVars.gender + 'TypesGenerated']) {
            window[searchVars.gender + 'TypesGenerated'] = true;
            query = 'SELECT DISTINCT Type FROM shoes WHERE Gender = "' + searchVars.gender + '"';
        }
    }

    else if (!!searchArgs) {
        query = "SELECT * FROM shoes WHERE 1 = 1";

        if (!!searchArgs.gender) {
            query += ' AND Gender = "' + searchArgs.gender + '"';
        }

        if (!!searchArgs.color) {
            query += ' AND Color = "' + searchArgs.color + '"';
        }

        if (!!searchArgs.type) {
            query += ' AND Type = "' + searchArgs.type + '"';
        }

        if (!!searchArgs.maxPrice) {
            query += ' AND Price <= ' + searchArgs.maxPrice;
        }

        if (!!searchArgs.brand) {
            query += ' AND Brand = "' + searchArgs.brand + '"';
        }
    }

    else {
        query = "SELECT * FROM shoes";
    }

    $.post("get_shoes.php", {query: query}, function(data) {
        var getOneProperty = hasOneProperty(data[0]);

        if (!!getOneProperty) {
            var active = "#" + searchVars.gender + "-" + getOneProperty.toLowerCase();

            if (!$(active).children().length) {
                for (var s = 0; s < data.length; s++) {
                    $(active).append(displayProperties(getOneProperty, data[s][getOneProperty]));
                }

                if (getOneProperty === "Brand") {
                    $(".brand").click(function (event) {
                        delete searchVars['type'];
                        searchVars['brand'] = event.target.innerHTML;
                        getShoes(searchVars);
                    });
                }
                else {
                    $(".type").click(function (event) {
                        delete searchVars['brand'];
                        searchVars['type'] = event.target.innerHTML;
                        getShoes(searchVars);
                    });
                }
            }

            /*
            if (getOneProperty === "Brand") {
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
            */
        }
        else {
            $(".contents").html("");

            for (var s = 0; s < data.length; s++) {
                $(".contents").append(displayShoe(data[s]));
            }
        }
    });
}

getShoes();
