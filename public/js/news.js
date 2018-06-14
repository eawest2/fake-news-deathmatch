$( document ).ready(function() {
    $.ajax("/api/article/review" + {
        type: "GET",
    }). then(
        function() {
        console.log("Retreiving Articles");
        //Update Dom
        location.reload();
        }
    );
});
