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

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  saveWpAuth: (auth: WpAuthModel) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
  wpAuth: WpAuthModel | undefined
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  saveWpAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  wpAuth: authHelper.getWpAuth()
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  const [wpAuth, setWpAuth] = useState<WpAuthModel | undefined>(authHelper.getWpAuth())

  const getWPUserToken = async () => {
    let payload = {
      "username": "gatsby",
      "password": "~7sLqdx:0XBk5U^7cITPte4IjCDbI_yQ"
    }
    let res = await axios.post('https://gatsby.saeculumsolutions.com/wp-json/jwt-auth/v1/token', payload);
    console.log("===> Wordpress Auth <===", res.data)
    saveWpAuth(res.data)
  }

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
      getWPUserToken();
    } else {
      authHelper.removeAuth()
    }
  }

  const saveWpAuth = (auth: WpAuthModel | undefined) => {
    setWpAuth(auth);

    if (auth) {
      authHelper.setWpAuth(auth)
    } else {
      authHelper.removeWpAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
    saveWpAuth(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, saveWpAuth, currentUser, setCurrentUser, logout, wpAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser, wpAuth } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      if(!wpAuth){
        logout();
      }
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current || wpAuth) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
