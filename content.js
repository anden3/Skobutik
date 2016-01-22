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
        else {
            query = "SELECT * FROM shoes WHERE 1 = 1";

            if (!!searchVars.gender) {
                query += ' AND Gender = "' + searchVars.gender + '"';
            }

            if (!!searchVars.color) {
                query += ' AND Color = "' + searchVars.color + '"';
            }

            if (!!searchVars.type) {
                query += ' AND Type = "' + searchVars.type + '"';
            }

            if (!!searchVars.maxPrice) {
                query += ' AND Price <= ' + searchVars.maxPrice;
            }

            if (!!searchVars.brand) {
                query += ' AND Brand = "' + searchVars.brand + '"';
            }

            console.log(query);
            console.log(searchVars['gender']);
        }
    }

    else if (!!searchVars) {
        query = "SELECT * FROM shoes WHERE 1 = 1";

        if (!!searchVars.gender) {
            query += ' AND Gender = "' + searchVars.gender + '"';
        }

        if (!!searchVars.color) {
            query += ' AND Color = "' + searchVars.color + '"';
        }

        if (!!searchVars.type) {
            query += ' AND Type = "' + searchVars.type + '"';
        }

        if (!!searchVars.maxPrice) {
            query += ' AND Price <= ' + searchVars.maxPrice;
        }

        if (!!searchVars.brand) {
            query += ' AND Brand = "' + searchVars.brand + '"';
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
