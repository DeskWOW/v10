$(function(){

  var filter_value = $.getUrlVar("filter");
  if( filter_value != null && filter_value.length > 0 ){
    $("#CaseFilter").val(filter_value);
  }
  $("#CaseFilter").change(function(event){
    $.updateOrAddVar("filter", $(this).val())
  });

  $("#ActiveOnly").attr("checked", $.getUrlVar("active")=="1"?true:false);
  $("#ActiveOnly").change(function(){
    $.updateOrAddVar("active", $(this).is(":checked")?"1":"0")
  });

});

jQuery(function($) {

  $(document).on("click", "table#MyCases tr", function(e) {
    var href = $(this).find("td.a-casesubject a").attr("href");
      if(href) {
          window.location = href;
      }
  });

  if (registration_in_progress) {
      $("#registration-in-progress").show();
      $("#MyCases").hide();
      setInterval(function () {
          $.get("/customer/portal/private/registration-progress", function (registration) {
              if (registration.complete) {
                  window.location.reload();
              }
          });
      }, 3000);
  }

});

// CONTORLS LOADING AND SORTING OF ALL CASES ON THE SAME PAGE
(function($) { 
  if($('#MyCaseSort').val() != null) { 
      function nextPage(url, callback) {
        $.get(url, function(data, textStatus, jqXHR) {
          var cases = $(data).find('#MyCases tbody tr')
            , nextUrl = $(data).find('#pagination a.next_page');
          
          callback(cases);
          
          if (nextUrl && nextUrl.attr('href')) nextPage(nextUrl.attr('href'), callback);
        }, 'html');
      }
      var nextUrl = $('#pagination a.next_page');
      if (nextUrl && nextUrl.attr('href')) {
        nextPage(nextUrl.attr('href'), function(cases) {
          $('#MyCases tbody').append(cases);
        });
        $('#pagination').hide();
      }
      $('#MyCases').ajaxStop(function(){ 
        $("#MyCases").tablesorter();
      });
  }
}(jQuery));