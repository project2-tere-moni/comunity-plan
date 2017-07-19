
$(document).ready(function() {
  $('#vote').on('click', (e) => {
    $.post('/voting', {
      userId: eventInfo.currentUser._id,
      eventId: eventInfo.currentEvent._id,
      totalPledged: eventInfo.currentEvent.totalPledged
    }).then( (response) => {
      eventInfo.currentEvent.totalPledged++;
      $('.total').text(eventInfo.currentEvent.totalPledged);
      $('#vote').text('Thanks for voting');
      $('#vote').off('click');
    });
  });
});
