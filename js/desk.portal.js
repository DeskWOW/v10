// Usage: deskEV('system.snippets.loading')
function deskEV(v) {
    v = v.replace(/\./g, '-');
    return $('#' + v).html();
}

var currentPage = deskEV('current-page');
// Testing - alert(currentPage);

// =====================================================
// Registration Page
// =====================================================
  if (currentPage == 'registration') {
    $('#form form').validate({
      submitHandler: function(form) {
        $('#registration_submit').attr('disabled',true);
        $('#registration_submit').addClass('disabled');
        form.submit();
      },
      rules:{
        'email':{
          'required':true,
          'email':true
        }
      },
      messages:{
        'email':{
          'required':$("#system-snippets-email_required").html(),
          'email':$("#system-snippets-invalid_email").html()
        }
      },
      highlight: function (element) {
          $(element).closest('div.field').removeClass('has-success').addClass('has-error');
          $('label:empty').remove();
      },
      success: function (element) {
          $(element).closest('div.field').removeClass('has-error').addClass('has-success');
          $('label:empty').remove();
      }
    });
  }

// =====================================================
// Question New
// =====================================================
  if (currentPage == 'question_new') {
      $(function() {
        // Skip pre-create
        $('#new_email').attr('action','/customer/portal/emails');

        //-- Real-time auto-suggest
        $('#qna_subject, #qna_body').on("keyup paste",function() {
          if ($('#qna_subject').val().length > 2 || $('#qna_body').val().length > 2) {
            clearTimeout(window.timer);
            window.timer=setTimeout(function(){ // setting the delay for each keypress
              articleSuggest();
            }, 500);
          }
        });

      });

      //-- UPDATED AUTO SUGGEST
      articleSuggest = function() {
        as_count = 0;
        var search_query = $('#qna_subject').val() + " " + $('#qna_body').val();
        var systemLanguageDesk = $('#system_language').html();
        var brandID = $('#brand_id').html();
        if (brandID == "/" || brandID == "") {
          $.ajax({
            url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query,
            dataType: 'json'
          }).done(apiSuccess).fail(apiFail);
        } else {
          $.ajax({
            url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query + '&b_id=' + brandID,
            dataType: 'json'
          }).done(apiSuccess).fail(apiFail);
        }
      };

      apiSuccess = function(data) {
        auto_suggest_content = "";
        auto_suggest_articles = "";
        auto_suggest_questions = "";
        var system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
        $('.autosuggest').html('<h2 class="muted">' + system_snippet_do_these_help + '</h4><ul class="unstyled"></ul>');
        $.each(data, function() {
          var html = $(this.label);
          article_title = html.find(".article-autocomplete-subject").html();
          if (this.id.indexOf("questions") !== -1) {
              auto_suggest_questions += '<li><a target="_blank" href="' + this.id + '" class="discussion"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
          } else {
              auto_suggest_articles += '<li><a target="_blank" href="' + this.id + '" class="article"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
          }
          as_count++;
        });
        if (as_count > 0) {
          $('.autosuggest ul').append(auto_suggest_articles + auto_suggest_questions);
          $("#common").hide();
          $(".autosuggest").removeClass('hide');
        } else {
          $(".autosuggest").addClass('hide');
          $("#common").show();
        }
      };

      apiFail = function(data) {

      };

      $('#qna_body').textarea_maxlength();
      $('#new_question').validate({
        submitHandler: function(form) {
          $('#question_submit').attr('disabled',true);
          $('#question_submit').addClass('disabled');
          $('#question_submit_spinner').show();
          form.submit();
        },
        messages:{
          'interaction[name]':{
            'required':$("#system-snippets-name_required").html()
          },
          'interaction[email]':{
            'required':$("#system-snippets-email_required").html(),
            'email':$("#system-snippets-invalid_email").html()
          },
          'qna[subject]':{
            'required':$("#system-snippets-subject_required").html()
          },
          'qna[body]':{
            'required':$("#system-snippets-question_required").html(),
            'maxlength':$("#system-snippets-exceeding_max_chars").html()
          }
        },
        rules:{
          'interaction[name]':{
            'required':true
          },
          'interaction[email]':{
            'required':true,
            'email':true
          },
          'qna[subject]':{
            'required':true,
            'invalidchars':'<>'
          },
          'qna[body]':{
            'required':true,
            'maxlength':5000,
            'invalidchars':''
          }
        },
          highlight: function (element) {
              $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
              $('label:empty').remove();
          },
          success: function (element) {
              $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
              $('label:empty').remove();
          }
      });

      if ($("#qna-kb_topic_id").text() != ''){
          $('#qna_kb_topic_id').val($("#qna-kb_topic_id").text());
      }
  };


