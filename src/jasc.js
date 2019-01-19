let array = [1,2,3]

$(`#map${array}`).each(function() {
  $(this).css({"background-color": "yellow"})
})

let maps = $("div").slice(1,3).css("border-style: solid;")
