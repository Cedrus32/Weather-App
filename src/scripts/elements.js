const template = function(type) {
    let nodeTree = document.getElementById(type).content.cloneNode(true);
    return nodeTree;
}

export default template;