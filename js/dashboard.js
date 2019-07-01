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
    
                $("#file-upload-button").change(function(event){
                var uploadedFile = event.target.files[0]; 
                console.log(uploadedFile.type);
                if(uploadedFile.type != "application/json") { 
                alert("File not read. Please upload a .json file!"); 
                return false;
                }
                else
                    alert("File read successfully!"); 
                    
                if (uploadedFile) {
                    var readFile = new FileReader();
                    readFile.onload = function(e) { 
                        var contents = e.target.result;
                        var json = JSON.parse(contents);
                        traverse(json,process);
                        $('#table').show();
                        $('.yes_data').show();
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
                    
                        $('#div_home').show();
                });
    
                $('#tables').on('click',function(){
                        $('#div_canvas').show().hide();
                        $('#div_choose_file').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                    
                        $('#div_table').show();
                });
                   
               $('#charts').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_choose_file').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                   
                        $('#div_canvas').show();
               });
                   
                $('#upload').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_canvas').show().hide();
                        $('#div_home').show().hide();
                        $('#div_settings').show().hide();
                    
                        $('#div_choose_file').show();
                });
    
                $('#settings').on('click',function(){
                        $('#div_table').show().hide();
                        $('#div_canvas').show().hide();
                        $('#div_home').show().hide();
                        $('#div_choose_file').show().hide();
                    
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
                            // check to see if it is quantitative, if yes, check if no canvas was made for the category
                            if (typeof value !== "string" && document.getElementsByClassName(title).length === 0){
                            create_chart(title);
                            addData(chart[num_charts], key, value);
                            $('#table tr:last').remove();
                            }
                            // check quanti, if yes, check if canvas  exists
                            else if (document.getElementsByClassName(title).length !== 0)
                            addData(chart[num_charts], key, value);
                            // must be quali, add to table
                            else
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
                                                      {"type":"bar",
                                                       "data":{"labels":[],
                                                               "datasets":[{"label":key,
                                                                            "data":[],
                                                                            "fill":false,
                                                                            backgroundColor: getRandomColor(),
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
    
                function getRandomColor() {
                  var letters = '0123456789ABCDEF';
                  var color = '#';
                  for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
                }
    
                $("#chart_type").change(function () {
                var ctype = this.value;
                    
                var num_of_charts = chart.length - 1;
                while (num_of_charts >= 0){
                        var chart_data = chart[num_of_charts].data;
                        var chart_option = chart[num_of_charts].options;
                        var ctx = document.getElementsByClassName(chart[num_of_charts].data.datasets[0].label);
                    
//                        chart[num_of_charts].clear();
//                        chart[num_of_charts].destroy();
                        
                        myChart = new Chart(ctx, {
                        type: ctype,
                        data: chart_data,
                        options: chart_option
                        });
                    
                    num_of_charts--;
                       
                    }
                });
    
                $("#date_picker").change(function(event){
                    $("tr").show();
                    
                    var date_chosen = document.getElementById("date_picker").value;
                    var table_data = document.getElementById("table");

                    if (date_chosen !== ''){
                        // hide all table data and headers
                        $("td").filter(function() {
                            return $(this).text().indexOf("") !== -1;
                        }).parent().hide();
                        
                        $("th").filter(function() {
                            return $(this).text().indexOf("") !== -1;
                        }).parent().hide();
                        
                        // find table data that matches the date
                        $("td").filter(function() {
                            if($(this).text().indexOf(date_chosen) !== -1){
                                return $(this).html();
                            } 
                        }).parent().show();
                        
                        
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

}




                

                
                
                    
        