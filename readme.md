### AJAX Web Search Emulator

The results are based upon [Webhose.io](https://webhose.io/) API.

The output is very similar to the one [Live Web Data search](https://webhose.io/api) provides (except for 'Total Points rubric).

Images are taken from live search; in no image is provided or if there's an error on image load, custom webhose.io placeholder is used instead. (Load errors additionally raise GET error message in console, which is non-manageable.)

The speed is a bit slow. 100 results are provided at once, 20 first are listed. Images are of original size and resized in a browser, so it might take additional time to load them.

External library used: jQuery.

[Open on .github.io](https://nata25.github.io/JS_15_AJAX-websearch/).

Please do not perform too much queries as an API key for free plan is used.
