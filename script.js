$(function () {
  //Utilize dayjs and a function to update my time blocks
  function updateBlocks() {
      const currentHour = dayjs().hour();

      $('.time-block').each(function () {
          const hour = parseInt($(this).attr('id').split('-')[1]);
          const textarea = $(this).find('.description');

          if (hour < currentHour) {
              $(this).addClass('past').removeClass('present future');
          } else if (hour === currentHour) {
              $(this).addClass('present').removeClass('past future');
          } else {
              $(this).addClass('future').removeClass('past present');
          }
      });
  }

  // This should prioritize the blocks to update initially and set an interval
  updateBlocks();

 setInterval(updateBlocks, 60000);

  // This handles the user's local storage and save data within each time block
  $('.description').each(function () {
      const hour = $(this).closest('.time-block').attr('id').split('-')[1];
      const savedData = localStorage.getItem(`hour-${hour}`);
      if (savedData) {
          $(this).val(savedData);
      }
  });

  $('.saveBtn').on('click', function () {
      const hour = $(this).closest('.time-block').attr('id').split('-')[1];
      const text = $(this).closest('.time-block').find('.description').val();
      localStorage.setItem(`hour-${hour}`, text);
  });

  // Format for the date and time
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
});

