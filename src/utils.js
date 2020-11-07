const body = document.querySelector('body')

function facttoryGenericNode(tag, className = null, content = null) {
  let element = document.createElement(tag)
  element.className = className
  element.innerHTML = content
  body.append(element)
}

function recursiveChildElement(elt, parent) {
  if (elt) {
    elt.forEach(item => {
      let element = document.createElement(item.tag)
      element.className = item.className
      element.innerHTML = item.content
      parent.append(element)
      recursiveChildElement(item.child, element)
    })
  }
}

export function createdElementNode(tag, className, content) {
  let element = '';
  if (Array.isArray(tag)) {
    tag.forEach((item, i) => {
      facttoryGenericNode(item, className[i], content[i])
    })
    return
  }

  if (typeof tag === 'object') {
    let parent = document.createElement(tag.tag)
    parent.className = tag.className
    recursiveChildElement(tag.child, parent)
    body.append(parent)
    return
  }

  facttoryGenericNode(tag, className, content)
}

