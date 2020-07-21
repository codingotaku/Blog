import { allVideos } from '/data/videos.js';

export class VidGen {
    constructor() {

    }
    generateTypes() {
        const cardHolder = document.getElementById('card-holder');
        // Get all available blog types and create row for each
        allVideos.forEach((videoType) => {
            // Add title for blog type
            const type = this.createElement('div', ['box', 'tile', 'is-ancester']);
            const button = this.createElement('a', ['button', 'is-primary', 'is-outlined', 'tile', 'is-2']);
            const subtitle = this.createElement('p', ['tile']);
            button.innerHTML = 'Watch ' + videoType.type;
            button.href = '/pages/videos/type/?type=' + videoType.type;
            subtitle.innerHTML = '&nbsp;' + videoType.desc;
            type.appendChild(button);
            type.appendChild(subtitle);
            cardHolder.appendChild(type);
        });
    }

    generateVideoCards(val) {

        const cardHolder = document.getElementById('card-holder');
        // Get all available blog types and create row for each
        const videoType = allVideos.find(types => types.type === val);
        if (!videoType) {
            return false;
        }
        let columns = this.createElement('div', ['columns']);
        // Add title for blog type
        const type = this.createElement('div', ['title', 'has-text-dark']);
        type.innerHTML = videoType.type;
        cardHolder.appendChild(type);

        // Create a card for each blog
        videoType.videos.forEach((video, i) => {
            if (i % 3 === 0) {
                cardHolder.appendChild(columns);
                columns = this.createElement('div', ['columns', 'is-vertical']);
            }
            this.generateCard(video, columns);
        });

        // Append all blogs
        cardHolder.appendChild(columns);
        return true;
    }

    generateCard(video, columns) {
        const column = this.createElement('div', ['column', 'is-4']);
        const card = this.createElement('article', ['box']);
        const iframe = this.createElement('iframe', ['box']);
        const button = this.createElement('a', ['button', 'is-primary', 'is-outlined', 'is-4', 'column']);
        button.innerHTML = 'Download';
        button.href= 'https://lbry.tv/$/download/'+video.url;
        iframe.src = 'https://lbry.tv/$/embed/' + video.url;
        iframe.setAttribute('allowfullscreen', 'true')
        iframe.width="100%"
        iframe.onload= ()=>{
            console.log(iframe.scrollWidth);
            iframe.height=iframe.scrollWidth * 0.75 + 'px';
        }
        console.log(iframe)
        card.appendChild(iframe);

        const cardContent = this.createElement('div', ['card-content']);
        const content = this.createElement('div', ['content','columns']);
        const title = this.createElement('span', ['column']);

        title.innerHTML = video.title+'&nbsp;';
        content.appendChild(title);
        content.appendChild(button);
        

        cardContent.appendChild(content);
        card.appendChild(cardContent);
        column.appendChild(card);
        columns.appendChild(column);
    }

    createElement(element, classes) {
        let tmpElement = document.createElement(element);
        tmpElement.classList.add(...classes);
        return tmpElement;
    }
}

