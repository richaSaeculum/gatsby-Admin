import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { GlobalContext } from '../../context/Provider'
import RegularInput from './RegularInput'
import AdvancedInput from './AdvancedInput'
import './InputField.scss'

interface InputFieldProps {
  formStyle?: object
  comId?: string
  fillerText?: string
  parentId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
}

const InputField = ({
  formStyle,
  comId,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv
}: InputFieldProps) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(GlobalContext)

  const editMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onEdit(textToSend, comId, parentId),
      globalStore.onEditAction &&
      (await globalStore.onEditAction({
        userId: globalStore.currentUserData.currentUserId,
        comId: comId,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfEditedCommentId: parentId
      }))
    )
  }

  const replyMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onReply(textToSend, comId, parentId),
      globalStore.onReplyAction &&
      (await globalStore.onReplyAction({
        userId: globalStore.currentUserData.currentUserId,
        repliedToCommentId: comId,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfRepliedCommentId: parentId
      }))
    )
  }
  const submitMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      await globalStore.onSubmit(textToSend),
      globalStore.onSubmitAction &&
      (await globalStore.onSubmitAction({
        userId: globalStore.currentUserData.currentUserId,
        comId: '',
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        replies: []
      }))
    )
  }

  const handleSubmit = async (event: any, advText?: string) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    mode === 'editMode'
      ? editMode(advText)
      : mode === 'replyMode'
        ? replyMode(advText)
        : submitMode(advText)
    setText('')
  }

  return (
    <div>
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comId={comId}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
        />
      ) : (
        <RegularInput
          formStyle={formStyle}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comId={comId}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
        />
      )}
    </div>
  )
}
export default InputField
