function displayShoe(data) {
    var name = "<h3>" + data.Name + "</h3>";
    var brand = "<p>" + data.Brand + "</p>";
    var image = '<img src="' + data.Image + '">';
    var price = '<p><b>' + data.Price + ':-</b></p>';

    return '<div class="shoe">' + name + brand + image + price + "</div>";
}

function getShoes(searchArgs) {
    if (typeof searchArgs === "undefined") {
        searchArgs = {None: "none"};
    }

    $.post("get_shoes.php", searchArgs, function(data) {
        console.log(data);
        $(".contents").html("");
        for (var s = 0; s < data.length; s++) {
            $(".contents").append(displayShoe(data[s]));
        }
    });
}

getShoes();
