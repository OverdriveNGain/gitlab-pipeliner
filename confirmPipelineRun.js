function updateLatestBuildUrl() {
    console.log('updateLatestBuildUrl running...');
    let build = fetchLatestBuild();
    console.log('Latest build: ');
    console.log(JSON.stringify(build));
    savePipelineUrlToBuild(location.href, build['id']);
    console.log('updateLatestBuildUrl complete!');
}

function createConfirmRunButton() {
    let debugButton = document.createElement('button');
    debugButton.setAttribute('type', 'button');
    debugButton.textContent = 'Confirm Run Debug';
    debugButton.addEventListener('click', () => {
        confirmPipelineRun();
    });

    document.querySelector('[data-testid="pipeline-container"]')
        .parentElement
        .insertAdjacentElement('afterend', debugButton);
}

function pipelineProgressPageIsFresh() {
    console.log('pipelineProgressPageIsFresh running...');
    let repositoryName = document.querySelector('nav.breadcrumbs li:nth-last-child(3)').textContent.trim();
    // let branchName = document.querySelector('a.ref-container').text.trim();
    let latestBuild = fetchLatestBuild();

    let value = latestBuild['repository-name'] === repositoryName
        // && latestBuild['branch-name'] === branchName
        && Date.now() - latestBuild['unix-timestamp'] < 60000;
    
    // console.log(`${latestBuild['repository-name'] === repositoryName} && ${latestBuild['branch-name'] === branchName} && ${Date.now() - latestBuild['unix-timestamp'] < 600000}`);
    console.log(`${latestBuild['repository-name'] === repositoryName} && ${Date.now() - latestBuild['unix-timestamp'] < 600000}`);
    console.log(`pipelineProgressPageIsFresh complete (${value})!`);
    return value;
}

function confirmPipelineRun() {
    console.log('confirmPipelineRun running...');
    updateLatestBuildUrl();
    console.log('confirmPipelineRun complete!');
}

function pageIsPipelineProgress() {
    console.log('pageIsPipelineProgress running...');
    // createConfirmRunButton();
    let value = location.href.startsWith('https://gitlab') 
        && /\d+\/?$/.test(location.href);
    console.log(`pageIsPipelineProgress complete (${value})!`);
    return value;
}