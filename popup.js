function fetchAllBuilds() {
    console.log('fetchLatestBuild running...');
    let buildsJsonText = localStorage.getItem('gitlab-pipeline-runs') ?? '[]';
    return JSON.parse(buildsJsonText);
}

function insertPopupData() {
    console.log('insertPopupData running...');
    let buildsJson = fetchAllBuilds();
    
    for (let build of buildsJson) {

        let repositoryName = build['repository-name'];
        let branchName = build['branch-name'];
        let variables = build['variables'];
        let timestamp = build['timestamp'];
        let unixTimestamp = build['unix-timestamp'];
        let pipelineUrl = build['pipeline-url'];

        let li = document.createElement('li');
        
        li.appendChild(document.createElement('p').appendChild(document.createTextNode(repositoryName)));

        let info = document.createElement('ul');

        info.appendChild(document.createElement('li').appendChild(document.createTextNode(branchName)));
        info.appendChild(document.createElement('li').appendChild(document.createTextNode(timestamp)));

        let configUl = document.createElement('ul');
        for (let vars of variables) {
            configUl.appendChild(document.createElement('li').appendChild(document.createTextNode(`${vars[0]}: ${vars[1]}`)));
        }

        info.appendChild(document.createElement('li').appendChild(configUl));

        li.appendChild(info);

        document.querySelector('body').appendChild(li);
    }

    let p = document.createElement('p');
    p.innerText = 'Done!';
    document.querySelector('body').appendChild(p);
}

insertPopupData();