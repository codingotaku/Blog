fetch('https://api.lbry.tv/api/v1/proxy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "method": "resolve", "params": { "urls": "@codingotaku" } })
}).then(res => res.json()).then(res => {
    const result = res.result["@codingotaku"];
    const banner = document.getElementById('banner');
    banner.style.width = "100%";
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const thumbnail = document.getElementById('thumbnail');
    thumbnail.src = result.value.thumbnail.url;
    banner.src = result.value.cover.url;
    description.innerHTML = result.value.description;
    name.innerHTML = result.name;

    fetch('https://api.lbry.tv/api/v1/proxy?m=claim_search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "method": "claim_search", "params": { "channel_ids": [result.claim_id], "page": 1, "page_size": 100 } })
    }).then(res => res.json()).then(res => {
        const items = res.result.items;
        const listHolder = document.getElementById("list-holder");
        let columns = createElement("div", ["columns"]);
        items.forEach((item, i) => {
            if (i % 4 === 0) {
                columns = createElement("div", ["columns"]);
                listHolder.appendChild(columns);
            }
            const mediaContainer = createElement("a", ["box", "column", "is-3"]);;
            const data = createElement("p", []);
            const img = createElement("img", []);
            img.alt = item.name + "thumbnail";
            img.src = item.value.thumbnail.url;
            img.style.width = "256px";
            data.appendChild(img);

            const mediaContent = createElement("div", []);
            const title = createElement("p", ["subtitle"]);
            title.innerHTML = item.value.title;
            mediaContent.appendChild(title);
            data.appendChild(mediaContent);
            mediaContainer.appendChild(data);
            mediaContainer.href = item.permanent_url.replace("lbry://","https://lbry.tv/");
            mediaContainer.target = "_blank";
            columns.appendChild(mediaContainer); 
        });
        listHolder.appendChild(columns);
    });
});

function createElement(element, classes) {
    let tmpElement = document.createElement(element);
    tmpElement.classList.add(...classes);
    return tmpElement;
}