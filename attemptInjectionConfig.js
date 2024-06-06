function attemptFetchMatchingBuild() {
    console.log('attemptFetchMatchingBuild running...');

    let pipelineNumber = location.href.match(/\/(\d+)\/?$/)[1];
    let build = fetchMatchingBuild(pipelineNumber);

    console.log(`attemptFetchMatchingBuild complete (${build == null ? 'none' : build.toString()})!`);
    return build;
}

async function injectBuildConfigData(build) {
    console.log('injectBuildConfigData running...');

    let tabElement = document.querySelector('div.tabs');

    let h2Element = document.createElement('h2');
    h2Element.textContent = 'Pipeline Parameters';

    tabElement.insertAdjacentElement('beforeend', h2Element);

    if (tabElement) {
        let ul = document.createElement('ul');
        for (let keyValue of build['variables']) {
            let key = keyValue[0];
            let value = keyValue[1];

            if (!key)
                continue;

            let li = document.createElement('li');
            
            let span1 = document.createElement('span');
            span1.textContent = key;
            li.appendChild(span1);
            li.appendChild(document.createTextNode(': '));

            let span2 = document.createElement('span');
            span2.style.color = 'red';
            span2.textContent = value;
            li.appendChild(span2);

            ul.appendChild(li);
        }
        tabElement.insertAdjacentElement('beforeend', ul);
    }
}

function latestBuildHasNoLink() {
    console.log('latestBuildHasNoLink running...');
    let latestBuild = fetchLatestBuild();
    let value = latestBuild['pipeline-url'] == null;
    console.log(`latestBuildHasNoLink complete (${value})!`);
    return value;
}

function attemptInjectionConfig() {
    console.log('attemptInjectionConfig running...');

    let build = attemptFetchMatchingBuild();

    if (build != null) {
        console.log(`Found matching build: ${build.toString()}`);
        injectBuildConfigData(build);
    }

    console.log('attemptInjectionConfig complete!');
}