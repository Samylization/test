var jsonObj; // Contains data from all current Json files

$(document).ready(function() {
  $("#success-alert").hide();
  creatTable(); // This will create the table if any Json file is present.
}); 

// It will fetch all the Json files data present in ./json directory
function getVesselJson() {
  return new Promise(resolve => {
  $.ajax({
    url: '/softpart/assessment/test/v0.0.0',
    type: 'GET',
    contentType: 'application/json',
    success: function (data, textStatus, xhr) {
      if (data.length!=0) {
          $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#success-alert").slideUp(500);
            });          
        }
        jsonObj = data;
        resolve('resolved');
    },
    error: function (xhr, textStatus, errorThrown) {
        console.log('Error in Operation');
    }
  });
});   

}				

async function creatTable(){

  await getVesselJson(); // Will wait for response before continuing to build table
  var table = document.getElementById('myTable');   
  var data = jsonObj;
  for(var i=0;i<data.length;i++){
    var anchorTag = document.createElement('a');
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
      var x = data[i].features[0].properties.id;
      var y = data[i].features[0].properties.name;

      var prop_id = document.createTextNode(x);
      var prop_name = document.createTextNode(y);
      anchorTag.id = data[i].file_name;;
      anchorTag.appendChild(prop_name);
      anchorTag.setAttribute("href", "#");
      anchorTag.onclick = function(e) {
        myMapupdated(this.id);
        e = e || window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
        };
      td1.appendChild(prop_id);
      td2.appendChild(anchorTag);
      tr.appendChild(td1);
      tr.appendChild(td2);
  
      table.appendChild(tr);
  }
}

function myMapupdated(location) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 1.3521, lng: 103.8198}
  });
  map.data.loadGeoJson("./json/"+location); // will load all coordinates present in one geoJson
 
}

// To build Default map on page load
function myMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 1.3521, lng: 103.8198}
    //mapTypeId: google.maps.MapTypeId.HYBRID

  });
 
}
