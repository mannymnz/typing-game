function move_carat() {
    var target_pos = document.getElementById(curr_pos).getBoundingClientRect();
    var carat = document.getElementById('carat');
    console.log(target_pos.top - og_carat_positions[0]);
    carat.style.top = `${target_pos.top - og_carat_positions[0]}px`;
    carat.style.left = `${target_pos.left - og_carat_positions[1]}px`;

}