// =====================================================
// Question Show
// =====================================================
  if (currentPage == 'question_show') {
      $('#qna_body').textarea_maxlength();
      $('#new_answer').validate({
        submitHandler: function(form) {
          $('#answer_submit').attr('disabled',true);
          $('#answer_submit').addClass('disabled');
          form.submit();
        },
        messages:{
          'interaction[name]':{
            'required': deskEV('system.snippets.name_required')
          },
          'interaction[email]':{
            'required': deskEV('system.snippets.email_required'),
            'email': deskEV('system.snippets.invalid_email')
          },
          'qna[body]':{
            'required': deskEV('system.snippets.answer_required'),
            'maxlength': deskEV('system.snippets.exceeding_max_chars')
          }
        },
        rules:{
          'interaction[name]':{
            'required':true
          },
          'interaction[email]':{
            'required':true,
            'email':true
          },
          'qna[body]':{
            'required':true,
            'maxlength':5000
          }
        },
        highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                $('label:empty').remove();
            },
        success: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $('label:empty').remove();
            }
      });
  };


// =====================================================
// Forgot Password
// =====================================================
  if (currentPage == 'forgot_password') {
    $(function(){
      $("#email").focus();
      $("#identity_password").focus();
      $('#form > form').validate({
        submitHandler: function(form) {
          $('#password_reset_submit').attr('disabled',true);
          $('#password_reset_submit').addClass('disabled');
          form.submit();
        },
        rules:{
          'email':{
            'required':true,
            'email':true
          }
        },
        messages:{
          'email':{
            'required':$("#system-snippets-email_required").html(),
            'email':$("#system-snippets-invalid_email").html()
          }
        },
        errorClass:'invalid'
      });
    });
  };


// =====================================================
// MyPortal Index
// =====================================================
  if (currentPage == 'myportal_index') {
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

        /* TableSorter 2.0 - Client-side table sorting with ease!  * Version 2.0.5b   * Copyright (c) 2007 Christian Bach  */
        (function($){$.extend({tablesorter:new
        function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,rows,-1,i);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}return parsers[0];}function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){var text="";if(!node)return"";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}return text;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1
        var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}return lookup;}function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return"((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return"((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return"a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return"b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return/^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[Â£$â‚¬?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[Â£$â‚¬]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);


        if($('#pagination a.next_page').length){
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
        } else {
          $("#MyCases").tablesorter();
        }
      }
    }(jQuery));
  };


// =====================================================
// My Account
// =====================================================
  if (currentPage == 'myaccount') {
    $(function(){
      $("#new_email").focus();
      $('#new_customer_contact_email').validate({
        submitHandler: function(form) {

          if(!check_duplicate())
          {
            $("label.invalid").remove();
            $("<label class=\"invalid\" for=\"new_email\" generated=\"true\">" + $("#system-snippets-duplicate_email").html() + "</label>").insertAfter("#add_email");
            return false
          }

          $('button').attr('disabled',true);
          $('button').addClass('disabled');
          form.submit();
        },
        rules:{
          'customer_contact_email[email]':{
            'required':true,
            'email':true
          }
        },
        messages:{
          'customer_contact_email[email]':{
            'required':$("#system-snippets-email_required").html(),
            'email':$("#system-snippets-invalid_email").html()
          }
        },
        errorPlacement: function(error, element) {
          error.insertAfter('button');
        },
        errorClass:'invalid'
      });
    });

    function check_duplicate() {
      var return_val = true;
      $(".email_address").each(function(index) {
        if($(this).text() == $("#new_email").val()) {
          return_val = false;
        }
      });
      return return_val;
    }

    jQuery(document).ready(function() {
        //MY ACCOUNT PAGE TWEAKS
        $(".myaccount-form input#new_email").addClass('form-control');
        $(".myportal #add_facebook input").addClass('btn');
        $(".myportal #add_twitter input").addClass('btn');
        $(".myportal #add_facebook").appendTo('#facebookAdd');
        $(".myportal #add_twitter").appendTo('#twitterAdd');
        $('.myportal .email_delete [type^="submit"]').val("x");
        $('.myportal [id^="email_"] [alt^="Verified"]').parent().parent().addClass('confirmed');
        $('<i class="fa fa-twitter"></i>').prependTo('.myportal [id^="twitter_"]');
        $('<i class="fa fa-facebook"></i>').prependTo('.myportal [id^="facebook_"]');
        $('<i class="fa fa-envelope"></i>').prependTo('.myportal [id^="email_"]');
    });
  };


