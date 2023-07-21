export default {
    mergeProps,
    mergePropsReference
};

function mergePropsReference(obj : object, obj2 : object) : void {
    for(const key in obj){
        if(obj2[key]) obj[key] = obj2[key];
    };
};

function mergeProps(obj : object, obj2 : object) : object {
    const clone : object = Object.assign({}, obj);
    mergePropsReference(clone, obj2);
    return clone;
};