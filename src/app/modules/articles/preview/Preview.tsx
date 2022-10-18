import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import moment from 'moment';

import { useLayout } from '../../../../_metronic/layout/core';
import { useAuth } from '../../auth';

import { getSinglePostApi } from '../../../api';
import { UserType } from '../../../constants/user/user_type';
import { KTSVG } from '../../../../_metronic/helpers';

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
      let response: any = await getSinglePostApi({ token: auth?.token, id });
      if (response && response.status === 200) {
        let arr: any = [];
        //set category array from embed data in wp
        if (response.data._embedded.hasOwnProperty('wp:term')) {
          if (response.data._embedded['wp:term'].length > 0) {
            response.data._embedded['wp:term'][0].forEach((item: any) => {
              // uncategorized tag is not displayed when user edit articles (id=1 for uncategorized)
              if (item.id != 1)
                arr.push({ label: item.name, value: item.id });
            })
          }
        }
        setPost({
          ...response.data,
          categories: arr
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='preview_title'>{decode(post?.title?.raw)}</h1>
        {auth?.user?.user_role === UserType.EDITOR && (<div className='d-flex justify-content-between align-items-center gap-3'>
          <button type='button' className='btn btn-success'>
            Publish
          </button>
          <button type='button' className='btn btn-danger'>
            Reject
          </button>
        </div>)}
      </div>
      <div className='row mt-3'>
        <div className="col-8">
          {post?.date && <div style={{ display: 'flex', alignItems: 'center', marginTop: "16px" }}>
            <i className="fa-sharp fa-solid fa-calendar" style={{ fontSize: 20, marginRight: '10px', color: '#313B54' }}></i>
            <span className='preview_date'>{moment(post?.date).format('DD MMM, YYYY')}</span>
          </div>}
          {post?.categories == null ? null : (
            <div className='preview_tags'>
              <i className="fa-solid fa-tags" style={{ fontSize: 20, marginRight: '10px', color: '#313B54' }}></i>
              {post?.categories.map((item: any, index: number) => (
                <span>
                  {item.label}&nbsp; &nbsp;
                </span>
              ))}
            </div>
          )}
          <div
            className='preview_description'
            dangerouslySetInnerHTML={{ __html: decode(post?.content?.rendered) }}
          >
          </div>
        </div>
        <div className='col-4'>

        </div>
      </div>
    </div>
  )
}

export default Preview
