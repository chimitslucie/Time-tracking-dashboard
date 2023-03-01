fetch("http://127.0.0.1:5500/main/js/data.json")
    .then((response) => response.json())
    .then((data) => {
        const cards = document.querySelectorAll('.cards > div:not(.profil)');

        data.forEach((jsonData, index) => {
            const card = cards[index];
            const title = card.querySelector('.title');

            const timeframes = jsonData.timeframes
            
            Object.keys(timeframes).forEach((timeframeName) => {
                const timeframeData = timeframes[timeframeName];

                const current = card.querySelector(`.${timeframeName}__hour .current`);
                const previous = card.querySelector(`.${timeframeName}__text .previous`);

                current.innerHTML = timeframeData.current;
                previous.innerHTML = timeframeData.previous;
            });

            title.innerHTML = jsonData.title
        });

    });


const showOrHideText = actualFilter => {
    const hoursGlobal = document.querySelectorAll(`.data__hour`)
    const messagesGlobal = document.querySelectorAll(`.data__text`)

    hoursGlobal.forEach(hourGlobal => {
        hourGlobal.classList.remove('active');
    })

    messagesGlobal.forEach(messageGlobal => {
        messageGlobal.classList.remove('active');
    })

    const name = actualFilter.dataset.filter
    const hours = document.querySelectorAll(`.${name}__hour`)
    const messages = document.querySelectorAll(`.${name}__text`)

    hours.forEach(hour => {
        hour.classList.add('active');
    })

    messages.forEach(message => {
        message.classList.add('active');
    })
}

const actualFilter = document.querySelector('.link.active')
showOrHideText(actualFilter);

const links = document.querySelectorAll('.profil__content-links .link');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        showOrHideText(e.currentTarget)
    })
})