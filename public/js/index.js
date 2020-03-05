$(document).ready(function() {
    let articleBox = $(".article-box");
    $(document).on("click", ".nes-btn .save", saveArticle);
    $(document).on("click", ".scrape", scrapeArticles);
    $(".clear").on("click", clearArticles);

    function startUp() {
        $.get("/api/articles?saved=false").then(function(data) {
            articleBox.empty();
            if (data.length > 0) {
                printArticles(data);
            } else {
                noArticles();
            }
        });
    }

    function printArticles(articles) {
        let articleCards = [];
        for (let i = 0; i < articles.length; i ++) {
            articleCards.push(createCard(articles[i]));
        }
        articleBox.append(articleCards);
    };

    function createCard(article) {
        let card = $("<div class='card'>");
        let cardHeader = $("<div class='card-header'>").append(
            $("<h3>").append(
                $("<a class='article-link' target='_blank'>")
                    .attr("href", article.url)
                    .text(article.title),
                $("<a class='nes-btn is-error save> Save Article </a>")
            )
        );

        let cardBody = $("<div class='card-body'>").text(article.desc);

        card.append(cardHeader, cardBody);

        card.data("_id", article._id);

        return card;
    };

    function noArticles() {
        let emptyAlert = $(
            [
                "<div class='nes-container'>",
                    "<div class='message-list>",
                        "<div class='message -left'>",
                        "<i class='nes-icon close is-large'>",
                            "<div class='nes-balloon from-left'>",
                                "<p>I'm sorry. There are no new articles.</p>",
                            "</div>",
                        "</div>",
                    "</div>",
                "</div>"
            ].join("")
        );

        articleBox.append(emptyAlert);
    };

    function saveArticle() {
        let articleToSave = $(this)
            .parents(".card")
            .data();

        $(this)
            .parents(".card")
            .remove();

        articleToSave.saved = true;

        $.ajax({
            method: "PUT",
            url: "/api/articles/" + articleToSave._id,
            data: articleToSave
        }).then(function(data) {
            if (data.saved) {
                startUp();
            }
        });
    };

    function scrapeArticles() {
        $.get("/api/fetch").then(function(data) {
            startUp();
        });
    };

    function clearArticles() {
        $.get("/api/clear").then(function() {
            articleBox.empty();
            startUp();
        });
    }
});