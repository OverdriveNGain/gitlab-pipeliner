function updateLatestBuildUrl() {
    console.log('updateLatestBuildUrl running...');
    let build = fetchLatestBuild;
    savePipelineUrlToBuild(location.href, build['id']);
    console.log('updateLatestBuildUrl complete!');
}

function pipelineProgressPageIsFresh() {
    console.log('pipelineProgressPageIsFresh running...');
    let repositoryName = document.querySelector('nav.breadcrumbs li:nth-last-child(3)').textContent.trim();
    let branchName = document.querySelectorAll('[data-testid="cancel-pipeline"]');
    let latestBuild = fetchLatestBuild();

    let value = latestBuild['repository-name'] === repositoryName
        && latestBuild['branch-name'] === branchName
        && Date.now() - latestBuild['unix-timestamp'] < 15000;
    
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
    let value = location.href.startsWith('https://gitlab') 
        && /\d+\/?$/.test(location.href);
    console.log(`pageIsPipelineProgress complete (${value})!`);
    return value;
}