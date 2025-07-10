

function useEditor(editFieldId) {
    let editField;

    function setEditField(editFieldId){
        editField = document.getElementById(editFieldId)
    }

    function formatText(tagName){
        const selection = window.getSelection()
        if(!selection.rangeCount) return;
        
        const range = selection.getRangeAt(0)
        if(!editField.contains(range.startContainer)) return

        const fragment = range.extractContents()
        let wrapped;

        if(fragment.firstChild.tagName === 'P'){
            // more than 1 paragraph sleection
            console.log('multiple selection')
            wrapped = wrapManyWith(tagName, fragment)
        }else{
            // on within paragrah selection
            // find up recursicely to see if parent/grandparent has bold
            // prevent double aside tagname in 1 parent
            wrapped = wrapWith(tagName, fragment)
        }
        
        range.insertNode(wrapped)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    /**
     * 
     * @param {string} tagName 
     * @param {DocumentFragment} fragment 
     * @returns 
     */
    function wrapWith(tagName, fragment){
        const cleanNodes =removeTagRecursively(tagName, fragment)

        const tag = document.createElement(tagName)
        if(cleanNodes.tagName === 'P'){
            const newNodeElement =document.createElement('P')
            tag.innerHTML = cleanNodes.innerHTML
            newNodeElement.append(tag)
            newNodeElement.normalize()

            cleanNodes.replaceWith(newNodeElement)
            return newNodeElement
        }else{
            tag.append(fragment)
            tag.normalize()
            return tag
        }
    }

    /**
     * 
     * @param {string} tagName 
     * @param {DocumentFragment} fragment 
     */
    function wrapManyWith(tagName, fragment){
        console.log(fragment.children)
        const DF = new DocumentFragment()
        let wrapped = []

        for(const el of fragment.children){
            wrapped.push(wrapWith(tagName, el))
        }
        for(const el of wrapped){
            DF.append(el)
        }

        return DF
    }

    /**
     * 
     * @param {string} tagName 
     * @param {DocumentFragment} fragment 
     */
    function removeTagRecursively(tagName, fragment){
        const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null)

        let node;
        let toUnwwrap = []

        while(node = walker.nextNode()){
            if(node.tagName === tagName.toUpperCase()){
                toUnwwrap.push(node)
            }
        }

        for(const el of toUnwwrap){
            while(el.firstChild){
                el.parentNode.insertBefore(el.firstChild, el)
            }
            el.remove()
        }

        return fragment
    }

    // format image
    async function formatImage(event, cb){
         const selection = window.getSelection()
        // if(!selection.rangeCount) return;
        
        console.log('b')
        console.log(editField)
        const range = selection.getRangeAt(0)
        if(!editField){
            editField = document.getElementById(editFieldId)
        }
        if(!editField?.contains(range.startContainer)) return

        console.log('a')

        const fragment = range.extractContents()
        console.log(fragment)

        const img = document.createElement('img')
        img.src = URL.createObjectURL(event.target.files[0])
        img.style.width = '100%'

        const p = document.createElement('P')
        const br = document.createElement('br')
        p.append(br)


        range.insertNode(p)
        range.insertNode(img)
        range.insertNode(document.createElement('br'))

        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)


        if(cb){
            // cb time!!
            const formData = new FormData()
            formData.append('uploadImage', event.target.files[0], event.target.files[0].name)

            const {imagePath, apiDomain} = await cb(formData)
            img.src = apiDomain + '/' + imagePath
        }
    }

    return {
        setEditField,
        formatText,
        wrapWith,
        removeTagRecursively,
        formatImage
    }
}

export default useEditor