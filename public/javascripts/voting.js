
$(document).ready(function() {
  $('#vote').on('click', (e) => {
    if (eventInfo.currentUser) {
     eventInfo.currentEvent.totalPledged++;
    $.post('/voting', {
      userId: eventInfo.currentUser._id,
      eventId: eventInfo.currentEvent._id,
      totalPledged: eventInfo.currentEvent.totalPledged
    });
    $('#vote').toggle();
    $('.total').text(eventInfo.currentEvent.totalPledged);
} else {
  $.get('/login');
}
  });
});
