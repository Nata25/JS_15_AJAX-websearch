$(function() {

    var query;
    var body = $("body");
    var form = $("form");
    var searchbox = $("input[type=text]");
    var submit = $("input[type=submit]");
    var results = $(".results");

    searchbox.focus();

    searchbox.keydown(function(e) {
        if ( (e.which == 13) && $(this).val() ) {
            query = $(this).val();
            $(this).change();
            submit.focus();
            results.html('Searching for "' + query + '"...');
        }
    });

    form.on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&q=" + query,
            success: function(data) {
                results.html("");
                var len = (data.totalResults > 20) ? 20 : data.totalResults;
                if (len == 0) {
                    results.append($("<p>Sorry, no results were found to match your query.</p>"));
                }
                else {
                    var intro = "<p>Found <span class='strong'>" + data.totalResults + "</span> posts matching your filters from the past <span class='strong'>3 days</span>.</p>";
                    intro += "<p><span class='strong'>" + len + "</span> results of total are shown.</p>";
                    intro += "<p>The posts are ordered for consumption by crawl date, from oldest to newest.</p>";
                    results.append(intro);

                    for (var i = 0; i < len; i++) {

                        var item = data.posts[i];

                        // main image: use placeholder if no img found
                        var img = (item.thread.main_image) ? item.thread.main_image : "https://webhose.io/public/images/noimage.png";

                        // capitalize first letter of language
                        var lang = item.language;
                        lang = lang[0].toUpperCase() + lang.slice(1);

                        // get proper string for date
                        var published = parseDate(item.thread.published);

                        // get all posts in a thread to calc total
                        // $.ajax({
                        //     url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&" + item.thread.url,
                        //     success: function(data) {
                        //         console.log("data from thread:");
                        //         console.log(data);
                        //     }
                        // });
                        // generate entity
                        var entity = createEntity(img,
                            item.thread.title,
                            item.thread.url,
                            published,
                            item.author,
                            item.thread.site,
                            item.text,
                            lang,
                            item.ord_in_thread + 1,
                            item.thread.country,
                            item.thread.site_type,
                            item.thread.performance_score
                        );

                        results.append(entity);
                    }

                    // print data Object in console
                    console.log(data);
                }
            } // end of success callback
        });
    });

    function createEntity(src, title, url, pub, author, site, text, lang, num, country_short, type, score) {

        var container = $("<div class='entity'></div>");

        var img = $("<img src='" + src + "'>");

        // use placeholder if img load fails
        img.on("error", function() {
            $(this).attr("src", "https://webhose.io/public/images/noimage.png");
            console.log("image not found");
        });
        container.append($("<div class='preview_img'></div>").append(img));

        var text_container = $("<div class='text_container'></div>");
        container.append(text_container);
        text_container.append($("<a href='" + url + " target='_blank'>" + title + "</a>"));
        var about = $("<p class='about'><span class='strong'>Published at</span>: "
                    + pub
                    + " <span class='strong'>By:</span> " + author
                    + " <span class='strong'>@</span> " + site
                    + "</p>");
        var brief = $("<p class='text'></p>");
        brief.text(text);
        var lang = $("<span class='box'>Language: " + lang + "</span>");
        var num = $("<span class='box'>Post number: " + num + "</span>");
        var country = $("<span class='box'>Country: " + country_short + "</span>");
        var type = $("<span class='box'>Site Type: " + type + "</span>");
        var performance_score = $("<span class='box'>Performance Score: " + score + "</span>");

        text_container.append(about)
                      .append(brief)
                      .append(lang)
                      .append(num)
                      .append(country)
                      .append(type)
                      .append(performance_score);

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
