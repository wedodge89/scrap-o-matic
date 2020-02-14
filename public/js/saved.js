$(document).ready(function() {

    $.get("/api/saved").then(function(data) {    
        createCart(data)
    })
});