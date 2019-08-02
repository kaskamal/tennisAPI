$("#ranking-submit").click(function(e) {
    const ranking_type = $('.custom-select').find(":selected").text();
    const url = `rankings/${ranking_type.toLowerCase()}`
    console.log(url);
    // $.ajax({
    //     type: "GET",
    //     url: url,
    //     success: function(result) {
    //         alert('ok');
    //     },
    //     error: function(result) {
    //         alert('error');
    //     }
    // });
});