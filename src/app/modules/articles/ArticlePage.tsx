import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import AddArticle from './add/AddArticle'
import ArticleList from './list/ArticleList'

const ArticleBreadcrumb: Array<PageLink> = [
  {
    title: '',
    path: '/list',
    isSeparator: false,
    isActive: false,
  },
]

const AddEditArticleBreadcrumb: Array<PageLink> = [
  {
    title: 'Article',
    path: '/articles/list',
    isSeparator: false,
    isActive: false,
  }
]

const ArticlePage = () => {
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='list'
            element={
              <>
                <PageTitle breadcrumbs={ArticleBreadcrumb}>Articles</PageTitle>
                <ArticleList />
              </>
            }
          />
          <Route
            path='add-article'
            element={
              <>
                <PageTitle breadcrumbs={AddEditArticleBreadcrumb}>Add Article</PageTitle>
                <AddArticle />
              </>
            }
          />
          <Route
            path='edit-article/:id'
            element={
              <>
                <PageTitle breadcrumbs={AddEditArticleBreadcrumb}>Edit Article</PageTitle>
                <AddArticle />
              </>
            }
          />
          <Route index element={<Navigate to={'/articles/list'} />} />
          <Route path="*" element={<Navigate to={'/articles/list'}/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default ArticlePage
