

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let isMove = false;
  const target = document.getElementById('editor__target')

  
  document.getElementById(elmnt.id + "__icon").onclick = handleClick
  document.getElementById(elmnt.id + "__icon").onmousedown = dragMouseDown;
  document.getElementById(elmnt.id + "__icon").ontouchstart = dragMouseDownMobile;

  // elmnt.onclick = handleClick

  function dragMouseDown(e) {
    e.preventDefault();
    isDragging = true
    isMove = false
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault()
    if(!isDragging) return;
    isMove = true
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    let top = elmnt.offsetTop - pos2;
    let left = elmnt.offsetLeft - pos1;

    top = top < -16 ? -16 : top
    left = left < -20 ? -16 : left
    elmnt.style.top = top + "px";
    elmnt.style.left = left < target.clientWidth-16? left + "px": target.clientWidth-16 + 'px';

    const menu = document.getElementById('editor__menu')
    if(menu){
      if(left - menu.clientWidth*4/5 <= 0){
        menu.style.right = -menu.clientWidth - 10 + 'px'
      }else if(menu.clientWidth*4/5 + left < target.clientWidth){
        menu.style.right = '45px'
      }

      if(menu.clientHeight + top <= window.innerHeight){
        menu.style.top = 0
      }else if(menu.clientHeight*1 + top > window.innerHeight){
        menu.style.top = -menu.clientHeight + 40 + 'px'
      }
    }
  }

  function dragMouseDownMobile(e){
    e.preventDefault();
    isDragging = true
    isMove = false
    // get the mouse cursor position at startup:
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    document.ontouchend = handleClick
    // call a function whenever the cursor moves:
    document.ontouchmove = elementDragMobile;
  }

  function elementDragMobile(e) {
    if(!isDragging) return;
    isMove = true
    // e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    // set the element's new position:
    let top = elmnt.offsetTop - pos2;
    let left = elmnt.offsetLeft - pos1;

    top = top < -16 ? -16 : top
    left = left < -20 ? -16 : left
    elmnt.style.top = top + "px";
    elmnt.style.left = left < target.clientWidth-16? left + "px": target.clientWidth-16 + 'px';

    const menu = document.getElementById('editor__menu')
    if(menu){
      if(left - menu.clientWidth*4/5 <= 0){
        menu.style.right = -menu.clientWidth - 10 + 'px'
      }else if(menu.clientWidth*4/5 + left < target.clientWidth){
        menu.style.right = '45px'
      }

      if(menu.clientWidth*2.2 + top > window.innerHeight){
        menu.style.top = -menu.clientHeight + 40 + 'px'
      }else if(menu.clientWidth*2.2 + top <= window.innerHeight){
        menu.style.top = 0
      }
    }
  }

  function closeDragElement(e) {
    if (isMove) {
      isMove = false
      isDragging = false
      e.preventDefault();
      e.stopPropagation();
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;

    document.ontouchend = null;

  }

  function handleClick(e){
    if(!isDragging) return
    if(isMove && isDragging){
      e.preventDefault();
      e.stopPropagation();
      isMove = false
      isDragging = false
      return
    }

    const menu = document.getElementById('editor__menu')
    if(menu.style.display === 'block'){
      menu.style.display = 'none'
    }else{
      menu.style.display = 'block'
    }

    if(elmnt.offsetLeft - menu.clientWidth*4/5 <= 0){
      menu.style.right = -menu.clientWidth - 10 + 'px'
    }else if(elmnt.offsetLeft - menu.clientWidth*4/5 < target.clientWidth){
      menu.style.right = '45px'
    }

    if(menu.clientHeight*1 + elmnt.offsetTop > window.innerHeight){
      menu.style.top = -menu.clientHeight + 40 + 'px'
    }else if(menu.clientHeight*1 + elmnt.offsetTop <= window.innerHeight){
      menu.style.top = 0
    }

    isDragging = false
    isMove = false
  }
}

export default dragElement

