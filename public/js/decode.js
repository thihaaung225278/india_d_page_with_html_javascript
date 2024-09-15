// URL param
function addParam(name = null, value = null) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const PARAMS = Object.fromEntries(urlSearchParams.entries());
    let newParams = { ...PARAMS };
    newParams[name] = value; // add param
    let pushParam = `?`;
    for (const [i, [k, v]] of Object.entries(Object.entries(newParams))) {
        pushParam += `${i > 0 ? '&' : ''}${k}=${encodeURIComponent(v)}`;
    }
    window.history.replaceState(null, null, pushParam);
}

function removeParam(name) {
    Object.size = function (obj) {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    const urlSearchParams = new URLSearchParams(window.location.search);
    const PARAMS = Object.fromEntries(urlSearchParams.entries());
    if (name && PARAMS[name]) {
        let newParams = { ...PARAMS };
        delete newParams[name]; // remove param
        let pushParam = ``;
        if (Object.size(newParams)) {
            pushParam = `?`;
            for (const [i, [k, v]] of Object.entries(Object.entries(newParams))) {
                pushParam += `${i > 0 ? '&' : ''}${k}=${encodeURIComponent(v)}`;
            }
            window.history.replaceState(null, null, pushParam);
        } else {
            window.history.replaceState(null, null, window.location.pathname);
        }
    }
}

function getURLparam(param) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(param);
}


