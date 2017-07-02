/* globals $ */

let games = []
$('form').on('submit', function() {
  var nombre = $('#nombre').val();
  var plataforma = $('#plataforma').val();

  var nuevo_juego = $('<div class="items"></div>');

  var contenido = "<span> " + nombre + "<br><em>" + plataforma + "</span>";
  games.push(nombre + ' - ' + plataforma)

  nuevo_juego.html(contenido);


  $('#vista').append(nuevo_juego);

  $.mobile.navigate('#log');

  return false;
});

$(document).on('pagebeforeshow', function() {
    $('form').each(function() {
        this.reset();
    });
});

$('#botonlimpiar').on('click', function() {

    var limpiarJuegos = confirm("Se eliminará toda tu lista de juegos");
    if (limpiarJuegos) {
        $('#vista div').remove();
    }
});

$('#vista').on('click', 'div', function() {

    if ($(this).children('span').attr('class') == 'Completado') {

        var eliminar = confirm("Eliminarás este juego completado");
        if (eliminar) {
            $(this).remove();
        }

    } else {
        var completado = confirm("Vas a marcar este juego como completado");
        if (completado) {
            $(this).css("background", "green");
            $(this).children().addClass("completado");
        }
    }
});

$('#vista').on('taphold', 'div', function() {

    var nosuperado = confirm("Este juego no está completado");
    if (nosuperado) {
        $(this).css("background", "red");
        $(this).children().removeClass("completado");
    }

});

$('#myInput').keyup(function () {
  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val()
  var count = 0

  // Loop through the comment list
  // $('nav ul li').each(function () {
  $('#myUL').children('li').each(function () {
    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
      $(this).fadeOut()

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show()
      count++
    }
  })

  // Update the count
  // var numberItems = count
  $('#filter-count').text('Number of Comments = ' + count)
})

function printGames () {
  let $gameContainer = $('#myUL')
  $gameContainer.empty()
  for (let game of games) {
    $gameContainer.append($('<li>').html('<a href="#">' + game + '</a>'))
  }
}