// =====================================================
// Login Page
// =====================================================
  if (currentPage == 'login') {
    $(function(){
      $("#auth_key").focus();
    });

    $('#login_form').validate({
        submitHandler: function(form) {
          $('#commit').attr('disabled',true);
          $('#commit').addClass('disabled');
          form.submit();
        },
        messages:{
          'auth_key':{
            'required':$("#system-snippets-email_required").html(),
            'email':$("#system-snippets-invalid_email").html()
          },
          'password':{
            'required':$("#system-snippets-password_required").html()
          }
        },
        rules:{
          'password':{
            'required':true
          },
          'auth_key':{
            'required':true,
            'email':true
          }
        },
        highlight: function (element) {
            $(element).closest('.field').removeClass('has-success').addClass('has-error');
            $('label:empty').remove();
        },
        success: function (element) {
            $(element).closest('.field').removeClass('has-error').addClass('has-success');
            $('label:empty').remove();
      }
    });
  };


// =====================================================
// Email PreCreate
// =====================================================
  if (currentPage == 'email_pre_create') {
      jQuery(document).ready(function() {
          $('#email_submit').click(function(){
            $(this).addClass('disabled');
          })
      });

      if (deskEV('number_search_results') == '0') {
          jQuery('#new_email').submit();
      }

      $('#email_body').textarea_maxlength();
      $('#new_email').validate({
        submitHandler: function(form) {
          $('#email_submit').prop('disabled',true);
          $('#email_submit').addClass('disabled');
          $('#email_submit_spinner').show();
          form.submit();
        },
        messages:{
          'interaction[name]':{
            'required':$("#system-snippets-name_required").html()
          },
          'interaction[email]':{
            'required':$("#system-snippets-email_required").html(),
            'email':$("#system-snippets-invalid_email").html()
          },
          'email[subject]':{
            'required':$("#system-snippets-subject_required").html()
          },
          'email[body]':{
            'required':$("#system-snippets-question_required").html(),
            'maxlength':$("#system-snippets-exceeding_max_chars").html()
          }
        },
        rules:{
          'interaction[name]':{
            'required':true
          },
          'interaction[email]':{
            'required':true,
            'email':true
          },
          'email[subject]':{
            'required':true,
            'invalidchars':'<>'
          },
          'email[body]':{
            'required':true,
            'maxlength':5000,
            'invalidchars':'<>'
          }
        },
        errorClass:'invalid'
      });
  };


// =====================================================
// Email New
// =====================================================
  if (currentPage == 'email_new') {

    $(function() {
        //-- Real-time auto-suggest
        $('#email_subject').on("keyup paste",function() {
            if ($('#email_subject').val().length > 3 && $('#email_subject').val().length <= 250) {
              clearTimeout(window.timer);
              window.timer=setTimeout(function(){ // setting the delay for each keypress
                articleSuggest();
              }, 500);
            }
          });
        //-- Real-time auto-suggest
        $('#email_body').on("keyup paste",function() {
            if ($('#email_body').val().length > 3 && $('#email_body').val().length <= 250) {
              clearTimeout(window.timer);
              window.timer=setTimeout(function(){ // setting the delay for each keypress
                articleSuggest();
              }, 500);
            }
          });
    });
    //-- UPDATED AUTO SUGGEST
    articleSuggest = function() {
      as_count = 0;
      var search_query = $('#email_subject').val() + '  ' + $('#email_body').val();
      var systemLanguageDesk = $('#system_language').html();
      var brandID = $('#brand_id').text();
      if (brandID == "/" || brandID == "") {
        $.ajax({
          url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query,
          dataType: 'json'
        }).done(apiSuccess).fail(apiFail);
      } else {
        $.ajax({
          url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query + '&b_id=' + brandID,
          dataType: 'json'
        }).done(apiSuccess).fail(apiFail);
      }
    }
    //RESULTS
    apiSuccess = function(data) {
      auto_suggest_content = "";
      auto_suggest_articles = "";
      auto_suggest_questions = "";
      var system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
      $('.autosuggest').html('<h2 class="muted">' + system_snippet_do_these_help + '</h4><ul class="unstyled"></ul>');
      $.each(data, function() {
        var html = $(this.label);
        article_title = html.find(".article-autocomplete-subject").html();
        if (this.id.indexOf("questions") !== -1) {
            auto_suggest_questions += '<li><a target="_blank" href="' + this.id + '" class="discussion"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
        } else {
            auto_suggest_articles += '<li><a target="_blank" href="' + this.id + '" class="article"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
        }
        as_count++;
      });
      if (as_count > 0) {
        $('.autosuggest ul').append(auto_suggest_articles + auto_suggest_questions);
        $("#common").hide();
        $(".autosuggest").removeClass('hide');
      } else {
        $(".autosuggest").addClass('hide');
        $("#common").show();
      }
    };
    //NO RESULTS
    apiFail = function(data) {
    }

    //-- FORM VALIDATION NEW
    $(document).ready(function () {
      $('#email_body').textarea_maxlength();
      $('#new_email').validate({
          submitHandler: function(form) {
               $('#email_submit').prop('disabled',true);
               $('#email_submit').addClass('disabled');
               $('#email_submit_spinner').show();
               form.submit();
           },
          messages:{
            'interaction[name]':{
              'required':$("#system-snippets-name_required").html()
            },
            'interaction[email]':{
              'required':$("#system-snippets-invalid_email").html(),
              'email':$("#system-snippets-invalid_email").html()
            },
            'email[subject]':{
              'required':$("#system-snippets-subject_required").html()
            },
            'email[body]':{
              'required':$("#system-snippets-question_required").html(),
              'maxlength':$("#system-snippets-exceeding_max_chars").html()
            }
          },
          rules:{
            'interaction[name]':{
              'minlength': 2,
              'required':true
            },
            'interaction[email]':{
              'required':true,
              'email':true
            },
            'email[subject]':{
              'required':true,
              'invalidchars':''
            },
            'email[body]':{
              'required':true,
              'maxlength':5000,
              'invalidchars':''
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $('label:empty').remove();
        },
        success: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            $('label:empty').remove();
        }
      });
    });
  };


