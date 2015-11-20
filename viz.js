(function() {
     //prepare Your data array with mp3 names
     var dataArray = new Array(
         "roadtrain",
         "backgroundsounds",
         "banjosingers",
         "museummusic",
         "taiwanmarket",
         "mudvolcano",
         "familydinner",
         "kidsdance",
         "openhouse",
         "indiansingingnearby",
         "museumscenes",
         "kidspark"
     );

     var shuffledArray = shuffle(dataArray);

     var svg = d3.select('svg#viz');
     var width = parseInt(svg.style('width'));
     var height = parseInt(svg.style('height'));
     var side = Math.min(width, height);
     var radius = side /(1 * (shuffledArray.length * 2 + 2));


     var d3_enter_selection = svg.selectAll('circle').data(shuffledArray).enter();

     d3_enter_selection.append('circle')
         .attr('cx', width / 2)
         .attr('cy', height / 2)
         .attr('r', function(d, i) {
             return (i + 1) * radius;
         })
         .attr('fill', 'none')
         .attr('stroke', 'black')
         .attr('stroke-width', 2)
         .attr('data-sound', function(d, i) {
             return d
         })
         .attr('class', 'orbit');

     d3_enter_selection.append('circle')
         .attr('cx', width / 2)
         .attr('cy', function(d, i) {
             return height / 2 - (radius * (i+1));
         })
         .attr('r', radius * 0.4)
         .attr('fill', 'none')
         .attr('data-sound', function(d, i) {
             return d
         })
         .attr('class', 'planet');

     //add html elements to the thing
     $.each(shuffledArray, function( index, value ){
         var mp3 =  "<audio controls preload autoplay loop id='" +  value + "' class='mysound' plus='1' data-sound='" + value + "'><source src='sounds/" + value + ".mp3' type='audio/mpeg'></audio>";
         $("#sounds").append(mp3);
         $("#" + value).prop("volume", (0.05 * index) % 1);
     });

     window.setInterval(function(){
         $('.mysound').each(function(i, obj){

             //cycle the volume of each based on different cycles....
             var vol = $(obj).prop("volume");
             var new_vol;
             if (Math.random() < 0.99) {
                new_vol = (vol + 0.001) % 1.0;
             } else {
                new_vol = (vol + 0.1) % 1.0;
             }
             $(obj).prop("volume", new_vol);

             /*
             var set = (0.01 * (i+1))%1;
             //get a plus, minus attribute
             var plus = $(obj).attr("plus");
             if(plus == 1 && vol + set <= 1){
                 $(obj).prop("volume", vol + set);
             }
             if(plus == 1 && vol + set > 1){
                 $(obj).attr("plus",0);
                 $(obj).prop("volume", vol-set);
             }
             if(plus == 0 && vol - set >= 0){
                 $(obj).prop("volume", vol - set);
             }
             if(plus == 0 && vol - set < 0){
                 $(obj).attr("plus",1);
                 $(obj).prop("volume", vol+set);
             }
             */

             //randomly change the volume
             /*	var rand = 0.04;  //amount of change in volume.
                var pos = Math.random();
                var vol = $(obj).prop("volume");
                console.log(vol);
                if(pos > 0.5 && vol + rand < 1){
                $(obj).prop("volume", vol + rand);
                }if(pos <= 0.5 && vol - rand > 0){
                $(obj).prop("volume", vol - rand);
                }*/


             // update the viz based on the volumes
             var cur_vol = $(obj).prop("volume");
             var sound = $(obj).data('sound');
             var angle = Math.PI / 2 + cur_vol * 2 * Math.PI;
             var px = Math.cos(angle);
             var py = Math.sin(angle);

             svg.select('circle.planet[data-sound="'+sound+'"]')
                 .attr('cx', width/2 + (i+1) * radius * px)
                 .attr('cy', height/2 - (i+1) * radius * py)
                 .attr('fill', 'black');

         });
     },500);    //millseconds between volume changes     
 })();


//shuffle array function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}	


