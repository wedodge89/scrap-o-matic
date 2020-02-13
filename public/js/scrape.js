$(document).ready(function() {

    $.get("/api/scrape").then(function(data) {    
        createCart(data)
    })

    $.get("/api/articles").then(function(data) {    
        createCart(data)
    })

});