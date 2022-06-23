//code responsible for POST and GET requests. Accuracy is calculated server-side.
const d = new Date();
$(document).ready(function(){
    console.log(d.getTime());
    
});

function POST_data(){
    const t = new Date();
    $.ajax({
        url: '/json',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
            'letters_typed': letters_typed,
            'time_elapsed': t.getTime() - time_start
        }),
       
    });
    console.log('data POSTed');
}

function GET_data(){
    $.ajax({
        url: 'handle_accuracy',
        dataType: 'json',
        type: 'GET',
    });
}