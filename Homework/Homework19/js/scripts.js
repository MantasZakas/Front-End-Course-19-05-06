$(document).ready(function(){
    $("a").click(function(){
        $("p").toggleClass("invisible");
    });
});

$(document).ready(function(){
    $(".rounded-circle").click(function(){
        $(this).toggleClass("invisible");
        $(".rounded-circle").toggleClass("invisible");
    });
});