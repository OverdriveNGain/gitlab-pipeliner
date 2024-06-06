async function main(){
    while (document.readyState !== 'complete') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (pageIsPipelineConfigs()) {
        attachConfigWatchers();
    }
    else if (pageIsPipelineProgress()) {
        if (latestBuildHasNoLink() && pipelineProgressPageIsFresh())
            confirmPipelineRun();
        attemptInjectionConfig();
    }
}

main();
