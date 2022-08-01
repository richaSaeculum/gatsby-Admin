// import store from '../../store/configureStore';

var staticHeader = {};

// store.subscribe(() => {
//   const { isUserLogin, userData } = store.getState().Auth;

//   if (isUserLogin && userData && Object.keys(userData).length > 0 && userData.token) {
//     staticHeader = {
//       'Authorization': 'token ' + userData.token,
//     };
//   } else {
//     staticHeader = {};
//   }
// });

type Props = {
    url: string
    method?: string
    body?: string
    header?: {}
    showNoInternetMessage?: boolean
    showCenterLoader?: boolean
    callback?: (arg: any) => void
}

const ApiCall = async ({
    url,
    method = 'POST',
    body,
    header,
    showNoInternetMessage = true,
    showCenterLoader = true,
    callback = () => { }
}: Props): Promise<any> => {
    // to check internet
    const isInternet = true

    if (!isInternet) {
        if (showNoInternetMessage) {
            // error component call
        }
        return null;
    }

    if (showCenterLoader) {
        // loader component use here
    }
    const rawResponse = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...staticHeader,
            ...header,
        },
        body: body,
    })
        .then(r => {
            if (r.status === 401) {
                return { status: 401 };
            } else if (r.status === 402) {
                return { status: 402 };
            } else {
                return r.json();
            }
        })
        .catch(() => {
            if (showCenterLoader) {
                // loader component use here
            }

            // error alert component
            return null;
        });

    if (showCenterLoader) {
        // loader component use here
    }

    if (rawResponse === null) {
        return null;
    } else if (
        rawResponse.status === undefined ||
        rawResponse.status === 200 ||
        rawResponse.status === 202
    ) {
        if (!(rawResponse.message && rawResponse.message.includes('error'))) { rawResponse.status = 'Success'; }
        else {
            // error alert here
        }
        callback(rawResponse);
        return rawResponse;
    } else {
        return null;
    }
};

// export default {
//     ApiCall,
//     // staticHeader,
// };

export default ApiCall

// const body = JSON.stringify({})
// 
// const res = await ApiCall({ url: 'https://jsonplaceholder.typicode.com/posts', body })

