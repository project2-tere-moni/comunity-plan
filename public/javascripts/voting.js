
$(document).ready(function() {
  $('#vote').on('click', (e) => {
    $.post('/voting', {
      userId: eventInfo.currentUser._id,
      eventId: eventInfo.currentEvent._id});
    $('#vote').toggle();
    eventInfo.currentEvent.totalPledged++;
    $('.total').text(eventInfo.currentEvent.totalPledged);


  });
});
