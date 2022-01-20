
let all_tickets = {}



class Ticket{
    constructor(Fn="FirstName",Ln="LastName",brn='0-0-1969',leavecity="pheonix",entercity="Flagstaff",leaveDate='0-0-1969',returnDate='0-0-1969',bagcount=0,meal="chicken",extras=0,chosen_extras=[false,false,false,false]){
        this.chosen_extras = chosen_extras
        let this_id=true
        let n_id = Math.round(Math.random()*10000000)
        while(!this_id){
        n_id = Math.round(Math.random()*10000000)
        this_id=true;
        for(const ticket of all_tickets){if(ticket.id==n_id){this_id=false;break}}
        }
        this.id=n_id
        this.first_name = Fn;
        this.last_name = Ln;
        this.date_of_birt = brn;
        this.leaving_city = leavecity;
        this.entering_city = entercity;
        this.leave_date = leaveDate;
        this.return_date = returnDate;
        this.bags = bagcount;
        this.meal = meal;
        this.extra_count = extras;
        all_tickets[n_id]=this;
    }
    calculate_cost(){
        let cost = 300;
        for(let i = 0; i<4;i++){if(this.chosen_extras[i]){cost+=10}}
        cost+=20*this.bags
        return cost
    }
}

//preload a few tickets
let new_ticket = new Ticket('john','aa','1999-1-1','phoenix','pheonix','2020-1-1','2022-1-1','128','Chicken',4,[true,true,true,true])
new_ticket = new Ticket('joh','aade','2999-1-1','phoenix','flagstaff','1975-1-1','2353-1-1','128','Steak',2,[false,false,false,false])
load_tickets()

const button_ids = ['legroom','headphones','extrafood','windowseat','Steak','Beef','Chicken']
function submit_ticket(){
    let form = document.getElementById('ticket_form').elements
    let form_values = {}
    for (let i = 0; i<form.length;i++) {
        let item = form.item(i);
        form_values[item.id]=item.value
        if(button_ids.includes(item.id)){
            form_values[item.id]=item.checked
        }
        
    }
    let meal = "Chicken"
    if(form_values["Beef"]){meal = "Beef"}
    if(form_values["Steak"]){meal = "Steak"}
    
    let fn = form_values["Fn"]
    let ln = form_values["Ln"]
    let brn = form_values["brn"]
    
    let leavecity = form_values["leavingcity"]
    let entercity = form_values["enteringcity"]
    
    let leavedate = form_values["departDate"]
    let returndate = form_values["returnDate"]
    
    let bagcount = form_values["bagcount"]
    
    let extra_items = 0
    let extra_items_chosen = [
        form_values["legroom"],
        form_values["headphones"],
        form_values["extrafood"],
        form_values["windowseat"]
    ] 

    extra_items=form_values["windowseat"]+form_values["legroom"]+form_values["headphones"]+form_values["extrafood"]
    let new_ticket = new Ticket(fn,ln,brn,leavecity,entercity,leavedate,returndate,bagcount,meal,extra_items,extra_items_chosen)
    load_tickets()
    return false
}

function load_tickets(){
    let existing_tickets = document.getElementsByClassName("ticket_button")
    const ticket_list = document.getElementById("ticket_list")
    for(let i = 0; i <ticket_list.children.length;i++){
        ticket_list.firstChild.remove()
        ticket_list.removeChild(ticket_list.firstChild)
    }
    
    let tickets = []
    for(const [id,ticket] of Object.entries(all_tickets)){
        const new_ticket = document.createElement("button")
        ticket_list.appendChild(new_ticket)
        ticket_list.appendChild(document.createElement('br'))
        new_ticket.innerText=ticket.id+"-"+ticket.first_name+" "+ticket.last_name;
        new_ticket.className = "ticket_button"
        new_ticket.name = ticket.id
        new_ticket.onclick = function() {load_ticket_to_view(new_ticket.name)};
    }

}
function load_ticket_to_view(id){
    let seleted_ticket = all_tickets[id]
    document.getElementById("first").innerHTML=seleted_ticket.first_name
    document.getElementById('last').innerHTML=seleted_ticket.last_name
    document.getElementById('dob').innerHTML=convert_date(seleted_ticket.date_of_birt)
    document.getElementById("bbr").innerHTML=seleted_ticket.bags
    document.getElementById('dep').innerHTML=seleted_ticket.leaving_city
    document.getElementById('hed').innerHTML=seleted_ticket.entering_city
    document.getElementById('depd').innerHTML=convert_date(seleted_ticket.leave_date)
    document.getElementById('arvd').innerHTML=convert_date(seleted_ticket.return_date)
    document.getElementById('durst').innerHTML=duration_of_trip(seleted_ticket.leave_date,seleted_ticket.return_date)
    document.getElementById("me").innerHTML=seleted_ticket.meal
    document.getElementById("ag").innerHTML="Age: "+get_age(convert_date(seleted_ticket.date_of_birt))
    let new_extras = ""
    for(let i = 0;i < 4;i++){if(seleted_ticket.chosen_extras[i]){new_extras+=button_ids[i]+" "}}
    document.getElementById("extr").innerHTML=new_extras
    document.getElementById("cst").innerHTML="Cost: "+seleted_ticket.calculate_cost()
    return false
}

//changes the date from the string into the M/D/Y format
function convert_date(date_in){
    let dob = ''
    let date_held = date_in.split("-")
    dob = date_held[1]+"/"+date_held[2]+"/"+date_held[0]
    return dob
}
function duration_of_trip(enter_date,leave_date){
    let date = new Date(convert_date(enter_date))
    let date_out = new Date(convert_date(leave_date))
    var Difference_In_Time = date_out.getTime() - date.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    return Math.round(Difference_In_Days-0.5)
    
}
function get_age(birth){
    let age = 0
    let d = new Date
    let born_on = new Date(birth)
    var Difference_In_Time =  d.getTime()-born_on.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24 * 365.25)
    return Math.round(Difference_In_Days-0.5)
}