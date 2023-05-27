$('.humburger').click(function(){
  $('aside').toggleClass('open')
})

$('.search-btn').click(function(){
  $(this).next('form').slideToggle('fast')
})