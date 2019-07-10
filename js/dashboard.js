function mute(){
                var music = document.getElementById("dashboard-audio"); 
                var muter = document.getElementById("mute-button");
                if (music.muted === false){
                    music.muted = true;
                    muter.value = 'Unmute Music';
                    muter.style.backgroundColor = "#d86363";
                    muter.onmouseover = function(){
                        this.style.backgroundColor = "#d86363";
                    }
                    muter.onmouseout = function(){
                        this.style.backgroundColor = "#dd7777";
                    }
                }
                else{
                    music.muted = false;
                    muter.value = 'Mute Music';
                    muter.style.backgroundColor = "#63d863";
                    muter.onmouseover = function(){
                    this.style.backgroundColor = "#63d863";
                    }
                     muter.onmouseout = function(){
                        this.style.backgroundColor = "#77dd77";
                    }
                }
}

window.onload = function(){

var ctx = document.getElementById("div_canvas");

var num_charts = -1;
var chart = []; 
var title = ""; 
var repeat = true;
var store_last_date = "";
    
                $("#file-upload-button").change(function(event){
                var uploadedFile = event.target.files[0]; 
                console.log(uploadedFile.type);
                if(uploadedFile.type != "application/json") { 
                alert("File not read. Please upload a .json file!"); 
                return false;
                }
                else{
                    alert("File read successfully!"); 
                    num_charts = -1;
                    chart = [];
                    title = "";
                    repeat = true;
                    store_last_date = "";
                    $("#table").empty();
                    $('#date_picker').val('');
                    $('#chart_type').val('bar');
                    $('#searching').val('');
                    $("canvas").remove();
                }
                    
                if (uploadedFile) {
                    var readFile = new FileReader();
                    readFile.onload = function(e) { 
                        var contents = e.target.result;
                        var json = JSON.parse(contents);
                        traverse(json,process);
                        $('.krusty_logo').show();
                        $('#table').show();
                        $('.yes_data').show();
                        $('#table_header').show();
                        $('.no_data').hide();
                    };
                    readFile.readAsText(uploadedFile);
                } else { 
                    console.log("Failed to load file");
                }
                });
    
                $('#home').on('click',function(){
                        $('#div_canvas').show().hide();
                        $('#div_choose_file').show().hide();
                        $('#div_table').show().hide();
                        $('#div_settings').show().hide();
                    
                         $(".wheel").toggleClass("wheel-fade");
                    
                        $('#div_home').show();
                });
    
                $('#tables').on('click',function(){
                       $('#div_canvas').show().hide();
                        $('#div_choose_file').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                    
                        $(".wheel").toggleClass("wheel-fade"); 
                        $('#div_table').show();
                });
                   
               $('#charts').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_choose_file').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                   
                        $(".wheel").toggleClass("wheel-fade");
                        $('#div_canvas').show();
               });
                   
                $('#upload').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_canvas').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                    
                        $(".wheel").toggleClass("wheel-fade");
                        $('#div_choose_file').show();
                });
    
                $('#settings').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_canvas').show().hide();
                        $('#div_home').show().hide();
                        $('#div_choose_file').show().hide();
                    
                        $(".wheel").toggleClass("wheel-fade");
                        $('#div_settings').show();
                });
                
                function traverse(json,process) {
                    for (var i in json) {
                        process.apply(this,[i,json[i]]);  
                        if (json[i] !== null && typeof(json[i])=="object") {
                            //going one step down in the object tree!!
                            traverse(json[i],process);
                        }
                    }
                }

                //called with every property and its value
                function process(key,value) {
                    if (value == "[object Object]"){
                        addHeader(key); 
                        title = key.split("_").join(" ");
                    }
                    else{
                            // check if no canvas was made for the category
                            if (typeof value !== "string" && document.getElementsByClassName(title).length === 0){
                            create_chart(title);
                            addData(chart[num_charts], key, value);
                            }
                            // check if canvas  exists
                            else if (typeof value !== "string" && document.getElementsByClassName(title).length !== 0)
                            addData(chart[num_charts], key, value);
                            
                            // add to table
                            addContent(key, value); 
                    }
                }

                function addContent(key, value) {
                    $('#table tr:last').append('<td>' + key.split("_").join(" ") + '<\/td> <td>' + value + '<\/td>');
                }
    
                function addHeader(key){
                    $("#table").append(
                      "<tr>" +
                        "<th>" + key.split("_").join(" ") + ": </th>" +
                      "</tr>"
                  );
                   
                }
    
                function addData(chart, label, data) {
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                    dataset.backgroundColor.push(getRandomPastelColor());
                });

                chart.update();
                }
    
                function create_chart(key){
                        var new_canvas = document.createElement('canvas');
                                                new_canvas.className = key;
                                                ctx.appendChild(new_canvas);
                                                new_canvas.style.backgroundColor = "white";
                                                
                                                num_charts++;
                                                chart[num_charts] = new Chart(new_canvas,
                                                      {"type": $("#chart_type").val(),
                                                       "data":{"labels":[],
                                                               "datasets":[{"label":key,
                                                                            "data":[],
                                                                            "fill":false,
                                                                            backgroundColor: [getRandomPastelColor()],
                                                                            "borderWidth":1}]},
                                                       "options":{
                                                           responsive: false,
                                                           maintainAspectRatio: false,
                                                           "scales":{
                                                               "yAxes":[{
                                                                   "ticks":{
                                                                       "beginAtZero":true}}]}}});  
                                            
                                               new_canvas.style.display = "inline-block";
                }
    
                function getRandomPastelColor() {
                  var hue = Math.floor(Math.random() * 360);
                  var color = 'hsl(' + hue + ', 100%, 80%)';
                  return color;
                }
    
    
                $("#date_picker").on("change", function() {
                $("#date_picker_2").val($(this).val());
                });
    
                $("#date_picker_2").on("change", function() {
                $("#date_picker").val($(this).val()).change();
                });
    
                $("#chart_type").change(function () {
                var ctype = this.value;
                    
                var num_of_charts = num_charts;
                    console.log(num_charts);
                while (num_of_charts >= 0){
                        var chart_data = chart[num_of_charts].data;
                        var chart_option = chart[num_of_charts].options;
                        var ctx = document.getElementsByClassName(chart[num_of_charts].data.datasets[0].label)[0].getContext('2d');
                    
                    if(chart[num_of_charts] != undefined){ 
                        myChart = new Chart(ctx, {
                        type: ctype,
                        data: chart_data,
                        options: chart_option
                        });
                        
                        chart[num_of_charts].destroy();
                        chart[num_of_charts] = myChart;
                    }
                    
                    num_of_charts--;                       
                    }
        
                });
    
                 var table_data = document.getElementById("table");
    
                $("#date_picker").change(function(event){
                    $("tr").show();
                    
                    var date_chosen = document.getElementById("date_picker").value;

                    if (date_chosen !== ''){
                        hideTableData();
                        filterTableData(date_chosen);
                        $('#searching').val('');
                        
                        create_chart_per_day();
                    }
                    
                function create_chart_per_day(){
                    
                    if (repeat === false){
                        console.log($('.'+ store_last_date).val())
                         if ($('.'+ store_last_date).val() !== undefined){
                             $('.'+ store_last_date).remove();
                             num_charts--;
                         }
                    }                    
                    
                    var numOfVisibleRows = $('tr').filter(function() {
                      return $(this).css('display') !== 'none';
                    }).length;
                    
                    console.log(numOfVisibleRows);
                    if (numOfVisibleRows !== 0){
                        if (repeat === false){ 
                        console.log(num_charts);
                    }
                   
                    store_last_date = date_chosen;
                        
                    var Krabby_Pattie = $("tr").filter(function() {
                            if($(this).text().indexOf("Krabby Pattie") !== -1 && $(this).css('display') !== 'none'){
                                return $(this).html();
                            } 
                        }).length;
                    
                    var Krusty_Deluxe = $("tr").filter(function() {
                            if($(this).text().indexOf("Krusty Deluxe") !== -1 && $(this).css('display') !== 'none'){
                                return $(this).html();
                            } 
                        }).length;
                    
                    var Krusty_Combo = $("tr").filter(function() {
                            if($(this).text().indexOf("Krusty Combo") !== -1 && $(this).css('display') !== 'none'){
                                return $(this).html();
                            } 
                        }).length;
                    
                    create_chart(date_chosen);
                        console.log("not empty")
                    
//                    for (i = 0; i < counter2.length - 1; i++)
//                    addData(chart[chart.length -1], label[i], counter2[i]);
                    
                    addData(chart[chart.length -1], "number of sales", numOfVisibleRows);
                    addData(chart[chart.length -1], "Krabby Patties sold", Krabby_Pattie);
                    addData(chart[chart.length -1], "Krusty Deluxe sold", Krusty_Deluxe);
                    addData(chart[chart.length -1], "Krusty Combo sold", Krusty_Combo);
                    }
                    
                     repeat = false;
                    
                }
                    
                $("#search_button").click(function(event){
                    $("tr").show();
                    
                    var search_key = document.getElementById("searching").value;
                    
                    if (search_key !== ''){
                        hideTableData();
                        filterTableData(search_key);
                        $('#date_picker').val('');
                    }
                })
                        
                function filterTableData(key){
                        // find table data that matches the date
                        $("td").filter(function() {
                            if($(this).text().indexOf(key) !== -1){
                                return $(this).html();
                            } 
                        }).parent().show();  
                }
                    
                function hideTableData(){
                    // hide all table data and headers
                        $("td").filter(function() {
                            return $(this).text().indexOf("") !== -1;
                        }).parent().hide();
                        
                        $("th").filter(function() {
                            return $(this).text().indexOf("") !== -1;
                        }).parent().hide();
                }
                                        
                });
                
                $(".trigger_popup_fricc").click(function(){
                       $('.hover_bkgr_fricc').show();
                    });
                    $('.hover_bkgr_fricc').click(function(){
                        if ($('#help_page1').is(":visible")){
                        $('#help_page1').hide();
                        $('#help_page2').show();
                        }
                        else if ($('#help_page2').is(":visible")){
                            $('.hover_bkgr_fricc').hide();
                            $('#help_page1').show();
                            $('#help_page2').hide();
                        }
                    });
                    $('.popupCloseButton').click(function(){
                        $('.hover_bkgr_fricc').hide();
                        $('#help_page1').show();
                        $('#help_page2').hide();
                    });
    
                $("#volume-scrubber").on('change', function(){
                    var scrubber_value = document.getElementById("volume-scrubber").value;
                        scrubber_value = parseFloat(scrubber_value) + 50;
                    
                    document.getElementsByTagName("body")[0].setAttribute("style","-webkit-filter:brightness(" + scrubber_value + "%)")
                    
                    });
    
}



                

                
                
                    
        