document.addEventListener('DOMContentLoaded', function () {

    let dropdownContent = document.querySelector(".dropdown-content");
    let dropdownToggle = document.querySelector(".dropdown-toggle")

    dropdownDatas.forEach(function (option) {
        dropdownContent.innerHTML += `<a data-id="${option.id}" href="#">${option.text}</a>`
    })

    let episodeContnet;
    let keyTakeawaysContent;
    let videoContent;
    let whoShouldAttendContent;

    let initId = 1;
    if (getURLparam('episode')) {
        initId = +getURLparam('episode')
        dropdownToggle.textContent = `Episode ${initId}`
    }

    renderEpisode(initId)
    keyTakeaways(initId)
    renderVideo(initId)
    renderWhoShouldAttend(initId)
    checkForNoDatas()

    // ----- render Episode -----
    function renderEpisode(id) {

        let selectedContent;

        if (dropdownDatas) {
            selectedContent = dropdownDatas.find(function (content) {
                return content.id === id
            })
        }

        if (selectedContent) {
            episodeContnet = selectedContent.episode_contents;
        }

        if (episodeContnet) {

            document.querySelector('.e_main_title').style.display = "block";
            document.querySelector('.episode .wrapper .right-content .no-image-desc').style.display = "block";
            document.querySelector('.episode .episode-container .episode-shape-text').style.display = "block";
            document.querySelector('.episode-card.left-card').style.display = "block";
            document.querySelector('.episode-card.right-card').style.display = "block";

            // episode main title 
            document.querySelector('.e_main_title').textContent = ''
            document.querySelector('.e_main_title').textContent = episodeContnet.mainTitle

            // episode description
            document.querySelector('.episode .wrapper .right-content .no-image-desc').innerHTML = ''
            document.querySelector('.episode .wrapper .right-content .no-image-desc').innerHTML = `<p>${episodeContnet.desc}</p>`

            // horizontal episode
            document.querySelector('.episode .episode-container .episode-shape-text').innerHTML = ''
            document.querySelector('.episode .episode-container .episode-shape-text').innerHTML = episodeContnet.horizontal_episode

            // episode left-card
            let leftCard = `
                <div class="img-wrapper">
                    <div class="people-image" style="background-image: url(public/images/decode/${episodeContnet.leftCard.image});"></div>
                </div>
                <div class="card-desc">
                    <div class="name">${episodeContnet.leftCard.name}</div>
                    <div class="data">${episodeContnet.leftCard.position}</div>
                    <div class="desc">${episodeContnet.leftCard.desc}</div>
                </div>
            `
            document.querySelector('.episode-card.left-card').innerHTML = leftCard

            // episode right-card
            let rightCard = `
                <div class="img-wrapper">
                    <div class="people-image" style="background-image: url(public/images/decode/${episodeContnet.rightCard.image});"></div>
                </div>
                <div class="card-desc">
                    <div class="name">${episodeContnet.rightCard.name}</div>
                    <div class="data">${episodeContnet.rightCard.position}</div>
                    <div class="desc">${episodeContnet.rightCard.desc}</div>
                </div>
            `
            document.querySelector('.episode-card.right-card').innerHTML = rightCard
        } else {
            document.querySelector('.e_main_title').style.display = "none";
            document.querySelector('.episode .wrapper .right-content .no-image-desc').style.display = "none";
            document.querySelector('.episode .episode-container .episode-shape-text').style.display = "none";
            document.querySelector('.episode-card.left-card').style.display = "none";
            document.querySelector('.episode-card.right-card').style.display = "none";
        }

    }

    // ----- render keyTakeaways -----
    function keyTakeaways(id) {

        let selectedContent;
        if (dropdownDatas) {
            selectedContent = dropdownDatas.find(function (content) {
                return content.id === id;
            })
        }

        if (selectedContent) {
            keyTakeawaysContent = selectedContent.key_takeaways;
        }

        if (keyTakeawaysContent) {
            document.querySelector('#key').style.display = "block";

            // DecodeWebinarSeries main title
            document.querySelector(".key .text-content-heading").innerHTML = ""
            document.querySelector(".key .text-content-heading").innerHTML = keyTakeawaysContent.main_title

            // DecodeWebinarSeries inner icons and contnets
            let icons_and_contents = ''
            keyTakeawaysContent.datas.forEach(data => {
                icons_and_contents += `
                    <div class="key-icon-group-wrapper">
                        <div class="key-icon-left-content">
                            <div class="icon-text-wrapper">
                                <div class="img">
                                    <img src="public/images/decode/${data.icon}" alt="${data.title}">
                                </div>
                                <div class="text">
                                    ${data.title}
                                </div>
                            </div>
                        </div>
                        <div class="key-icon-right-content">
                            ${data.desc}
                        </div>
                    </div>
                `
            })
            document.querySelector('.key .icons_and_contents_wrapper').innerHTML = ''
            document.querySelector('.key .icons_and_contents_wrapper').innerHTML = icons_and_contents;
        } else {
            document.querySelector('#key').style.display = "none";
        }



    }

    // ----- render video ------
    function renderVideo(id) {

        let selectedContent;

        if (dropdownDatas) {
            selectedContent = dropdownDatas.find(function (content) {
                return content.id === id;
            })
        }

        if (selectedContent) {
            videoContent = selectedContent.video_contents;
        }


        if (videoContent) {
            document.querySelector('#video-repository').style.display = "block"

            // main title
            document.querySelector(".video-repository .text-content-heading").innerHTML = ""
            document.querySelector(".video-repository .text-content-heading").innerHTML = videoContent.main_title

            // video (iframe)
            document.querySelector("#youtube-iframe").innerHTML = ""
            document.querySelector("#youtube-iframe").innerHTML = videoContent.datas.youtube_iframe

            // video title
            document.querySelector("#youtube_video_title").innerHTML = ""
            document.querySelector("#youtube_video_title").innerHTML = videoContent.datas.title

            // video description
            document.querySelector("#youtube_video_desc").innerHTML = ""
            document.querySelector("#youtube_video_desc").innerHTML = videoContent.datas.desc
        } else {
            document.querySelector('#video-repository').style.display = "none"
        }

    }

    // ----- render who shold attend ------
    function renderWhoShouldAttend(id) {

        let selectedContent;
        selectedContent = dropdownDatas.find(function (data) {
            return data.id === id;
        })

        if (selectedContent) {
            whoShouldAttendContent = selectedContent.who_should_attend;
        }

        if (whoShouldAttendContent) {

            document.querySelector('#who-should-attend').style.display = "block"

            // main title
            document.querySelector('.who-should-attend .heading-h3').innerHTML = ''
            document.querySelector('.who-should-attend .heading-h3').innerHTML = whoShouldAttendContent.main_title

            // description
            document.querySelector('.who-should-attend .content-wrapper .right-content .desc').innerHTML = ''
            document.querySelector('.who-should-attend .content-wrapper .right-content .desc').innerHTML = whoShouldAttendContent.desc

            // data time
            document.querySelector('.who-should-attend .registration .right .date-time').innerHTML = ''
            document.querySelector('.who-should-attend .registration .right .date-time').innerHTML = `
                <div class="title">${whoShouldAttendContent.date_time_label}</div>
                <div class="content">
                    ${whoShouldAttendContent.data_time}
                </div>
            `
            // register button
            document.querySelector('.who-should-attend .registration .right .link').innerHTML = ''
            document.querySelector('.who-should-attend .registration .right .link').innerHTML = `
                <div class="title">
                    <a target="_blank" href="${whoShouldAttendContent.register_btn_link}" style="color: white;">${whoShouldAttendContent.register_btn_label}</a>
                </div>
            `

        } else {
            document.querySelector('#who-should-attend').style.display = "none"
        }
    }

    // ----- check for Data -----
    function checkForNoDatas(id) {

        if (episodeContnet || keyTakeawaysContent || videoContent || whoShouldAttendContent) {
            document.querySelector('#error-text').style.display = "none"
        } else {
            document.querySelector("#error-text").style.display = "block"
            // alert("no data")
        }
    }


    // ********************
    // ----- Actions ------
    // ********************
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();

            let selectedText = e.target.textContent;
            let selectedId = +e.target.getAttribute('data-id')

            dropdownToggle.textContent = selectedText;
            dropdownContent.style = "none"

            addParam('episode', selectedId)

            renderEpisode(selectedId)
            keyTakeaways(selectedId)
            renderVideo(selectedId)
            renderWhoShouldAttend(selectedId)
            checkForNoDatas()

        }
    })
    document.querySelector(".dropdown").addEventListener("click", function () {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        this.classList.toggle('active')
    });
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdownContent.style.display = "none"
        }
    })
})