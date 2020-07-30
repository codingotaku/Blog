fetch('https://api.lbry.tv/api/v1/proxy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "method": "resolve", "params": { "urls": "@codingotaku" } })
}).then(res => res.json()).then(res => {
    const result = res.result["@codingotaku"];

    fetch('https://api.lbry.tv/api/v1/proxy?m=claim_search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "method": "claim_search", "params": { "channel_ids": [result.claim_id], "page": 1, "page_size": 100 } })
    }).then(res => res.json()).then(res => {
        const columns = createElement("div", ["columns"]);
        const items = res.result.items;
        let listHolder = {
            // drawing: [columns.cloneNode()],
            // privacy: [columns.cloneNode()],
            // tutorial: [columns.cloneNode()],
            // gameplay: [columns.cloneNode()],
            misc: [columns.cloneNode()]
        }
        items.forEach((item, i) => {

            let holder = listHolder['misc'];
            // console.log(item.value.tags);
            // for (let key of Object.keys(listHolder)) {
            //     if (item.value.tags.includes(key)) {
            //      holder = listHolder[key];
            //     }
            // }
            generateCard(item, holder);
        });
        for (let key of Object.keys(listHolder)) {
            // let list = document.getElementById(key+"-list-holder");
            let list = document.getElementById("misc-list-holder");
            for(let column of listHolder[key] ) {
                list.append(column);
            }
        }
    });
});

function generateCard(item, listHolder) {
    if (listHolder[listHolder.length-1].children.length >= 4) {
        let columns = createElement("div", ["columns"]);
        listHolder.push(columns);
    }
    let columns = listHolder[listHolder.length-1];
    const mediaContainer = createElement("a", ["box", "column", "is-3"]);;
    const data = createElement("p", []);
    const img = createElement("img", []);
    img.alt = item.name + "thumbnail";
    img.src = item.value.thumbnail.url;
    img.style.width = "100%";
    data.appendChild(img);

    const mediaContent = createElement("div", []);
    const title = createElement("p", ["subtitle"]);
    title.innerHTML = item.value.title;
    mediaContent.appendChild(title);
    data.appendChild(mediaContent);
    mediaContainer.appendChild(data);
    mediaContainer.href = item.permanent_url.replace("lbry://", "https://lbry.tv/");
    mediaContainer.target = "_blank";
    columns.appendChild(mediaContainer);
}
function createElement(element, classes) {
    let tmpElement = document.createElement(element);
    tmpElement.classList.add(...classes);
    return tmpElement;
}