window.onload = function() {
    var $ = function (selector) {
        return document.querySelectorAll(selector);
    };
    $('[data-api-id]').forEach(function(li, index) {
        li.addEventListener('click', function() {
            console.log(this.getAttribute('data-api-id'));
        });
    });
}
