function createCart(data) {
    for (let i = 0; i < data.length; i ++) {
        let cartDiv = $("<div>")
            .addClass("card")
            .addClass("newsCart")
            .attr("style", "width: 18rem;");

        let divBody = $("<div>").addClass("cartBody");

        let newsTitle = $("<p>")
            .addClass("card-text")
            .html(`<h2>${data[i].title}`);

        let newsBody = $("<p>")
            .addClass("card-text")
            .html(`${data[i].desc}`);

        let saveButton = $("<button>")
            .attr("id", data[i]._id)
            .attr("saved", data[i].saved)
            .addClass("save")
            .addClass("nes-btn is-error")
            .html(data[i].saved ? "Unsave Article" : "Save Article");

        let readButton = $("<button>")
            .addClass("read")
            .addClass("nes-btn is-warning")
            .html(`<a href="${data[i].url}" target="_blank"> ${"Read Full Article"} </a>`);

        let noteButton = $("<button>")
            .addClass("note")
            .addClass("nes-btn is-primary")
            .html("Create Note");


        let addSaveButton = $("<td class='align-middle'>").html(saveButton);
        let addReadButton = $("<td class='align-middle'>").html(readButton);
        let addNoteButton = $("<td class='align-middle'>").html(noteButton);

        cartDiv.append(divBody);
        cartDiv.append(newsTitle);
        cartDiv.append(newsBody);
        cartDiv.append(addSaveButton);
        cartDiv.append(addReadButton);
        cartDiv.append(addNoteButton);

        $(".articles").append(cartDiv)
    };
};