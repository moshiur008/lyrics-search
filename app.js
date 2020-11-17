
let apiUrl = 'https://api.lyrics.ovh';

document.getElementById('searchButton').addEventListener('click', function(){
    document.getElementById('singleResult').innerHTML = ' ';
    let songName = document.getElementById('songName').value;
    fetch(`${apiUrl}/suggest/${songName}`)
    .then(res => res.json())
    .then(lyrics => {

        for(let i = 0; i < 5; i++){
            let title = lyrics.data[i].title
            let newDiv = document.createElement('div');
            let artist = lyrics.data[i].artist.name;
            let album = lyrics.data[i].album.title
            newDiv.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${title}</h3>
                <p id="author-${i}" class="author lead">${album} by <span id="artist-${i}" class="artist">${artist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button id="lyrics-${i}" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`
        document.getElementById('singleResult').appendChild(newDiv)
        document.getElementById(`lyrics-${i}`).addEventListener('click', function(){
            document.getElementById('artistName').innerText = artist;
            document.getElementById('songTitle').innerText = title;
            
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then(res => res.json())
            .then(data => {
                let mainLyrics = data.lyrics;
                console.log(data)
                document.getElementById('songLyrics').innerText = mainLyrics;
            })
        })
        }

    })
})