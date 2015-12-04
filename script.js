function displayShoe(data) {
    var name = "<h3>" + data.Name + "</h3>";
    var brand = "<p>" + data.Brand + "</p>";
    var image = '<img src="' + data.Image + '">';

    return '<div class="shoe">' + name + brand + image + "</div>";
}

function getShoes() {
    $.post("get_shoes.php", {
        "none": "none"
    }, function (data) {
        for (var s = 0; s < data.length; s++) {
            $(".contents").append(displayShoe(data[s]));
        }
    });
}

getShoes();