// =====================================================
// Chat PreCreate
// =====================================================
  if (currentPage == 'chat_pre_create') {
    jQuery(document).ready(function() {
      $('#chat_submit').click(function(){
        $(this).addClass('disabled');
      })
    });
    if (deskEV('number_search_results') == '0') {
      jQuery(document).ready(function() {
        $('#chat_submit').click(function(){
          $(this).addClass('disabled');
          setTimeout(function(){ window.location = $('#breadcrumbs a:first-child').attr("href"); }, 5000);
        })
      });
      function openChatWindow(){ window.open('','newChatWin','width=500,height=500,toolbar=0');}
    } else {
      jQuery(document).ready(function() {
        $('#chat_submit').click(function(){
          $(this).addClass('disabled');
          setTimeout(function(){ window.location = $('#breadcrumbs a:first-child').attr("href"); }, 5000);
        })
      });
      function openChatWindow(){ window.open('','newChatWin','width=500,height=500,toolbar=0');}
    }
    $('#chat_subject').textarea_maxlength();
      $('#new_chat').validate({
          submitHandler: function(form) {
           $('#chat_submit').attr('disabled',true);
           $('#chat_submit').addClass('disabled');
           $('#chat_submit_spinner').show();
           form.submit();
      },
          messages:{
            'interaction[name]':{
              'required': deskEV('system.snippets.name_required')
            },
            'interaction[email]':{
              'required': deskEV('system.snippets.email_required'),
              'email': deskEV('system.snippets.invalid_email')
            },
            'chat[subject]':{
              'required': deskEV('system.snippets.question_required'),
              'maxlength': deskEV('system.snippets.exceeding_max_chars')
            }
          },
          rules:{
            'interaction[name]':{
              'required':true
            },
            'interaction[email]':{
              'required':true,
              'email':true
            },
            'chat[subject]':{
              'required':true,
              'maxlength':5000,
              'invalidchars':'<>'
            }
          },
          errorClass:'invalid'
        });

      $('#chat_subject').textarea_maxlength();
      $('#new_chat').validate({
        submitHandler: function(form) {
                                         $('#chat_submit').attr('disabled',true);
                                         $('#chat_submit').addClass('disabled');
                                         $('#chat_submit_spinner').show();
                                         form.submit();
                                         },
        messages:{
          'interaction[name]':{
            'required': deskEV('system.snippets.name_required')
          },
          'interaction[email]':{
            'required': deskEV('system.snippets.email_required'),
            'email': deskEV('system.snippets.invalid_email')
          },
          'chat[subject]':{
            'required': deskEV('system.snippets.question_required'),
            'maxlength': deskEV('system.snippets.exceeding_max_chars')
          }
        },
        rules:{
          'interaction[name]':{
            'required':true
          },
          'interaction[email]':{
            'required':true,
            'email':true
          },
          'chat[subject]':{
            'required':true,
            'maxlength':5000,
            'invalidchars':'<>'
          }
        },
        errorClass:'invalid'
      });
  };


