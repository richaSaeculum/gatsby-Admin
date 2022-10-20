import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import moment from 'moment';

import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';

import { getSinglePostApi } from '../../../api';
import { UserType } from '../../../constants/user/user_type';
import DefaultComment from '../../../components/comment';

const Preview = () => {

  const param = useParams();
  const { setLoader } = useLayout();
  const { auth } = useAuth();
  const [post, setPost] = useState<any>();

  useEffect(() => {
    const { id } = param;
    if (id) {
      previewData(id);
    }
  }, [])

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
        setPost(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  return (
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
                <span>
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
          {auth?.user?.user_role === UserType.EDITOR && (<div className='d-flex justify-content-end align-items-center gap-3'>
            <button type='button' className='btn btn-success'>
              Publish
            </button>
            <button type='button' className='btn btn-danger'>
              Reject
            </button>
          </div>)}
          <DefaultComment
            currentUser={{
              currentUserId: '01a',
              currentUserImg:
                'https://ui-avatars.com/api/name=Riya&background=random',
              currentUserProfile:
                'https://www.linkedin.com/in/riya-negi-8879631a9/',
              currentUserFullName: 'Riya Negi'
            }}
            commentData={data}
            logIn={{
              loginLink: 'http://localhost:3001/',
              signupLink: 'http://localhost:3001/'
            }}
            onSubmitAction={(data: {
              userId: string
              comId: string
              avatarUrl: string
              userProfile?: string
              fullName: string
              text: string
              replies: any
              commentId: string
            }) => console.log('check submit, ', data)}
            currentData={(data: any) => {
              console.log('curent data', data)
            }}
            hideCommentInput={true} />
        </div>
      </div>
    </div>
  )
}

export default Preview

const data = [
  {
    userId: '01a',
    comId: '012',
    fullName: 'Riya Negi',
    avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
    text: 'Hey, Loved your blog! ',
    replies: [
      {
        userId: '02a',
        comId: '013',
        userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        fullName: 'Adam Scott',
        avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
        text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
      },
      {
        userId: '01a',
        comId: '014',
        userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
        fullName: 'Riya Negi',
        avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
        text: 'thanks!😊'
      }
    ]
  },
  {
    userId: '02b',
    comId: '017',
    fullName: 'Lily',
    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
    text: 'I have a doubt about the 4th point🤔',
    avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
    replies: []
  }
]