/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
var $album;

var allAlbums;

/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  $album = $('#album-target');

  var source = $('#album-template').html();
  var template = Handlebars.compile(source);

  


  function renderAlbum(album) {
    // console.log('rendering album:', album);
    // $album.empty();
    var albumsHtml = template({ album: album });
    $album.append(albumsHtml);
    // console.log(sampleAlbums);
  };

  // renderAlbum(sampleAlbums[0]);

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });

  //render all albums
  //for loop because #each isn't specified in html:
  function onSuccess(json){
    allAlbums = json;
    for (var i=0; i<allAlbums.length; i++){
    renderAlbum(allAlbums[i]);
  }
}
  function onError (err){
    console.log('error', err);
  }

  $('#album-form').on('submit', function(event){
    event.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $(this).trigger("reset");
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: data,
      success: onHandleSuccess,
      error: onError
    });
  });
    function onHandleSuccess(json){
      //console.log(json);
      renderAlbum(json);
    }

    $('#albums').on('click', '.add-song', function(event){
      event.preventDefault();
      console.log('click');
      var id=$(this).closest('.album').data('albumId');
      console.log('id', id);
    })
});





// this function takes a single album and renders it to the page