// =====================================================
// Chat New
// =====================================================
  if (currentPage == 'chat_new') {

    $(function() {
    //-- Real-time auto-suggest
      $('#chat_subject').on("keyup paste",function() {
        if ($('#chat_subject').val().length > 3 && $('#chat_subject').val().length <= 250) {
          clearTimeout(window.timer);
          window.timer=setTimeout(function(){ // setting the delay for each keypress
            articleSuggest();
          }, 500);
        }
      });
    });

    //-- UPDATED AUTO SUGGEST
    articleSuggest = function() {
        as_count = 0;
        var search_query = $('#chat_subject').val();
        var systemLanguageDesk = $('#system_language').html();
        var brandID = $('#brand_id').html();
        if (brandID == "/" || brandID == "") {
          $.ajax({
            url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query,
            dataType: 'json'
          }).done(apiSuccess).fail(apiFail);
        } else {
          $.ajax({
            url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query + '&b_id=' + brandID,
            dataType: 'json'
          }).done(apiSuccess).fail(apiFail);
        }
    };

    apiSuccess = function(data) {
        auto_suggest_content = "";
        auto_suggest_articles = "";
        auto_suggest_questions = "";
        var system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
        $('.autosuggest').html('<h2 class="muted">' + system_snippet_do_these_help + '</h4><ul class="unstyled"></ul>');
        $.each(data, function() {
          var html = $(this.label);
          article_title = html.find(".article-autocomplete-subject").html();
          if (this.id.indexOf("questions") !== -1) {
              auto_suggest_questions += '<li><a target="_blank" href="' + this.id + '" class="discussion"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
          } else {
              auto_suggest_articles += '<li><a target="_blank" href="' + this.id + '" class="article"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
          }
          as_count++;
        });
        if (as_count > 0) {
          $('.autosuggest ul').append(auto_suggest_articles + auto_suggest_questions);
          $("#common").hide();
          $(".autosuggest").removeClass('hide');
        } else {
          $(".autosuggest").addClass('hide');
          $("#common").show();
        }
    };

    apiFail = function(data) {

    };

    //-- NEW CHAT VALIDATION
    $(document).ready(function () {
      $('#chat_subject').textarea_maxlength();
      $('#new_chat').validate({
        submitHandler: function(form) {
          $('#chat_submit').attr('disabled',true);
          $('#chat_submit').addClass('disabled');
          $('#chat_submit_spinner').show();
          form.submit();
        },
        messages:{
          'interaction[name]':{
            'required':deskEV('system-snippets-name_required')
          },
          'interaction[email]':{
            'required':deskEV('system-snippets-email_required'),
            'email':deskEV('system-snippets-invalid_email')
          },
          'chat[subject]':{
            'required':deskEV('system-snippets-question_required'),
            'maxlength':deskEV('system-snippets-exceeding_max_chars')
          }
        },
        rules:{
          'interaction[name]':{
            'required':true
          },
          'interaction[email]':{
            'required':true,
            'email':true
          },
          'chat[subject]':{
            'required':true,
            'maxlength':5000,
            'invalidchars':'<>'
          }
        },
        highlight: function (element) {
              $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
              $('label:empty').remove();
          },
          success: function (element) {
              $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
              $('label:empty').remove();
          }
      });
    });

  };


// =====================================================
// Page Authentication Verification
// =====================================================
  if (currentPage == 'authentication_verification') {
    $(document).ready(function() { $("#new_email").focus(); });
    $('#new_customer_contact_email').validate({
      submitHandler: function(form) {
        $('#add_email').prop('disabled',true);
        $('#add_email').addClass('disabled');
        $('#new_customer_contact_email_submit_spinner').show();
        form.submit();
      },
      messages:{
        'customer_contact_email[email]':{
          'required':$("#system-snippets-invalid_email").html(),
          'email':$("#system-snippets-invalid_email").html()
        }
      },
      rules:{
        'customer_contact_email[email]':{
          'required':true,
          'email':true
        }
      },
      errorPlacement: function(error, element) {
        error.insertAfter('button');
      },
      errorClass:'invalid'
    });
  };


