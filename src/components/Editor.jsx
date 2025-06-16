
import React, { useEffect, useState } from 'react'
import { CgFormatText } from "react-icons/cg";
import { GrBold } from "react-icons/gr";
import { BiItalic } from "react-icons/bi";
import { FaCode, FaListOl } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { LuNotebook } from "react-icons/lu";
import { PiHighlighterBold } from "react-icons/pi";
import { MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered  } from "react-icons/md";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { ElditorFunc } from './../../node_modules/elditor-js/dist/elditor-js.esm';

import useEditor from './../hooks/useEditor'

import './editor.css'

import dragElement from '../utils/editor';

function Editor({editFieldId, imageCb}) {
  const editor = useEditor()
  const elditorFunc = new ElditorFunc()

  useEffect(() =>{
    dragElement(document.getElementById("editor"));
    editor.setEditField(editFieldId)
  }, [])

  return (
    <div id="editor" >
      <span id='editor__icon'><CgFormatText /></span>

          <div id="editor__menu">
            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatText('STRONG')}>
              <span><GrBold /></span>
              Bold Text
            </button>

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatText('EM')}>
              <span><BiItalic /></span>
              Italic Text
            </button>

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatText('U')}>
              <span><MdFormatUnderlined /></span>
              Underline Text
            </button>

            <button className="editor__menu__wrapper" onClick={() => editor.formatText('S')}>
              <span><AiOutlineStrikethrough /></span>
              Strikethrough
            </button>

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatList('UL')}>
              <span><MdFormatListBulleted  /></span>
              Bullet List
            </button>

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatList('UL')}>
              <span><MdFormatListNumbered  /></span>
              Numeric List
            </button>

            {/* <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatList('SPAN')}>
              <span><PiHighlighterBold /></span>
              Highlight Text
            </button> */}

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatBadge('info')}>
              <span><LuNotebook /></span>
              Note
            </button>

            <button className="editor__menu__wrapper" onClick={() => elditorFunc.formatBadge('nothing')}>
              <span><LuNotebook /></span>
              Remove Note
            </button>

            <label className="editor__menu__wrapper" htmlFor='editor__image' onMouseDown={(e) => e.preventDefault()}>
                <span><IoImageOutline /></span>
                Image
                <input type="file" accept='image/png, image/jpg, image/webp, image/avif, image/gif' id='editor__image' style={{display: 'none'}} onChange={(e) => editor.formatImage(e, imageCb)}/>
            </label>

            {/* <button className="editor__menu__wrapper">
              <span><FaCode /></span>
              Code
            </button> */}
          </div>
    </div>
  )
}

export default Editor