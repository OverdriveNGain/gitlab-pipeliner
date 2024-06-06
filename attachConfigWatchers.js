function getPipelineVariableList() {
    console.log('getPipelineVariableList running...');
    let variableList = [];

    document.querySelectorAll('[data-testid="ci-variable-row-container"]') 
        .forEach((row) => {
            let variableName = row.querySelector(':scope > div input').value;
            let valueElement = row.querySelector(':scope > div > :nth-child(3)');
            let variableValue = null;

            let valueElementHolder = null;
            if ((valueElementHolder = valueElement.querySelector(':scope > button > span')) !== null) {
                variableValue = valueElementHolder.textContent.trim();
            }
            else if (valueElement.nodeName.toLowerCase() === 'textarea') {
                variableValue = valueElement.value;
            }

            variableList.push([variableName, variableValue])
        });
    
    console.log(`getPipelineVariableList complete (${variableList.toString()})!`);
    return variableList;
}

function getTimestampText() {
    console.log('getTimestampText running...');
    const date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleString('en-US', options);
    console.log(`getTimestampText complete (${timeString})!`);
    return timeString;
}

function watchRunPipelinePress() {
    console.log('watchRunPipelinePress running...');
    let runPipelineButton = document.querySelector('[data-testid="run-pipeline-button"]');

    runPipelineButton.addEventListener('click', () => {
        runPipelineOnClick();
    });
    console.log('watchRunPipelinePress complete!');
}

function createFakeRunPipelineButton() {    
    let debugButton = document.createElement('button');
    debugButton.setAttribute('type', 'button');
    debugButton.textContent = 'Run Pipeline Debug';
    debugButton.addEventListener('click', () => {
        runPipelineOnClick();
    });

    document.querySelector('[data-testid="run-pipeline-button"]')
        .parentElement
        .insertAdjacentElement('afterend', debugButton);
}

function createViewBuildsButton() {
    let debugButton = document.createElement('a');
    debugButton.setAttribute('href', `extension://${chrome.runtime.id}/allBuilds.html`);
    debugButton.textContent = 'View Builds Debug';

    document.querySelector('[data-testid="run-pipeline-button"]')
        .parentElement
        .insertAdjacentElement('afterend', debugButton);
}

function runPipelineOnClick() {
    console.log('runPipelineButton click running...');

    let repositoryName = document.querySelector('nav.breadcrumbs li:nth-last-child(3)').textContent.trim();
    let branchName = document.querySelector('.ref-selector button').textContent.trim();
    let variablesMap = getPipelineVariableList();
    let ranOn = getTimestampText();
    let unixTimestamp = Date.now();

    let dataMap = {
        'id': Date.now().toString() + '-' + (Math.floor(Math.random() * 10000000000) + 1).toString(),
        'repository-name': repositoryName,
        'branch-name': branchName,
        'variables': variablesMap,
        'timestamp': ranOn,
        'unix-timestamp': unixTimestamp,
        'pipeline-url': null,
        'pipeline-number': null,
    };

    pushNewBuild(dataMap);
    console.log('runPipelineButton click complete!');
}

function attachConfigWatchers() {
    console.log('attachConfigWatchers running...');
    watchRunPipelinePress();
    // createFakeRunPipelineButton();
    // createConfirmRunButton();
    // createViewBuildsButton();
    console.log('attachConfigWatchers complete!');
}

function pageIsPipelineConfigs() {
    console.log('pageIsPipelineConfigs running...');
    let h1 = document.querySelector('h1');
    if (h1 == null)
        return null;
    let value = h1.textContent !== null && h1.textContent.trim() === 'Run pipeline';
    console.log(`pageIsPipelineConfigs complete (${value})!`);
    return value;
}