// =====================================================
// My Portal - Show Case
// =====================================================
  if (currentPage == 'myportal_show') {
      $('#qna_body').textarea_maxlength();
        $('#interaction_body').validate({
          submitHandler: function(form) {
            $('#answer_submit').attr('disabled',true);
            $('#answer_submit').addClass('disabled');
            form.submit();
          },
          messages:{
            'interaction[name]':{
              'required': deskEV('system.snippets.name_required')
            },
            'interaction[email]':{
              'required': deskEV('system.snippets.email_required'),
              'email': deskEV('system.snippets.invalid_email')
            },
            'qna[body]':{
              'required': deskEV('system.snippets.answer_required'),
              'maxlength': deskEV('system.snippets.exceeding_max_chars')
            }
          },
          rules:{
            'interaction[name]':{
              'required':true
            },
            'interaction[email]':{
              'required':true,
              'email':true
            },
            'qna[body]':{
              'required':true,
              'maxlength':5000
            }
          },
          highlight: function (element) {
                  $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
                  $('label:empty').remove();
              },
          success: function (element) {
                  $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                  $('label:empty').remove();
              }
        });
  };


// =====================================================
// Index Page
// =====================================================
  if (currentPage == 'page_index') {
    //INDEX PAGE/GET SATISFACTION
    setTimeout(function(){
     $("#gs_questions div.topic h5 a").appendTo("#gs_questions div.topic").addClass("btn btn-pill");
     $("#gs_ideas div.topic h5 a").appendTo("#gs_ideas div.topic").addClass("btn btn-pill");
     $("#gs_problems div.topic h5 a").appendTo("#gs_problems div.topic").addClass("btn btn-pill");
     $("#gs_praises div.topic h5 a").appendTo("#gs_praises div.topic").addClass("btn btn-pill");
    }, 3500);
  };



// =====================================================
// Article Page
// =====================================================
  if (currentPage == 'page_article') {
    //ARTICLE CONTENT ADJUSTMENTS
      $(".container.article .body.row img").addClass("img-responsive");
      $('.container.article .body.row img').css('width', '');
      $('.container.article .body.row img').css('height', '');
    //ARTICLE RATEBLOCK
      setTimeout(function() {
        $('a.rate.increment').html('<i class="fa fa-thumbs-up"></i>')
        $('a.rate.decrement').html('<i class="fa fa-thumbs-down"></i>')
        $('#blockrate').html('div.answer-rating ')
        if($('#rate_article_container').css('display') == 'none')
        {
          $('div.row.rateblock').addClass('hidden');
        }
      }, 500);
  };



// =====================================================
// CSAT Page(S)
// =====================================================
  if (currentPage == 'customer_feedback') {

    //CUSTOMER SATASTICATION HIGHLIGHT VALUE/SELECTED
    var VoteValue = $('#customer-feedback-checked-rating').val();
    $('.btn.value-' + VoteValue ).addClass('active');

    //FEEDBACK BUTTONS
    $(function () {
      $('.btn-radio').click(function(e) {
        $('.btn-radio').not(this).removeClass('active')
          .siblings('input').prop('checked',false)
        $(this).addClass('active')
          .siblings('input').prop('checked',true)
      });
    });

  };


// =====================================================
// Login Page
// =====================================================
  if (currentPage == 'login') {
      //LOGIN PAGE SOCIAL BUTTON TWEAKS
      $(".alternatelogins a[href*='facebook']").prepend('<i class="fa fa-facebook fa-lg"></i> ').addClass('btn').after('<br />');
      $(".alternatelogins a[href*='twitter']").prepend('<i class="fa fa-twitter fa-lg"></i> ').addClass('btn');
      $("div.newaccount").prependTo("li.create").html();
      $("div.forgotpw").prependTo("li.reset").html();
  };




// =====================================================
// Another Page
// =====================================================
if (currentPage == '') { };


