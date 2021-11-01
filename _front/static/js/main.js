tippy('[data-tippy-content]', {
  trigger: 'click',
  placement: 'right',
  allowHTML: true,
});

// дропдаун в боковом меню
$('.submenu__link').on('click', function (e) {
 e.preventDefault();
 $(this).parents('.submenu').toggleClass('submenu--active');
 $(this).children('.submenu__icon-arrow').toggleClass('submenu__icon-arrow--transform');
 $(this).next('.submenu__content').slideToggle();
});

// глобальный скрипт для коллапса
$(function() {
  $('.collapse__header').on('click', function() {
    const $this = $(this);
    const $rootContainer = $this.closest('.collapse');
    const isMultiple = $rootContainer.data('multiple');
    if(!isMultiple) {
      if (!$this.hasClass('collapse--active')) {
        $('.collapse__content').slideUp(400);
        $('.collapse__header').removeClass('collapse--active');
      }
    }
    $this.toggleClass('collapse--active');
    $this.next().slideToggle();
  });
});

// глобальный скрипт для по закрытию всего и открытию сегодняшнего дня
$(window).on('click', function (e) {
  let elemIsButton = $(e.target).prop('tagName') === 'BUTTON';
  if(elemIsButton) {
    let data = $(e.target).data();
    if(data.type && data.close === 'all') {
      const $collapseHeaders = $(`.collapse[data-type='${data.type}'] .collapse__header`);
      $collapseHeaders.each(function () {
        $(this).removeClass('collapse--active');
        $(this).next().slideUp();
      });
    }
    if(data.type && data.open === 'today') {
      const $collapseHeaders = $(`.collapse[data-type='${data.type}'] .collapse__header`);
      $collapseHeaders.each(function () {
        if($(this).data('open')) {
          $(this).addClass('collapse--active');
          $(this).next().slideDown();
        } else {
          $(this).removeClass('collapse--active');
          $(this).next().slideUp();
        }
      });
    }
  }
});

//глобальный стиль для дропдауна
$('.dropdown-trigger').hover(function () {
  $(this).find('.dropdown-arrow').stop(true, true).toggleClass('dropdown-arrow--rotate');
  $(this).find('.dropdown-content').stop(true, true).fadeToggle(400);
});

//табы
$('.js-tabs__link').on('click', function () {
  $(this).closest('.js-tabs').find($('.js-tabs__link')).removeClass('js-tabs__link--active');
  $(this).addClass('js-tabs__link--active');
  $(this).closest('.js-tabs').find($('.js-tabs__tab')).removeClass('js-tabs__tab--active');
  $(this).closest('.js-tabs')
         .find($('.js-tabs__tab')[$('.js-tabs__link')
         .index($(this))]).addClass('js-tabs__tab--active');
});

//stop bubbling
$('.collapse__actions-item').on('click', function (e) {
  e.stopPropagation();
});

// переключатель при добавление элемента или курса
$('.elems-course__item').on('change', function (e) {
  const $parentContainer = $('.elems-course .elems-course__item');
  $parentContainer.each(function (i, elem) {
    $(elem).removeClass('elems-course__item--active');
  })
  $(this).addClass('elems-course__item--active');
});

// ЧАТ

// поиск в чате
const $userItems = $('.user-list__user');
$('#chat-search').on('keyup', function () {
  const value = $(this).val().toLowerCase();
  $userItems.filter(function () {
    $(this).toggle($(this).find('.user__name').text().toLowerCase().includes(value));
  });
});

// Открытие/закрытие чата
const chatTrigger = $('.icon__chat');
chatTrigger.on('click', function () {
  if($(this).hasClass('toolbar__icon--active')) {
    chatTrigger.removeClass('toolbar__icon--active');
    $('.chat').fadeOut();
  } else {
    $(this).addClass('toolbar__icon--active');
    $('.chat').fadeIn();
  }
});

$('.chat__close').on('click', function () {
  chatTrigger.removeClass('toolbar__icon--active');
  $('.chat').fadeOut();
});


// Выбор чата
$('.user-list__user').on('click', function () {
  const dataUser = $(this).data('user');
  const chat = $(`*[data-chat="${dataUser}"]`);
  const messageList = chat.find('.message-list');
  const userName = $(this).find('.user__name').text();
  const userType = $(this).find('.user__type').text();
  const userPhoto = $(this).find('.user__avatar').attr('src');
  const currentActiveUser = $('.chat__messages-header .user');

  $('.user-list__user').each((idx, item) => {
    $(item).removeClass('user-list__user--active');
  });
  $(this).addClass('user-list__user--active');

  $('.message-list-wrapper').each((idx, item) => {
    $(item).hide();
  });
  chat.show();
  messageList.scrollTop(messageList.height());

  currentActiveUser.find('.user__name').text(userName);
  currentActiveUser.find('.user__type').text(userType);
  currentActiveUser.find('.user__avatar').attr('src', userPhoto);

  currentActiveUser.css('display', 'flex');
  $('.message-form').css('display', 'flex');
});

$('.message-form').on('submit', function (e) {
  e.preventDefault();
  const messageText = $(this).find('textarea').val();
  console.log(messageText)
  if(messageText) {
    const messageTemplate = `
      <div class="message message--my">
        ${messageText}
        <time class="message__time">22:22</time>
      </div>
    `
    const messageList = $('.message-list-wrapper:visible .message-list');
    messageList.append(messageTemplate);
    messageList.scrollTop(messageList.height());
    $(this).find('textarea').val('');
  }
});

