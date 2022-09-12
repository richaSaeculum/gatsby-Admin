import { decode } from 'html-entities';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../../_metronic/layout/core';
import { getSinglePostApi } from '../../../api';
import { useAuth } from '../../auth';

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
        console.log(post)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className='container'>
      <h1 className='preview_title'>{decode(post?.title?.raw)}</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "16px" }}>
        <i className="fa-sharp fa-solid fa-calendar" style={{ fontSize: 20, marginRight: '10px', color:'#313B54' }}></i>
        <span className='preview_date'>{moment(post?.date).format('DD MMM, YYYY')}</span>
      </div>
      {post?.categories == null ? null : (
        <div className='preview_tags'>
          <i className="fa-solid fa-tags" style={{ fontSize: 20, marginRight: '10px', color: '#313B54' }}></i>
          {post?.categories.map((item: any, index: number) => (
            <span>
              {item.label}
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
  )
}

export default Preview