//START ONLOAD
$(document).ready(function() {
// =====================================================
// All Forms // Email / Chat / Question  - Related
// =====================================================

  //MODAL/POPUPS
    $('#PreCreate').appendTo("body").modal('show');




// =====================================================
// Search Related
// =====================================================

    //HIGHLIGHT SEARCH TERMS
    setTimeout(function(){
      function highlightSearchTerms(search_terms){
        $.each(search_terms.split(' '), function(index, value) {
          if(value.length > 3) {
            $('#content a, #content p, #PreCreate p, #PreCreate a').highlight($.trim(value), '<span class=\"highlight\">$1</span>');
            $('.container.search a, .container.search p').highlight($.trim(value), '<span class=\"highlight\">$1</span>');
          }
        });
      }
      highlightSearchTerms($('#search-term').html());
    }, 500);

    var searchWidth = 0;
    var searchWidth = $('#search #q').outerWidth();
    if($('#q').length) {
      if ($("#q").val().length > 0) $("#question-mask").hide();
      // Default FOCUS
      $("#q").bind("autocompleteopen", function(event, ui) {
        $('.ui-autocomplete').css({'margin':'0px', 'width': searchWidth });
      });
    }

    if($("#site-search_autocomplete_articles_url").length>0) {
      var autocomplete_source = deskEV('site-search_autocomplete_articles_url');
      var brandID = deskEV('brand_id');
      autocomplete_source += '?';
      $("#q").autocomplete({
        delay: 200,
        minLength: 2,
        search: function(event, ui) { $("#q").autocomplete("option", "source", autocomplete_source);},
        select: function(event, ui) { $(location).attr('href', ui.item.id); },
        focus: function(event, ui) { return false; }
      });
    }
    //Text Enterted
    if($('#q').length) {
      if ($('#q').length !== 0) {
          //Hide #question-mask if search has content
          if($('#q').val().length > 0) {
            $('#question-mask').hide();
          }
          $('#q').focus(function(){
            $('#question-mask').hide();
          });
          $('#q').blur(function(){
            if($(this).val().length === 0) $('#question-mask').show();
          });
      }
    }
    $('#question-mask').click(function() {
      $('#q').focus();
    });
    $('form').submit(function(){
        $('input[type=text]').each(function(){
          $(this).val($.trim($(this).val()))
        });
    });
    // Extra validator added to handle invalid characters
    $.validator.addMethod('invalidchars', function(value, element, param) {
      param = param.split("").join("|");
      if(param.length > 0){
        return this.optional(element) || ! new RegExp(param).test(value);
      }
      return true;
    }, deskEV('system.snippets.invalid_characters_found'));
    $("#a-content-select").change(function(event){
      var r = location.pathname.match(/\/customer(.*)\/portal(.*)/i);
      if(r && r.length>1)
        location.href = "/customer/" + $(this).val() + "/portal" + r[2] + location.search;
      else
        location.href = "/customer/" + $(this).val() + "/portal/articles" + location.search;
    });

// =====================================================
// Mobile Related
// =====================================================
    //MOBILE MENU TOGGLE
    $('#MobileToggle').click(function() {
        toggleNav();
    });
    //TOGGLE FUNCTION
    function toggleNav() {
      if ($('#site-wrapper').hasClass('show-nav')) {
          // CLOSE NAV
          $('#site-wrapper').removeClass('show-nav');
          $('#mobileHeader').removeClass('show-nav');
          $('#MobileToggle').removeClass('open');
      } else {
          // OPEN NAV
          $('#site-wrapper').addClass('show-nav');
          $('#mobileHeader').addClass('show-nav');
          $('#MobileToggle').addClass('open');
      }
    }
    // MOBILE MENU SEARCH SUGGESTION
    $('#q2').keyup(function() {
      count = 0;
      if ($('#q2').val().length > 2 ){
        query = $('#q2').val();
        $.ajax({
        url: '//' + document.domain.toString() + '/customer/portal/articles/autocomplete?term=' + query,
        dataType: 'json'
        }).done(MOBapiSuccess).fail(MOBapiFail);
      } else {
        $(".mobile-suggest").addClass('hide');
      }
    });
    //MOBILE SUGGEST RESULTS
    MOBapiSuccess = function(data) {
      auto_suggest_content = "";
      auto_suggest_articles = "";
      auto_suggest_questions = "";
      var resultsMobile = $('#results_mobile').html();
      $('.mobile-suggest').html('<ul class="results"><li class="title">' + resultsMobile + '</li></ul>');
      $.each(data, function() {
        var html = $(this.label);
        article_title = html.find(".article-autocomplete-subject").html();

        if (this.id.indexOf("questions") !== -1) {
          auto_suggest_questions += '<li><a href="' + this.id + '" class="discussion">' + article_title + '<i class="fa fa-angle-right"></i></a></li>';
        } else {
          auto_suggest_articles += '<li><a href="' + this.id + '" class="article">' + article_title + '<i class="fa fa-angle-right"></i></a></li>';
        }
        count++;
      });
      if (count > 0) {
        $('.mobile-suggest ul').append(auto_suggest_articles + auto_suggest_questions);
        $(".mobile-suggest").removeClass('hide');
      } else {
        $(".mobile-suggest").addClass('hide');
      }
    };
    //API FAILURE
    MOBapiFail = function(data) {};

// =====================================================
// ALL PAGES // SITE WIDE JS
// =====================================================

    //MODAL CLOSE GO BACK
    $('.onclick-go-back').click(function() {
        history.back();
    });

    //BREADCRUMBS HOME LINK
    var home_link = $('#breadcrumbs a:first-child').attr("href") || location.href;
    $("a[href='/']").attr("href", home_link );

    // HIDE VARIABLE DIVS (backup to css display:none)
    $('.desk-external-variables').hide();

    //BOOSTRAP FORM CLASSES AND LEGACY BROWSER PLACE HOLDER
    $('input.default').addClass('form-control');
    $('select.default').addClass('form-control');
    $(":input[placeholder]").placeholder();

    //PAGINATION BLOCK BOOTSTRAP CONVERSION
    $( ".pagination" ).addClass("pagination-lg");
    $( ".pagination .previous_page" ).html('<i class="fa fa-angle-double-left"></i>');
    $( ".pagination .next_page" ).html('<i class="fa fa-angle-double-right"></i>');
    $( ".pagination > a" ).wrap( "<li></li>" );
    $( ".pagination > span.disabled" ).wrap( "<li class='disabled'><a></a></li>" );
    $( ".pagination > em" ).wrap( "<li class='active'><a></a></li>" );

    //CUSTOM LANGUAGE SELECTS
    $('#desk-mobile-lang-list').append( $('#a-content-select').clone(true).removeAttr('id') );
    $("#desk-mobile-lang-list select").change(function() {
      $('#a-content-select').val($("#desk-mobile-lang-list select").val()).change();
    });
    $('#a-content-select').customSelect({customClass:'langslct'});
    $('.langslctInner').append('<i class="fa fa-angle-down"></i>');
    $('#desk-mobile-lang-list').customSelect({customClass:'moblangslct'});
    $('.moblangslctInner').append('<i class="fa fa-language"></i>');

    //CONVERT HEADER TEXT COLOR TO RGBA COLORS FOR BORDERS
    function hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', .30)';
        }
    }
    $('#header ul.nav.nav-pills li a, #header .langslct').css('border-color', hexToRgbA($('#header_text').text()));

    // Twitter Share Button
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    // Facebook Like Button
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=190751927613851";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // Google Plus Button
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

    // READ ONLY PORTAL UI ADJUSTMENTS
    if (deskEV('read_only') == 'true') {
      $(".input-button input[type='submit']").hide();
      $("#support-side a").each(function(){
        if( $(this).attr("href").match(/emails/) ){
            if (deskEV('site.default_mailbox').length > 0) {
                var default_mailbox = "mailto:" + deskEV('site.default_mailbox');
                $(this).attr("href", default_mailbox);
            } else {
                $(this).hide();
            }
        } else {
          $(this).hide();
        }
      });
      $(".answer-rating").hide();
      $(".question #form").html("{{system.snippets.answers_unavailable}}");
      $("#rate_article").hide();
    }

    //MODERATED FUNCTIONALITY
    if ($('#system-snippets-just_moderated').text() == 'true') {
      $('h5 a').css('display', 'none');

      $("#moderation_okay_button").click(function() {
        $('h5 a').css('display', 'inline');
        $('#modal-screen').hide();
        $('#modal').hide();
      });
      $("#modal-screen").css({
        "opacity":"0.7"
      });
      if($.browser.msie && $.browser.version < 7) {
        $("#qna_kb_topic_id").css("display","none");
        $("#modal-screen").css({
          "width": $(window).width() + "px",
          "height": $(window).height() + "px"
        });
      }
    }

    //SNIPPETS LOADING
    if (deskEV('enable_gs') == 'true') { // XXX Ask Kevin if 'true' is correct string
      gsStringTable['generic_error'] = deskEV('system.snippets.get_satisfaction_error');
      gsStringTable['view_all'] = deskEV('system.snippets.view_all');
      gsStringTable['search_header_no_results'] = deskEV('system.snippets.no_related_discussions');
      gsStringTable['search_header_with_results'] = deskEV('system.snippets.related_discussions')+" {0} "+deskEV('system.snippets.discussions');
      gsStringTable['generic_results_subheader'] = "{0} "+deskEV('system.snippets.discussions');
      gsStringTable['generic_replies'] = "{0} "+deskEV('system.snippets.replies');
      gsStringTable['questions_header'] = deskEV('system.snippets.questions');
      gsStringTable['ideas_header'] = deskEV('system.snippets.ideas');
      gsStringTable['problems_header'] = deskEV('system.snippets.problems');
      gsStringTable['praises_header'] = deskEV('system.snippets.praise');
      getCompanyId(); //Get Satisfaction Company ID
    }

    //Get Satisfaction Search Terms
    if (deskEV('enable_gs') == 'true') {
        var search_term = deskEV('search_term');
        var params = ( search_term !== null ) ? "&topic[query]=" + escape(search_term) : "";
        $('#gs_link').attr('href', gsurl + "/topics/new?from=company&product=&commit=Nope.+Finish+posting+my+question" + params);
    }


//ENDING ONLOAD
}); //End OnLoad
