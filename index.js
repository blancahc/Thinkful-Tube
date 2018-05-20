$(document).ready(function () {

    $("#js-search-form").submit(function (event) {

        event.preventDefault();

        var userInput = $("#js-query").val();

        getResults(userInput);
    });


    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyCl-Pw8hO-CdGkhwG8Js7Lbwp3B-yTMAnc",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {

                console.log(receivedApiData);

                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                } else {
                    displaySearchResults(receivedApiData.items);
                }
            });
    }


    function displaySearchResults(videosArray) {


        var buildTheHtmlOutput = "";

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {

            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>";
            buildTheHtmlOutput += "<a aria-label='" + videosArrayValue.snippet.title + "' href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        });


        $("#js-search-results ul").html(buildTheHtmlOutput);
    }
});
