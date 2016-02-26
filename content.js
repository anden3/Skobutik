// Variables to track whether lists for different Brands and Types have been generated.
var womenBrandsGenerated = false;
var womenTypesGenerated = false;

var menBrandsGenerated = false;
var menTypesGenerated = false;

// Object holding the search criterias.
var searchVars = {};

// Help objects for getting different values.
var genders = { woman: "man", man: "woman" };
var categories = { brand: "type", type: "brand" };
var categoriesColumns = { brand: "Brand", type: "DISTINCT Type" };

// Object holding the shoes.
var shoes = {};

// Timers for closing categories and menus.
window.closeCategory;
window.closeMenu;

// Helper function for capitalizing the first character in a string.
String.prototype.capitalize = function () {
    return this.slice(0, 1).toUpperCase() + this.substring(1);
}

// Check if the objects in a list only have one property, such as when getting Brands or Types.
function hasOneProperty(object) {
    // Array for storing properties.
    var properties = [];

    // Iterate over the properties in an object.
    for (property in object) {
        // Check if the property isn't null, i.e. it exists.
        if (object[property] !== null) {
            // If so, push it to the properties array.
            properties.push(property);
        }
    }

    // Check if the length of the properties array is one, i.e. there's only one property in the object.
    if (properties.length === 1) {
        // If so, return the property.
        return properties[0];
    }
    // Else, return False.
    return false;
}

// Function for getting Types or Brands from the database.
function getLists(category) {
    // If gender is in the search criterias and the lists aren't already generated.
    if (!!searchVars.gender && !window[searchVars.gender + category.capitalize() + "sGenerated"]) {
        // Set the variable to show that the list have been generated.
        window[searchVars.gender + category.capitalize() + "sGenerated"] = true;
        // Set the query for accessing the relevant data from the database.
        query = "SELECT " + categoriesColumns[category] + ' FROM shoes WHERE Gender = "' + searchVars.gender + '"';
    }
    else {
        // Else, return False.
        return false;
    }

    // Send a POST-request to the get_shoes.php file, and parse the returned values.
    $.post("get_shoes.php", {query: query}, function(data) {
        // Iterate over the returned data values.
        for (var s = 0; s < data.length; s++) {
            // For each value, append it to the relevant list.
            $("#" + searchVars.gender + "-" + category).append('<li><a class="' + category + '">' + data[s][category.capitalize()] + "</a></li>");
        }

        // Set event listeners
        // If hovering over one of the new menu items.
        $('.' + category).on("mouseenter", function (e) {
            // Reset the category timer.
            clearInterval(close_category);
        }).on("mouseleave", function (e) { // Else if leaving.
            // Start the category timer again.
            close_category = setTimeout(function() { optionHover(e, false, category); }, 500);
        });

        // If clicking on one of the new menu items.
        $('.' + category).click(function (e) {
            // Delete the other menu from the search criterias.
            delete searchVars[categories[category]];
            // Set the search criteria to the menu item.
            searchVars[category] = e.target.innerHTML;
            // Get the new Shoes.
            getShoes();
        });
    });
}

// Function for getting Shoes from the database, based on the search criterias.
function getShoes() {
    // Set the query to initially be an empty string.
    var query = "";

    // If searchVars is defined.
    if (!!searchVars) {
        // Update the query to allow adding criterias.
        query = "SELECT * FROM shoes WHERE 1 = 1";

        // Iterate over the search criterias.
        for (var key in searchVars) {
            // If the search criteria isn't maxPrice.
            if (key !== "maxPrice") {
                // Append the criteria to the query.
                query += " AND " + key.capitalize() + ' = "' + searchVars[key] + '"';
            }
            else {
                // Append the criteria to the query.
                query += ' AND Price <= ' + searchVars.maxPrice;
            }
        }
    }
    // If searchVars isn't defined.
    else {
        // Set the query to get all Shoes.
        query = "SELECT * FROM shoes";
    }

    // Send a POST-request to get_shoes.php, and parse the returned values.
    $.post("get_shoes.php", {query: query}, function(data) {
        // Empty the contents of the .contents div.
        $(".contents").html("");

        // Iterate over the data.
        for (var s = 0; s < data.length; s++) {
            // Append an empty object to shoes.
            shoes[data[s].Name] = {};

            // Add all the Shoe data to the new object.
            shoes[data[s].Name]["Name"] = data[s].Name;
            shoes[data[s].Name]["Brand"] = data[s].Brand;
            shoes[data[s].Name]["Desc"] = data[s].Description;
            shoes[data[s].Name]["Color"] = data[s].Color;
            shoes[data[s].Name]["Type"] = data[s].Type;
            shoes[data[s].Name]["MinSize"] = data[s].MinSize;
            shoes[data[s].Name]["MaxSize"] = data[s].MaxSize;
            shoes[data[s].Name]["Gender"] = data[s].Gender;
            shoes[data[s].Name]["Image"] = data[s].Image;
            shoes[data[s].Name]["Price"] = data[s].Price;

            // Append the new Shoe to the .contents div.
            $(".contents").append('<div class="shoe" id="' + data[s].Name + '"><h3>' + data[s].Name + "</h3><p>" + data[s].Brand + '</p><img src="' + data[s].Image + '"><p><b>' + data[s].Price + ':-</b></p></div>');
        }
    });
}
// Call the getShoes function.
getShoes();
