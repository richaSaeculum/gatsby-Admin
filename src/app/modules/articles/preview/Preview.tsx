import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import moment from 'moment';

import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';

import { addCommentApi, deleteCommentApi, getCommentListApi, getPostListApi, getSinglePostApi, updatePostStatusApi } from '../../../api';
import { UserType } from '../../../constants/user/user_type';
import DefaultComment from '../../../components/comment';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';
import { ArticleStatusType } from '../../../constants/articles/article_status_type';


const Preview = () => {

  const param = useParams();
  const { setLoader } = useLayout();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>();
  const [commentData, setCommentData] = useState<any>([]);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [confirmationInfo, setConfirmationInfo] = useState({})

  useEffect(() => {
    const { id } = param;
    if (id) {
      previewData(id);
    }
  }, [])

  const confirmationCallback = (success: boolean, a: any) => {
    if (success) {
      handlePostStatus(a.status)
      setConfirmationOpen(false);
    }
    else {
      setConfirmationOpen(!confirmationOpen);
    }
  }

  const toggleModal = (status?: any) => {
    setConfirmationOpen(!confirmationOpen);
    if (status === 'publish') {
      setConfirmationInfo({
        action: 'confirmation',
        message: 'Do you want to approve this post? Once you approve this post it will be published.',
        status: 'publish'
      })
    } else if (status === 'reject') {
      setConfirmationInfo({
        action: 'confirmation',
        message: 'Do you want to reject this post? Once you reject this post it will be changed to draft.',
        status: 'reject'
      })
    }
  }

  const previewData = async (id: any) => {
    setLoader(true);
    try {
      let response: any = await getSinglePostApi({ id });
      if (response && response.status === 200) {
        let arr: any = [];
        //set category array from embed data in wp
        // if (response.data._embedded.hasOwnProperty('wp:term')) {
        //   if (response.data._embedded['wp:term'].length > 0) {
        //     response.data._embedded['wp:term'][0].forEach((item: any) => {
        //       // uncategorized tag is not displayed when user edit articles (id=1 for uncategorized)
        //       if (item.id != 1)
        //         arr.push({ label: item.name, value: item.id });
        //     })
        //   }
        // }
        getCommentsOnPost(response.data)
        setPost(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  const getCommentsOnPost = async (post: any) => {
    // return false
    let payload = { id: post.id };
    try {
      let response: any = await getCommentListApi({ payload });
      if (response && response.status === 200) {
        let commentList = response.data.map((comment: any) => (
          {
            userId: comment.userId,
            comId: comment.id,
            fullName: comment.username,
            avatarUrl: `https://ui-avatars.com/api/name=${comment.username}&background=random`,
            text: comment.text,
            replies: comment.replies ? comment.replies.map((replyCmt: any) => ({
              userId: replyCmt.userId,
              comId: replyCmt.id,
              fullName: replyCmt.username,
              avatarUrl: `https://ui-avatars.com/api/name=${replyCmt.username}&background=random`,
              text: replyCmt.text
            })) : []
          }))
        setCommentData(commentList);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addCommentOnPost = async (data: any) => {
    let payload = {
      "parentCommentId": data.parentOfRepliedCommentId ? data.parentOfRepliedCommentId : data.repliedToCommentId,
      "commentId": data.comId,
      "postId": post?.id,
      "userId": data.userId,
      "text": data.text
    }
    try {
      let response: any = await addCommentApi({ payload });
      if (response && response.status === 200)
        getCommentsOnPost(post)
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  const deleteCommentOnPost = async (data: any) => {
    setLoader(true);
    try {
      let response: any = await deleteCommentApi({ id: data.comIdToDelete });
      if (response && response.status === 200)
        getCommentsOnPost(post)
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  const handlePostStatus = async (status: any) => {
    setLoader(true)
    try {
      let payload = { id: post.id, status }
      let response = await updatePostStatusApi({ payload })
      if (response && response.status === 200) {
        previewData(post.id);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }
  }

  return (
    <>
      {confirmationOpen && <ConfirmationModal
        open={confirmationOpen}
        confirmationInfo={confirmationInfo}
        onClose={() => { setConfirmationOpen(false) }}
        handleConfirmationMessage={confirmationCallback}
      />}
      <div className='container'>
        <div className='row'>
          <div className="col-8">
            <h1 className='preview_title'>{decode(post?.title)}</h1>
            {post?.created_on && <div style={{ display: 'flex', alignItems: 'center', marginTop: "16px", marginBottom: "16px" }}>
              <i className="fa-sharp fa-solid fa-calendar" style={{ fontSize: 20, marginRight: '10px', color: '#313B54' }}></i>
              <span className='preview_date'>{moment(post?.created_on).format('DD MMM, YYYY')}</span>
            </div>}
            {post?.categories == null ? null : (
              <div className='preview_tags'>
                <i className="fa-solid fa-tags" style={{ fontSize: 20, marginRight: '10px', color: '#313B54' }}></i>
                {post?.categories.map((item: any, index: number) => (
                  <span key={index}>
                    {item.category}&nbsp; &nbsp;
                  </span>
                ))}
              </div>
            )}
            <div
              className='preview_description'
              dangerouslySetInnerHTML={{ __html: decode(post?.content) }}
            >
            </div>
          </div>
          <div className='col-4'>
            {auth?.user?.user_role === UserType.EDITOR && post?.status === ArticleStatusType.PENDING && (<div className='d-flex justify-content-end align-items-center gap-3'>
              <button type='button' className='btn btn-success' onClick={() => toggleModal('publish')}>
                Approve
              </button>
              <button type='button' className='btn btn-danger' onClick={() => toggleModal('reject')}>
                Reject
              </button>
            </div>)}
            {
              auth?.user?.user_role !== UserType.ADMINISTRATOR && (post?.status === ArticleStatusType.PENDING || post?.status === ArticleStatusType.REJECT) && (<DefaultComment
                currentUser={{
                  currentUserId: auth?.user?.user_id || '',
                  currentUserImg: `https://ui-avatars.com/api/name=${auth?.user?.user_name}&background=random`,
                  currentUserProfile: "",
                  currentUserFullName: auth?.user?.user_name || '',
                }}
                commentData={commentData}
                logIn={{
                  loginLink: 'http://localhost:3001/',
                  signupLink: 'http://localhost:3001/'
                }}
                onSubmitAction={addCommentOnPost}
                onDeleteAction={deleteCommentOnPost}
                onEditAction={addCommentOnPost}
                onReplyAction={addCommentOnPost}
                // currentData={(data: any) => {
                //   console.log('curent data', data)
                // }}
                hideCommentInput={auth?.user?.user_role === UserType.AUTHOR}
                removeEmoji={true}
              />)
            }
          </div>
        </div>
        <button className='btn btn-secondary' onClick={() => { navigate(-1) }}>
          Back
        </button>
      </div>
    </>

  )
}

export default Preview

// const data = [
//   {
//     userId: '01a',
//     comId: '012',
//     fullName: 'Riya Negi',
//     avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
//     userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//     text: 'Hey, Loved your blog! ',
//     replies: [
//       {
//         userId: '02a',
//         comId: '013',
//         userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//         fullName: 'Adam Scott',
//         avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
//         text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
//       },
//       {
//         userId: '01a',
//         comId: '014',
//         userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//         fullName: 'Riya Negi',
//         avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
//         text: 'thanks!😊'
//       }
//     ]
//   }
// ]