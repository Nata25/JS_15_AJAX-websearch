$(function() {

    var query;
    var body = $("body");
    var form = $("form");
    var searchbox = $("input[type=text]");
    var submit = $("input[type=submit]");
    var results = $(".results");

    searchbox.focus();

    searchbox.keydown(function(e) {
        if (e.which == 13) {
            query = $(this).val();
            $(this).change();
            submit.focus();
            results.html("Searching for " + query + "...");
        }
    });

    form.on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&q=" + query,
            success: function(data) {
                results.html("");
                var len = (data.totalResults > 20) ? 20 : data.total;
                var heading_message = $("<p></p>");
                var intro = "<p>Found <span class='strong'>" + data.totalResults + "</span> posts matching your filters from the past <span class='strong'>3 days</span></p>";
                intro += "<p><span class='strong'>" + len + "</span> results of total are shown.</p>";
                intro += "<p>The posts are ordered for consumption by crawl date, from oldest to newest.</p>";
                heading_message.html(intro);
                results.append(heading_message);

                for (var i = 0; i < len; i++) {
                    var item = data.posts[i];
                    var img = (item.thread.main_image) ? item.thread.main_image : "https://webhose.io/public/images/noimage.png";
                    var published = parseDate(item.thread.published);
                    var entity = createEntity(img,
                        item.thread.title,
                        item.thread.url,
                        published,
                        item.author,
                        item.thread.site,
                        item.text);

                    results.append(entity);
                }
                console.log(data);
            }
        });
    });

    // function createEntity(img, title, url, pub, author, brief, lang, num, total, country, type, score) {
    function createEntity(img, title, url, pub, author, site, text) {

        var container = $("<div class='entity'></div>");
        container.append($("<div class='preview_img'></div>").append($("<img src='" + img + "'>")));
        var text_container = $("<div class='text_container'></div>");
        container.append(text_container);
        text_container.append($("<a href='" + url + "'>" + title + "</a>"));
        var about = $("<p class='about'><span class='strong'>Published at</span>: "
                    + pub
                    + " <span class='strong'>By:</span> " + author
                    + " <span class='strong'>@</span> " + site
                    + "</p>");
        text_container.append(about);
        var brief = $("<p class='text'></p>");
        brief.text(text);
        text_container.append(brief);
        return container;
    }

    // Parse Date() into m/d/yy h:mm A/PM string
    function parseDate(dt) {
        var date = new Date(dt);
        var result = '';
        result += (date.getMonth() + 1);
        result += "/";
        result += date.getDate() + "/" + date.getFullYear();
        result += " " + (date.getHours() % 12) + ":" + date.getMinutes() + " ";
        var meridiem = (date.getHours() < 11) ? "AM" : "PM";
        result += meridiem;

        return result;
    }

});
