import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import { UserType } from '../../constants/user/user_type';
import { useAuth } from '../auth';

import AddArticle from './add/AddArticle';
import ArticleList from './list/ArticleList';
import Preview from './preview/Preview';

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

  const { auth } = useAuth();
  return (
    <>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='list'
            element={
              <>
                {/* breadcrumbs={ArticleBreadcrumb} */}
                <PageTitle >Articles</PageTitle>
                <ArticleList />
              </>
            }
          />
          <Route
            path='preview/:id'
            element={
              <>
                {/* breadcrumbs={ArticleBreadcrumb} */}
                <PageTitle >Preview</PageTitle>
                <Preview />
              </>
            }
          />
          {auth?.user?.user_role === UserType.AUTHOR && (
            <>
              <Route
                path='add-article'
                element={
                  <>
                    {/* breadcrumbs={AddEditArticleBreadcrumb} */}
                    <PageTitle >Add Article</PageTitle>
                    <AddArticle />
                  </>
                }
              />
              <Route
                path='edit-article/:id'
                element={
                  <>
                    {/* breadcrumbs={AddEditArticleBreadcrumb} */}
                    <PageTitle >Edit Article</PageTitle>
                    <AddArticle />
                  </>
                }
              />
            </>
          )}
          <Route index element={<Navigate to={'/articles/list'} />} />
          <Route path="*" element={<Navigate to={'/articles/list'} />} />
        </Route>
      </Routes>
    </>
  )
}

export default ArticlePage
