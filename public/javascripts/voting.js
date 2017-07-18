$(document).ready(function(){
  $('.js-reward-form').on('submit', function(e) {
    e.preventDefault();

    let rewardForm   = $(e.currentTarget);
    let rewardId     = rewardForm.data('reward');
    let rewardAmount = rewardForm.children('#pledge-amount')[0].value;

    $.ajax({
      url: `/rewards/${rewardId}/donate`,
      type: 'POST',
      data: { amount: rewardAmount },
      xhrFields: {
        withCredentials: true
      },
      success: displaySuccess,
      error: displayError
    });
  });
});

function displaySuccess(reward){
  console.log(reward);
}

function displayError(err){
  console.log(err);
}
