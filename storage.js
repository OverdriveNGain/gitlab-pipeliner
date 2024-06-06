function pushNewBuild(build) {
    console.log('pushNewBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs');
    if (buildsJsonText == null) {
        buildsJsonText = '[]';
    }
    let buildsJson = JSON.parse(buildsJsonText);

    // TODO: add list limiting logic here;
    buildsJson.push(build);
    localStorage.setItem('gitlab-pipeline-runs', JSON.stringify(buildsJson));
    console.log('pushNewBuild complete!');
}

function fetchLatestBuild() {
    console.log('fetchLatestBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs') ?? '[]';
    let buildsJson = JSON.parse(buildsJsonText);

    let latestBuild = buildsJson.reduce((prev, current) =>
        current['unix-timestamp'] > prev['unix-timestamp'] ? current : prev
    );

    console.log(`fetchLatestBuild complete (${latestBuild.toString()})!`);
    return latestBuild;
}

function fetchMatchingBuild(pipelineNumber) {
    console.log('fetchMatchingBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs') ?? '[]';
    let buildsJson = JSON.parse(buildsJsonText);

    let latestBuild = buildsJson.find((build) => build['pipeline-number'] === pipelineNumber);

    console.log(`fetchMatchingBuild complete (${latestBuild == null ? 'none' : latestBuild.toString()})!`);
    return latestBuild;
}

function fetchAllBuilds() {
    console.log('fetchLatestBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs') ?? '[]';
    return JSON.parse(buildsJsonText);
}

function savePipelineUrlToBuild(pipelineUrl, buildUuid) {
    console.log('savePipelineUrlToBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs') ?? '[]';
    let buildsJson = JSON.parse(buildsJsonText);

    buildsJson.forEach((build) => {
        if (build.id === buildUuid) {
            build['pipeline-url'] = pipelineUrl;
            console.log(`Set pipeline-url to ${pipelinUrl}!`);
            let matches = pipelineUrl.match(/\/(\d+)\/?$/);
            if (matches !== null) {
                build['pipeline-number'] = matches[1];
                console.log(`Set pipeline-number to ${matches[1]}!`);
            } else {
                build['pipeline-number'] = null;
                console.log(`Set pipeline-number to null!`);
            }
        }
    });

    localStorage.setItem('gitlab-pipeline-runs', JSON.stringify(buildsJson));
    console.log('savePipelineUrlToBuild complete!');
}
