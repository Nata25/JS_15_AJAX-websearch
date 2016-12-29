$(function() {

    var query;
    var body = $("body");
    var form = $("form");
    var searchbox = $("input[type=text]");
    var submit = $("input[type=submit]");

    searchbox.focus();

    searchbox.keydown(function(e) {
        if (e.which == 13) {
            query = $(this).val();
            $(this).change();
            submit.focus();
            body.append($('<p>Searching for "' + query + '"...</p>'));
        }
    });

    form.on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&q=" + query,
            success: function(data) {
                body.append($("<p>Complete!</p>"));

                var len = (data.totalResults > 10) ? 10 : data.total;
                var results = $("<section class='results'></section>");
                var heading_message = $("<p></p>");
                var text = "Found <span class='strong'>" + data.totalResults + "</span> posts matching your filters from the past <span class='strong'>3 days</span>.";
                text += " <br/>The posts are ordered for consumption by crawl date, from oldest to newest.";
                heading_message.html(text);
                results.append(heading_message);
                body.append(results);

                for (var i = 0; i < len; i++) {
                    var img = (data.posts[i].thread.main_image) ? data.posts[i].thread.main_image : "https://webhose.io/public/images/noimage.png";
                    var url = data.posts[i].thread.url;
                    var entity = createEntity(img, data.posts[i].thread.title, url);
                    console.log(entity);
                    results.append(entity);
                }

                console.log(data);
            }
        });
    });

    // function createEntity(img, title, url, pub, author, brief, lang, num, total, country, type, score) {
    function createEntity(img, title, url) {
        var container = $("<div class='entity'></div>");
        container.append($("<div class='preview_img'></div>").append($("<img src='" + img + "'>")));
        var text_container = $("<div class='text_container'></div>");
        container.append(text_container);
        text_container.append($("<a href='" + url + "'>" + title + "</a>"));
        return container;
    }

});
