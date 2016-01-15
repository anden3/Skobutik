function displayShoe(data) {
    var name = "<h3>" + data.Name + "</h3>";
    var brand = "<p>" + data.Brand + "</p>";
    var image = '<img src="' + data.Image + '">';
    var price = '<p><b>' + data.Price + ':-</b></p>';

    return '<div class="shoe">' + name + brand + image + price + "</div>";
}

function displayProperties(property, value) {
    return '<div class="shoe"><h3>' + value + "</h3></div>";
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

    if (searchArgs === "brand") {
        query = "SELECT Brand FROM shoes";
    }

    else if (searchArgs === "type") {
        query = "SELECT Type FROM shoes";
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
    }

    else {
        query = "SELECT * FROM shoes";
    }

    $.post("get_shoes.php", {query: query}, function(data) {
        $(".contents").html("");
        var getOneProperty = hasOneProperty(data[0])

        if (!!getOneProperty) {
            for (var s = 0; s < data.length; s++) {
                $(".contents").append(displayProperties(getOneProperty, data[s][getOneProperty]));
            }
        }
        else {
            for (var s = 0; s < data.length; s++) {
                $(".contents").append(displayShoe(data[s]));
            }
        }
    });
}

getShoes();
