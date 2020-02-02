// Sets current date and current time
var m = moment();
var nowDate = m.format("MM/DD/YYYY");
//m = moment('10AM', 'h:mm a'); //test to see if colors work
//nowDate = moment("02/03/2020", "MM/DD/YYYY"); //test to see if new date works
console.log(nowDate);

var currentDayDisplay = m.format("dddd, MMMM, Do YYYY");
$("#currentDay").text(currentDayDisplay);
var nowHr = m.hours();
var wrkHrs = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
// Empty array to store values entered in textarea input by user
var initItems = {agndDate : nowDate , agndItms:{slot_0:"", slot_1:"", slot_2:"", slot_3:"", slot_4:"", slot_5:"", slot_6:"", slot_7:"", slot_8:"" }};

//Check if storage object exists for today, if not initialize with blank otherwise retrieve

// get agendaItem
var storedItems  =  JSON.parse(localStorage.getItem("agendaItems"));
console.log(nowDate);
if(storedItems === null || storedItems.agndDate !==nowDate){
  storedItems = initItems;
  localStorage.setItem("agendaItems", JSON.stringify(storedItems));
} else {
  storedItems = JSON.parse(localStorage.getItem("agendaItems"));
}

// render agenda
function rndrAgnda() {
  $("<#hours>").empty;  // clear the old agenda of items
  for(i=0; i<wrkHrs.length; i++){ // add time-blocks with variable data
    var baseHTML = `
    <div class="time-block">
      <div class="row">
        <div class="col-sm-2 hour">
          <p class="display-time" id="slot_`+ i +`">`+ wrkHrs[i] +`</p>
        </div>
        <div class="col-sm-9 agenda-text">
          <textarea style="color:black" rows="3" id="txt_`+ i +`" class="agenda"></textarea>
        </div>
        <div class="col-sm-1 saveBtn">
          <button type="button" id = "btn_`+ i +`" class="btn saveIcon">
            <i class="far fa-save"></i>
          </button>
        </div>
      </div> <!--End of row-->
    </div> <!--End of time-block-->
    `
    $("#hours").append(baseHTML);
  }
  for(i=0; i<wrkHrs.length; i++){ //initialize agenda
    $("#txt_"+i).text(storedItems.agndItms["slot_"+i]);
  }
}

function initAgnda() {
$(".time-block").each(function (i, element){
slotHr = moment($(this).find("#slot_"+ i).text(), 'h:mm a').hours();

if(slotHr < nowHr){
  $(this).find("#txt_" + i).addClass("past");
  $(this).find("#txt_" + i).removeClass("present", "future");
} else if(slotHr > nowHr) {
  $(this).find("#txt_" + i).addClass("future");
  $(this).find("#txt_" + i).removeClass("present", "past");
} else {
  $(this).find("#txt_" + i).addClass("present");
  $(this).find("#txt_" + i).removeClass("past", "future");
}

})}


rndrAgnda();
initAgnda();

// button listener, update object, save object and re-render agenda
$(".btn").on("click", function(e){
e.defaultPrevented;
var whcBtn = $(this).attr("id"); //get which button was pressed by looking at id
indx = whcBtn.split("_")[1];

whcTxt = "#txt_"+indx;
whcKey = "slot_"+indx;

inTxt = $.trim($(whcTxt).val());
if(inTxt !== ""){
storedItems.agndItms[whcKey] = inTxt; //update agndItms object

}
//update memory
localStorage.setItem("agendaItems", JSON.stringify(storedItems));
})