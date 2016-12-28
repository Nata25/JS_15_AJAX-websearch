function callbackFunc() {
    console.log(arguments);
}


$(function() {
    $.ajax({
        url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q=PHP&callback=callbackFunc&context=?",
        dataType: 'jsonp'
    });
});
