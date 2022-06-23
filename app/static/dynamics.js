//code responsible for color changing of letters and initializing requests
var game_start = false;
var curr_pos = 'l0w0c0'
var just_pressed = ''
var time_start = 0;
var letters_typed = 0;
var time_elapsed = 0;
var bongo = 0;
$(document).ready(function(){      //jquery for responding to key presses
    var positions = document.getElementById('carat').getBoundingClientRect();
    og_carat_positions = [positions.top, positions.left];
    color_curr(curr_pos);
    $('body').keyup(function(e){
      if(game_start == false){
        game_start = true;
        time_start = d.getTime();
        setInterval(POST_data,3000);
        setInterval(update_accuracy, 500);
      }
      just_pressed = e.key;
      change_bongo();
      move_carat();
      letters_typed = letters_typed + 1;

      if (e.key == get_letter(curr_pos) ){
        //console.log('made it here');
        color_letter(curr_pos, true);
        curr_pos = increment_letter(curr_pos);
        color_curr(curr_pos);
      } else{
        color_letter(curr_pos, false);
      }
      
      
    });
});

//get letter at specific position with format l#w#c#
function get_letter(curr_pos){   
    var elem = document.getElementById(curr_pos);
    if (elem.className == 'space'){
      return ' ';
    }
    return elem.innerHTML;
}

//returns the next letter
function increment_letter(curr_pos){
    var pos = get_intpos(curr_pos);
    pos[2] = pos[2] + 1
    if (document.getElementById(get_new_pos(pos)) == null){
      pos = [pos[0], pos[1]+1, 0];
    }
    if (pos[1] >= 6){
      pos = [pos[0]+1, 0, 0];
    }
    return get_new_pos(pos)

}

//return the curent pos as an array of ints
function get_intpos(curr_pos){   
  return [parseInt(curr_pos[1]), parseInt(curr_pos[3]), parseInt(curr_pos[5]) ];
}

//return array of ints as pos string
function get_new_pos(k){
  return 'l' + k[0].toString() + 'w' + k[1].toString() + 'c' + k[2].toString();
}

function color_letter(curr_pos, correct){
    if (correct){
    document.getElementById(curr_pos).style.color = "#03F33D";
    } else {
      document.getElementById(curr_pos).style.color = "#FF5A06"
    }
}
function color_curr(curr_pos){
  document.getElementById(curr_pos).style.color = "#DFFF06";
}
function color_word(curr_pos){     //function responsible for changing color of words/letters

}

function change_bongo(){
  var cat = document.getElementById('bongo');
  if(bongo == 0){
    cat.src = '/static/BongoCat-2.png';
    bongo = 1;
  } else {
    cat.src = '/static/BongoCat-1.png';
    bongo = 0;
  }
}

function update_accuracy(){
  const g = new Date();
  console.log('about to update');
  speed = (letters_typed / 5) / ((g.getTime() - time_start) / 60000);
  document.getElementById('speed').innerHTML = speed.toString().slice(0, 4);
}