function overviewCut(overview, length){
    return overview?.length > length ? overview.substring(0, length) + '...': overview
}

export default overviewCut