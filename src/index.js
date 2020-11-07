let element = null

function facttoryGenericNode(tag, className=null, content=null, parent) {
  element = document.createElement(tag)
  element.className = className
  element.innerHTML = content
  parent.append(element)
}

function recursiveChildElement(elt, parent) {
  if (elt) {
    elt.forEach(item => {
      facttoryGenericNode(item.tag, item.className, item.content, parent)
      recursiveChildElement(item.child, element)
    })
  }
}

function createdElementNode(tag, className, content) {
  const body = document.querySelector('body')
  if(Array.isArray(tag)) {
    tag.forEach((item, i) => {
      facttoryGenericNode(item, className[i], content[i], body)
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

  facttoryGenericNode(tag, className, content, body)
  return
}

function removeElementNode(className) {
  if (document.querySelector(`.${className}`)) {
    document.querySelector(`.${className}`).remove()
  }
}

setInterval(() => {
  const date = new Date()

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDay();

  removeElementNode('wrapper')
  createdElementNode(
    {
      tag: 'div',
      className: 'wrapper',
      content: '',
      child: [
        {
          tag: 'div',
          className: 'select-day times',
          content: day + 'j',
          child: []
        },
        {
          tag: 'div',
          className: 'select-hours times',
          content: hours === 0 ? '00h' : hours + 'h',
          child: []
        },
        {
          tag: 'div',
          className: 'select-minutes times',
          content: minutes === 0 ? '00mn' : minutes + 'mn',
          child: []
        },
        {
          tag: 'div',
          className: 'select-seconds times',
          content: seconds === 0 ? '00s' : seconds + 's',
          child: []
        }
      ]
    }
  )
}, 1000)




