function attemptFetchMatchingBuild() {
    console.log('attemptFetchMatchingBuild running...');

    let pipelineNumber = location.href.match(/\/(\d+)\/?$/)[1];
    let build = fetchMatchingBuild(pipelineNumber);

    console.log(`attemptFetchMatchingBuild complete (${build.toString()})!`);
    return build;
}

async function injectBuildConfigData(build) {
    console.log('injectBuildConfigData running...');

    let tabElement = document.querySelector('div.tabs');

    let h2Element = document.createElement('h2');
    h2Element.textContent = 'Pipeline Parameters';

    let retries = 5;
    let cooldown = 2000;

    while (tabElement === null && retries > 0) {
        retries--;
        await new Promise(resolve => setTimeout(resolve, cooldown));
        tabElement = document.querySelector('div.tabs');
    }

    tabElement.insertAdjacentElement('beforeend', h2Element);

    if (tabElement) {
        let ul = document.createElement('ul');
        for (let keyValue of build['variables']) {
            let key = keyValue[0];
            let value = keyValue[1];

            if (!key || !value)
                continue;

            let li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            ul.appendChild(li);
        }
        tabElement.insertAdjacentElement('beforeend', ul);
    }
}

function attemptInjectionConfig() {
    console.log('attemptInjectionConfig running...');

    let build = attemptFetchMatchingBuild();

    console.log(build);

    if (build !== null) {
        injectBuildConfigData(build);
    }

    console.log('attemptInjectionConfig complete!');
}