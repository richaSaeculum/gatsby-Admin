import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel, WpAuthModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'
import axios from 'axios'
import { logoutApi } from '../../../api'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  saveWpAuth?: (auth: WpAuthModel) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
  wpAuth?: WpAuthModel | undefined
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  saveWpAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  wpAuth: undefined
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
      // getWPUserToken();
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = async () => {
    const res = await logoutApi();
    if (res && res.status === 200) {
      saveAuth(undefined);
      setCurrentUser(undefined);
      // saveWpAuth(undefined)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth,  setCurrentUser } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (auth: any) => {
      try {
        if (!didRequest.current) {
          if (auth) {
            setCurrentUser(auth)
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestUser(auth)
    } else {
      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>

}

export { AuthProvider, AuthInit, useAuth }
