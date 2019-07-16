fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=prezli&api_key=9fa00df2316f7ea0bc4fd2a2183e1ecb&limit=1&format=json")
    .then(response => {
    if (response.ok) {
    return response.json()
        .then(response => {
        console.log(response);

    const listening = document.createElement('div');
    listening.classList.add('db-ns', 'dn', 'listening');

    const track = response.recenttracks.track[0];
    const line = '\u2014';
    const imageUrl = track.image[2]['#text'];
    const artistAndTitle = track.artist['#text'] + " " + line + " " + track.name.toUpperCase();

    const image = document.createElement('img');
    image.classList.add('albumImage');
    image.src = imageUrl;

    if(imageUrl === ""){
        image.setAttribute("src", "img/default.jpg");
    }

    if (response.recenttracks.track.length > 1) {
        const currentlyListening = document.createElement('div');
        currentlyListening.classList.add('wow', 'fadeIn', 'currentlyListening');

        const currentlyListening_info = document.createElement('div');
        currentlyListening_info.classList.add('currentlyListening_info');

        const listeningText = document.createElement('h1');
        listeningText.textContent = "What I'm listening to now:";

        const artistAndTitleText = document.createElement('div');
        artistAndTitleText.classList.add('title');
        artistAndTitleText.textContent = artistAndTitle;

        currentlyListening_info.append(listeningText, artistAndTitleText);

        currentlyListening.append(image, currentlyListening_info);

        listening.appendChild(currentlyListening);
    }

    else {
        const notListening = document.createElement('div');
        notListening.classList.add('wow', 'fadeIn', 'notListening');

        const notListening_info = document.createElement('div');
        notListening_info.classList.add('notListening_info');

        const notListeningText = document.createElement('h1');
        notListeningText.textContent = "What I was listening to recently:";

        const artistAndTitleText = document.createElement('div');
        artistAndTitleText.classList.add('title');
        artistAndTitleText.textContent = artistAndTitle;

        notListening_info.append(notListeningText, artistAndTitleText);

        notListening.append(image, notListening_info);

        listening.appendChild(notListening);

    }

    document.body.appendChild(listening);

});
}
return response.json().then(error => console.log('Error: ' + error));
});