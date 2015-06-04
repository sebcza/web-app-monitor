/*jshint jquery: true, devel: true */

$(function (){
    
    var generateInput = function(size){
    
    for(var i=0; i++; i<size){
        var mi = document.createElement("input");
        mi.setAttribute('type', 'text');
        mi.setAttribute('id', 'answer'+i);
        $('#number').append(mi);
    }
    
}
    
    var dataServer;
    generateInput(5);
    //$("#start-modal").modal('show');
    
    
    $('#start-button').click(function (){
    $("#start-modal").modal('show');
});


$('#pButton').click(function (){
    
    $.get("/play/", function(data) {
        $("#start-modal").modal('hide');
        dataServer = data;
        console.log(data);
        generateInput(5);
    });
    
});
});





