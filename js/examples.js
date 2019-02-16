var actual_price=0;
var balance = 0;
var sel_litres = 0;
var actual_litres = 0;
var pump_state = false;

function get_rate(){ // flow rate
    $.ajax({url:"/test/get_volume",
            dataType: "text",
            success: function(data){
                $('#water').html(data + ' Л');
				actual_litres = parseInt(data);
            }});
    return true;
}


function set_actual_price(data){
    $.ajax({url: "/test/set_actual_price",
            method: "get",
            dataType: "text",
            data: data, 
            success: function(data){
                $('#actual_price').html(data + ' <i class="fa fa-ruble-sign"></i>');} });
    return true;
}

function start_pump(){
    $.ajax({url: "/test/start_pump",
            //method: "get",
            dataType: "text",
            //data: data,
            //success: function(){
            //    $('#actual_price').html(data + ' <i class="fa fa-ruble-sign"></i>');} 
                });
    return true;
}

function check_money(){ //we should move this to backend sides
	var balance = parseInt($('#balance').text());
	var actual_price = parseInt($('#actual_price').text());
	if (balance >= actual_price) 
	{
		$('#btn_start_stop').attr('class','btn btn-lg btn-info btn-block');
		$('#balance_area').attr('class','alert alert-success');
	}
	else 
		{
	    $('#btn_start_stop').attr('class','btn btn-lg btn-outline-info btn-block disabled');
	    $('#balance_area').attr('class','alert alert-danger');
		}
	}

function stop_pump(){ //this function work wrong
	if (actual_litres >= sel_litres && pump_state == true) {
		$.ajax({url:"/test/stop_pump",
            dataType: "text",

            });
		}
	
}

setInterval("stop_pump()", 500);

setInterval("check_money()", 2000);
setInterval("get_rate()",2000);


$("#btn_1L").click(function(){set_actual_price({'litres_qty': 1});
	sel_litres = 1;
	$('#sel_litres').text(sel_litres + ' Л');
	 });

$("#btn_3L").click(
function(){set_actual_price({'litres_qty': 3});
	sel_litres = 3;
	$('#sel_litres').text(sel_litres + ' Л');
	 });
	 
$("#btn_5L").click(
function(){set_actual_price({'litres_qty': 5}); 
	sel_litres = 5;
	$('#sel_litres').text(sel_litres + ' Л');
	});
$("#btn_19L").click(
function(){set_actual_price({'litres_qty': 19}); 
	sel_litres = 19;
	$('#sel_litres').text(sel_litres + ' Л');
	});
$("#btn_start_stop").click(function(){start_pump(); pump_state=true;});
