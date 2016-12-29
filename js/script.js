$(function() {
    $.ajax({
        url: "https://webhose.io/search?token=e2e94dc5-1ce2-49d4-a8d9-4932418149cb&format=json&q=sherlock",
        success: function(data) {
            console.log(data);
        }
    });
});
