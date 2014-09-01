(function(){

  $('.tip').hover(function(){
    tipText = $(this).data('tip');
    $("<div>",{
        text: tipText,
        attr: {'class':'tip-popover active'}
      })
        .insertAfter($(this));
  }, function(){
    tipText = '';
    $('div.tip-popover').remove();
  });

})();