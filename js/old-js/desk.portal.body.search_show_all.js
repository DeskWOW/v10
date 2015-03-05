(function($) {
  function nextPage(url, callback) {
    $.get(url, function(data, textStatus, jqXHR) {
      var searchResults = $(data).find('div.content.articles ul#search-results li')
        , nextUrl = $(data).find('div.pagination a.next_page');

      callback(searchResults);
      if (nextUrl && nextUrl.attr('href')) nextPage(nextUrl.attr('href'), callback);
    }, 'html');
  }

  var nextUrl = $('div.pagination a.next_page');
  if (nextUrl && nextUrl.attr('href')) {
    nextPage(nextUrl.attr('href'), function(searchResults) {
      $('div.content.articles ul#search-results').append(searchResults);
    });
    $('div.pagination ').remove();
  }
}(jQuery));
