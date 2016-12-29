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
            body.append($("<p>Searching for " + query + "...</p>"));
            body.append($("<p>Complete!</p>"));
        }
    });

    form.on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&q=" + query,
            success: function(data) {
                var heading_message = $("<p></p>");
                var text = "Found <b>" + data.totalResults + "</b> posts matching your filters from the past <b>3 days</b>.";
                text += " <br/>The posts are ordered for consumption by crawl date, from oldest to newest.";
                heading_message.html(text);
                body.append(heading_message);
                console.log(data);
            }
        });
    });

});
