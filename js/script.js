var budget = document.getElementById("add_budget");
var title = document.getElementById("title");
var amount = document.getElementById("amount");
var expenses = [];

function addBudget(){
    var data1 = budget.value;
    localStorage.setItem('Budget',data1);
    budget.value = "";
    setTotal();
    setExpenses();
    showCharts();
}

setTotal()
function setTotal(){
    if(localStorage.getItem("Budget") == null)
    {
        document.getElementById("total_b").innerHTML = "--";
    }
    else{
        document.getElementById("total_b").innerHTML = localStorage.getItem("Budget");
    }
}


function addExpense(){
    var data = JSON.parse(localStorage.getItem("expenses"));
    if(data == null)
    {
        expenses = [];
    }
    else
    {
        expenses = data;
    }
    var obj = {
        title : title.value,
        price : amount.value
    }
    expenses.push(obj);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    title.value = "";
    amount.value = "";
    setExpenses();
    showCharts();
}

var total_ex = 0;
var get_bud = 0; 
function setExpenses(){
    total_ex = 0;
    get_bud = 0; 
    var items = JSON.parse(localStorage.getItem("expenses"));
    if(items == null)
    {
        items = [];
    }
    else
    {
        var ex_HTML = "";
        items.map((v,i)=>{
            ex_HTML += `<div class="ex-item d-flex">`
            ex_HTML += `<h5 class="ex_tit">${(v.title.charAt(0).toUpperCase() + v.title.slice(1))}</h5>`
            ex_HTML += `<h5 class="ex_amt">${v.price}</h5>`
            ex_HTML += `<h5 class="ex_del"><a href="javascript:removeEx(${i})"><i class="ri-delete-bin-6-fill"></i></a></h5>`
            ex_HTML += `</div>`
            total_ex += parseInt(v.price)
        })
        document.getElementById("ex_Items").innerHTML = ex_HTML;
        document.getElementById("total_e").innerHTML = total_ex;
    }
    if(localStorage.getItem("Budget") == null)
    {
        get_bud = 0;
    }
    else
    {
        get_bud = parseInt(localStorage.getItem("Budget"))
    }
    document.getElementById("total_r").innerHTML = (get_bud - parseInt(total_ex) == 0 ? "--" : get_bud - parseInt(total_ex));
}
setExpenses();

function removeEx(index){
    var items = JSON.parse(localStorage.getItem("expenses"));
    items.splice(index, 1);
    console.log(items)
    localStorage.setItem("expenses", JSON.stringify(items));
    setExpenses();
    showCharts();
}

//Chart 
function showCharts(){

    var xValues = ["Budget", "Expenses"];
    var yValues = [get_bud, total_ex];
    var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
    ];
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true
            }
        }
    });

    var exp_data = JSON.parse(localStorage.getItem("expenses"));
    var exp_titles = [];
    var exp_amts = [];
    if(exp_data == null)
    {
        exp_data = [];
    }
    else
    {
        exp_data.map((v)=>{
            exp_titles.push(v.title);   
            exp_amts.push(v.price);   
        })
    }

    var xValues = exp_titles;
    var yValues = exp_amts;
    var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
    ];
    new Chart("myChart2", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true
            }
        }
    });
}
showCharts();