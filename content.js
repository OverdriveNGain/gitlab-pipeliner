if (pageIsPipelineConfigs()) {
    attachConfigWatchers();
}
else if (pageIsPipelineProgress()) {
    if (pipelineProgressPageIsFresh())
        confirmPipelineRun();
    attemptInjectionConfig();
}
