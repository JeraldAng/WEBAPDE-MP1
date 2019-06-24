window.onload = function() {
                $("#file-upload-button").change(function(event){
                var uploadedFile = event.target.files[0]; 
                console.log(uploadedFile.type);
                if(uploadedFile.type !== "application/json") { 
                alert("File not read. Please upload a .json file!"); 
                return false;
                }

                if (uploadedFile) {
                    var readFile = new FileReader();
                    readFile.onload = function(e) { 
                        var contents = e.target.result;
                        var json = JSON.parse(contents);
                        create(json);
                    };
                    readFile.readAsText(uploadedFile);
                } else { 
                    console.log("Failed to load file");
                }
                });
    
                $('#home').on('click',function(){
                    if($('#div_canvas').css('display')!='none')
                        $('#div_canvas').show().hide();
                    if($('#div_choose_file').css('display')!='none')
                        $('#div_choose_file').show().hide();
                    
                        $('#div_table').show();
                });
                   
               $('#charts').on('click',function(){
                   if($('#div_table').css('display')!='none')
                        $('#div_table').show().hide();
                   if($('#div_choose_file').css('display')!='none')
                        $('#div_choose_file').show().hide();
                   
                        $('#div_canvas').show();
               });
                   
                $('#upload').on('click',function(){
                    if($('#div_table').css('display')!='none')
                        $('#div_table').show().hide();
                    if($('#div_canvas').css('display')!='none')
                        $('#div_canvas').show().hide();
                    
                        $('#div_choose_file').show();
                });
    
    }
                
                function create(json){
                    document.getElementById("chart_div").style.backgroundColor="white";
                    document.getElementById("chart_div").style.border="1px rgba(0, 0, 0, 1) solid";
                    var ctx = document.getElementById("chart_div");
                    new Chart(ctx,
                              {"type":"bar",
                               "data":{"labels":["Krusty Combo","Krusty Deluxe","Krabby Pattie"],
                                       "datasets":[{"label":"Burger Sales",
                                                    "data":[json.burger_sales["Krusty Combo"],json.burger_sales["Krusty Deluxe"],json.burger_sales["Krabby Pattie"]],
                                                    "fill":false,
                                                    "backgroundColor":["rgba(236, 180, 236, 0.9)","rgba(160, 231, 160, 0.9)","rgba(255, 205, 86, 0.9)"],
                                                    "borderColor":["rgb(195,170,195)","rgb(119,221,119)","rgb(214, 195, 45)"],
                                                    "borderWidth":1}]},
                               "options":{
                                   "scales":{
                                       "yAxes":[{
                                           "ticks":{
                                               "beginAtZero":true}}]}}});
                }
                    
        